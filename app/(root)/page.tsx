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
import toast from "react-hot-toast";
import useSignOut from '@/hooks/useSignOut';
import copy from "@/app/assets/images/copy.svg"
import link from "@/app/assets/images/link.svg"
import sign from "@/app/assets/images/sign-in.svg"
import Clip from "@/app/assets/images/Clip.svg"
import ques from "@/app/assets/images/question-circle.svg"
import OriginalUrlWithFavicon from '@/components/urlFevicon/UrlFevicon';
import dat from "@/app/assets/images/Date.svg"
import firstImage from "@/app/assets/images/Cubes.svg";
import secondImage from "@/app/assets/images/Swirl.svg";
import show from "@/app/assets/images/chevron-down.svg"
import short from "@/app/assets/images/ShortenBtn.svg"
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
            // animation: 'bg-animation 10s infinite alternate',
          }}  className="min-h-screen bg-black text-white ">
        <title>Linkly</title>

        <header className="pl-[52px] xs:px-[25px] pr-[55px] pt-[40px] flex justify-between items-center">
          <h2 className="bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-gradient bg-clip-text text-transparent font-extrabold text-[36.91px] leading-[45.44px] text-center">
            Linkly
          </h2>
          <div>
            {/* <LogoutButton /> */}
            <button className="w-[123.19px] xs:h-[45px]  xs:py-[13px] h-[60px] text-[#FFFFFF] mr-5  xs:mr-[0px] px-[25.19px] py-[21px] font-semibold text-[16px]  rounded-[48px] border border-solid border-[#353C4A] bg-[#181E29]  shadow-[0_4px_10px_0px_rgba(0,0,0,0.1a)]">
              <Link href="/login">Login</Link><Image className='inline ml-1' src={sign} alt='login' />
            </button>

            <button className="bg-[#144EE3]   xs:hidden w-[178px] text-[#FFFFFF] font-semibold text-[16px] h-[60px] py-[21px] px-[25.05px] border border-solid border-[#144EE3] shadow-[10px_9px_22px_0px_#144EE361] rounded-[48px]">
              <Link href="/register">Register Now</Link>
            </button>   </div>
        </header>

        <main className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-4xl xs:text-[35px] text-[60px] py-6 px-8 font-extrabold bg-gradient-to-r from-[#144EE3]  via-[#EB568E] to-[#144EE3] text-transparent bg-clip-text text-center mb-6   ">
            Shorten Your Loooong Links :)
          </h2>
          <p className="text-center text-[#C9CED6] mb-8 text-[16px] font-light xs:w-[358px]">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your<br />
            online experience.
          </p>


          <div className="relative flex items-center xl:w-[659px] ">
            <Image
              src={link}
              alt='link'
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            <input
              type="text"
              placeholder="Enter the link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-[659px]  h-[76px] xs:h-[64px]  xs:w-[378px]  pl-[3rem] pr-[178px] rounded-[48px] border-4 border-[#353C4A] bg-[#181E29] focus:outline-none focus:border-purple-400 text-white"
            />



