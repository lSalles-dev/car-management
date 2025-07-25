
import { useAuthentication } from "../../hooks/useAuthentication"
import { useAuthValue } from "../../context/AuthContext"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import { BackgroundLetterAvatars } from "./avatar-color/avatar-color-config";
import { LogOut, Settings, UserCog } from "lucide-react";
import { NavLink } from "react-router-dom";

export const UserModal = () => {

    const { user } = useAuthValue()
    const { logout } = useAuthentication()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="cursor-pointer flex flex-row-reverse items-center gap-4 bg-white text-zinc-900 py-2 px-5 rounded-full"
            >
                <BackgroundLetterAvatars name={user.displayName} />
                <h1 className="font-semibold text-md">{user.displayName}</h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="py-2 font-semibold font-mono"
            >
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-300 p-3"
                >
                    <NavLink
                        to="/user-management"
                        className="flex gap-4"
                    >
                        <UserCog style={{ width: 24, height: 24 }} />
                        <h1 className="font-sans font-medium text-base">Gerenciar usuários</h1>
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-4 cursor-pointer hover:bg-gray-300 p-3">
                    <NavLink
                        to="/user-settings"
                        className="flex gap-4"
                    >
                        <Settings style={{ width: 24, height: 24 }} />
                        <h1 className="font-sans font-medium text-base">Configurações</h1>
                    </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex gap-4 cursor-pointer hover:bg-gray-300 p-3"
                    onClick={logout}
                >
                    <LogOut style={{ width: 24, height: 24 }} />
                    <h1 className="font-sans font-medium text-base">Sair</h1>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}
