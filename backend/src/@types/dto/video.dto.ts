export interface CreateVideoDto {
  name: string,
  description: string,
  preview: string,
  filepath: string,
  channel_id: number
}

export interface FindVideoDto {
  id?: number,
  name?: string,
  description?: string,
  filepath?: string,
  channel_id?: number | number[]
}

export interface VideoStatDto {
  videoId: number,
  actionType: "likes" | "dislikes" | "views",
  value: -1 | 1
}

export interface CheckAntiDuplicateDto {
  videoId: number,
  userId: number
}