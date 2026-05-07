import { InfoIcon } from "lucide-react";

export default function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <div className="border w-full border-destructive flex items-center justify-start p-2 rounded-sm bg-error/10 gap-2">
      <InfoIcon className="size-4 text-destructive" />
      <p className="text-destructive text-sm">{error}</p>
    </div>
  );
}
