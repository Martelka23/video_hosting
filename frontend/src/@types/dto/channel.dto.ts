export interface CreateChannelDto {
  name: string,
  description: string,
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

export interface ChannelSubscribeDto {
  channelId: number
}

export interface SubscribeCheckDto {
  channelId: number,
  userId: number
}