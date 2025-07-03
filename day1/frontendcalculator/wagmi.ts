import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon, sepolia, anvil } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit Demo",
  projectId: "YOUR_PROJECT_ID", // Keep or remove if unnecessary
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    anvil, // ✅ Add localhost for Hardhat
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});