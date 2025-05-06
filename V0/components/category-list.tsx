import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Pizza, Coffee, Beef, Salad, Cake, Sandwich, Drumstick } from "lucide-react"

const categories = [
  { name: "Pizza", icon: Pizza },
  { name: "Café", icon: Coffee },
  { name: "Hambúrgueres", icon: Beef },
  { name: "Saladas", icon: Salad },
  { name: "Sobremesas", icon: Cake },
  { name: "Sanduíches", icon: Sandwich },
  { name: "Frango", icon: Drumstick },
]

export default function CategoryList() {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-3">Categorias</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button key={category.name} variant="outline" className="flex flex-col h-20 w-20 rounded-lg">
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{category.name}</span>
              </Button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
