import { createContext, useContext } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");
export const getUploadUrl = (filename) => `${API_BASE_URL.replace(/\/api$/, "")}/uploads/${encodeURIComponent(filename)}`;
export const getDownloadUrl = (filename) => `${getUploadUrl(filename)}?download=true`;

export const ApiContext = createContext(null);
let accessToken = "";
let onAuthenticationExpired = () => {};
let refreshPromise;

export const setAuthentication = (token, onExpired = onAuthenticationExpired) => {
  accessToken = token || "";
  onAuthenticationExpired = onExpired;
};

const readResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationMessage = data.errors?.map((error) => error.message).join(" ");
    const error = new Error(validationMessage || data.message || "The request could not be completed.");
    error.status = response.status;
    throw error;
  }

  return data;
};

const requestSession = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  return readResponse(response);
};

export const login = async (email, password, role) => {
  const data = await requestSession("/auth/login", { email, password, ...(role ? { role } : {}) });
  setAuthentication(data.data.accessToken);
  return data;
};

export const signup = async (name, email, password) => {
  const data = await requestSession("/auth/signup", { name, email, password });
  setAuthentication(data.data.accessToken);
  return data;
};

export const refreshSession = async () => {
  if (!refreshPromise) {
    refreshPromise = requestSession("/auth/refresh")
      .then((data) => {
        setAuthentication(data.data.accessToken);
        return data.data;
      })
      .catch((error) => {
        if (error.status === 401) {
          setAuthentication("");
          onAuthenticationExpired();
          return null;
        }
        throw error;
      })
      .finally(() => {
        refreshPromise = undefined;
      });
  }
  return refreshPromise;
};

export const logout = async () => {
  try {
    await requestSession("/auth/logout");
  } finally {
    setAuthentication("");
    onAuthenticationExpired();
  }
};

const authenticatedFetch = async (path, options = {}) => {
  const makeRequest = () => fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });
  let response = await makeRequest();
  if (response.status === 401 && accessToken) {
    const session = await refreshSession();
    if (session) response = await makeRequest();
  }
  return readResponse(response);
};

export const getAdminOrders = () => authenticatedFetch("/orders?limit=1000");

export const getAdminOrder = (id) => authenticatedFetch(`/orders/${id}`);

export const updateAdminOrder = (id, status, reason = "") =>
  authenticatedFetch(`/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, reason }),
  });

export const submitOrder = async ({ form, files }) => {
  const orderData = new FormData();

  // CLIENT DETAILS
  orderData.append("clientName", form.clientName || "");
  orderData.append("email", form.emailAddress || "");

  // BOOK INFORMATION
  orderData.append("bookTitle", form.bookTitle || "");
  orderData.append("wordCount", form.wordCount || "");
  orderData.append("subtitle", form.subtitle || "");
  orderData.append("bookSize", form.bookSize || "");
  orderData.append("authorName", form.authorName || "");

  // BACK-COVER MATERIALS
  orderData.append("bookDescription", form.bookDescription || "");
  orderData.append("authorBio", form.authorBio || "");

  // CREATIVE DIRECTION
  orderData.append("colorsToExplore", form.colorsToExplore || "");
  orderData.append("designNeeds", form.designNeeds || "");
  orderData.append("symbolsImagery", form.symbolsImagery || "");
  orderData.append("toneOrMood", form.toneOrMood || "");
  orderData.append("preferredStyle", form.preferredStyle || "");
  orderData.append("otherDetails", form.otherDetails || "");

  // FILES TO PROVIDE
  if (files?.authorHeadshot instanceof File) orderData.append("authorHeadshot", files.authorHeadshot);
  if (files?.sampleCover1 instanceof File) orderData.append("sampleCover1", files.sampleCover1);
  if (files?.sampleCover2 instanceof File) orderData.append("sampleCover2", files.sampleCover2);
  if (files?.sampleCover3 instanceof File) orderData.append("sampleCover3", files.sampleCover3);
  if (files?.printCoverTemplate instanceof File) orderData.append("printCoverTemplate", files.printCoverTemplate);
  if (files?.additionalDocument instanceof File) orderData.append("additionalDocument", files.additionalDocument);
  if (files?.isbnFile instanceof File) orderData.append("isbnFile", files.isbnFile);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      credentials: "include",
      body: orderData,
    });
  } catch {
    throw new Error("Unable to connect to the order server. Please start the backend on http://localhost:5000 and try again.");
  }

  const data = await readResponse(response);
  if (data.emailSent === false) {
    console.warn("Order submitted successfully, but email dispatch failed:", data.emailDetails);
  }
  return data;
};

export const submitContact = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact/submitcontact`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }),
  });

  const data = await readResponse(response);
  if (data.emailSent === false) {
    console.warn("Contact submitted successfully, but notification email could not be sent:", data.emailDetails);
  }
  return data;
};

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within an ApiProvider");
  return context;
}