<button
        onClick={handleSubmit}
        className="absolute right-0 top-0 bottom-0 text-[16px] rounded-[48px] mt-2 shadow-[10px_9px_22px_0px_#144EE361] mr-2 bg-[#144EE3] w-[178px] h-[60px] px-[25.05px] py-[21px]  block xs:hidden "
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten Now!'}
      </button>
      <Image
        src={short}
        alt="Alternate Image"
        className="absolute right-0 top-0 bottom-0 w-[60px] h-[60px] mt-2 mr-2 rounded-[48px]     hidden xs:block"
      />








          </div>
          {/* {error && (
            <div className="mt-4">
              <p className="text-red-500">Error: {error}</p>
            </div>
          )} */}

          <div className="text-[#C9CED6] font-light text-[14px] flex flex-row items-center mt-[32px] ">
            <Image onClick={() => {
              navigator.clipboard.writeText(url); alert('URL copied to clipboard!');
            }} className='inline ml-1' src={Clip} alt='clip' />  <h1 className='pb-1'>Auto Paste from Clipboard</h1>
          </div>


          <div className="text-[#C9CED6] mt-[25px] font-light text-[14px] text-center mx-[59px]">
            You can create <span className="text-[#EB568E]  text-[14px] font-bold">0{remainingLinks}</span> more links.
            <br className="sm:hidden" />
            Register Now to enjoy Unlimited usage <Image className='inline ml-[6px]' src={ques} alt='ques' />

          </div>



          {/* table */}
     <div className="w-full mt-10 lg:px-40">
  {/* Table view for medium and larger screens hide on small screens */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full bg-[#181E29] text-left text-sm border-spacing-y-1 border-separate">
      <thead className="text-[15px] font-bold text-[#C9CED6] h-[79px] py-2">
        <tr className="h-[79px]">
          <th className="pl-6 py-6 w-[284px]">Short Link</th>
          <th className=" py-6 w-[477px]">Original Link</th>
          <th className=" py-6 w-[138px]">QR Code</th>
          {/* <th className="pl-18 py-6 w-[131px]">Clicks</th> */}
          <th className=" py-6 w-[150px] lm:pl-[40px]">Clicks</th>
          <th className=" py-6 w-[220px] lm:pl-[40px]">Status</th>
          {/* <th className="pl-18 py-6 w-[188px]">Status</th> */}
          {/* <th className="pl-18 py-6 pr-6 w-[204px]"> */}


          <th className=" py-6 pr-6 w-[260px] lm:pl-[40px]">
            Date
            <Image className="hidden 2xl:inline ml-1" src={dat} alt="date" />
          </th>


          
        </tr>
      </thead>
      <tbody className="mt-1">
        {urls.map((urlRecord) => (
          <tr key={urlRecord.id} className="bg-gray-900 xl:h-16 text-[14px] font-light text-[#C9CED6]">
            <td className="xl:pl-6 flex items-center h-22 pt-[16px] pb-[12px]  mr-[60px]">
              <span>{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</span>
              <Image
                className="inline cursor-pointer ml-[10px]"
                onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
                src={copy}
                alt="copy"
              />
            </td>
            <td className="xl:pl-18 py-1">
              <OriginalUrlWithFavicon url={urlRecord.originalUrl} />
            </td>
            <td className="xl:pl-18">
              <QRCode value={urlRecord.originalUrl} size={50} />
            </td>
            <td className="xl:pl-18 pl-[30px] ">{urlRecord.visitCount}</td>
            <td className="xl:pl-18">
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
            <td className="xl:pl-18 py-6   pl-[16px] ">
              {format(new Date(urlRecord.createdAt), "MMM - dd -yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Card view for small screens, hidden on medium and larger screens */}
  <div className="block md:hidden overflow-x-auto">
    <h2 className="text-[#C9CED6] text-lg font-bold mb-4 bg-[#181E29] xs:text pt-[16px]  pl-[25px] w-[376] h-[63px] ml-[28px] mr-[26px]">Shorten Links</h2>
    {urls.map((urlRecord) => (
      <div key={urlRecord.id} className="bg-[#181E29] bg-opacity-25 p-4 mb-4 text-[#C9CED6] rounded-md  ml-[20px] mr-[27px]  w-[217px] py-[14px]   ">
        <div className="flex justify-between items-center">
          <span>{`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`}</span>
          <Image
            className="inline cursor-pointer ml-2"
            onClick={() => handleCopyToClipboard(`http://localhost:3000/api/redirect/${urlRecord.shortUrl}`)}
            src={copy}
            alt="copy"
          />
          <Image
            onClick={() => handleExpand(urlRecord.id)}
            src={show}
            alt="toggle details"
            className="cursor-pointer  mr-[20px]"
          />
        </div>
        {expandedRows[urlRecord.id] && (
          <div className="mt-4">
            <div className="mb-2 ">
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
  </div>
</div>




        </main>
      </div>
    </>
  );
}







// src/pages/HomePage.tsx





