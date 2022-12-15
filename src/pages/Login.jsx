import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Login = () => {
    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const loginFunc = (e) => {
        // localStorage.setItem("accessToken", "somekey");
        e.preventDefault();
        console.log(e.target.elements.email.value);
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Link to={`/register`}>dont have an account?</Link>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;
