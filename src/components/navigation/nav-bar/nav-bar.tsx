import { NavLink } from "react-router-dom"
import { UserModal } from "@/components/user-modal/user-modal"
import Logo from "../../../assets/logo.png"


export const NavBar = () => {
  return (
    <div className="bg-zinc-800 py-4 xl:px-8 text-white">
      <nav className="flex items-center justify-between">
        <NavLink to="/">
          <img
            className="cursor-pointer w-24"
            src={Logo}
            alt="logo"
          />
        </NavLink>
        <div>
          <ul className="flex items-center">
            <div>
              <UserModal />
            </div>
          </ul>
        </div>
      </nav>
    </div>
  )
}
