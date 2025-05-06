import ProtectedRoute from "@/components/protected-route"
import RestaurantDetail from "@/components/restaurant-detail"

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <RestaurantDetail id={params.id} />
    </ProtectedRoute>
  )
}
