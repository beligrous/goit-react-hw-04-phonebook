import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('contacts'));
    return data?.length > 0 ? data : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = data => {
    const { name, number } = data;
    const newContact = {
      name,
      id: nanoid(),
      number,
    };
    const nonEqualArray = contacts.reduce((acc, item) => {
      item.name.toLowerCase() !== newContact.name.toLowerCase() &&
        acc.push(item);
      return acc;
    }, []);

    if (nonEqualArray.length === contacts.length) {
      setContacts(contacts => [...contacts, newContact]);
    } else {
      alert(`${newContact.name} is already in contacts!`);
    }
  };

  const findContacts = () => {
    let filtered;
    if (filter === '') {
      return contacts;
    } else {
      filtered = contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return filtered;
  };

  const onClickDelete = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <div>
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        />
        <ContactList
          filter={filter}
          contacts={contacts}
          findContactsArray={findContacts()}
          onClick={onClickDelete}
        />
      </div>
    </Container>
  );
}

