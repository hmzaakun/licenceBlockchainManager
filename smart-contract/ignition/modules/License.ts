import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const SMART_ACCOUNT = "0x86F2986999A3eE70fD12d595d5812Ad76226e614";
export default buildModule("LicenseFactory", (m) => {
  const token = m.contract("LicenseFactory", [SMART_ACCOUNT]);

  return { token };
});