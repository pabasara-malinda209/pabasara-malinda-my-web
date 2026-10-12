import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL;

export const sendContact = async (payload) => {
  if (!BASE) throw new Error("Backend is not configured");
  const res = await axios.post(`${BASE}/api/contact`, payload);
  return res?.data ?? {};
};
