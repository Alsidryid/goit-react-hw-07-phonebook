import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setFilter } from '../../redux/filter/filter-slice';
import ConstactsList from '../ContactsList/ContactsList';
import PhoneForm from '../PhoneForm/PhoneForm';
import Filter from '../Filter/Filter';
import style from './ContactsAddApp.module.css';
import {
  fetchContacts,
  addContacts,
  deleteContacts,
} from '../../redux/contacts/contact-operations';
import { selectAllContacts } from '../../redux/contacts/contact-selectors';

const ContactsAddApp = () => {
  const { contacts, loading, error } = useSelector(selectAllContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isDublicate = ({ name }) => {
    const normalizetName = name.toLowerCase();
    const dublicateName = contacts.find(item => {
      const normalizetCurrentName = item.name.toLowerCase();
      return normalizetCurrentName === normalizetName;
    });
    return Boolean(dublicateName);
  };

  const onAddContact = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} is already in contacts`);
    }

    dispatch(addContacts(data));
  };

  const onDeleteContact = id => {
    dispatch(deleteContacts(id));
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
