import toast from "react-hot-toast";
export const handleCopyToClipboard = (url: string) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("URL copied to clipboard!");
    })
    .catch((err) => {
      toast.error("Failed to copy: ", err);
    });
};
