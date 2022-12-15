import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signup } from "../utils/api";

const Register = () => {
    const registerFunc = (e) => {
        e.preventDefault();
        signup(
            e.target.elements.email.value,
            e.target.elements.password.value
        ).then((data) => {
            if (typeof data === "string") {
                return toast.error(data, { autoClose: 2000 });
            }
            toast.success("Succesfully registered", { autoClose: 2000 });
            localStorage.setItem("accessToken", data.data.accessToken);
            document.location.reload();
        });
    };
    return (
        <div className="border p-5" style={{ width: "40%" }}>
            <h1 className="mb-5">Register</h1>
            <Form onSubmit={(e) => registerFunc(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Link to={`/`}>already registered?</Link>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <ToastContainer autoClose={2000} />
        </div>
    );
};
export default Register;
