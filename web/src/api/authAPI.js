import { API, handleApiError } from "./utils";

export const registerUserApi = async (formData) => {
  try {
    const res = await API.post("/users/register", formData);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUserApi = async (formData) => {
  try {
    const res = await API.post("/users/login", formData);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUserApi = async (authToken) => {
  try {
    const headers = {
     'Authorization': `Bearer ${authToken}`
    };
    const res = await API.post("/users/fetch", {}, { headers });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUserApi = async (authToken, formData) => {
  try {
    const headers = {
      authToken: authToken,
    };
    const res = await API.put("/users/update", formData, { headers });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};
