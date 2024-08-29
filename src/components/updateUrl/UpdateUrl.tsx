import React from "react";
import useEditUrl from "./useEditUrl";
import { EditUrlModalProps } from "@/src/types/types";

const EditUrlModal: React.FC<EditUrlModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUrl,
}) => {
  const { newUrl, setNewUrl } = useEditUrl(isOpen, currentUrl);

  const handleSubmit = () => {
    onSubmit(newUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background bg-opacity-50">
      <div className="bg-darkGrey rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Short URL</h2>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="w-full p-2 mb-4 border text-black border-inputBorder rounded"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-boxBackground text-primary rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradBlue shadow-custom text-primary rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUrlModal;
