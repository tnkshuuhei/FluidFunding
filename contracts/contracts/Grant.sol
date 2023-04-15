// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract Grant is Ownable {
    /// @notice CFA Library.
    using SuperTokenV1Library for ISuperToken;
    using SafeERC20 for IERC20;

    struct Project {
        uint256 id;
        address owner;
        uint256 approvedGrant;
        string dataJsonStringified; // name, description, timeline
        uint256 milestoneTimestamp;
        address fundingRecipient;
        uint256 totalFundReceived;
        bool isStopped;
    }

    struct ActiveFundStream {
        uint256 projectId;
        uint256 startTimestamp;
        uint256 rate;
    }

    event DepositedGrant(address indexed sender, uint256 depositAmount);
    event RegisteredProject(
        address indexed sender,
        string name,
        string dataJsonStringified,
        address fundingRecipient
    );
    event ApprovedProjects(
        uint256[] projectIds,
        uint256[] approvedGrantForProject
    );
    event StartedFirstPortionOfTheGrantDistribution(
        uint256 indexed projectId,
        uint256 rate
    );
    event StoppedFirstPortionOfTheGrantDistribution(
        uint256 indexed projectId,
        uint256 amountReceived
    );
    event ResumedFirstPortionOfTheGrantDistribution(uint256 indexed projectId);
    event SentTheRemainingFundGrant(uint256 indexed projectId, uint256 amount);

    address public daoExecutor;
    modifier onlyDao() {
        require(msg.sender == daoExecutor, "not allowed");
        _;
    }

    uint256 public firstWithdrawalPortion;
    uint256 public remainingFundWaitTimeInSecond;

    mapping(uint256 => Project) public projectMapping;
    mapping(uint256 => ActiveFundStream) public lastActiveFundStream;
    uint256 public totalProject;

    IERC20 public grantToken;
    ISuperToken public superToken;

    constructor(
        IERC20 _grantToken,
        ISuperToken _superToken,
        uint256 _firstWithdrawalPortion,
        uint256 _remainingFundWaitTimeInSecond
    ) {
        grantToken = _grantToken;
        superToken = _superToken;
        firstWithdrawalPortion = _firstWithdrawalPortion;
        remainingFundWaitTimeInSecond = _remainingFundWaitTimeInSecond;
    }

    function withdraw(address token, uint256 amount) public onlyOwner {
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    function depositGrant(uint256 depositAmount) public {
        grantToken.safeTransferFrom(msg.sender, address(this), depositAmount);
        grantToken.approve(address(superToken), depositAmount);
        superToken.upgrade(depositAmount);
        emit DepositedGrant(msg.sender, depositAmount);
    }

    function registerProject(
        string memory name,
        string memory dataJsonStringified,
        address fundingRecipient,
        uint256 milestoneTimestamp
    ) public {
        uint256 projectId = totalProject++;
        projectMapping[projectId] = Project(
            projectId,
            msg.sender,
            0,
            dataJsonStringified,
            milestoneTimestamp,
            fundingRecipient,
            0,
            false
        );

        emit RegisteredProject(
            msg.sender,
            name,
            dataJsonStringified,
            fundingRecipient
        );
    }

    function approveProjects(
        uint256[] memory projectIds,
        uint256[] memory approvedGrantForProject
    ) public onlyOwner {
        for (uint256 i; i < projectIds.length; i++) {
            uint256 projectId = projectIds[i];
            projectMapping[projectId].approvedGrant = approvedGrantForProject[
                i
            ];
        }

        emit ApprovedProjects(projectIds, approvedGrantForProject);
    }

    function _getFirstPartOfGrantWithdrawable(
        uint256 projectId
    ) internal view returns (uint256) {
        uint256 remainingAmount = _getRemainingGrantWithdrawable(projectId);
        if (remainingAmount == 0) {
            return 0;
        }

        return (remainingAmount * firstWithdrawalPortion) / 100;
    }

    function _getRemainingGrantWithdrawable(
        uint256 projectId
    ) internal view returns (uint256) {
        Project memory project = projectMapping[projectId];
        return (project.approvedGrant - project.totalFundReceived);
    }

    function _getFirstPartOfGrantRate(
        uint256 projectId
    ) internal view returns (uint256) {
        uint256 streamPeriodInSecond = block.timestamp <=
            projectMapping[projectId].milestoneTimestamp
            ? block.timestamp - projectMapping[projectId].milestoneTimestamp
            : 1;
        return
            _getFirstPartOfGrantWithdrawable(projectId) / streamPeriodInSecond;
    }

    function startFirstPortionOfTheGrantDistribution(uint256 projectId) public {
        Project memory project = projectMapping[projectId];
        // start distribution of part of the grant with SuperFluid to the project recipients
        require(
            project.approvedGrant > 0,
            "The project doesn't have grant to withdraw"
        );

        uint256 rate = _getFirstPartOfGrantRate(projectId);
        lastActiveFundStream[projectId] = ActiveFundStream(
            projectId,
            block.timestamp,
            rate
        );

        superToken.createFlow(project.fundingRecipient, int96(uint96(rate)));

        emit StartedFirstPortionOfTheGrantDistribution(
            projectId,
            _getFirstPartOfGrantRate(projectId)
        );
    }

    function _stopFirstPortionOfTheGrantDistribution(
        uint256 projectId
    ) internal {
        ActiveFundStream
            memory lastActiveStreamOfProject = lastActiveFundStream[projectId];

        if (lastActiveStreamOfProject.projectId != 0) {
            Project memory project = projectMapping[projectId];
            superToken.deleteFlow(address(this), project.fundingRecipient);
            uint256 amountReceived = (block.timestamp -
                lastActiveStreamOfProject.startTimestamp) *
                uint256(lastActiveStreamOfProject.rate);
            projectMapping[projectId].totalFundReceived = amountReceived;
            projectMapping[projectId].isStopped = true;

            delete lastActiveFundStream[projectId];

            emit StoppedFirstPortionOfTheGrantDistribution(
                projectId,
                amountReceived
            );
        }
    }

    function stopFirstPortionOfTheGrantDistribution(
        uint256 projectId
    ) public onlyDao {
        // stop grant stream of the first fund portion to the fund recipient of the projects
        // this function is to be executed by Snapshot DAO if someone finding something is bad on the project
        require(
            block.timestamp <= _getProjectFinalWithdarawalTime(projectId),
            "only before finalization period"
        );

        //stop
        _stopFirstPortionOfTheGrantDistribution(projectId);
    }

    function resumeFirstPortionOfTheGrantDistribution(
        uint256 projectId
    ) public onlyDao {
        // resume grant stream of the remaining of the first fund portion to the fund recipient of the projects
        // this function is to be executed by Snapshot DAO if the accused stop was found not true
        require(
            lastActiveFundStream[projectId].projectId == 0,
            "there's already an active stream"
        );
        Project memory project = projectMapping[projectId];
        uint256 rate = _getFirstPartOfGrantRate(projectId);
        lastActiveFundStream[projectId] = ActiveFundStream(
            projectId,
            block.timestamp,
            rate
        );
        projectMapping[projectId].isStopped = true;

        superToken.createFlow(project.fundingRecipient, int96(uint96(rate)));

        emit ResumedFirstPortionOfTheGrantDistribution(projectId);
    }

    function _getProjectFinalWithdarawalTime(
        uint256 projectId
    ) internal view returns (uint256) {
        return
            projectMapping[projectId].milestoneTimestamp +
            remainingFundWaitTimeInSecond;
    }

    function sendTheRemainingFundGrant(uint256 projectId) public {
        // send the remaining fund grant for the project
        require(
            block.timestamp >= _getProjectFinalWithdarawalTime(projectId),
            "can not withdraw yet"
        );

        _stopFirstPortionOfTheGrantDistribution(projectId);

        uint256 amount = _getRemainingGrantWithdrawable(projectId);

        emit SentTheRemainingFundGrant(projectId, amount);
    }

    function isProjectSuccessful(uint256 projectId) public view returns (bool) {
        return block.timestamp > _getProjectFinalWithdarawalTime(projectId);
    }
}
