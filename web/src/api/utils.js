import axios from "axios";

const HOST = "http://localhost:5000/v1"

export const API = axios.create({
    baseURL: HOST,
});


export const handleApiError = (err) => {
    try {
        const error = err.response?.data?.error || "An unexpected error occurred.";
        const data = null;
        return { error, data };
    } catch (err) {
        console.error(err);
    }
};