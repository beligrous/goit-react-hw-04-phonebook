import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from './contact-form.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmitContact = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmitContact}>
        <label>
          Name
          <Input
            type="text"
            onChange={this.handleChange}
            value={name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <Input
            onChange={this.handleChange}
            value={number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
