import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const useGlobalLoading = (): boolean => {
  return useSelector(
    (state: RootState) => state.ui.globalLoading > 0
  );
};
