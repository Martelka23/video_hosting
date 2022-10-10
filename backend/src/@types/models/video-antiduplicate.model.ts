export default interface VideoAntiDuplicate {
  id: number,
  videoId: number,
  userId: number
}

export interface StatAntiDuplicate {
  actionType: "likes" | "dislikes" | "views",
  videoId: number,
  userId: number
}