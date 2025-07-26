import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface InfoProps {
    title: string,
    value: string,
    subValue: string,
    coin?: boolean
}

export const HeaderCards = ({ title, value, subValue, coin }: InfoProps) => {
    return (
        <Card className="bg-zinc-800 text-white w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
                <span className="flex gap-1 items-end">
                    <p className="text-4xl font-semibold">{coin && "R$: "}{value}</p>
                    <p >{subValue}</p>
                </span>
            </CardContent>
        </Card>
    )
}
