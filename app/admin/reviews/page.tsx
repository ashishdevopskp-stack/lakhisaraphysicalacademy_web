import { getAdminReviews } from '@/app/lib/action/reviews'
import { ReviewManagementView } from './_components/ReviewManagementView'

export const metadata = {
  title: 'Review Moderation | Lakhisarai Physical Academy Admin',
}

export default async function AdminReviewsPage(props: {
  searchParams?: Promise<{ type?: string; status?: string; rating?: string }>
}) {
  const searchParams = await props.searchParams
  const reviews = await getAdminReviews({
    type: searchParams?.type,
    status: searchParams?.status,
    rating: searchParams?.rating ? Number(searchParams.rating) : undefined,
  })

  return <ReviewManagementView initialReviews={reviews} />
}
