"use client"

import Link from "next/link"
import { Search, MapPin, Filter, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RestaurantCard from "@/components/restaurant-card"
import CategoryList from "@/components/category-list"
import PromoCarousel from "@/components/promo-carousel"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function HomePage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Entregar em:</p>
              <p className="text-xs text-muted-foreground">Rua Principal, 123</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img src="/placeholder.svg?height=40&width=40" alt="Perfil" className="h-8 w-8 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-muted-foreground">{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">Meus Pedidos</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar restaurantes ou pratos" className="pl-10 rounded-full" />
        </div>
      </header>

      <PromoCarousel />

      <section className="my-6">
        <CategoryList />
      </section>

      <section className="my-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Restaurantes Populares</h2>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RestaurantCard
            id="1"
            name="Palácio do Hambúrguer"
            image="/placeholder.svg?height=200&width=300"
            rating={4.8}
            deliveryTime="15-25 min"
            deliveryFee="R$5,99"
            categories={["Hambúrgueres", "Americano"]}
          />
          <RestaurantCard
            id="2"
            name="Paraíso da Pizza"
            image="/placeholder.svg?height=200&width=300"
            rating={4.6}
            deliveryTime="20-30 min"
            deliveryFee="R$7,49"
            categories={["Pizza", "Italiano"]}
          />
          <RestaurantCard
            id="3"
            name="Sushi Express"
            image="/placeholder.svg?height=200&width=300"
            rating={4.7}
            deliveryTime="25-35 min"
            deliveryFee="R$9,99"
            categories={["Japonês", "Sushi"]}
          />
          <RestaurantCard
            id="4"
            name="Fiesta de Tacos"
            image="/placeholder.svg?height=200&width=300"
            rating={4.5}
            deliveryTime="15-25 min"
            deliveryFee="R$5,99"
            categories={["Mexicano", "Tacos"]}
          />
          <RestaurantCard
            id="5"
            name="Paraíso da Massa"
            image="/placeholder.svg?height=200&width=300"
            rating={4.4}
            deliveryTime="25-35 min"
            deliveryFee="R$8,99"
            categories={["Italiano", "Massas"]}
          />
          <RestaurantCard
            id="6"
            name="Verdes Saudáveis"
            image="/placeholder.svg?height=200&width=300"
            rating={4.3}
            deliveryTime="15-25 min"
            deliveryFee="R$7,49"
            categories={["Saladas", "Saudável"]}
          />
        </div>
      </section>
    </main>
  )
}
