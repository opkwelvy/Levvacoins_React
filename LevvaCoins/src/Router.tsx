import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Login } from "./pages/Login";
import { NewAccount } from "./pages/NewAccount";
import { Home } from "./pages/Home";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index path="/login" element={<Login />} />
            <Route path="/new-account" element={<NewAccount />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Route>
    )
)