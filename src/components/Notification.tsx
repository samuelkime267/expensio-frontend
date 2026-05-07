import { FaBell } from "react-icons/fa";
import Button from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Notification() {
  const [isNotification] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-bor p-3 rounded-full relative">
          <FaBell className="size-4" />

          {isNotification && (
            <div className="absolute top-0 right-0 size-2.5 rounded-full bg-red-600"></div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-bg">
        <DropdownMenuGroup className="p-2 text-sm">
          No Notification.
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
