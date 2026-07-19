export const formatAmount = (amt: string | number) => {
  let value = `${amt}`;

  value = value.replace("₦", "");

  // Allow only numbers and decimal
  value = value.replace(/[^\d.]/g, "");

  // Prevent multiple decimals
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  const amount = (Number(value) || 0).toFixed(2);
  const finalAmount = Number(amount);
  const [whole, decimal] = value.split(".");

  const limitedDecimal = decimal?.slice(0, 2);

  const formattedWhole = whole ? Number(whole).toLocaleString("en-NG") : "";

  const finalAmountStr =
    limitedDecimal !== undefined
      ? `₦${formattedWhole}.${limitedDecimal}`
      : `₦${formattedWhole}`;

  return {
    valueStr: finalAmountStr,
    value: finalAmount,
  };
};
