import React, { useState, useEffect } from 'react';

interface EditUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newUrl: string) => void;
  currentUrl: string;
}

const EditUrlModal: React.FC<EditUrlModalProps> = ({ isOpen, onClose, onSubmit, currentUrl }) => {
  const [newUrl, setNewUrl] = useState(currentUrl);

  useEffect(() => {
    if (isOpen) {
      setNewUrl(currentUrl);
    }
  }, [isOpen, currentUrl]);

  const handleSubmit = () => {
    onSubmit(newUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Short URL</h2>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUrlModal;
