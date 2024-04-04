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

  //Об'єкт редюсерів нужно удалить? Без него не определяются функции addContact и deleteContact в файлах Contact и ContactForm?🤔--------------------------------------------------------------//

  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },

  //--------------------------------------------------------------------------------------------//

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
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
