import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.8",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      url: process.env.POLYGON_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  }, 
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
  
export default config;  