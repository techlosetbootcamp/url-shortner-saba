import UrlShortner from "@/src/components/userUrlForm/UserUrlForm";
import IMAGES from "@/src/constants/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortner App",
  description: "Shorten Yours Long Links.",
  icons: {
    icon: `${process.env.NEXTAUTH_URL}/assets/images/Linkly.svg`,
  },
};

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.cube.src}), url(${IMAGES.swirl.src})`,
      }}
      className="min-h-screen bg-boxBackground text-primary overflow-hidden"
    >
      <UrlShortner />
    </div>
  );
}
