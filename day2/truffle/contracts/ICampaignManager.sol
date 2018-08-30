pragma solidity ^0.4.24;

import "./IChainCampaign.sol";

interface ICampaignManager {

    event LogCampaignCreated(uint256 indexed campaignId, address campaignAddr);

    function addNew(bytes32 _name, bytes32 _description, uint256 _weeksDuration, uint256 _goal) external;
    function getCampaignAddress(uint256 _campaignId) external view returns (address);
}