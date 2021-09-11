import assets from "./../components/icons/assetIcons";
import { AssetType, typeNames } from "../types/types";

const assetTypes: AssetType[] = [
  {
    type: typeNames.cash,
    icon: assets.MoneyOutlinedIcon,
  },
  { type: typeNames.realEstate, icon: assets.HomeWorkOutlinedIcon },
  { type: typeNames.depot, icon: assets.AccountBalanceIcon },
  { type: typeNames.account, icon: assets.AccountBalanceIcon },
  { type: typeNames.otherAssets, icon: assets.DriveEtaOutlinedIcon },
  { type: typeNames.stakeholder, icon: assets.BusinessOutlinedIcon },
];

export default assetTypes;
