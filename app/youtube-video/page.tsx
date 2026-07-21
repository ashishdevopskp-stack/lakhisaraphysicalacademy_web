import { getPublishedVideos } from '@/app/lib/action/videos'
import VideosContent from './VideosContent'

export default async function VideosPage() {
  const videos = await getPublishedVideos()

  return <VideosContent videos={videos} />
}