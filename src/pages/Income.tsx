import { Log } from "@/components";

export default function Income() {
  return (
    <div className="p-4">
      <div className="w-full max-w-[450px] border border-bor  rounded-xl p-4 flex flex-col gap-4">
        <Log />
      </div>
      Income
      <h1>plan</h1>
      <ul>
        <li>Balance left</li>
        <li>total income this week</li>
        <li>quick log form for income</li>
        <li>chart showing income</li>
        <li>table of income</li>
      </ul>
    </div>
  );
}
