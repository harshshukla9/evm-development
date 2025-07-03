"use client";
import { useCounterActions } from "@/hooks/increament";
import Navbar from "./components/Navbar";
import { useCalculator } from "@/contexts/CalculatorContext";

export default function Home() {
  const { increment, isIncremented, decrement, isDecremented } = useCounterActions();
  const { numberRead } = useCalculator();

  const isLoading = numberRead.isLoading;
  const number = numberRead.data as bigint
  
  console.log("number is",number)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {isLoading ? (
        <h1 className="text-white text-xl animate-pulse">Loading...</h1>
      ) : (
        <h1 className="text-white text-3xl">Number is:{number}</h1>
      )}

      <button onClick={increment}>Increment</button>
      {isIncremented && <p>Incremented!</p>}

      <button onClick={decrement}>Decrement</button>
      {isDecremented && <p>Decremented!</p>}
      
    </div>
  );
}
