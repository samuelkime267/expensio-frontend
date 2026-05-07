import { cn } from "@/lib/utils";

type UserProfileImgProps = {
  name: string | null;
  profilePicture?: string | null;
  className?: string;
};

export default function UserProfileImg({
  name,
  profilePicture,
  className,
}: UserProfileImgProps) {
  return (
    <div
      className={cn(
        "bg-pri size-10 rounded-full flex items-center justify-center text-bg text-lg font-medium",
        className,
      )}
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={`${name} profile picture`}
          className="size-full rounded-full"
        />
      ) : (
        (name || "").at(0)?.toUpperCase()
      )}
    </div>
  );
}
