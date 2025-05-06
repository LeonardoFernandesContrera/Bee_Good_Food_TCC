import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PromoCarousel() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div className="flex">
          <Card className="min-w-full relative">
            <div className="h-40 bg-gradient-to-r from-primary to-primary/70 rounded-xl flex items-center justify-between p-6">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">50% OFF no Seu Primeiro Pedido</h3>
                <p className="text-sm mb-4">Use o código: BEMVINDO50</p>
                <Button size="sm" variant="secondary">
                  Pedir Agora
                </Button>
              </div>
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="Comida"
                className="h-28 w-28 object-cover rounded-full border-4 border-white"
              />
            </div>
          </Card>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
