// appThunk.ts
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "./store";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
