import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./contactsOps";
import { selectContacts, selectNameFilter } from "./selectors";

// початковий стан Redux
export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

// фильтрация коллекции
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
        contact.number.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);
