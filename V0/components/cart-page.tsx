"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { toast } = useToast()
  // Itens do carrinho de exemplo
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Hambúrguer Clássico",
      price: 25.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Palácio do Hambúrguer",
    },
    {
      id: "4",
      name: "Batata Frita",
      price: 12.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      restaurant: "Palácio do Hambúrguer",
    },
  ])

  // Calcular totais
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5.99
  const serviceFee = 2.99
  const total = subtotal + deliveryFee + serviceFee

  const handleIncreaseQuantity = (id: string) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const handleDecreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  const handleRemoveItem = (id: string, name: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item removido",
      description: `${name} foi removido do seu carrinho.`,
      duration: 3000,
    })
  }

  const handleApplyPromo = () => {
    toast({
      title: "Código promocional aplicado",
      description: "Seu desconto foi aplicado ao pedido.",
      duration: 3000,
    })
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Seu Carrinho</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Itens do Palácio do Hambúrguer</h2>

              {cartItems.map((item) => (
                <div key={item.id} className="flex py-4 border-b last:border-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">R${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <div className="flex items-center">
                  <Input placeholder="Adicionar código promocional" className="rounded-r-none" />
                  <Button className="rounded-l-none" onClick={handleApplyPromo}>
                    Aplicar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de Entrega</span>
                  <span>R${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de Serviço</span>
                  <span>R${serviceFee.toFixed(2)}</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>R${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" asChild>
                <Link href="/checkout">Finalizar Pedido</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
