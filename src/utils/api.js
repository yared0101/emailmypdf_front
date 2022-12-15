import {
    axiosAuthenticatedFormInstance,
    axiosAuthenticatedInstance,
    axiosInstance,
} from "../config";
export const getBoards = () => {
    return axiosAuthenticatedInstance.get("/monday/boards").catch((data) => {
        return data.message;
    });
};
export const login = (email, password) => {
    return axiosInstance
        .post("/users/login", { email, password })
        .catch((data) => {
            return data.message;
        });
};

export const signup = (email, password) => {
    return axiosInstance
        .post("/users/signup", { email, password })
        .catch((data) => {
            return data.message;
        });
};

export const getUserSettings = () => {
    return axiosAuthenticatedInstance.get("/settings").catch((data) => {
        return data.message;
    });
};

/**
 *
 * @param {FormData} logoData
 * @returns
 */
export const updateLogo = (logoData) => {
    return axiosAuthenticatedFormInstance
        .patch("/settings/logo", logoData)
        .catch((data) => {
            return data.message;
        });
};

export const updateSettings = (email, body) => {
    return axiosAuthenticatedInstance
        .patch("/settings", { email, logo })
        .catch((data) => {
            return data.message;
        });
};

export const sendMail = (boardId) => {
    return axiosAuthenticatedInstance
        .post("/monday/generate-send-email", { boardId })
        .catch((data) => {
            return data.message;
        });
};
