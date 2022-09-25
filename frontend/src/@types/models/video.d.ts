export interface Video {
  id: number,
  name: string,
  description: string,
  preview: string,
  filepath: string,
  likes: number,
  dislikes: number,
  views: number,
  channel_id: number
}

export interface CreateVideoDb {
  name: string,
  description: string,
  preview: string,
  filepath: string,
  channel_id: number
}

export interface FindVideoDb {
  id?: number,
  name?: string,
  description?: string,
  filepath?: string,
  channel_id?: number
}