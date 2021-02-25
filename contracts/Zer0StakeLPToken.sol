//SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./oz/erc20/ERC20.sol";

contract Zer0StakeLPToken is ERC20 {
    modifier onlypool{
        require(msg.sender == _pooladdress);
        _;
    }
    address _pooladdress;

    receive() external payable{}
    
    constructor(string memory name, string memory ticker, uint256 supply) ERC20(name, ticker) {
        _mint(msg.sender, supply);
        _pooladdress = msg.sender;
    }
    
    function mint(address to, uint256 amt) public virtual onlypool{
        _mint(to, amt);
    }

    function borrow(address from, address to, uint256 amt) public onlypool{
        _transfer(from, to, amt);
    }
    function repay(address from, address to, uint256 amt) external onlypool{
        _transfer(from, to, amt);
    }
}