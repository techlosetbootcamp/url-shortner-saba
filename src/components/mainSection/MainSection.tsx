"use client";
import React from "react";
import { useUrls } from "@/src/hooks/useUrls";
import MainContent from "@/src/components/mainContent/MainContent";
import UrlTable from "@/src/components/urlTable/UrlTable";
import UrlCard from "@/src/components/cardView/CardView";
import { useUrlInput } from "@/src/hooks/useUrlInput";
import { useExpandedRows } from "@/src/hooks/useExpandedRows";
import Loader from "@/src/components/loader/Loader";
import { handleCopyToClipboard } from "@/src/utils/clipboard";
import { useUrlActions } from "./useMainSection";
import useSignOut from "@/src/hooks/useSignOut";
const MainSection: React.FC = () => {
  const { url, handleUrlChange, resetUrl } = useUrlInput();
  const { expandedRows, handleExpand } = useExpandedRows();
  const { urls, loading } = useUrls();
  useSignOut();

  const { handleSubmit, handleStatusChange } = useUrlActions(url, resetUrl);

  return (
    <>
      <MainContent
        url={url}
        setUrl={handleUrlChange}
        handleSubmit={handleSubmit}
        loading={loading}
        remainingLinks={5 - urls?.length}
      />
      <div className="w-full mt-10 px-[154px] lm:px-[40px]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <UrlTable
              urls={urls}
              handleCopyToClipboard={handleCopyToClipboard}
              handleStatusChange={handleStatusChange}
              loading={loading}
            />
            <UrlCard
              urls={urls}
              handleCopyToClipboard={handleCopyToClipboard}
              handleExpand={handleExpand}
              expandedRows={expandedRows}
              handleStatusChange={handleStatusChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MainSection;
