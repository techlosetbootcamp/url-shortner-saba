"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import EditUrlModal from '@/components/updateUrl/UpdateUrl';

import Link from 'next/link';
import toast from "react-hot-toast";
import clock from "@/app/assets/images/clock.svg"
import chart from "@/app/assets/images/chart-simple.svg"
import cog from "@/app/assets/images/cog.svg"
import filter from "@/app/assets/images/filter.svg"
import add from "@/app/assets/images/plus-circle.svg"

import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";

import CardView from "@/components/cardView/CardView"
import URLTable from "@/components/customTable/CustomTable"
import Header from '@/components/hero/Hero';


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
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const handleExpand = (id:any) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
    }} className="min-h-screen bg-[#0B101B]  text-white overflow-hidden">
      









      {/* <header className="flex items-center justify-between w-full h-[185px] pb-[81px] pt-[44px] pl-[52px] pr-[55px]">
  <h1 className="xs:hidden pb-[2px] mr-[20px] bg-gradient-to-r from-pink-500 to-blue-600 text-gradient bg-clip-text text-transparent font-extrabold text-4xl">
    Linkly
  </h1>

  <div className="flex-1 flex flex-col items-center justify-center mt-[60px]">
    <div className="relative w-full max-w-[1100px]">
      <input
        type="text"
        placeholder="Enter the link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full h-[76px] pl-4 pr-[190px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
      />

      <button
        onClick={handleSubmit}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[16px] rounded-[48px] shadow-[10px_9px_22px_0px_#144EE361] bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px] block xs:hidden"
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten Now!'}
      </button>

      <Image
        onClick={handleSubmit}
        src={short}
        alt="Alternate Image"
        className="absolute right-0 top-0 bottom-0 w-[60px] h-[60px] mt-2 mr-2 rounded-[48px] hidden xs:block"
      />
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
      <h1 className="pb-1 ml-2 items-center">Auto Paste from Clipboard</h1>
    </div>
  </div>

  <div className="xs:hidden lm:hidden">
    <ProfileButton />
  </div>
</header> */}





<Header url={url} setUrl={setUrl} handleSubmit={handleSubmit} loading={loading} />

<div className="sticky w-full max-w-full justify-center h-[112px] top-[180px] p-[21px_25.19px_21px_25px] bg-[#181E29]">
  <div className="flex  sm:flex-row justify-center items-center w-full gap-4 sm:gap-[64px] mt-[20px]">
    <div className="flex items-center gap-2 text-white cursor-pointer">
      <Image src={clock} alt="clock" />
      <span>History</span>
    </div>
    <div className="flex items-center gap-2 text-white cursor-pointer">
      <Image src={chart} alt="chart" />
      <span>Statistics</span>
    </div>
    <div className="flex items-center gap-2 text-white cursor-pointer">
      <Image src={cog} alt="cog" />
      <span>Settings</span>
    </div>
  </div>
</div>




      <main className="container mx-auto   ">


          <div className="flex justify-between items-center w-full py-4  my-[27px] h-[76px]"> 
  <h1 className="text-white font-bold text-xl">History (143)</h1>
  <div className="flex gap-4">
    <button className="flex items-center xs:pr-[25px] gap-2 px-4 py-2 bg-[#181E29] text-[#C9CED6] text-[15px] font-bold border border-solid border-[#353C4A] rounded-[48px]">
    <Image className="" src={add} alt='add' />
    <Link href="/customSlug">
    
      Add    </Link>
    </button>
    <button className="flex items-center xs:pr-[25px] gap-2 px-4 py-2 bg-[#181E29] text-[#C9CED6] text-[15px] border border-solid border-[#353C4A] font-bold rounded-[48px]">
    <Image src={filter} alt='filter'/> 
    
      Filter
    </button>
  </div>
</div>





{/* table */}

<div className="w-full mt-10 ">
 


  <URLTable
          urls={urls}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteUrl}
          onEdit={handleEditUrl}
          onCopy={handleCopyToClipboard}
        
        />

  

  <CardView
          urls={urls}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteUrl}
          onEdit={handleEditUrl}
          onCopy={handleCopyToClipboard}
          expandedRows={expandedRows}
          onExpand={(id) => setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))}
        />

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
