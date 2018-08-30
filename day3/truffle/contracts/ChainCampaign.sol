pragma solidity ^0.4.24;

import "./IChainCampaign.sol";

contract ChainCampaign is IChainCampaign {

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    bytes32 public name;
    bytes32 public description;
    uint256 public goal;
    uint256 public totalBackers;
    uint256 public startTs;
    uint256 public endTs;
    uint256 public totalRaised;
    mapping (address => uint256) public backers;

    address private owner;
    uint256 private durationInWeeks;
    bool private campaignStarted;
    bool private campaignEnded;
    bool private campaignSuccessful;
    bool private campaignClosed;

    // google: solidity fallback function
    function () public {
        revert();
    }

    constructor
    (
        address _owner,
        bytes32 _name,
        bytes32 _description,
        uint256 _goal,
        uint256 _durationInWeeks
    )
    public
    {
        name = _name;
        description = _description;
        goal = _goal;
        durationInWeeks = _durationInWeeks;

        campaignStarted = false;
        campaignEnded = false;
        campaignSuccessful = false;
        campaignClosed = false;
        owner = _owner;
    }

    function getInfo() external view returns 
    (
        bytes32 _name,
        uint256 _startTS,
        uint256 _endTS,
        uint256 _totalBackers,
        uint256 _totalRaised,
        uint256 _goal
    )
    {
        return (name, startTs, endTs, totalBackers, totalRaised, goal);
    }

    function startCampaign() external onlyOwner returns (bool) {
        if(!campaignStarted) {
            
            startTs = block.timestamp;
            endTs = startTs + durationInWeeks * 1 weeks;
            campaignStarted = true;
            
            emit LogCampaignStarted(this, startTs, endTs);
            
            return true;
        }

        return false;
    }

    function endCampaign() external returns (bool) {
        require(endTs < block.timestamp && campaignStarted && !campaignEnded);
        
        campaignEnded = true;
        campaignSuccessful = totalRaised >= goal;

        emit LogCampaignEnded(this, campaignSuccessful, totalRaised);

        return true;
    }

    function backTheProject() external payable {
        require(campaignStarted && !campaignEnded);

        if(backers[msg.sender] == 0 && msg.value != 0) {
            ++totalBackers;
        }
        
        backers[msg.sender] += msg.value;
        totalRaised += msg.value;

        emit LogProjectBacked(msg.sender, msg.value);
    }

    function collectFunds() external {
        require(campaignEnded && campaignSuccessful && !campaignClosed);

        campaignClosed = true;
        owner.transfer(totalRaised);
    }

    function withdrawMyFunds() external {
        require(campaignClosed && !campaignSuccessful && backers[msg.sender] > 0);

        msg.sender.transfer(backers[msg.sender]);
    }
}