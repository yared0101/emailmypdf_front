import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts.js/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: localStorage.getItem("accessToken") ? <Settings /> : <Login />,
    },
    {
        path: "/register",
        element: localStorage.getItem("accessToken") ? (
            <Settings />
        ) : (
            <Register />
        ),
    },
]);

function App() {
    return (
        <div className="App">
            <Main>
                <RouterProvider router={router} />
            </Main>
        </div>
    );
}

export default App;
