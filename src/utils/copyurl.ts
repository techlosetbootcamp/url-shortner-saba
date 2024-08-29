import toast from "react-hot-toast";
import IMAGES from "@/src/constants/constants";

export const copyToClipboard = (
  e: React.MouseEvent<HTMLImageElement>,
  url: string
) => {
  const imgElement = e.currentTarget as HTMLImageElement;
  imgElement.src = imgElement.src.includes(IMAGES.clip.src)
    ? IMAGES.toggleLeft.src
    : IMAGES.clip.src;
  navigator.clipboard.writeText(url);
  toast.success("URL copied to clipboard!");
};
