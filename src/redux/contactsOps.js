import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://660db0066ddfa2943b350314.mockapi.io/contacts";

// получение массива контактов
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// добавление нового контакта
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact) => {
    try {
      const { data } = await axios.post("", newContact);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

// удаление контакта по ID
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    try {
      const { data } = await axios.delete(`/${contactId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);
