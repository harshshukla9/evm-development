"use client";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import config from "../lib/config"; // should include abi & contractAddress

export function usePollActions() {
  const {
    writeContract: writeVote,
    data: voteTxHash,
    isPending: isVoting,
    error: voteError,
    reset: resetVote,
  } = useWriteContract();

  const {
    isSuccess: isVoted,
    isLoading: isVoteConfirming,
  } = useWaitForTransactionReceipt({
    hash: voteTxHash,
  });

  // 👇 takes in candidateName as argument
  const vote = (candidateName: string) => {
    writeVote({
      address: config.contractAddress as `0x${string}`,
      abi: config.abi,
      functionName: "vote",
      args: [candidateName],
    });
  };

  const {
    writeContract: writeAddCandidate,
    data: txAddCandidate,
    isPending: isAdding,
    error: addCandidateError,
    reset: resetAddCandidate,
  } = useWriteContract();
  
  const {
    isSuccess: isAdded,
    isLoading: isAddConfirming,
  } = useWaitForTransactionReceipt({
    hash: txAddCandidate,
  });
  
  // 👇 function with args
  const addCandidate = (candidateName: string) => {
    writeAddCandidate({
      address: config.contractAddress as `0x${string}`,
      abi: config.abi,
      functionName: "addCandidate",
      args: [candidateName],
    });
  };
  

  return {
    vote,
    isVoting,
    isVoteConfirming,
    isVoted,
    voteError,
    resetVote,
  
    addCandidate,
    isAdding,
    isAddConfirming,
    isAdded,
    addCandidateError,
    resetAddCandidate,
  };
  
}
