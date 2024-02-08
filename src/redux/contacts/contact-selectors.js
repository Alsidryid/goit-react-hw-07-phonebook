export const selectAllContacts = store => store.contacts;

export const selectFiltredContacts = store => {
  const { contacts, filter } = store;
  if (!filter) {
    return contacts;
  }
  return contacts.filter(({ name }) => {
    return name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });
};
