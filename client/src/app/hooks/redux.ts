import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, AppStore, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
