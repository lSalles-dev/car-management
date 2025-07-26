import { useEffect, type ChangeEvent } from 'react';
import { Label } from '../ui/label';
import { Images, Trash } from 'lucide-react';
import { Input } from '../ui/input';

interface Props {
    selectedFiles: File[],
    setSelectedFiles: Function,
    imagePreviews: string[],
    setImagePreviews: Function,
}

// Componente principal da aplicação
export const ImagePrev = ({ selectedFiles, setSelectedFiles, imagePreviews, setImagePreviews }: Props) => {
    // Estado para armazenar os arquivos selecionados
    // selectedFiles será um array de objetos File

    // Estado para armazenar as URLs das prévias das imagens
    // imagePreviews será um array de strings (Data URLs)

    const clearFiles = () => {
        setSelectedFiles([])
        setImagePreviews([])
    }

    // useEffect para lidar com a criação e limpeza das URLs de prévia
    useEffect(() => {
        if (selectedFiles.length === 0) {
            setImagePreviews([]); // Limpa as prévias se não houver arquivos
            return;
        }

        const newImagePreviews: string[] = [];
        let filesProcessed = 0; // Contador para saber quando todos os arquivos foram processados

        selectedFiles.forEach(file => {
            // Verifica se o arquivo é uma imagem
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // Adiciona a URL de dados ao array de prévias
                    if (reader.result) { // reader.result pode ser string ou ArrayBuffer
                        newImagePreviews.push(reader.result as string); // Força a tipagem para string
                    }
                    filesProcessed++;
                    // Se todos os arquivos foram lidos, atualiza o estado
                    if (filesProcessed === selectedFiles.length) {
                        setImagePreviews([...newImagePreviews]); // Cria uma nova referência para forçar a atualização
                    }
                };

                reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
            } else {
                console.warn(`Arquivo '${file.name}' não é uma imagem e será ignorado.`);
                filesProcessed++; // Incrementa mesmo se o arquivo for ignorado para não travar o contador
                if (filesProcessed === selectedFiles.length) {
                    setImagePreviews([...newImagePreviews]);
                }
            }
        });

        // Limpeza: Revoga as URLs de objeto para liberar memória (não aplicável a Data URLs, mas boa prática para createObjectURL)
        // Para Data URLs, a memória é gerenciada pelo navegador.
        return () => {
            // Se estivéssemos usando URL.createObjectURL, faríamos:
            // imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [selectedFiles]); // Dependência: executa quando selectedFiles muda

    // Função para lidar com a seleção de arquivos
    // ChangeEvent<HTMLInputElement> tipa o evento para um input de arquivo
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Concatena os novos arquivos com os arquivos já existentes
            setSelectedFiles((prevFiles: File[]) => [...prevFiles, ...Array.from(files)]);
        }
        // Se desejar limpar a seleção se nenhum arquivo for escolhido, você pode manter:
        // else {
        //     setSelectedFiles([]);
        // }
    };

    return (
        <div className="">
            <div className="mb-6 flex justify-between items-center">
                <Label className="outline w-fit p-2 rounded-sm">
                    <Images />
                    <Input
                        hidden
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                </Label>
                <span 
                    className='p-2 hover:bg-red-300 hover:text-red-600 rounded-sm hover:cursor-pointer'
                    onClick={clearFiles}
                >
                    <Trash />
                </span>
            </div>

            <div
                id="imagePreviewContainer"
                className="flex gap-2 flex-wrap"
            >
                {imagePreviews.length > 0 && (
                    imagePreviews.map((src, index) => (
                        <img
                            key={index} // Usar um índice como key é aceitável para listas estáticas
                            src={src}
                            alt={`Prévia da imagem ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

