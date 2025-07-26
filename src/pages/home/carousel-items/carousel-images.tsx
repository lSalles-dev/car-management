import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


export const CarouselImages = ({ images }: any) => {
    return (
        <Carousel className="w-full md:w-[98%]">
            <CarouselContent >
                {images.map((image: any, index: number) => (
                    <CarouselItem key={index}>
                        <div className="">
                            <Card className="border-none outline-none">
                                <CardContent >
                                    <img
                                        key={index} // Use um ID único se possível, mas index é aceitável para listas estáticas
                                        src={image}
                                        style={{objectFit: 'cover', borderRadius: '4px' }}
                                        className="w-[150px] h-[150px] md:w-[80%] md:h-[300px]"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
