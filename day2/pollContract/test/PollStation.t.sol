// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PollStation} from "../src/PollStation.sol";

contract PollStationTest is Test {
    PollStation public pollStation;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this); // `this` is the test contract itself, acting as owner
        user1 = vm.addr(1);
        user2 = vm.addr(2);

        pollStation = new PollStation();
    }

    function testAddCandidate() public {
        pollStation.addCandidate("Alice");
        string[] memory names = pollStation.getCandidateNames();
        assertEq(names.length, 1);
        assertEq(names[0], "Alice");
    }

    function testOnlyOwnerCanAddCandidate() public {
        vm.prank(user1); // simulate as user1
        vm.expectRevert("Only owner can perform this action");
        pollStation.addCandidate("Bob");
    }

    function testVotingForValidCandidate() public {
        pollStation.addCandidate("Alice");

        vm.prank(user1);
        pollStation.vote("Alice");

        uint256 votes = pollStation.getVotes("Alice");
        assertEq(votes, 1);
    }

    function testDoubleVotingShouldFail() public {
        pollStation.addCandidate("Alice");

        vm.prank(user1);
        pollStation.vote("Alice");

        vm.prank(user1);
        vm.expectRevert("You have already voted");
        pollStation.vote("Alice");
    }

    function testVotingForInvalidCandidateShouldFail() public {
        pollStation.addCandidate("Alice");

        vm.prank(user2);
        vm.expectRevert("Candidate does not exist");
        pollStation.vote("Charlie");
    }
}
