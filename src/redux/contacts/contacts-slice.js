import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetchContactsLoading: state => {
      state.loading = true;
    },
    fetchContactsSuccess: (state, { payload }) => {
      state.loading = false;
      state.contacts = payload;
    },
    fetchContactsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    addContactsLoading: state => {
      state.loading = true;
      state.error = null;
    },
    addContactsSuccess: (state, { payload }) => {
      state.loading = false;
      state.contacts.push(payload);
    },
    addContactsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    deleteContactsLoading: state => {
      state.loading = true;
      state.error = null;
    },
    deleteContactsSuccess: (state, { payload }) => {
      state.loading = false;
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
    },
    deleteContactsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  addContact,
  deleteContact,
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  addContactsLoading,
  addContactsSuccess,
  addContactsError,
  deleteContactsLoading,
  deleteContactsSuccess,
  deleteContactsError,
} = contactSlice.actions;

export default contactSlice.reducer;
