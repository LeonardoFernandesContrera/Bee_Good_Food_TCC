import ProtectedRoute from "@/components/protected-route"
import CheckoutPage from "@/components/checkout-page"

export default function Checkout() {
  return (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  )
}
