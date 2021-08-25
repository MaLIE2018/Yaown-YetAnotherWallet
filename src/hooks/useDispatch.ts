import { useDispatch as _useDispatch } from "react-redux";
import { StoreEvents } from "store/types/types";

export function useDispatch() {
  const dispatch = _useDispatch();
  return (action: StoreEvents) => {
    dispatch(action);
  };
}
