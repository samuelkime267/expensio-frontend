# UI Registry — frontend/

Consistency source of truth for `frontend/`. Read this before building any UI component. New UI must reuse the tokens and patterns below — do not introduce new colors, radii, or spacing classes. Matched components to extend should be read first (the file is more precise than this summary).

## Baseline — Established 2026-08-15

[Note: This baseline was established via /imprint audit]

| Property             | Correct class                                              |
| -------------------- | ---------------------------------------------------------- |
| Page padding         | `p-4`                                                      |
| Card background      | none (inherits page `bg-bg`)                               |
| Card border          | `border border-bor`                                        |
| Card radius          | `rounded-xl`                                               |
| Card padding         | `p-4`                                                      |
| Card inner layout    | `flex flex-col gap-4/6/8` (compact=4, content=6, stat=8)   |
| Table wrapper        | `border border-bor rounded-lg overflow-hidden`             |
| Table header row     | `bg-[#ecf5ea] hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor` |
| Table head cell      | `text-text-pri py-5 font-medium px-4`                      |
| Table row hover      | `hover:bg-[#ecf5ea]/50 transition-color duration-300 !border-b !border-b-bor` |
| Button primary       | `btnType="primary"` = `bg-pri text-bg rounded-sm`          |
| Button secondary     | `btnType="secondary"` = `border border-pri rounded-sm`     |
| Button accent        | `btnType="accent"` = `border border-bor rounded-full`      |
| Icon chip            | `p-2.5 rounded-md bg-sec/30`                               |
| Badge / pill         | `rounded-full` + `bg-sec/80` / `bg-neutral-200` / `bg-destructive/80`, text `text-[9px]` |
| Text primary         | `text-text-pri`                                            |
| Text secondary       | `text-text-sec`                                            |
| Text muted           | `text-text-mute`                                           |
| Heading              | `h1` = `text-2xl font-medium capitalize` (global)          |
| Amount value         | `text-xl font-medium`                                      |
| Error banner         | `border border-destructive bg-error/10 text-destructive rounded-sm p-2` |
| Status colors        | tokens only: `text-success`, `text-err`, `bg-err/10`, `bg-success/20`, `bg-pending/20` |
| Hover (buttons)      | `hover:scale-[102%] duration-300`                          |
| Dashboard container  | `<main className="w-full p-4 relative">`                   |
| Transactions page    | `<div className="p-4 grid grid-cols-1 gap-4">`             |
| Skeleton placeholder | `animate-pulse bg-neutral-200` (neutral tone already used in StatusCards) |

**Pattern notes:**
- Icons come from `lucide-react` or `react-icons` (gi, fa6, tb, im, bs, fi, io5, md, fa); typical sizes `size-3`–`size-6`.
- Known drift (not a defect): `#ecf4e8` (`bg-sur`) vs `#ecf5ea` (table/QuickLog fills) are near-identical greens; both in use.
- Chart bar colors (Cashflow): income `#baf49d`, expense `#1e483f`.

## Load / error / empty states — Established 2026-08-15

### Skeleton

File: `frontend/src/components/Skeleton.tsx`
Last updated: 2026-08-15

| Property         | Class                     |
| ---------------- | ------------------------- |
| Background       | `bg-neutral-200`          |
| Border radius    | `rounded-md`              |
| Animation        | `animate-pulse`           |

**Pattern notes:** A single pulsing block primitive. Compose multiple instances to mirror the real layout (table rows, stat cards, chart area). Skeleton shapes match final content: table cells `h-4` widths, avatars `rounded-full`, chart `aspect-[2/1] rounded-lg`.

### EmptyState

