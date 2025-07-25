import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";

import { AuthProvider } from './context/AuthContext.tsx';

import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { NavBar } from "./components/navigation/nav-bar/nav-bar.tsx";
import { NotFound } from "./pages/not-found/not-found.tsx";

export const App = () => {

  const [user, setUser] = useState<any | null>(undefined)

  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <div className="flex flex-col gap-1">
          {user && <NavBar />}
          <Routes>
            <Route
              path="*"
              element={<NotFound />}
            />
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider >
  )
}
