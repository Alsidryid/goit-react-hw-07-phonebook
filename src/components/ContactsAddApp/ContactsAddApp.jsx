import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFilter } from '../../redux/filter/filter-slice';
import ConstactsList from '../ContactsList/ContactsList';
import PhoneForm from '../PhoneForm/PhoneForm';
import Filter from '../Filter/Filter';
import style from './ContactsAddApp.module.css';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/contacts/contact-operations';
import { selectFiltredContacts } from '../../redux/contacts/contact-selectors';

const ContactsAddApp = () => {
  const { contacts, loading, error } = useSelector(selectFiltredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContact = data => {
    dispatch(addContact(data));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={style.box}>
      <h1 className={style.title}>Phonebook</h1>
      <PhoneForm onSubmit={onAddContact} />
      <div>
        <h2 className={style.title}>Contacts</h2>
        <Filter onChange={changeFilter} />
        {loading && <p>...loading</p>}
        {error && <p>{error}</p>}
        {Boolean(contacts.length) && (
          <ConstactsList items={contacts} onDeleteContact={onDeleteContact} />
        )}
      </div>
    </div>
  );
};

export default ContactsAddApp;
