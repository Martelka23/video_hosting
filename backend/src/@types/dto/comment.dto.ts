export interface CreateCommentDto {
  text: string,
  videoId: number
}

export interface FindCommentDto {
  id?: number,
  text?: string,
  likes?: number,
  dislikes?: number,
  videoId?: number,
  userId?: number
}