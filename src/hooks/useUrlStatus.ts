import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import {
  updateUrlStatus,
  selectUrlStatus,
} from "@/src/redux/slices/urlStatusSlice";

export const useUrlStatus = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector(selectUrlStatus);

  const changeStatus = async (id: string, status: string) => {
    await dispatch(updateUrlStatus({ id, status })).unwrap();
  };

  return {
    loading,
    error,
    changeStatus,
  };
};
