import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signup } from "../utils/api";
import { useState } from "react";

const Register = () => {
    const [loading, setLoading] = useState();
    const registerFunc = (e) => {
        e.preventDefault();
        setLoading(true);
        signup(
            e.target.elements.email.value,
            e.target.elements.password.value
        ).then((data) => {
            setLoading(false);
            if (typeof data === "string") {
                return toast.error(data, { autoClose: 2000 });
            }
            toast.success("Succesfully registered", { autoClose: 2000 });
            localStorage.setItem("accessToken", data.data.accessToken);
            window.open("/", "_self");
        });
    };
    return (
        <div className="border p-5" style={{ minWidth: "40%" }}>
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
                <Button variant="primary" type="submit" disabled={loading}>
                    Register
                </Button>
            </Form>
            <ToastContainer autoClose={2000} />
        </div>
    );
};
export default Register;
