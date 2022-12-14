export interface CreateChannelDto {
  name: string,
  description: string
  image?: File
}

export interface FindChannelDto {
  id?: number,
  name?: string,
  description?: string,
  img?: string,
  subscribers?: number,
  userId?: number
}

export interface UpdateChannelDto {
  name?: string,
  description?: string,
  img?: string
}

export interface ChannelSubscribeDto {
  channelId: number
}