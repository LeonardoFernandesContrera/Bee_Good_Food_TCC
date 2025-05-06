"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MenuItemCardProps {
  name: string
  description: string
  price: number
  image: string
  onAddToCart?: () => void
}

export default function MenuItemCard({ name, description, price, image, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="flex-1">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <p className="font-medium mt-2">R${price.toFixed(2)}</p>
          </div>
          <div className="ml-4 flex flex-col items-center gap-2">
            <img src={image || "/placeholder.svg"} alt={name} className="w-20 h-20 object-cover rounded-md" />
            <Button size="icon" variant="outline" className="rounded-full h-8 w-8" onClick={onAddToCart}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
