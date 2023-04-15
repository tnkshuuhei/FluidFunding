// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Prediction {
    using SafeERC20 for IERC20;

    IERC20 predictionToken;
    uint256 yesPool;
    uint256 noPool;

    function predict(uint256 betAmount, bool option) public {
        predictionToken.transferFrom(msg.sender, address(this), betAmount);

        // store prediction amount
        if (option) {
            yesPool += betAmount;
        } else {
            noPool += betAmount;
        }
    }
}
