import ProtectedRoute from "@/components/protected-route"
import CartPage from "@/components/cart-page"

export default function Cart() {
  return (
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  )
}
