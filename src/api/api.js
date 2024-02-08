import axios from 'axios';

const contactIstance = axios.create({
  baseURL: 'https://65c39ff939055e7482c14924.mockapi.io/phonebook/contacts',
});

export const requestLoadContacts = async () => {
  const { data } = await contactIstance.get('/');
  return data;
};

export const requestAddContact = async body => {
  const { data } = await contactIstance.post('/', body);
  return data;
};

export const requestDeleteContact = async id => {
  const { data } = await contactIstance.delete(`/${id}`);
  return data;
};
