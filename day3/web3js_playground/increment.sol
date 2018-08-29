pragma solidity ^0.4.21;
contract Increment3 {
  uint value;
    
  event Incremented(
      uint increment
  );
    
  function add(uint val) public {
    value = value + val;
    emit Incremented(val);
  }
    
  function read() public view returns (uint, uint){
    return (value);
  }
}