import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import EmptyMessage from './EmptyMessage/EmptyMessage';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    setContacts(prevState => {
      const allContacts = prevState.reduce((acc, contact) => {
        acc.push(contact.name.toLocaleLowerCase());
        return acc;
      }, []);

      if (allContacts.includes(name.toLocaleLowerCase())) {
        alert(`${name} already in contacts.`);
        return contacts;
      }
      const newContact = { id: nanoid(), name, number };
      return [...prevState, newContact];
    });
  };
  const makeFilteredMarkup = () => {
    const lowerCaseFilter = filter.toLocaleLowerCase();
    const filteredArray = [...contacts].filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCaseFilter)
    );
    return filteredArray;
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1 className="title_phonebook">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="title_contacts">Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={makeFilteredMarkup()}
            onDelClick={deleteContact}
          />
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
