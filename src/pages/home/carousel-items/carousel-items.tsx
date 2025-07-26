import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { type Item } from '../../schemas/itemsSchemas';

import  EmptyIcon from "../../../assets/falfla3bJ0.json"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
// import { CarouselImages } from './carousel-images';
import { MapPin } from 'lucide-react';
import { CarouselImages } from './carousel-images';
import { LottieComponent } from '@/components/lottie-file/lotiie';

export const CarouselItems = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        // Opcional: Crie uma query para ordenar ou filtrar.
        // Por exemplo, ordenar por 'createdAt' em ordem decrescente para ver os mais novos primeiro.
        // Certifique-se de que seus itens têm um campo 'createdAt' (com serverTimestamp()).
        const itemsCollectionRef = collection(db, 'items');
        const q = query(itemsCollectionRef, orderBy('createdAt', 'desc'));

        // Configura o listener em tempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsData: Item[] = [];
            querySnapshot.forEach((doc) => {
                // É importante que o 'Item' inclua o ID do documento, que você não está gerando no frontend
                itemsData.push({ id: doc.id, ...doc.data() } as Item);
            });
            setItems(itemsData);
            // setLoading(false); // Uma vez que os dados são carregados, defina loading como false
        }, (error) => {
            // setLoading(false);
            console.error("Erro ao buscar dados em tempo real:", error);
        });

        // Função de limpeza: ESSENCIAL!
        // Ela desativa o listener quando o componente é desmontado,
        // evitando vazamentos de memória e leituras desnecessárias.
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {items.length > 0 ? <>

                <Carousel className="m-auto w-[70%] sm:w-[80%] md:w-[85%] lg:w-[90%] 2xl:w-[95%] ">
                    <CarouselContent className='mx-2 gap-12 p-2 lg:p-4'>
                        {items.map((item) => (
                            <CarouselItem key={item.id} className="w-full sm:basis-1/2 xl:basis-1/3 2xl:basis-1/5">
                                <div>
                                    <Card className='outline'>
                                        <CardContent>
                                            <CarouselImages images={item.itemImages} />
                                            <div className="text-left flex flex-col gap-4">
                                                <div>
                                                    <h1 className='md:text-2xl font-semibold'>{item.itemName}</h1>
                                                </div>
                                                <h2>{item.itemDescription}</h2>
                                                <div className='flex gap-2'>
                                                    <span className='flex'>
                                                        <MapPin />
                                                        <h1>Local: </h1>
                                                    </span>
                                                    <p>{item.itemAddress}</p>
                                                </div>
                                                <h1>Valor: R${item.value}</h1>
                                                <h1 className={`flex gap-1 items-end ${item.quantity <= 2 && "text-red-700"}`}>
                                                    <p className='text-xl font-semibold'>Quantidade: </p>
                                                    <p className='text-xl font-semibold'>{item.quantity}</p>
                                                    <p>Itens</p>
                                                </h1>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </> : 
            <>
                <LottieComponent 
                    url={EmptyIcon}
                    text='Não há nada aqui'
                    subText='Adicione um novo item para poder vê-lo'
                />
            </>}
        </div>
    );
};
