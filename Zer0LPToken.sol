contract Zer0LPToken is ERC20 {
    modifier onlypool{
        require(msg.sender == _pooladdress);
        _;
    }
    address _pooladdress;
    
    constructor(uint256 supply, address pooladdress) ERC20("Zer0721LP", "ZLP") {
        _mint(msg.sender, supply);
        _pooladdress = pooladdress;
    }
    
    function mint(address to, uint256 amt) public virtual onlypool{
        _mint(to, amt);
    }
}