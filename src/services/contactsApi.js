import axios from "axios";

axios.defaults.baseURL = "https://660db0066ddfa2943b350314.mockapi.io/contacts";

export const getContacts = async () => {
  const { data } = await axios.get("/contacts");
  return data;
};
