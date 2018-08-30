pragma solidity ^0.4.24;

import "./ICampaignManager.sol";
import "./ChainCampaign.sol";

contract CampaignManager is ICampaignManager {

    uint256 public totalCampaigns;
    mapping (uint256 => address) private campaigns;

    constructor() public {
        totalCampaigns = 0;
    }

    function addNew(bytes32 _name, bytes32 _description, uint256 _goal, uint256 _weeksDuration) external {
        address newCampaign = new ChainCampaign(msg.sender, _name, _description, _goal, _weeksDuration);
        campaigns[totalCampaigns] = newCampaign;

        emit LogCampaignCreated(totalCampaigns, newCampaign);
        
        ++totalCampaigns;
    }

    function getCampaignAddress(uint256 _campaignId) external view returns (address) {
        return campaigns[_campaignId];
    }
}

