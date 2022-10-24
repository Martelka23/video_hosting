export default interface Comment {
  id: number,
  text: string,
  likes: number,
  dislikes: number,
  videoId: number,
  userId: number
}

export interface CommentWithAuthor extends Comment {
  username: string,
  role: string,
  img: string
}
