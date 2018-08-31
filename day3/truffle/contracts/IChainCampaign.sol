pragma solidity ^0.4.24;

interface IChainCampaign {

    event LogCampaignStarted(address indexed campaignAddr, uint256 startTimestamp, uint256 endTimestamp);
    event LogCampaignEnded(address indexed campaignAddr, bool succeded, uint256 raisedAmount);
    event LogProjectBacked(address indexed backerAddr, uint256 backedAmount);

    function getInfo() external view returns (bytes32 _name, uint256 _startTS, uint256 _endTS, uint256 _totalBackers, uint256 _totalRaised, uint256 _goal);
    function startCampaign() external returns (bool);
    function endCampaign() external returns (bool);
    function backTheProject() external payable;
    function collectFunds() external;
    function withdrawMyFunds() external;
}