// src/schemas/authSchemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Formato de e-mail invalido").includes("@").min(3).nonempty(),
    password: z.string().min(6, "A senha deve conter no minimo 6 caracteres").nonempty()
})
export const registerSchema = z.object({
    displayName: z.string().min(3).nonempty(),
    email: z.string().email("Formato de e-mail invalido").includes("@").min(3).nonempty(),
    password: z.string().min(6, "A senha deve conter no minimo 6 caracteres").nonempty(),
    confirmPassword: z.string().nonempty()
})

export const newUserSchemaWithConfirmPassword = registerSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não coincidem.", // Mensagem de erro se a validação falhar
    path: ["confirmPassword"], // O erro será associado ao campo 'confirmPassword'
  }
);


export type LoginInputs = z.infer<typeof loginSchema>;
export type RegisterInputs = z.infer<typeof registerSchema>;