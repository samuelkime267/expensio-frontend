import { toast } from "sonner";

export default function copyText(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Text copied to clipboard");
    })
    .catch((err) => {
      toast.error("Failed to copy text");
      console.log("Error copying text: ", err);
    });
}
