import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import {
    getBoards,
    getUserSettings,
    sendMail,
    updateLogo,
    updateSettings,
} from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import logoutsrc from "../assets/logout-svgrepo-com.svg";
const Settings = () => {
    const uploadFile = (files) => {
        if (files && files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setLogo(e.target.result);
            };
            reader.readAsDataURL(files[0]);

            const filesArray = Array.from(files);
            const data = new FormData();
            filesArray.forEach((f, i) => {
                data.append("logo", f);
            });
            setLoading(true);
            const id = toast.loading("Uploading logo");
            updateLogo(data).then((data) => {
                setLoading(false);
                if (typeof data === "string") {
                    return toast.update(id, {
                        render: data,
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                    });
                }
                toast.update(id, {
                    render: "Done!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            });
        }
        //call the api with data.
    };
    const [emailSettings, setEmailSettings] = useState();
    const [boards, setBoards] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState();
    const [logo, setLogo] = useState();

    useEffect(() => {
        setLoading(true);
        getUserSettings().then((data) => {
            setLoading(false);
            if (typeof data === "string") {
                return toast.error(data, { autoClose: 2000 });
            }
            setEmailSettings(data.data.data);
        });
    }, []);
    useEffect(() => {
        setLoading(true);
        getBoards().then((data) => {
            setLoading(false);
            if (typeof data === "string") {
                return toast.error(data, { autoClose: 2000 });
            }
            setBoards(data.data.data);
        });
    }, []);
    const saveSetting = (emailReceiver, emailBody) => {
        setLoading(true);
        updateSettings(emailReceiver, emailBody).then((data) => {
            setLoading(false);
            if (typeof data === "string") {
                return toast.error(data, { autoClose: 2000 });
            }
        });
    };
    console.log({ emailSettings, boards });
    const boardOptions = boards?.map((elem, index) => (
        <option value={elem.id} key={index}>
            {elem.name}
        </option>
    ));
    const onSendMessage = () => {
        setLoading(true);
        const id = toast.loading("Sending Email");
        sendMail(selectedBoard || boards?.[0]?.id).then((data) => {
            setLoading(false);
            if (typeof data === "string") {
                return toast.update(id, {
                    render: data,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            }
            toast.update(id, {
                render: "Email Sent Successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        });
    };
    return (
        <div className="border p-5" style={{ width: "40%" }}>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Settings</h1>
                <img
                    alt="logout"
                    src={logoutsrc}
                    style={{ height: "30px", cursor: "pointer" }}
                    onClick={() => {
                        localStorage.removeItem("accessToken");
                        document.location.reload();
                    }}
                />
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Receiver Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    defaultValue={emailSettings?.recepientEmail}
                    onBlur={(e) => saveSetting(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBody">
                <Form.Label>Email Body</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={emailSettings?.emailBody}
                    onBlur={(e) => saveSetting(undefined, e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Select Monday Board</Form.Label>
                <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                        setSelectedBoard(e.target.value);
                    }}
                >
                    {boardOptions}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                {(logo || emailSettings?.logo) && (
                    <Form.Label>Current chosen logo:</Form.Label>
                )}
                <br />
                <img
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    id="target"
                    src={logo || emailSettings?.logo}
                    alt="logo"
                />
                <br />
                <Form.Label>Upload Logo</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => {
                        uploadFile(e.target.files);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Button
                    variant="primary"
                    className="w-100"
                    disabled={loading}
                    onClick={!loading ? onSendMessage : null}
                >
                    Send Email
                </Button>
            </Form.Group>
            <ToastContainer autoClose={2000} />
        </div>
    );
};
export default Settings;
