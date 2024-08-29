import { useUrlStatus } from "@/src/hooks/useUrlStatus";
import useLoading from "@/src/hooks/useLoading";
import toast from "react-hot-toast";
import { useUrls, useShortenUrl } from "@/src/hooks/useUrls";
import { useCallback } from "react";

export function useUrlActions(url: string, resetUrl: () => void) {
  const { urls, fetchUrls } = useUrls();
  const shortenUrl = useShortenUrl();
  const { changeStatus } = useUrlStatus();
  const { startLoading, stopLoading } = useLoading();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!url) {
        toast.error("No URL provided");
        return;
      }
      if (urls.some((existingUrl) => existingUrl.originalUrl === url)) {
        toast.error("This URL has already been shortened.");
        return;
      }
      if (urls.length >= 5) {
        toast.error(
          "You have reached the limit of 5 links. Please log in to create more."
        );
        return;
      }
      try {
        startLoading();
        await shortenUrl(url);
        resetUrl();
        fetchUrls();
        stopLoading();
      } catch (error) {
        toast.error("Failed to Shorten yours URL");
      }
    },
    [url, urls, shortenUrl, resetUrl, fetchUrls, startLoading, stopLoading]
  );

  const handleStatusChange = useCallback(
    async (id: string, status: string) => {
      try {
        startLoading();
        await changeStatus(id, status);
        fetchUrls();
        stopLoading();
      } catch (error) {
        toast.error("Failed to update status");
      }
    },
    [changeStatus, fetchUrls, startLoading, stopLoading]
  );

  return {
    handleSubmit,
    handleStatusChange,
  };
}
