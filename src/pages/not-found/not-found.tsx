import Lottie from "react-lottie";
import notFound from "../../assets/Page not found - Error 404.json"
import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";

export const NotFound = () => {

    const { user } = useAuthValue();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFound,
    };

    return (
        <div className="text-center">
            <Lottie options={defaultOptions} width="30vw" />
            <div className="flex flex-col gap-4 items-center">
                <p className="font-medium text-xl">Parece que não há nada aqui...</p>
                <p className="font-medium text-xl">Esta página não existe ou está em construção</p>
                <Link
                    to={user ? "/" : "/login"}
                    className="bg-white text-zinc-900 rounded-lg w-52 p-3 font-medium hover:bg-[#cdcdcd]"
                >
                    {user ? "Ir a Home" : "Fazer login"}
                </Link>
            </div>
        </div>
    )
}
