"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Clock, Star, Truck, Info, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuItemCard from "@/components/menu-item-card"
import { useToast } from "@/components/ui/use-toast"

interface RestaurantDetailProps {
  id: string
}

export default function RestaurantDetail({ id }: RestaurantDetailProps) {
  const { toast } = useToast()
  const [cartCount, setCartCount] = useState(0)

  // Em um aplicativo real, você buscaria dados do restaurante com base no ID
  const restaurant = {
    id,
    name: "Palácio do Hambúrguer",
    image: "/placeholder.svg?height=300&width=600",
    coverImage: "/placeholder.svg?height=200&width=800",
    rating: 4.8,
    reviewCount: 243,
    deliveryTime: "15-25 min",
    deliveryFee: "R$5,99",
    minOrder: "R$20,00",
    categories: ["Hambúrgueres", "Americano", "Fast Food"],
    address: "Rua Principal, 123, Qualquer Cidade, Brasil",
  }

  // Categorias e itens de menu de exemplo
  const menuCategories = [
    {
      id: "burgers",
      name: "Hambúrgueres",
      items: [
        {
          id: "1",
          name: "Hambúrguer Clássico",
          description: "Carne bovina, queijo, alface, tomate e molho especial",
          price: 25.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "2",
          name: "Bacon Deluxe",
          description: "Carne bovina, bacon, queijo, alface, tomate e maionese",
          price: 29.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "3",
          name: "Cogumelo Suíço",
          description: "Carne bovina, queijo suíço, cogumelos salteados e aioli de trufa",
          price: 32.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "sides",
      name: "Acompanhamentos",
      items: [
        {
          id: "4",
          name: "Batata Frita",
          description: "Batatas fritas crocantes com sal marinho",
          price: 12.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "5",
          name: "Anéis de Cebola",
          description: "Anéis de cebola empanados crocantes com molho para mergulhar",
          price: 15.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
    {
      id: "drinks",
      name: "Bebidas",
      items: [
        {
          id: "6",
          name: "Refrigerante",
          description: "Escolha entre Coca-Cola, Guaraná ou Sprite",
          price: 7.49,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: "7",
          name: "Milk-shake",
          description: "Baunilha, chocolate ou morango",
          price: 16.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    },
  ]

  const handleAddToCart = (itemName: string) => {
    setCartCount((prev) => prev + 1)
    toast({
      title: "Adicionado ao carrinho",
      description: `${itemName} foi adicionado ao seu carrinho.`,
      duration: 3000,
    })
  }

  return (
    <main className="pb-20">
      <div className="relative h-40 bg-gray-200">
        <img
          src={restaurant.coverImage || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <Link href="/" className="absolute top-4 left-4">
          <Button variant="outline" size="icon" className="rounded-full bg-white">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center -mt-16 mb-6">
          <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-background bg-white">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <div className="flex flex-wrap gap-1 mt-2">
              {restaurant.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {restaurant.rating} ({restaurant.reviewCount} avaliações)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                <span>{restaurant.deliveryFee}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mb-6">
          <Info className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm">Pedido mínimo: {restaurant.minOrder}</p>
        </div>

        <Tabs defaultValue="burgers">
          <TabsList className="mb-6">
            {menuCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-4">
                {category.items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    onAddToCart={() => handleAddToCart(item.name)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Link href="/cart">
          <Button className="w-full flex items-center justify-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Ver Carrinho ({cartCount} itens)
          </Button>
        </Link>
      </div>
    </main>
  )
}
