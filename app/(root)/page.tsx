"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import LogoutButton from '../../components/LogoutButton';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import active from "@/app/assets/images/Active.svg";
import inactive from "@/app/assets/images/Inactive.svg";
import Image from 'next/image';
import { format } from 'date-fns';


type UrlData = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  status: string;
 // Add status field
};

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login status

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/getUrl');
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (urls.length >= 5 && !isLoggedIn) {
      setError('You have reached the limit of 5 links. Please log in to create more.');
      return;
    }

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

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <title>Linkly</title>

        <header className="pl-[52px] pr-[55px] pt-[40px] flex justify-between items-center">
          <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
            Linkly
          </h2>
          <div>
            {/* <LogoutButton /> */}
            <button className="bg-[#144EE3] w-[178px] text-[16px] h-[60px] py-[21px] px-[25.05px] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]">
              <Link href="/register">Register Now</Link>
            </button>
          </div>
          <button className="bg-[#144EE3] w-[178px] text-[16px] h-[60px] py-[21px] px-[25.05px] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]">
              <Link href="/login">login</Link>
            </button>
        </header>

        <main className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-4xl text-[60px] py-6 px-8 font-extrabold bg-gradient-to-r from-[#144EE3] via-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-6">
            Shorten Your Loooong Links :)
          </h2>
          <p className="text-center text-[#C9CED6] mb-8 text-[16px] font-light">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your<br />
            online experience.
          </p>
          <div className="relative flex items-center xl:w-[659px] w-2/3 mb-6">
            <input
              type="text"
              placeholder="Enter the link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
            />
            <button
              onClick={handleSubmit}
              className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px]"
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten Now!'}
            </button>
          </div>
          {error && (
            <div className="mt-4">
              <p className="text-red-500">Error: {error}</p>
            </div>
          )}

          <div className="text-[#C9CED6] flex flex-row items-center mt-[32px] ">
            <h1>Auto Paste from Clipboard</h1>
          </div>
          <div className="text-[#C9CED6] mt-[25px] text-center mx-[59px] ">
            You can create <span className="text-[#EB568E]">05</span> more links.
            <br className="sm:hidden" />
            <b className="underline">Register Now</b> to enjoy Unlimited usage
          </div>
          <div className="overflow-x-auto w-full px-6">
            <table className="min-w-full bg-gray-800 text-left text-sm">
              <thead>
                <tr>
                  <th className="p-4">Short Link</th>
                  <th className="p-4">Original Link</th>
                  <th className="p-4">QR Code</th>
                  <th className="p-4">Clicks</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((urlRecord) => (
                  <tr key={urlRecord.id} className="bg-gray-900">
                    <td className="p-4 text-white">{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</td>
                    <td className="p-4 text-white">{urlRecord.originalUrl}</td>
                    <td className="p-4 text-white">
                      <QRCode value={urlRecord.originalUrl} size={64} />
                    </td>
                    <td className="p-4">{urlRecord.visitCount}</td>
                    <td className="p-4">
                      <div
                        onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
                        className={`flex items-center ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
                      >
                        {urlRecord.status === 'active' ? (
                          <>
                            Active <Image src={active} alt="active" />
                          </>
                        ) : (
                          <>
                            Inactive <Image src={inactive} alt="inactive" />
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
  {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
