import { useDispatch, useSelector } from "react-redux";
import { _selectorApplicationLoading } from "store/application/helpers";
import { useCallback } from "react";
import { actionResetLoading, actionSetLoading } from "store/application/action";

export const useLoading = () => {

  const dispatch = useDispatch();
  const loading = useSelector(_selectorApplicationLoading);

  const setLoading = useCallback(() => {
    dispatch(actionSetLoading());
  }, [dispatch]);

  const resetLoading = useCallback(() => {
    dispatch(actionResetLoading());
  }, [dispatch]);

  return {
    loading,
    setLoading,
    resetLoading
  };
};
  
