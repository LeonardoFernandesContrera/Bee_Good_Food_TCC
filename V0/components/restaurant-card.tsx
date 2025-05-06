import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: string
  deliveryFee: string
  categories: string[]
}

export default function RestaurantCard({
  id,
  name,
  image,
  rating,
  deliveryTime,
  deliveryFee,
  categories,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-40">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-3">
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
            <span>{deliveryTime}</span>
            <span>{deliveryFee}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
