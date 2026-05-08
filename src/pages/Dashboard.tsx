import { StatusCard } from "@/components";

export default function Dashboard() {
  return (
    <main className="h-[200vh] w-full p-4">
      <div className="w-full grid grid-cols-4 gap-4">
        <StatusCard type="balance" />
        <StatusCard type="income" />
        <StatusCard type="expense" />
      </div>
      <h1 className="text-lg">plan</h1>
      <ul>
        <li>chart showing income and expense for a certain duration</li>
        <li>upcoming subscriptions</li>
        <li>table of income and expense very short history</li>
      </ul>
    </main>
  );
}
