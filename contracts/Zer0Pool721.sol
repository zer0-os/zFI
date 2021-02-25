//SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./oz/util/SafeMath.sol";
import "./oz/erc721/ERC721.sol";
import "./Zer0StakeLPToken.sol";
import "./Zer0LendLPToken.sol";


contract Zer0Pool721{
    using SafeMath for uint256;
    //pool
    Zer0StakeLPToken stakeLP;
    mapping(address => mapping(uint256 => address)) staker; /// @dev network to 721 token id to owner address
    mapping(address => mapping(uint256 => bool)) locked; /// @dev network to id to locked status
    mapping(address => mapping(address => uint256)) borrowed; /// @dev borrower to network to lp tokens locked 
    //lend
    Zer0LendLPToken lendLP;
    mapping(address => uint256) pool; /// @dev network to eth reserve 

    constructor() {
        stakeLP = new Zer0StakeLPToken("Zer0 StakeLP", "ZSLP", 0);
        lendLP = new Zer0LendLPToken("Zer0 LendLP", "ZLLP", 0);
    }
    
    // pool
    modifier onlystaker(address network, uint256 id){
        require(msg.sender == staker[network][id], 'Sender is not token pooler');
        _;
    }

    function daypool(address network, uint256 id) external {
        ERC721 t = ERC721(network);
        staker[network][id] = msg.sender;
        stakeLP.mint(msg.sender, 1);
        t.transferFrom(msg.sender, address(this), id);
    }
    function weekpool() external {
        
    }
    function monthpool() external {
        
    }
    function exit(address network, uint256 id) external onlystaker(network, id){
        require(!locked[network][id], 'NFT locked');
        ERC721 t = ERC721(network);
        t.transferFrom(address(this), msg.sender, id);
    }

    // lend
    function lend(address network) external payable{
        require(msg.value > 0, '0 value sent, you must pool eth to join');
        pool[network].add(msg.value);
        lendLP.mint(msg.sender, msg.value);
    }
    function borrow(address network, uint256 amount) external{
        //require(amount <= stakeLP.balanceOf(msg.sender)/pool[network], 'Sender doesnt control necessary shares');
        borrowed[msg.sender][network] += amount;
        stakeLP.borrow(msg.sender, address(this), 1);
    }
    function repay(address network) external payable{
        //require(borrowed[msg.sender][network] >= msg.value - msg.value/10, 'Sender didnt borrow amount repaid');
        borrowed[msg.sender][network] -= msg.value;
        stakeLP.repay(address(this), msg.sender, 1);
    }
}