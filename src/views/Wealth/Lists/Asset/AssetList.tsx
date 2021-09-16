import React from "react";
import { List, Box, Typography } from "@material-ui/core";
import GenericListItem from "components/Utils/GenericListItem/GenericListItem";
import { Api } from "../../../../api/index";
import { Asset } from "types/bankAccount";
import { AssetSummary } from "utils/helpers/wealth";
import getCurrencySymbol from "currency-symbols";
import useSelector from "hooks/useSelector";
import { currencyFormat } from "utils/helpers/text";

interface Props {
  assetSummary: AssetSummary;
}

const AssetList: React.FC<Props> = ({ assetSummary }) => {
  const [assets, setAssets] = React.useState<Asset[] | undefined>(undefined);
  const { settings } = useSelector((state) => state);
  React.useEffect(() => {
    (async () => {
      const assets = await Api.getSingleton().getMyAssets();
      if (assets.length !== 0) {
        setAssets(assets);
      }
    })();
  }, []);

  const debts = assetSummary.assets.debts;
  const possessions =
    assetSummary.assets.possessions +
    assetSummary.investments.total +
    assetSummary.cash.total;

  return (
    <>
      <Box
        width='97%'
        height='10%'
        display='flex'
        justifyContent='start'
        alignItems='end'>
        <Typography component='div' style={{ width: "100%" }}>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            width='100%'>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'>
              <Box fontWeight='fontWeightRegular'>Capital investment</Box>
              <Box fontWeight='fontWeightRegular'>{`${currencyFormat(
                possessions,
                settings.lang,
                settings.currency
              )}`}</Box>
            </Box>
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='space-between'>
              <Box fontWeight='fontWeightLight'>Financing</Box>
              <Box fontWeight='fontWeightLight'>{`${currencyFormat(
                debts,
                settings.lang,
                settings.currency
              )}`}</Box>
            </Box>
          </Box>
        </Typography>
      </Box>
      <List>
        {assets &&
          assets.map((asset: Asset) => (
            <GenericListItem key={asset._id} item={asset} />
          ))}
      </List>
    </>
  );
};

export default AssetList;
