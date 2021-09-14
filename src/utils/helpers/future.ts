import { Estimates } from "types/types";

export const getWorkingYears = (age: number, cAge: number): number => {
  return age - cAge;
};

export function futureMonth(settings: Estimates): string {
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
  const total =
    (getCapital(savingRate, increaseSavingRate, age, cAge) +
      getInvest(investRate, averageAnnualROI, age, cAge)) /
    (lifetime * 12);
  return Number(total + pension + otherIncome).toFixed(2);
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
