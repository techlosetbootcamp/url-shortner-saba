"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import EditUrlModal from "@/src/components/updateUrl/UpdateUrl";
import CardView from "@/src/components/cardView/CardView";
import URLTable from "@/src/components/urlTable/UrlTable";
import Header from "@/src/components/hero/Hero";
import Analytics from "@/src/components/analytics/Analytics";
import { useExpandedRows } from "@/src/hooks/useExpandedRows";
import { useUrlInput } from "@/src/hooks/useUrlInput";
import Loader from "@/src/components/loader/Loader";
import { handleCopyToClipboard } from "@/src/utils/clipboard";
import { useUrlActions } from "./useUserUrlForm";
import IMAGES from "@/src/constants/constants";
export default function UrlForm() {
  const { url, handleUrlChange, resetUrl } = useUrlInput();
  const { expandedRows, handleExpand } = useExpandedRows();
  const {
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
  } = useUrlActions(url, resetUrl);

  return (
    <>
      <Header
        url={url}
        setUrl={handleUrlChange}
        handleSubmit={handleSubmit}
        loading={isLoading}
      />
      <Analytics />
      <main className="container mx-auto">
        <div className="flex justify-between items-center w-full py-4 my-[27px] h-[76px] pl-[67px] pr-[93px]">
          <h1 className="text-secondaryText font-bold text-xl">History</h1>
          <div className="flex gap-4">
            <button className="flex items-center xs:pr-[25px] gap-2 px-4 py-2 bg-inputBackground text-secondaryText text-[15px] font-bold border border-solid border-inputBorder rounded-[48px]">
              <Image className="" src={IMAGES.add} alt="add" />
              <Link href="/customSlug">Add</Link>
            </button>
            <button className="flex items-center xs:pr-[25px] gap-2 px-4 py-2 bg-inputBackground text-secondaryText text-[15px] border border-solid border-inputBorder font-bold rounded-[48px]">
              <Image src={IMAGES.filter} alt="filter" />
              Filter
            </button>
          </div>
        </div>
        <div className="w-full mt-10">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <URLTable
                urls={urls}
                handleStatusChange={handleStatusChange}
                onDelete={handleDeleteUrl}
                onEdit={openModal}
                handleCopyToClipboard={handleCopyToClipboard}
                loading={isLoading}
              />
              <CardView
                urls={urls}
                handleStatusChange={handleStatusChange}
                onDelete={handleDeleteUrl}
                onEdit={openModal}
                handleCopyToClipboard={handleCopyToClipboard}
                expandedRows={expandedRows}
                handleExpand={handleExpand}
              />
            </>
          )}
        </div>
      </main>
      <EditUrlModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        onSubmit={handleUpdateUrl}
        currentUrl={newShortUrl}
      />
    </>
  );
}
