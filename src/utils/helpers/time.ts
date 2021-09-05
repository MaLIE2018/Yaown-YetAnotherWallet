import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek,
  subDays,
  addDays,
  addYears,
  subYears,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
} from "date-fns";

export const getRange = (currentDate: Date, interval: string): Date[] | [] => {
  switch (interval) {
    case "monthly":
      return [startOfMonth(currentDate), addDays(endOfMonth(currentDate), 1)];
    case "annually":
      return [startOfYear(currentDate), addDays(endOfYear(currentDate), 1)];
    case "weekly":
      return [
        subDays(startOfWeek(currentDate, { weekStartsOn: 1 }), 1),
        addDays(endOfWeek(currentDate, { weekStartsOn: 1 }), 1),
      ];
    case "daily":
      return [currentDate];
  }
  return [];
};

export const getFormat = (currentDate: Date, interval: string): string => {
  switch (interval) {
    case "Monthly":
      return format(currentDate, "MMMM");
    case "Annually":
      return format(currentDate, "y");
    case "Daily":
      return format(currentDate, "E., d. MMMM");
    case "Weekly":
      let sow = startOfWeek(currentDate, { weekStartsOn: 1 });
      let eow = endOfWeek(currentDate, { weekStartsOn: 1 });
      if (sow.getMonth() === eow.getMonth()) {
        return `${format(sow, "d.")}-${format(eow, "d. MMM")}`;
      } else {
        return `${format(sow, "d. MMM")} - ${format(eow, "d. MMM")}`;
      }
    default:
      return "";
  }
};

export const adjustDate = (
  currentDate: Date | null,
  direction: string,
  interval: string
): Date | null => {
  if (currentDate)
    switch (interval) {
      case "Monthly":
        if (direction === "fwd") {
          return addMonths(currentDate, 1);
        } else if (direction === "bwd") {
          return subMonths(currentDate, 1);
        }
        break;
      case "Annually":
        if (direction === "fwd") {
          return addYears(currentDate, 1);
        } else if (direction === "bwd") {
          return subYears(currentDate, 1);
        }
        break;
      case "Daily":
        if (direction === "fwd") {
          return addDays(currentDate, 1);
        } else if (direction === "bwd") {
          return subDays(currentDate, 1);
        }
        break;
      case "Weekly":
        if (direction === "fwd") {
          return addWeeks(currentDate, 1);
        } else if (direction === "bwd") {
          return subWeeks(currentDate, 1);
        }
        break;
      default:
        return currentDate;
    }
  return null;
};
