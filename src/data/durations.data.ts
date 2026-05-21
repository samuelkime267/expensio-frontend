export type duration = "week" | "month" | "day" | "all-time";

export const durations: { value: duration; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "all-time", label: "All Time" },
  // { value: "year", label: "Year" },
];
