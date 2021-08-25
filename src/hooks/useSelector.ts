import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { IRootState } from "store/types/types";

const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;

export default useSelector;
