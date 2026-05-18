export type CategoryFramework = {
  label: string;
  value: string;
};

export const expenseCategories: CategoryFramework[] = [
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Groceries", value: "groceries" },
  { label: "Phone & Internet", value: "phone_internet" },
  { label: "Rent & Housing", value: "rent_housing" },
  { label: "Utilities", value: "utilities" },
  { label: "School / Education", value: "school_education" },
  { label: "Health & Medical", value: "health_medical" },
  { label: "Savings", value: "savings" },
  { label: "Loan Repayment", value: "loan_repayment" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Subscriptions", value: "subscriptions" },
  { label: "Family Support", value: "family_support" },
  { label: "Personal Care", value: "personal_care" },
  { label: "Miscellaneous", value: "miscellaneous" },
];

export const incomeCategories: CategoryFramework[] = [
  { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Business", value: "business" },
  { label: "Side Hustle", value: "side_hustle" },
  { label: "Allowance", value: "allowance" },
  { label: "Gift", value: "gift" },
  { label: "Refund", value: "refund" },
  { label: "Investment Returns", value: "investment_returns" },
  { label: "Bonus", value: "bonus" },
  { label: "Commission", value: "commission" },
  { label: "Scholarship", value: "scholarship" },
  { label: "Rental Income", value: "rental_income" },
  { label: "Interest", value: "interest" },
  { label: "Cashback", value: "cashback" },
  { label: "Other Income", value: "other_income" },
];
