import type { Metadata } from 'next'
import { getApprovedWebsiteReviews, getWebsiteReviewStats } from '@/app/lib/action/reviews'
import { ReviewsSection } from '@/app/components/ReviewsSection'

export const metadata: Metadata = {
  title: 'Student Reviews & Experience | Lakhisarai Physical Academy',
  description:
    'Read verified reviews and ratings from Lakhisarai Physical Academy students training for Bihar Police, SSC GD, Army, and Defense physical fitness.',
}

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([
    getApprovedWebsiteReviews(),
    getWebsiteReviewStats(),
  ])

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <ReviewsSection reviews={reviews} stats={stats} />
    </div>
  )
}
