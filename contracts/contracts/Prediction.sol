// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Grant.sol";

contract Prediction {
    using SafeERC20 for IERC20;

    struct Pool {
        uint256 yes;
        uint256 no;
    }

    IERC20 public predictionToken;
    mapping(uint256 => Pool) public poolForProject;
    Grant public grantContract;

    function totalPool(uint256 projectId) public view returns (uint256) {
        Pool memory pool = poolForProject[projectId];
        return pool.yes + pool.no;
    }

    function predict(uint256 projectId, uint256 betAmount, bool option) public {
        predictionToken.transferFrom(msg.sender, address(this), betAmount);
        Pool memory pool = poolForProject[projectId];

        // store prediction amount
        if (option) {
            pool.yes += betAmount;
        } else {
            pool.no += betAmount;
        }
    }

    function _getPredictionResult(
        uint256 projectId
    ) public view returns (bool) {
        return grantContract.isProjectSuccessful(projectId);
    }
}
