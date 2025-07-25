
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

import React from "react"

const cars = [
  {
    url: "https://static.vecteezy.com/system/resources/previews/053/539/042/large_2x/white-car-on-a-transparent-background-free-png.png",
    carName: "BMW M2",
    id: 1
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/053/539/024/non_2x/a-yellow-car-on-a-transparent-background-free-png.png",
    carName: "HONDA CIVIC",
    id: 2
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/025/305/916/non_2x/white-sport-car-on-transparent-background-3d-rendering-illustration-free-png.png",
    carName: "MERCEDES AMG GT",
    id: 3
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/025/308/369/non_2x/white-sport-car-on-transparent-background-3d-rendering-illustration-free-png.png",
    carName: "NISSAN 370Z",
    id: 4
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/053/539/020/non_2x/a-luxury-car-on-a-transparent-background-free-png.png",
    carName: "AUDI Q6 E-TRON",
    id: 5
  }
]

export const CarouselCar = () => {

  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  )

  return (
    <div className="hidden md:block w-full text-center bg-gradient-to-b from-[#D09C00] to-[#3C2D00]">
      <div className="flex flex-col items-center justify-center h-full">
        <Carousel
          className="w-full max-w-[99%] pointer-events-none select-none"
          plugins={[plugin.current]}
        >
          <CarouselContent>
            {cars.map((car) => (
              <CarouselItem key={car.id}>
                <div className="p-1">
                  <Card className="bg-transparent border-0 outline-none shadow-none">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <img className="max-w-[60%]" src={car.url} alt="" />
                      <h1 className="xl:text-6xl lg:text-5xl w-full font-bold absolute bottom-[28%] text-white">{car.carName}</h1>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
