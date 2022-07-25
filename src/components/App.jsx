import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import EmptyMessage from './EmptyMessage/EmptyMessage';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const parsedContact = JSON.parse(localStorage.getItem('contacts')) ?? [];
    this.setState({ contacts: parsedContact });
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  addContact = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = this.state;
      const allContacts = contacts.reduce((acc, contact) => {
        acc.push(contact.name.toLocaleLowerCase());
        return acc;
      }, []);

      if (allContacts.includes(name.toLocaleLowerCase())) {
        return alert(`${name} already in contacts.`);
      }
      const newContact = { id: nanoid(), name, number };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };
  makeFilteredMarkup = () => {
    const lowerCaseFilter = this.state.filter.toLocaleLowerCase();
    const filteredArray = [...this.state.contacts].filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCaseFilter)
    );
    return filteredArray;
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };
  render() {
    return (
      <div>
        <h1 className="title_phonebook">Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className="title_contacts">Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <ContactList
              contacts={this.makeFilteredMarkup()}
              onDelClick={this.deleteContact}
            />
          </>
        ) : (
          <EmptyMessage />
        )}
      </div>
    );
  }
}
