const Main = ({ children }) => {
    return (
        <div
            className="d-flex w-100 justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            {children}
        </div>
    );
};
export default Main;
