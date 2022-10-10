export default interface Video {
  id: number,
  name: string,
  description: string,
  preview: string,
  filepath: string,
  likes: number,
  dislikes: number,
  views: number,
  channelId: number
}