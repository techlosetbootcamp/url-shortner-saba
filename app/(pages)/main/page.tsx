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
import Clip from "@/app/assets/images/Clip.svg"
import Link from 'next/link';
import toast from "react-hot-toast";
import clock from "@/app/assets/images/clock.svg"
import chart from "@/app/assets/images/chart-simple.svg"
import cog from "@/app/assets/images/cog.svg"
import filter from "@/app/assets/images/filter.svg"
import add from "@/app/assets/images/plus-circle.svg"
import dat from "@/app/assets/images/Date.svg"
import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";
import copy from "@/app/assets/images/copy.svg"

import OriginalUrlWithFavicon from '@/components/urlFevicon/UrlFevicon';
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


    if (urls.some((existingUrl) => existingUrl.originalUrl === url)) {
      toast.error('This URL has already been shortened.');
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




   // copy data
  // const urlRecord = { shortUrl: 'yourShortUrl' };
  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div style={{
      backgroundImage: `url(${firstImage.src}), url(${secondImage.src})`,
      // animation: 'bg-animation 10s infinite alternate',
    }} className="min-h-screen bg-[#0B101B]  text-white">
      
<header className="flex w-full justify-between items-center pb-[81px] pt-[44px] pl-[52px] pr-[55px]  h-[185px]">
  <h1 className="bg-gradient-to-r from-pink-500 to-blue-600 text-gradient bg-clip-text text-transparent font-extrabold text-4xl">
    Linkly
  </h1>

  <div className="relative flex flex-col items-center w-2/3 pt-[65px]">
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter the link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full lg:w-[1100px] h-[76px] pl-4 pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
      />

      <button
        onClick={handleSubmit}
        className="absolute right-[-20px] top-0 
         text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px]"
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten Now!'}
      </button>
    </div>
    
    <div className="text-[#C9CED6] font-light text-[14px] flex items-center mt-[16px]">
      <Image 
        onClick={() => {
          navigator.clipboard.writeText(url); 
          alert('URL copied to clipboard!');
        }} 
        className="inline ml-1" 
        src={Clip} 
        alt="clip" 
      />  
      <h1 className="pb-1 ml-2">Auto Paste from Clipboard</h1>
    </div>
  </div>

  <ProfileButton />
</header>





<div className="fixed w-[1728px] justify-center h-[112px] top-[180px] p-[21px_25.19px_21px_25px] bg-[#181E29]">
  <div className="flex justify-center mt-[20px] items-center w-full gap-[64px]">
    <div className="flex items-center gap-2 text-white cursor-pointer">
      {/* <span className="icon-history" />  */}
      <Image src={clock} alt='clock'/>
      {/* Replace with the actual icon */}
      <span>History</span>
    </div>
    <div className="flex items-center gap-2 text-white cursor-pointer">
    <Image src={chart} alt='chart'/>
      {/* Replace with the actual icon */}
      <span>Statistics</span>
    </div>
    <div className="flex items-center gap-2 text-white cursor-pointer">
    <Image src={cog} alt='cog'/> {/* Replace with the actual icon */}
      <span>Settings</span>
    </div>
  </div>
</div>
















      <main className="container mx-auto p-6">
        {/* <div className="flex justify-center w-full items-center space-x-4 bg-gray-600 p-4 rounded"></div> */}


        {/* <div className="flex text-center text-[#C9CED6] ">
          <Link href="/customSlug">
            <h1 className="text-[#932970]  mr-[5px]">Generate Custom Slug</h1>
          </Link>
       
        </div> */}

{/*         
        {error && <div className="mt-4 text-red-500">Error: {error}</div>}

        <div className="text-center text-gray-400 mt-8">
          <p>You can create <span className="text-pink-500">05</span> more links.</p>
        </div> */}

        <div className="mt-8">
           <h2 className="text-lg mb-[50px]">History (143)</h2>



          <div className="flex justify-between items-center w-full py-4  my-[27px] h-[76px]"> 
  <h1 className="text-white font-bold text-xl">History (143)</h1>
  <div className="flex gap-4">
    <button className="flex items-center gap-2 px-4 py-2 bg-[#181E29] text-[#C9CED6] text-[15px] font-bold border border-solid border-[#353C4A] rounded-[48px]">
    <Image className="" src={add} alt='add' />
    <Link href="/customSlug">
    
      Add    </Link>
    </button>
    <button className="flex items-center gap-2 px-4 py-2 bg-[#181E29] text-[#C9CED6] text-[15px] border border-solid border-[#353C4A] font-bold rounded-[48px]">
    <Image src={filter} alt='filter'/> 
    
      Filter
    </button>
  </div>
</div>





{/* table */}

          <div className=" bg-dark-600  rounded ">
            <table className="min-w-full text-left text-sm bg-[#0F131A]">
              <thead className="text=[15px] font-bold text-[#C9CED6]">
                <tr>
                  <th className="p-4">Short Link</th>
                  <th className="p-4">Original Link</th>
                  <th className="p-4">QR Code</th>
                  <th className="p-4">Clicks</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date  <Image className='inline ml-[2px]' src={dat} alt='date' /> </th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((urlRecord) => (
                  <tr key={urlRecord.id} className="bg-[#0F131A]   text=[14px] font-light text-[#C9CED6]">




<td className="p-4 ">
                      <span className="">{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</span>
                      <Image
                        className='inline cursor-pointer'
                        onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
                        src={copy}
                        alt='copy'

                      />
                    </td>




                    {/* <td className="p-4 ">{urlRecord.originalUrl}</td> */}
                    <td className=" ">
                      <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
                      {/* <td className=" xl:pl-[72.76px] ">{urlRecord.originalUrl}</td> */}
                    </td>







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
