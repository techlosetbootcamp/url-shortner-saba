import { useDispatch, useSelector } from "react-redux";
import { fetchUrls, shortUrl } from "../redux/slices/urlSlice";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";

export const useUrls = () => {
  const dispatch: AppDispatch = useDispatch();
  const { urls, loading, error } = useSelector(
    (state: RootState) => state.urls
  );

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  return { urls, loading, error, fetchUrls: () => dispatch(fetchUrls()) };
};

export const useShortenUrl = () => {
  const dispatch: AppDispatch = useDispatch();
  return (url: string) => {
    return dispatch(shortUrl(url));
  };
};
