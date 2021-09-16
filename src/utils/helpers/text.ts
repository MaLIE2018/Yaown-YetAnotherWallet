import categories from "assets/categories";
import assets from "assets/assets";
import { Category, AssetType } from "types/types";

function isWord(word: string): boolean {
  return /[a-zA-Z]/.test(word);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeWords(str: string): string {
  const splitted = str.split(" ");
  const withCapitals = splitted.map((susp) =>
    isWord(susp) ? capitalize(susp) : susp
  );
  return withCapitals.join(" ");
}

export const base64 = (input: string) => {
  return new Buffer(input).toString("base64");
};

export const getCategory = (name: string): Category | undefined => {
  const category = categories.find((c: Category) => c.name === name);
  return category;
};

export const getAsset = (type: string): AssetType | undefined => {
  const assetType = assets.find((c: AssetType) => {
    return c.type === type;
  });
  return assetType;
};

export const currencyFormat = (
  n: number,
  lang: string,
  currency: string
): string => {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currency,
  }).format(n);
};
