import { Estimates, IFuture } from "types/types";

export const getWorkingYears = (age: number, cAge: number): number => {
  return age - cAge;
};

export function future(settings: Estimates): IFuture {
  const {
    pension,
    age,
    increaseSavingRate,
    savingRate,
    investRate,
    averageAnnualROI,
    lifetime,
    desiredPension,
    otherIncome,
    cAge,
  } = settings;
  const restMonths = lifetime * 12;
  const capital = getCapital(savingRate, increaseSavingRate, age, cAge);
  const investment = getInvest(investRate, averageAnnualROI, age, cAge);
  const investMonth = investment / restMonths;
  const capitalMonth = capital / restMonths;
  const futureMonth = capitalMonth + investMonth + pension + otherIncome;
  return {
    capital: capitalMonth,
    investment: investMonth,
    pension,
    otherIncome,
    futureMonth,
  };
}

const getCapital = (
  savingRate: number,
  increaseSavingRate: number,
  age: number,
  cAge: number
): number => {
  return (
    savingRate * getWorkingYears(age, cAge) * (1 + increaseSavingRate / 100)
  );
};

const getInvest = (
  investRate: number,
  averageAnnualROI: number,
  age: number,
  cAge: number
): number => {
  return investRate * getWorkingYears(age, cAge) * (1 + averageAnnualROI / 100);
};
