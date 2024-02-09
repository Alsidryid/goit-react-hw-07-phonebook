import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsApi from '../../api/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await contactsApi.requestLoadContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, { rejectWithValue }) => {
    try {
      const data = await contactsApi.requestAddContact(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      const normalizetName = name.toLowerCase();
      const dublicateName = contacts.contacts.find(item => {
        const normalizetCurrentName = item.name.toLowerCase();
        return normalizetCurrentName === normalizetName;
      });
      if (dublicateName) {
        alert(`${name} is already in contacts`);
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await contactsApi.requestDeleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// export const fetchContacts = () => {
//   const func = async dispatch => {
//     try {
//       dispatch(fetchContactsLoading());
//       const data = await contactsApi.requestLoadContacts();
//       dispatch(fetchContactsSuccess(data));
//     } catch (error) {
//       dispatch(fetchContactsError(error.message));
//     }
//   };
//   return func;
// };

// export const addContacts = body => {
//   const func = async dispatch => {
//     try {
//       dispatch(addContactsLoading());
//       const data = await contactsApi.requestAddContact(body);
//       dispatch(addContactsSuccess(data));
//     } catch (error) {
//       dispatch(addContactsError(error.message));
//     }
//   };
//   return func;
// };

// export const deleteContact = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(deleteContactsLoading());
//       await contactsApi.requestDeleteContact(id);
//       dispatch(deleteContactsSuccess(id));
//     } catch (error) {
//       dispatch(deleteContactsError(error.message));
//     }
//   };
//   return func;
// };
