import RequestError from "../../@types/axios/error";

export interface VideoState {
  videos: Video[] | null,
  currentVideo: Video | null,
  isLoading: boolean,
  error: RequestError | null
}