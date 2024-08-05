"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import toast from "react-hot-toast";
import useSignOut from '@/hooks/useSignOut';


import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";

import Header from '@/components/mainheader/MainHeader';
import MainContent from "@/components/mainContent/MainContent"
import UrlTable from "@/components/urlTable/UrlTable"
import UrlCard from "@/components/urlCard/UrlCard"
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
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const handleExpand = (id:any) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  useSignOut();
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

    if (urls.some((existingUrl) => existingUrl.originalUrl === url)) {
      toast.error('This URL has already been shortened.');
      return;
    }

    if (urls.length >= 5 && !isLoggedIn) {
      toast.error('You have reached the limit of 5 links. Please log in to create more.');
      return;
    }



    setLoading(true);
    setError('');

    try {
      await axios.post('/api/shortUrl', { url });
      toast.success("Url Shorten successfully");
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

  // copy data
  // const urlRecord = { shortUrl: 'yourShortUrl' };
  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };




  // favicon icon


 



  const remainingLinks = Math.max(0, 5 - urls.length);
  return (
    <>
      <div  style={{
            backgroundImage: `url(${firstImage.src}), url(${secondImage.src})`,
        
          }}  className="min-h-screen bg-black text-white ">



     





<Header />



        <main className="flex flex-col items-center justify-center mt-[130px]">

        <MainContent url={url} setUrl={setUrl} handleSubmit={handleSubmit} loading={loading}  remainingLinks={remainingLinks}/>

          {/* table */}
     <div className="w-full mt-10 px-[154px] lm:px-[40px]">



  {/* Table view for medium and larger screens hide on small screens */}
  <UrlTable urls={urls} handleCopyToClipboard={handleCopyToClipboard} handleStatusChange={handleStatusChange} />


  {/* <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full bg-[#181E29] text-left text-sm border-spacing-y-1 border-separate">
      <thead className="text-[15px] font-bold text-[#C9CED6] h-[79px] py-2">
        <tr className="h-[79px]">
          <th className="pl-6 py-6 w-[284px]">Short Link</th>
          <th className=" py-6 w-[477px]">Original Link</th>
          <th className=" py-6 w-[138px]">QR Code</th>
      
          <th className=" py-6 w-[150px] lm:pl-[40px]">Clicks</th>
          <th className=" py-6 w-[220px] lm:pl-[40px]">Status</th>
        

          <th className=" py-6 pr-6 w-[260px] lm:pl-[40px]">
            Date
            <Image className="hidden 2xl:inline ml-1" src={dat} alt="date" />
          </th>
        </tr>
      </thead>
      <tbody className="mt-1">
        {urls.map((urlRecord) => (
          <tr key={urlRecord.id} className="bg-gray-900 xl:h-16 text-[14px] font-light text-[#C9CED6]">
            <td className="pl-6 flex items-center h-22 pt-[16px] pb-[12px]  mr-[60px]">
              <span>{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</span>
              <Image
                className="inline cursor-pointer ml-[10px]"
                onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
                src={copy}
                alt="copy"
              />
            </td>
            <td className=" py-1">
              <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
            </td>
            <td className="">
              <QRCode value={urlRecord.originalUrl} size={50} />
            </td>
            <td className="pl-[30px] ">{urlRecord.visitCount}</td>
            <td className="">
              <div
                onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
                className={`flex items-center ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
              >
                {urlRecord.status === 'active' ? (
                  <>
                    Active <Image src={active} alt="active" className="ml-2.5  " />
                  </>
                ) : (
                  <>
                    Inactive <Image src={inactive} alt="inactive" className="ml-2.5 " />
                  </>
                )}
              </div>
            </td>
            <td className=" py-6   pl-[16px] ">
              {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> */}




  {/* Card view for small screens, hidden on medium and larger screens */}



  
  {/* <div className="block md:hidden overflow-x-auto">
    <h2 className="text-[#C9CED6] text-lg font-bold mb-4 bg-[#181E29] xs:text pt-[16px]  pl-[25px] w-[376] h-[63px] ml-[28px] mr-[26px]">Shorten Links</h2>
    {urls.map((urlRecord) => (
      <div key={urlRecord.id} className="bg-[#181E29]  bg-opacity-25 p-4 mb-4 text-[#C9CED6] rounded-md  ml-[20px] mr-[27px]   py-[14px]   ">
<div className="flex flex-wrap justify-between w-full max-w-md md:max-w-lg lg:max-w-xl items-center p-2 bg-dark-800 rounded-lg">
 
  <div className="flex items-center space-x-2 flex-1 overflow-hidden">
 
    <div className="w-full sm:w-[calc(100%-150px)] max-w-xs overflow-hidden text-[14px] text-white truncate">
      {`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}
    </div>

  
    <Image
      className="inline cursor-pointer "
      onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
      src={copy}
      alt="copy"
    />
  </div>


  <div className="flex items-center mt-2 sm:mt-0 ml-[80px]">
    <Image
      onClick={() => handleExpand(urlRecord.id)}
      src={show}
      alt="toggle details"
      className="cursor-pointer ml-0 sm:ml-4"  
    />
  </div>
</div>

{expandedRows[urlRecord.id] && (
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="mb-2">
      <strong>Original Link:</strong> <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
    </div>
    <div className="mb-2">
      <strong>QR Code:</strong> <QRCode value={urlRecord.originalUrl} size={50} />
    </div>
    <div className="mb-2">
      <strong>Clicks:</strong> {urlRecord.visitCount}
    </div>
    <div className="mb-2">
      <strong>Status:</strong>
      <div
        onClick={() => handleStatusChange(urlRecord.shortUrl, urlRecord.status === 'active' ? 'inactive' : 'active')}
        className={`flex items-center ${urlRecord.status === 'active' ? 'text-green-500' : 'text-yellow-600'}`}
      >
        {urlRecord.status === 'active' ? (
          <>
            Active <Image src={active} alt="active" className="ml-2.5" />
          </>
        ) : (
          <>
            Inactive <Image src={inactive} alt="inactive" className="ml-2.5" />
          </>
        )}
      </div>
    </div>
    <div className="mb-2">
      <strong>Date:</strong> {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
    </div>
  </div>
)}

      </div>
    ))}


    
  </div> */}








          <UrlCard
          
       urls={urls}
            handleCopyToClipboard={handleCopyToClipboard}
            handleStatusChange={handleStatusChange}
            handleExpand={handleExpand}
            expandedRows={expandedRows}
          />
      



  
</div>






        </main>
      </div>
    </>
  );
}













