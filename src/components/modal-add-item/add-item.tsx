import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import { useState, type FormEvent } from "react"
import { ImagePrev } from "../image-prev/image-prev" // Certifique-se de que o caminho está correto
import useFirebaseStorage from "@/hooks/useFirebaseStorage"

import CircularProgress from "@mui/material/CircularProgress"
import type { ItemWithFiles } from "@/pages/schemas/itemsSchemas"

export const AddItem = () => {

    const { isUploading, uploadFilesAndSaveData } = useFirebaseStorage()

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [itemName, setItemName] = useState<string>("")
    const [itemDescription, setItemDescription] = useState<string>("")
    const [value, setValue] = useState<string>("")
    const [quantity, setQuantity] = useState<string>("")
    const [itemAddress, setItemAdress] = useState<string>("")
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const formData = {
            itemName,
            itemDescription,
            value: parseFloat(value),
            quantity: parseInt(quantity, 10),
            itemAddress,
            itemImages: selectedFiles
        }

        try {
            await uploadFilesAndSaveData(formData as ItemWithFiles)

            !isUploading && setIsDialogOpen(false)
            setItemName("")
            setItemDescription("")
            setValue("")
            setQuantity("")
            setItemAdress("")
            setSelectedFiles([])

        } catch (error: any) {
           
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="hover:cursor-pointer">
                    Nova Peça
                    <PlusCircle />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Adicione um novo Item</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Input
                                type="text"
                                placeholder="Nome do item"
                                value={itemName}
                                onChange={e => setItemName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Input
                                type="number"
                                placeholder="Valor ex: 5000"
                                value={value}
                                min={0}
                                onChange={e => setValue(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <textarea
                                placeholder="Descrição do item"
                                className="p-3 outline rounded-sm min-h-12"
                                value={itemDescription}
                                onChange={e => setItemDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Input
                                placeholder="Quantidade"
                                className="p-3"
                                type="number"
                                min={0}
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Input
                                placeholder="Endereço do produto"
                                className="p-3"
                                type="text"
                                value={itemAddress}
                                onChange={e => setItemAdress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <ImagePrev
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                                imagePreviews={imagePreviews}
                                setImagePreviews={setImagePreviews}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex items-center">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {!isUploading ?
                            <Button type="submit">
                                Adicionar
                            </Button>
                            :
                            <div className="bg-zinc-700 w-16 p-3 flex items-center justify-center h-8 rounded">
                                <CircularProgress size={20} />
                            </div>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
