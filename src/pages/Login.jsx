import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const loginFunc = (e) => {
        e.preventDefault();
        const [loading, setLoading] = useState();
        setLoading(true);

        login(
            e.target.elements.email.value,
            e.target.elements.password.value
        ).then((data) => {
            setLoading(false);
            if (typeof data === "string") {
                return toast.error(data, { autoClose: 2000 });
            }
            toast.success("Succesfully logged in", { autoClose: 2000 });
            localStorage.setItem("accessToken", data.data.accessToken);
            document.location.reload();
        });
    };
    return (
        <div className="border p-5" style={{ width: "40%" }}>
            <h1 className="mb-5">Login</h1>
            <Form onSubmit={(e) => loginFunc(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Link to={`/register`}>dont have an account?</Link>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    size="lg"
                >
                    Login
                </Button>
            </Form>
            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default Login;
