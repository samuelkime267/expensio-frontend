export type duration = "week" | "month" | "day" | "year" | "all-time";

export const durations: { value: duration; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "all-time", label: "All Time" },
];
