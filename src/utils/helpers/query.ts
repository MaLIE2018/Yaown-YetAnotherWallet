export const getQueryStr = (
  range: Date[],
  accountId: string = "All"
): string => {
  let dateQuery = "";
  let accountQuery = "accountId=All";
  if (range.length === 1) {
    dateQuery = `bookingDate=${range[0].toISOString()}`;
  } else if (range.length === 2) {
    dateQuery = `bookingDate=${range[0].toISOString()}&bookingDate=${range[1].toISOString()}`;
  }
  if (accountId !== "All") {
    accountQuery = `accountId=${accountId}`;
  }

  return accountQuery.concat("&", dateQuery);
};
