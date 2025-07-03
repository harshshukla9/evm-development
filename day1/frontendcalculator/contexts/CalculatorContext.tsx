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
import { UseReadContractReturnType } from "wagmi";
import { formatUnits } from "viem";


interface CalculatorContextType {
    userAddress: `0x${string}` | undefined,
    isConnected:boolean,
    number:number | null,
    numberRead:UseReadContractReturnType,
    isLoading:boolean

    
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState<`0x${string}` | undefined>();
  const [number, setNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const numberRead = useReadContract({
    address: config.contractAddress as `0x${string}`,
    abi: config.abi,
    functionName: "number",
    chainId: 31337,
  });

  useEffect(() => {
    if (isConnected) {
      setUserAddress(address);
    } else {
      setUserAddress(undefined);
    }
  }, [address, isConnected]);

  useEffect(() => {
    setIsLoading(true);
    if (numberRead.data) {
      const raw = numberRead.data as bigint;
      setNumber(Number(raw));
    }
    setIsLoading(false);
  }, [numberRead.data]);
  console.log("numberead",numberRead)
  console.log("number is",numberRead.data)

  return (
    <CalculatorContext.Provider
      value={{
        userAddress,
        isConnected,
        number,
        isLoading,
        numberRead
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within CalculatorProvider");
  }
  return context;
}

