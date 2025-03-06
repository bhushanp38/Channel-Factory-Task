import axios from "redux/actions/axiosConfig";
import notify from "utilities/Notifications/Notify";

import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getGeocode = async (address) => {
  try {
    const response = await axios.post(`${API_URL}/geocode/`, { address });
    return response.data;
  } catch (error) {
    console.error("Geocode Error:", error);
    return null;
  }
};

export const getDistance = async (from, to) => {
  try {
    const response = await axios.post(`${API_URL}/distance/`, { from, to });
    return response.data;
  } catch (error) {
    console.error("Distance Error:", error);
    return null;
  }
};

// ==================== Auth Actions ====================
export const login = (userData) => {
  return {
    type: "LOGIN",
    payload: userData,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

// ==================== Login ====================

export const loggingIn = async (data) => {
  try {
    const response = await axios.post(`user/login/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response for login:", response);
    if (response.status === 200) {
      notify("You are successfully logged in.", "success");
      return response;
    } else if (response.status === 400) {
      notify(response.data?.error ?? "Error while login", "error");
    } else {
      notify("Error while login", "error");
    }
  } catch (err) {
    console.log("loggingIn Error", err);
    if (err?.response?.status === 200) {
      notify("You are successfully logged in.", "success");
      return err?.response;
    } else if (err?.response?.status === 400) {
      notify(err?.response.data?.error ?? "Error while login", "error");
    } else {
      notify("Error while login! Try again.", "error");
    }
  }
};

// ==================== SignUp ====================
export const signUp = async (data) => {
  try {
    const response = await axios.post(`/user/signup/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response", response);
    if (response.status === 201) {
      notify("You have successfully signed up", "success");
      return response;
    } else if (response.status === 400) {
      notify(response.data?.error ?? "Error while signing up", "error");
    } else {
      notify("Error while signing up", "error");
    }
  } catch (err) {
    console.log("Error", err);
    if (err?.response?.status === 200) {
      notify("You are successfully signed up", "success");
      return err?.response;
    } else if (err?.response?.status === 400) {
      notify(err?.response.data?.error ?? "Error while login", "error");
    } else {
      notify("Error while signing up", "error");
    }
  }
};

// ==================== VERIFY ====================
export const verifyEmailToken = async () => {
  try {
    const response = await axios.get(`/user/verify-email-token/`);
    if (response.status === 200) {
      console.log("verifyEmailToken Response", response);
      return response;
    }
  } catch (err) {
    console.log("verifyEmailToken Error", err);
    notify("Could not fetch categories", "error");
  }
};

// ==================== Logout ====================
export const loggingOut = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`user/logout/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response for logout:", response);
      if (response.status === 204) {
        notify("You are successfully logged out.", "success");
      }
    } catch (err) {
      console.log("Error", err);
      notify("Error in logging out! Try again.", "error");
    }
  };
};
