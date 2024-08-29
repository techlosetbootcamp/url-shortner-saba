import { useState } from "react";
export const useEditModal = () => {
  const [editingShortUrl, setEditingShortUrl] = useState<string | null>(null);
  const [newShortUrl, setNewShortUrl] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openModal = (shortUrl: string) => {
    setEditingShortUrl(shortUrl);
    setNewShortUrl(shortUrl);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setEditingShortUrl(null);
    setNewShortUrl("");
    setIsEditModalOpen(false);
  };

  return {
    editingShortUrl,
    newShortUrl,
    isEditModalOpen,
    openModal,
    closeModal,
    setNewShortUrl,
  };
};
