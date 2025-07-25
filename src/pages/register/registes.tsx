import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AlertCircleIcon, Eye, EyeClosed, Mail, MoveRight, User } from "lucide-react"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newUserSchemaWithConfirmPassword } from "../schemas/authSchema"
import type { RegisterInputs } from "../schemas/authSchema"

import { useAuthentication } from "../../hooks/useAuthentication"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CircularProgress from "@mui/material/CircularProgress"

export const RegisterForm = () => {

    const { createUser, error, load } = useAuthentication();

    const {
        register, // Função para registrar seus inputs
        handleSubmit, // Função para lidar com a submissão do formulário
        formState: { errors, isSubmitting }, // Objeto que contém os erros e o estado de submissão
        reset, // Para resetar o formulário após a submissão (opcional)
    } = useForm<RegisterInputs>({
        resolver: zodResolver(newUserSchemaWithConfirmPassword)
    });

    const onSubmit = async (data: RegisterInputs) => {
        const user = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            ...(() => {
                const { confirmPassword, ...restOfData } = data;
                return restOfData;
            })()
        }

        await createUser(user)
        reset()
    }

    const [eyeClosed, setEyeClosed] = useState<boolean>(true)
    const [eyeClosedConfirm, setEyeClosedConfirm] = useState<boolean>(true)

    return (
        <div className="bg-zinc-900 w-full flex flex-col items-center justify-center p-4">
            <Card className="flex flex-col min-w-3xs gap-8 w-full max-w-2xl text-white bg-transparent max-h-4/5 h-[50dvh] border-none shadow-none">
                <CardHeader>
                    <CardTitle className="font-semibold 2xl:text-3xl">Crie uma conta</CardTitle>
                    <CardDescription className="2xl:text-xl">
                        Crie seu acesso para poder utilizar toda a ferramenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div>
                            <label className="flex w-full border p-3 rounded-sm">
                                <input
                                    className="w-full outline-none"
                                    type="text"
                                    {...register("displayName")}
                                    placeholder="Nome e sobrenome"
                                />
                                <span>
                                    <User />
                                </span>
                            </label>
                            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="flex w-full border p-3 rounded-sm">
                                <input
                                    className="w-full outline-none"
                                    type="email"
                                    {...register("email")}
                                    placeholder="Email"
                                />
                                <span>
                                    <Mail />
                                </span>
                            </label>
                            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="flex border p-3 rounded-sm">
                                <input
                                    className="w-full outline-none"
                                    type={eyeClosed ? "password" : "text"}
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                <span>
                                    {
                                        eyeClosed ? (<EyeClosed onClick={() => setEyeClosed(false)} className="cursor-pointer" />)
                                            : (<Eye onClick={() => setEyeClosed(true)} className="cursor-pointer" />)
                                    }
                                </span>
                            </label>
                            {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="flex border p-3 rounded-sm">
                                <input
                                    className="w-full outline-none"
                                    type={eyeClosedConfirm ? "password" : "text"}
                                    placeholder="Confirme sua senha"
                                    {...register("confirmPassword")}
                                />
                                <span>
                                    {
                                        eyeClosedConfirm ? (<EyeClosed onClick={() => setEyeClosedConfirm(false)} className="cursor-pointer" />)
                                            : (<Eye onClick={() => setEyeClosedConfirm(true)} className="cursor-pointer" />)
                                    }
                                </span>
                            </label>
                            {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>
                        <button
                            className={`flex ${!load ? "justify-end cursor-pointer hover:bg-zinc-300" : "justify-center"} w-full gap-[40%] text-zinc-900 bg-white p-4 `}
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {!load ?
                                <>
                                    <h1 className="xl:text-xl font-medium">Acessar</h1>
                                    <span><MoveRight /></span>
                                </>
                                :
                                <>
                                    <CircularProgress color="inherit" size={24} />
                                </>
                            }
                        </button>
                    </form>
                    {error &&
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>}
                </CardContent>
            </Card>
        </div>
    )
}
