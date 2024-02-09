import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contact-operations';
// import { nanoid } from 'nanoid';
const pending = state => {
  state.loading = true;
};

const rejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};
const initialState = {
  contacts: [],
  loading: false,
  error: null,
};
const contactSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, pending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts = payload;
      })
      .addCase(fetchContacts.rejected, rejected)
      .addCase(addContact.pending, pending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts.push(payload);
      })
      .addCase(addContact.rejected, rejected)
      .addCase(deleteContact.pending, pending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contacts = state.contacts.filter(({ id }) => id !== payload);
      })
      .addCase(deleteContact.rejected, rejected);
  },
});

export default contactSlice.reducer;
