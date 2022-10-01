import { AnyAction } from "@reduxjs/toolkit";


export function isPending(reducerName: string) {
  return (action: AnyAction) => action.type.startsWith(reducerName) && action.type.endsWith('pending');
}

export function isFulfilled(reducerName: string) {
  return (action: AnyAction) => action.type.startsWith(reducerName) && action.type.endsWith('fulfilled');
}

export function isError(reducerName: string) {
  return (action: AnyAction) => action.type.startsWith(reducerName) && action.type.endsWith('rejected');
}