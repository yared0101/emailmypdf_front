import axios from "axios";
import { BASE_URL } from "../constants";
export const axiosAuthenticatedInstance = () =>
    axios.create({
        baseURL: BASE_URL,
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
        },
    });
export const axiosAuthenticatedFormInstance = () =>
    axios.create({
        baseURL: BASE_URL,
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
        },
    });
export const axiosInstance = () =>
    axios.create({
        baseURL: BASE_URL,
    });
