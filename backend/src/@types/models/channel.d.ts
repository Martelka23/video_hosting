export default interface Channel {
  id: number,
  name: string,
  description: string,
  img: string,
  subscribers: number,
  user_id: number
}

export interface CreateChannelDb {
  name: string,
  description: string,
  user_id: number
}

export interface FindChannelDb {
  id?: number,
  name?: string,
  description?: string,
  img?: string,
  subscribers?: number,
  user_id?: number
}