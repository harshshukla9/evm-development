"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import config from "../lib/config";
import { useReadContract, useAccount } from "wagmi";
import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";
import { UseReadContractReturnType } from "wagmi";

// Create Viem client
const client = createPublicClient({
  chain: hardhat,
  transport: http(),
});

interface PollContextType {
  userAddress: `0x${string}` | undefined;
  isConnected: boolean;
  totalCandidates: number | null;
  getNoOfCandidates: UseReadContractReturnType;
  candidatesName: UseReadContractReturnType<string[]>;
  owner: UseReadContractReturnType;
  isLoading: boolean;
  votes: Record<string, bigint>;
  refreshVotes: () => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export function PollProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState<`0x${string}` | undefined>();
  const [totalCandidates, setTotalCandidates] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [votes, setVotes] = useState<Record<string, bigint>>({});

  const getNoOfCandidates = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: config.abi,
    functionName: "getNoOfCandidates",
    chainId: 31337,
  });

  const candidatesName = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: config.abi,
    functionName: "getCandidateNames",
    chainId: 31337,
  });

  const owner = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: config.abi,
    functionName: "owner",
    chainId: 31337,
  });

  // Wallet state sync
  useEffect(() => {
    if (isConnected) {
      setUserAddress(address);
    } else {
      setUserAddress(undefined);
    }
  }, [address, isConnected]);

  // Convert getNoOfCandidates bigint to number
  useEffect(() => {
    setIsLoading(true);
    if (getNoOfCandidates.data !== undefined) {
      const raw = getNoOfCandidates.data;
      setTotalCandidates(Number(raw));
    }
    setIsLoading(false);
  }, [getNoOfCandidates.data]);

  // ✅ Real-time vote count fetcher

  const candidatesList = Array.isArray(candidatesName?.data) ? candidatesName.data : [];
  const refreshVotes = async () => {
    if (!candidatesName?.data || candidatesList.length === 0) return;

    const newVotes: Record<string, bigint> = {};

    await Promise.all(
      candidatesList.map(async (name) => {
        try {
          const voteCount = await client.readContract({
            address: config.contractAddress as `0x${string}`,
            abi: config.abi,
            functionName: "getVotes",
            args: [name],
          });
          newVotes[name] = voteCount as bigint;
        } catch (err) {
          console.error(`Error reading votes for ${name}`, err);
        }
      })
    );

    setVotes(newVotes);
  };

  // Auto-refresh when candidate names change
  useEffect(() => {
    refreshVotes();
  }, [candidatesName.data]);

  return (
    <PollContext.Provider
      value={{
        userAddress,
        isConnected,
        totalCandidates,
        isLoading,
        getNoOfCandidates,
        candidatesName,
        owner,
        votes,
        refreshVotes,
      }}
    >
      {children}
    </PollContext.Provider>
  );
}

export function usePoll() {
  const context = useContext(PollContext);
  if (context === undefined) {
    throw new Error("usePoll must be used within PollProvider");
  }
  return context;
}
