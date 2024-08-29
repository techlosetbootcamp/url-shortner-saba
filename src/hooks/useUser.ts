import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import {
  fetchUrls,
  deleteUrl,
  updateShortUrl,
} from "../redux/slices/userSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useEffect } from "react";
export const useUser = () => {
  const dispatch = useAppDispatch();
  const urls = useSelector((state: RootState) => state.urls.urls);
  const loading = useSelector((state: RootState) => state.urls.loading);
  const error = useSelector((state: RootState) => state.urls.error);

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  const removeUrl = async (id: string) => {
    await dispatch(deleteUrl(id));
  };

  const editShortUrl = async (oldShortUrl: string, newShortUrl: string) => {
    await dispatch(updateShortUrl({ oldShortUrl, newShortUrl }));
  };

  return {
    urls,
    loading,
    error,
    fetchAllUrls: () => dispatch(fetchUrls()),
    removeUrl,
    editShortUrl,
  };
};
