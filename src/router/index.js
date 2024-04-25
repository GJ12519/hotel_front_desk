import React from "react"
import { Navigate } from "react-router-dom"

const Home = React.lazy(() => import("@/views/home"))
const Entire = React.lazy(() => import("@/views/entire"))
const Detail = React.lazy(() => import("@/views/detail"))
const Room = React.lazy(() => import("@/views/room"))
const Login = React.lazy(() => import("@/views/login"))
const Reg = React.lazy(() => import("@/views/reg"))
const Personal = React.lazy(() => import("@/views/personal"))

const routers = [
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        path: "/home",
        element: <Home />
    }, {
        path: "/detail",
        element: <Detail />
    }, {
        path: "/entire",
        element: <Entire />
    }, {
        path: "/room",
        element: <Room />
    }, {
        path: "/login",
        element: <Login />
    }, {
        path: "/reg",
        element: <Reg />
    }, {
        path: "/personal",
        element: <Personal />
    },
]

export default routers
