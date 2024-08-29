import { useCallback } from "react";
import toast from "react-hot-toast";
import { useFetchUrls } from "@/src/hooks/useFetchUrls";
import { useUrlStatus } from "@/src/hooks/useUrlStatus";
import { useShortenUrl } from "@/src/hooks/useUrls";
import { useEditModal } from "@/src/hooks/useEditModal";
import { useUser } from "@/src/hooks/useUser";
import useLoading from "@/src/hooks/useLoading";

export const useUrlActions = (url: string, resetUrl: () => void) => {
  const { urls, fetchUrls } = useFetchUrls();
  const shortenUrl = useShortenUrl();
  const { changeStatus } = useUrlStatus();
  const { removeUrl, editShortUrl } = useUser();
  const {
    openModal,
    closeModal,
    isEditModalOpen,
    newShortUrl,
    setNewShortUrl,
    editingShortUrl,
  } = useEditModal();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!url) {
        toast.error("No URL provided");
        return;
      }

      if (urls.some((existingUrl) => existingUrl?.originalUrl === url)) {
        toast.error("This URL has already been shortened.");
        return;
      }

      try {
        startLoading();
        await shortenUrl(url);
        resetUrl();
        fetchUrls();
        stopLoading();
      } catch (error) {
        toast.error("Error from API");
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

  const handleDeleteUrl = useCallback(
    async (id: string) => {
      try {
        startLoading();
        await removeUrl(id);
        fetchUrls();
        stopLoading();
        toast.success("URL Deleted Successfully")
      } catch (error) {
        toast.error("Failed to Delete URL");
      }
    },
    [removeUrl, fetchUrls, startLoading, stopLoading]
  );

  const handleUpdateUrl = useCallback(
    async (newUrl: string) => {
      if (!editingShortUrl || !newUrl) return;

      try {
        startLoading();
        await editShortUrl(editingShortUrl, newUrl);
        closeModal();
        fetchUrls();
        stopLoading();
        toast.success("URL Updated Successfully")
      } catch (error) {
        toast.error("Failed to updating URL");
      }
    },
    [
      editingShortUrl,
      editShortUrl,
      closeModal,
      fetchUrls,
      startLoading,
      stopLoading,
    ]
  );

  return {
    urls,
    handleSubmit,
    handleStatusChange,
    handleDeleteUrl,
    handleUpdateUrl,
    isLoading,
    isEditModalOpen,
    openModal,
    closeModal,
    newShortUrl,
    setNewShortUrl,
  };
};
