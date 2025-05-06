"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CreditCard, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { toast } = useToast()
  const router = useRouter()
  // Calcular totais (mesmo que na página do carrinho)
  const subtotal = 64.97 // 2 hambúrgueres + batata frita
  const deliveryFee = 5.99
  const serviceFee = 2.99
  const total = subtotal + deliveryFee + serviceFee

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    instructions: "",
    deliveryTime: "asap",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    // Em um aplicativo real, você validaria o formulário e processaria o pedido
    toast({
      title: "Pedido realizado com sucesso!",
      description: "Sua comida está sendo preparada e será entregue em breve.",
      duration: 5000,
    })

    // Redirecionar para uma página de confirmação ou início
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/cart" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="João" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Silva" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    placeholder="Rua Principal, 123"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" placeholder="São Paulo" value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input id="zipCode" placeholder="01234-567" value={formData.zipCode} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instruções de Entrega (Opcional)</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Número do apartamento, código do portão, etc."
                    value={formData.instructions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="asap"
                value={formData.deliveryTime}
                onValueChange={(value) => handleRadioChange("deliveryTime", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asap" id="asap" />
                  <Label htmlFor="asap">O mais rápido possível (15-25 min)</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled">Agendar para mais tarde</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Método de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="card"
                value={formData.paymentMethod}
                onValueChange={(value) => handleRadioChange("paymentMethod", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Cartão de Crédito/Débito</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Dinheiro na Entrega</Label>
                </div>
              </RadioGroup>

              {formData.paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Data de Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" value={formData.expiry} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
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

              <Button className="w-full mt-6" onClick={handlePlaceOrder}>
                Fazer Pedido
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Ao fazer seu pedido, você concorda com nossos Termos de Serviço e Política de Privacidade
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
