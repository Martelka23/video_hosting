import { AxiosResponse } from "axios";

import RequestError from "../../@types/axios/error";

export function thunkErrorChecker(
  response: AxiosResponse,
  rejectWithValue: (value: RequestError) => any,
  message: string,
  expectedStatuses: number[] = [200, 201]
) {
  let result;

  if (expectedStatuses.includes(response.status)) {
    result = response.data;
  } else {
    result = rejectWithValue({ status: response.status, message });
  }

  return result;
}