import { createContext, useContext } from "react";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");
export const getUploadUrl = (filename) => `${API_BASE_URL.replace(/\/api$/, "")}/uploads/${encodeURIComponent(filename)}`;
export const getDownloadUrl = (filename) => `${getUploadUrl(filename)}?download=true`;

export const ApiContext = createContext(null);

const readResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationMessage = data.errors?.map((error) => error.message).join(" ");
    throw new Error(validationMessage || data.message || "The request could not be completed.");
  }

  return data;
};

const adminRequest = async (path, options = {}) => {
  const token = window.localStorage.getItem("aafi_admin_token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  return readResponse(response);
};

export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await readResponse(response);
  window.localStorage.setItem("aafi_admin_token", data.data.token);
  return data;
};

export const adminSignup = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return readResponse(response);
};

export const getAdminOrders = () => adminRequest("/orders?limit=1000");

export const getAdminOrder = (id) => adminRequest(`/orders/${id}`);

export const updateAdminOrder = (id, status, reason = "") =>
  adminRequest(`/orders/${id}/status`, {
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
      body: orderData,
    });
  } catch {
    throw new Error("Unable to connect to the order server. Please start the backend on http://localhost:5000 and try again.");
  }

  const data = await readResponse(response);
  if (data.emailSent === false) {
    const customerError = data.emailDetails?.customerError?.message;
    const adminError = data.emailDetails?.adminError?.message;
    throw new Error(`Your order was saved, but email delivery failed. ${customerError || adminError || "Please contact support."}`);
  }
  return data;
};

export const submitContact = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact/submitcontact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }),
  });

  const data = await readResponse(response);
  if (data.emailSent === false) {
    throw new Error("Your message was saved, but the notification email could not be sent. Please contact support.");
  }
  return data;
};

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi must be used within an ApiProvider");
  return context;
}
