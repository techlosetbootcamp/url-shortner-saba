import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUrls } from "../redux/slices/loggedSlice";

export const useFetchUrls = () => {
  const dispatch: AppDispatch = useDispatch();
  const { urls, loading, error } = useSelector(
    (state: RootState) => state.urls
  );

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  return { urls, loading, error, fetchUrls: () => dispatch(fetchUrls()) };
};
