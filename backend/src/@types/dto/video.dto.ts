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
  channel_id?: number
}