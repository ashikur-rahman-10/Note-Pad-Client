import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./Pages/Home/Home.jsx";
import Main from "./Layouts/Main";
import CreateNotes from "./Pages/CreateNotes/CreateNotes";
import Login from "./Shared/Login";
import AuthProvider from "./Providers/AuthProvider";
import Register from "./Shared/Register";
import PrivateRouts from "./Routs/PrivateRouts";
import Savednotes from "./Pages/SavedNotes/Savednotes";
import NoteDetails from "./Shared/NoteDetails";
import UpdateNotes from "./Pages/UpdateNotes/UpdateNotes";
import FavoriteNotes from "./Pages/FavoriteNotes/FavoriteNotes";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            // {
            //     path: "/",
            //     element: <Home></Home>,
            // },
            {
                path: "/",
                element: (
                    <PrivateRouts>
                        {" "}
                        <CreateNotes></CreateNotes>
                    </PrivateRouts>
                ),
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/saved",
                element: (
                    <PrivateRouts>
                        <Savednotes></Savednotes>
                    </PrivateRouts>
                ),
            },
            {
                path: "/saved/:id",
                element: (
                    <PrivateRouts>
                        <NoteDetails></NoteDetails>
                    </PrivateRouts>
                ),
            },
            {
                path: "/updateNotes/:id",
                element: (
                    <PrivateRouts>
                        <UpdateNotes></UpdateNotes>
                    </PrivateRouts>
                ),
                loader: ({ params }) =>
                    fetch(
                        `https://notes-server-nine.vercel.app/notes/${params.id}`
                    ),
            },
            {
                path: "/favorites",
                element: (
                    <PrivateRouts>
                        <FavoriteNotes></FavoriteNotes>
                    </PrivateRouts>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {" "}
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
