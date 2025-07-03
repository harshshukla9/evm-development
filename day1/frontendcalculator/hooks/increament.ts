"use client";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import config from "../lib/config"; // Make sure config includes the Counter contract

export function useCounterActions() {
  const {
    writeContract: writeIncrement,
    data: txIncrement,
    isPending: isIncrementing,
    error: incrementError,
    reset: resetIncrement,
  } = useWriteContract();

  const {
    isSuccess: isIncremented,
    isLoading: isIncrementConfirming,
  } = useWaitForTransactionReceipt({
    hash: txIncrement,
  });

  const increment = () => {
    writeIncrement({
      address: config.contractAddress as `0x${string}`,
      abi: config.abi,
      functionName: "increment",
      args: [],
    });
  };

  const {
    writeContract: writeDecrement,
    data: txDecrement,
    isPending: isDecrementing,
    error: decrementError,
    reset: resetDecrement,
  } = useWriteContract();

  const {
    isSuccess: isDecremented,
    isLoading: isDecrementConfirming,
  } = useWaitForTransactionReceipt({
    hash: txDecrement,
  });

  const decrement = () => {
    writeDecrement({
      address: config.contractAddress as `0x${string}`,
      abi: config.abi,
      functionName: "decrement",
      args: [],
    });
  };

  return {
    increment,
    isIncrementing,
    isIncrementConfirming,
    isIncremented,
    incrementError,
    resetIncrement,

    decrement,
    isDecrementing,
    isDecrementConfirming,
    isDecremented,
    decrementError,
    resetDecrement,
  };
}
