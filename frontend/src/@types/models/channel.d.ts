export default interface Channel {
  id: number,
  name: string,
  description: string,
  img: string,
  subscribers: number,
  userId: number
}

export interface CreateChannelDb {
  name: string,
  description: string,
  userId: number
}

export interface FindChannelDb {
  id?: number,
  name?: string,
  description?: string,
  img?: string,
  subscribers?: number,
  userId?: number
}