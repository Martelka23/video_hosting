export interface CreateChannelDto {
  name: string,
  description: string,
  userId: number
}

export interface FindChannelDto {
  id?: number,
  name?: string,
  description?: string,
  img?: string,
  subscribers?: number,
  userId?: number
}