// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PollStation {
    string[] public candidatesName;

    mapping(string => uint256) private voteCount;
    mapping(address => bool) private hasVoted;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict certain functions to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Add a candidate (only by owner)
    function addCandidate(string memory _candidateName) public onlyOwner {
        candidatesName.push(_candidateName);
        voteCount[_candidateName] = 0;
    }

    function getNoOfCandidates() public view returns (uint256) {
    return candidatesName.length;
}


    // View all candidate names
    function getCandidateNames() public view returns (string[] memory) {
        return candidatesName;
    }

    // View vote count of a candidate
    function getVotes(string memory _candidateName) public view returns (uint256) {
        return voteCount[_candidateName];
    }

    // Vote for a candidate (only once per address)
    function vote(string memory _candidateName) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(isValidCandidate(_candidateName), "Candidate does not exist");

        voteCount[_candidateName] += 1;
        hasVoted[msg.sender] = true;
    }

    // Helper to check if the candidate exists
    function isValidCandidate(string memory _name) internal view returns (bool) {
        for (uint256 i = 0; i < candidatesName.length; i++) {
            if (keccak256(bytes(candidatesName[i])) == keccak256(bytes(_name))) {
                return true;
            }
        }
        return false;
    }
}