File: `frontend/src/components/EmptyState.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Container        | `w-full flex flex-col items-center justify-center gap-3 p-8 text-center` |
| Icon circle      | `bg-sur rounded-full p-4`               |
| Icon             | `size-6 text-text-mute`                 |
| Title            | `h3` (`text-lg font-medium capitalize`) |
| Description      | `text-sm text-text-mute`                |

**Pattern notes:** Used under table headers when a query succeeds with zero rows. Icon comes from react-icons. Optional action buttons rendered via `children`.

### ErrorState

File: `frontend/src/components/ErrorState.tsx`
Last updated: 2026-08-15

| Property         | Class                                    |
| ---------------- | ---------------------------------------- |
| Banner           | `border border-destructive bg-err/10 rounded-sm p-2` |
| Message          | `text-destructive text-sm`               |
| Icon             | `InfoIcon` (lucide) `size-4 text-destructive` |
| Retry button     | `Button btnType="secondary"` `text-xs px-3 py-1` |

**Pattern notes:** Inline fetch-failure banner, extends the form `ErrorText` pattern with an optional Retry action. Replaces widget content on `isError`; shows "Retrying..." while the query refetches (`isFetching`).

### Transaction table row skeleton

File: `frontend/src/features/transaction/components/TransactionTable/index.tsx`
Last updated: 2026-08-15

| Property         | Class                                          |
| ---------------- | ---------------------------------------------- |
| Rows             | 5 skeleton rows, `TableRow` `!border-b !border-b-bor` |
| Cells            | `TableCell p-4` with `Skeleton` `h-4 w-*`      |
| Date cell        | two lines: `h-4 w-24` + `h-3 w-14`            |
| Actions cell     | `Skeleton size-8 rounded-full`                 |

**Pattern notes:** Skeleton rows keep the real table header; the header row keeps `bg-[#ecf5ea]` per baseline. Empty state renders below the table inside the `rounded-lg` wrapper with the "Log a transaction" Income/Expense buttons reusing the QuickLog tile style (`bg-[#ecf4e8] rounded-md gap-2 p-2 px-4`).

### Mobile transaction list (bank-style)

File: `frontend/src/features/transaction/components/TransactionList/index.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Container        | `md:hidden border border-bor rounded-lg overflow-hidden divide-y divide-bor` |
| Item layout      | `flex items-center gap-3 p-4 text-left w-full` |
| Item hover       | `hover:bg-[#ecf5ea]/50 transition-color duration-300` |
| Type icon chip   | `size-10 rounded-full` + `bg-success/10 text-success` / `bg-err/10 text-err` |
| Name             | `text-sm font-medium text-text-pri truncate` |
| Category / date  | `text-xs text-text-mute truncate`       |
| Amount           | `text-sm font-medium` + `text-success` / `text-err`, signed `+`/`-` |

**Pattern notes:** Mobile-only counterpart to `TransactionTable`, rendered on the same query props. Whole item is a `<button>` that navigates to `/transactions/:id`. Icon chips mirror the desktop row/`QuickLog` colors (`bg-success/10 text-success`, `bg-err/10 text-err`). Uses the same skeleton/ErrorState/EmptyState trio as the table.

### Transaction filter dialog

File: `frontend/src/features/transaction/components/TransactionFilterDialog.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Dialog content   | `sm:max-w-lg bg-bg`                     |
| Form             | `flex flex-col gap-4`                   |
| Field label      | `text-xs capitalize`                    |
| Text input       | shared `Input` component (`border-neutral-300 rounded-md p-2.5 text-xs`) |
| Select           | `Combobox` primitives with content `bg-bg text-text-pri border border-bor`, item hover `hover:!bg-pri` |
| Buttons          | `Button btnType="secondary"` (Clear) + `btnType="primary"` (Apply), both `w-full` in a `flex gap-4` row |
| Field grid       | `grid grid-cols-1 sm:grid-cols-2 gap-4` for paired fields (date range, amount range) |

**Pattern notes:** React-hook-form + zod resolver (matches `LogTransaction`). Opens from the Filter button on the transactions page; Apply resets to page 1, Clear-all resets to defaults. Combobox reuse matches `InputDropdown` (`bg-bg text-text-pri border border-bor`, `hover:!bg-pri`).

### Transaction summary card

File: `frontend/src/pages/TransactionSummary.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Page container   | `p-4 max-w-2xl mx-auto w-full grid grid-cols-1 gap-4` |
| Back link        | `flex items-center gap-2 text-xs text-text-sec hover:text-pri` |
| Card             | `border border-bor rounded-xl p-4 flex flex-col gap-4` |
| Amount headline  | `text-2xl font-semibold` + `text-success` / `text-err` |
| Icon chip        | `size-12 rounded-full` + `bg-success/10 text-success` / `bg-err/10 text-err` |
| Detail grid      | `grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-bor pt-4` |
| Detail label     | `text-xs text-text-mute capitalize`     |
| Detail value     | `text-sm text-text-pri capitalize`      |
| Action buttons   | `Button btnType="primary"` (Edit) + `bg-err w-full` (Delete) |

**Pattern notes:** Detail-view card, same `rounded-xl` card tokens. Created/updated timestamps shown via `formatDateTime`. Edit reuses `LogTransaction` with the full transaction (same as row edit); Delete reuses the `OutcomeModal` confirm pattern from `TransactionTableRow`.

### QuickLog button (header)

File: `frontend/src/components/QuickLogButton.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Trigger          | `Button btnType="accent"` + `PlusIcon`, label `text-xs`, text hidden `sm:`+ |
| Menu             | `DropdownMenuContent` `bg-bg align="end"` |
| Menu items       | `Button` full-width `hover:bg-black/10!` (income) / `hover:bg-err/10!` (expense), icon `text-success` / `text-err` |

**Pattern notes:** Same dropdown pattern as `TransactionTableRow` actions. Items open `LogTransaction` (income/expense) then the success `OutcomeModal` — identical flow to the Dashboard `QuickLog` card.

### Price breakdown dialog

File: `frontend/src/features/transaction/components/PriceBreakdown.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Dialog content   | `sm:max-w-xl bg-bg`                     |
| Layout           | `flex flex-col gap-4`                   |
| Item row         | `flex items-center gap-2`               |
| Item name input  | shared `Input`, `containerClassName="w-auto flex-1"` |
| Item amount input| shared `Input`, `containerClassName="w-28"` + `inputClassName="text-right"` |
| Remove button    | `text-err p-2 hover:bg-err/10 rounded-md transition-colors` |
| Item list scroll | `flex flex-col gap-2 max-h-[50dvh] overflow-y-auto pr-1` |
| Total row        | `flex items-center justify-between gap-4 border-t border-bor pt-3`, total `text-xl font-medium text-text-pri` |

**Pattern notes:** Draft editor for transaction line items. Amounts use `formatAmount` (`₦`-formatted display string + numeric value) like the main amount field. Save disabled until ≥1 valid row (name non-empty, amount > 0). Seeded from `initialItems` whenever the dialog opens.

### LogTransaction breakdown mode

File: `frontend/src/features/transaction/components/LogTransaction.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Toggle button    | `Button btnType="accent"` + `ListOrderedIcon` (lucide), `text-xs text-nowrap` |
| Amount in mode   | shared `Input` with `readOnly` (component adds `opacity-50`) |
| Mode chip        | `flex items-center justify-between gap-2 flex-wrap`, meta `text-xs text-text-mute` |
| Chip actions     | `Button btnType="accent" text-xs` — Edit (`PenLineIcon`) / Remove (`TrashIcon` + `text-err`) |

**Pattern notes:** "Use Breakdown" reveals the `PriceBreakdown` dialog; saving it computes the total, sets `amount` (`formatAmount`), and makes the amount input read-only. Remove clears the breakdown and returns to manual amount entry. Edit prefill loads `transaction.breakdowns` and re-enables the mode.

### Transaction breakdown card (summary)

File: `frontend/src/pages/TransactionSummary.tsx`
Last updated: 2026-08-15

| Property         | Class                                   |
| ---------------- | --------------------------------------- |
| Card             | `border border-bor rounded-xl p-4 flex flex-col gap-3` |
| Heading          | `h3` `font-medium text-text-pri`        |
| Item row         | `flex items-center justify-between gap-4 text-sm`; name `text-text-pri capitalize`, amount `text-text-sec` |
| Total row        | `flex items-center justify-between gap-4 text-sm border-t border-bor pt-3`; total `font-semibold` + `text-success`/`text-err` |

**Pattern notes:** Rendered below the detail card only when `breakdowns.length > 0`. Total reuses the signed amount styling from the card headline, matching the transaction amount.

