contract Zer0Pool721 {
    using SafeMath for uint256;
    uint32 poolid;
    mapping(uint32 => address) _network; /// @dev id to nft contract address
    mapping(uint32 => uint256) _pool; /// @dev id to lp tokens locked
    mapping(uint32 => uint256) _reserve; /// @dev id to eth reserve
    
    function create(address network) external payable{}
    
    function join(uint32 id) external payable {
        require(msg.value > 0, 'Sent 0 value');
            
    } 
    
    function exit() external {
        
    }
}