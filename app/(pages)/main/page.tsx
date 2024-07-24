"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";
import edit from "@/app/assets/images/edit.svg";
import del from "@/app/assets/images/delete.svg";
import QRCode from 'react-qr-code';
import EditUrlModal from '@/components/updateUrl/UpdateUrl';
import { format } from 'date-fns';
import ProfileButton from "@/components/profileButton/ProfileButton"
type UrlData = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingShortUrl, setEditingShortUrl] = useState<string | null>(null);
  const [newShortUrl, setNewShortUrl] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/loggedUrl');
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/shortUrl', { url });
      setUrl('');
      fetchUrls();
    } catch (err: any) {
      console.error('Error from API:', err);
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.patch('/api/urlStatus', { shortUrl: id, status });
      fetchUrls();
    } catch (error) {
      console.error('Error updating URL status:', error);
    }
  };

  const handleDeleteUrl = async (id: string) => {
    try {
      await axios.delete('/api/deleteUrl', { data: { shortUrl: id } });
      fetchUrls();
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  const handleEditUrl = (shortUrl: string) => {
    setEditingShortUrl(shortUrl);
    setNewShortUrl(shortUrl);
    setIsEditModalOpen(true);
  };

  const handleUpdateUrl = async (newUrl: string) => {
    if (!editingShortUrl || !newUrl) return;

    try {
      await axios.patch('/api/updateUrl', { oldShortUrl: editingShortUrl, newShortUrl: newUrl });
      setEditingShortUrl(null);
      setNewShortUrl('');
      fetchUrls();
    } catch (error: any) {
      console.error('Error updating short URL:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to update the short URL');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <title>Linkly</title>

      <header className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="bg-gradient-to-r from-pink-500 to-blue-600 text-gradient bg-clip-text text-transparent font-extrabold text-4xl">
          Linkly
        </h1>

        <div className="relative flex items-center w-2/3 mb-6">
          <input
            type="text"
            placeholder="Enter the link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full lg:w-[1100px] h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px]"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten Now!'}
          </button>
        </div>


<ProfileButton/>

        {/* <div className="flex items-center space-x-4">
          <span>Welcome Mohammed</span>
          <div className="relative">
            <button className="bg-blue-600 rounded-full p-2">2</button>
          </div>
        </div> */}


















      </header>

      <main className="container mx-auto p-6">
        <div className="flex justify-center items-center space-x-4 bg-gray-600 p-4 rounded"></div>

        {error && <div className="mt-4 text-red-500">Error: {error}</div>}

        <div className="text-center text-gray-400 mt-8">
          <p>You can create <span className="text-pink-500">05</span> more links.</p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg mb-4">History (143)</h2>
          <div className="overflow-x-auto bg-dark-600 p-4 rounded">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-dark-500">
                <tr>
                  <th className="p-4">Short Link</th>
                  <th className="p-4">Original Link</th>
                  <th className="p-4">QR Code</th>
                  <th className="p-4">Clicks</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((urlRecord) => (
                  <tr key={urlRecord.id} className="bg-dark-700">
                    <td className="p-4 text-blue-600">{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</td>
                    <td className="p-4 text-blue-600">{urlRecord.originalUrl}</td>
                    <td className="p-4">
                      <QRCode value={urlRecord.originalUrl} size={64} />
                    </td>
                    <td className="p-4">{urlRecord.visitCount}</td>
                    <td className="p-4">
                      <div
                        onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
                        className={`flex items-center cursor-pointer ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-500'}`}
                      >
                        {urlRecord.status === 'active' ? (
                          <>
                            Active <Image src={active} alt="active" className="ml-2" />
                          </>
                        ) : (
                          <>
                            Inactive <Image src={inactive} alt="inactive" className="ml-2" />
                          </>
                        )}
                      </div>
                    </td>
                    {/* <td className="p-4">{new Date(urlRecord.createdAt).toLocaleDateString()}</td> */}
                    <td className="p-2">
  {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
</td>
                    <td className="p-4 flex space-x-2">
                      <Image
                        src={edit}
                        alt="edit"
                        onClick={() => handleEditUrl(urlRecord.shortUrl)}
                        style={{ cursor: 'pointer' }}
                      />
                      <Image src={del} onClick={() => handleDeleteUrl(urlRecord.shortUrl)} style={{ cursor: 'pointer' }} alt="delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <EditUrlModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateUrl}
        currentUrl={newShortUrl}
      />
    </div>
  );
}
