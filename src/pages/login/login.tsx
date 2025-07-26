import { CarouselCar } from "@/components/carousel/carousel-car"
import { LoginForm } from "./login-form"
// import { RegisterForm } from "../register/registes"

export const Login = () => {
    return (
        <div className="bg-muted flex min-h-svh w-full text-white">
           <LoginForm />
           {/* <RegisterForm /> */}
           <CarouselCar />
        </div>
    )
}
