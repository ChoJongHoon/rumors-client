import axios from "axios";

export const sendCode = ({ id, code }) =>
  axios.post("/api/mail/send/code", { id, code });
