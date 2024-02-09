export const selectAllContacts = store => store.contacts;

export const selectFiltredContacts = store => {
  const { filter } = store;
  const { contacts, loading, error } = store.contacts;

  if (!filter) {
    return store.contacts;
  }
  const normalizetFilter = filter.toLowerCase();

  const filtredContacts = contacts.filter(({ name }) => {
    const normalizetName = name.toLowerCase();
    return normalizetName.includes(normalizetFilter);
  });

  return {
    contacts: filtredContacts,
    loading,
    error,
  };
};
