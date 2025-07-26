import { Combobox } from "@/components/combo-box/combo-box"
import { HeaderCards } from "./cards/header-cards"
import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"
import { AddItem } from "@/components/modal-add-item/add-item"
import { CarouselItems } from "./carousel-items/carousel-items"


export const Home = () => {

    const headerInfo = [
        {
            title: "Total de peças",
            value: "40",
            subValue: "Peças em estoque"
        },
        {
            title: "Valor em peças",
            value: "16.780,98",
            subValue: "Reais"
        },
        {
            title: "Peças adiciondas (Mês)",
            value: "13",
            subValue: "Peças"
        },
        {
            title: "Peças utilizadas",
            value: "16",
            subValue: "Peças"
        }
    ]

    const [valueFilter, setvalueFilter] = useState("")
    const [search, setSearch] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(search)
        setSearch("")
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex w-full flex-wrap gap-3 p-2 lg:flex-nowrap">
                {headerInfo.map((item) => (
                    <HeaderCards
                        key={item.title} 
                        title={item.title}
                        value={item.value}
                        subValue={item.subValue}
                    />
                ))}
            </header>
            <main className="flex flex-col gap-5">
                <section className="flex justify-between gap-4 p-4 items-center flex-wrap md:flex-nowrap ">
                    <Combobox 
                        value={valueFilter}
                        change={setvalueFilter} 
                    />
                    <form 
                        className="outline flex gap-3 w-full md:w-xl p-4 justify-between rounded-md"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="search" 
                            placeholder="Faça uma busca especifica"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="outline-none focus:outline-none w-full appearance-none"
                        />
                        <button type="submit">
                            <Search />
                        </button>
                    </form>
                </section>
                <section className="flex flex-col gap-5 ">
                    <div className="flex justify-between p-4">
                        <h1 className="font-semibold text-2xl">
                            {valueFilter ? valueFilter : "Todas as Peças"}
                        </h1>
                        <AddItem />
                    </div>
                    <CarouselItems />
                </section>
            </main>
        </div>
    )
}
