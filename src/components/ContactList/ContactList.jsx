import React from 'react';
import PropTypes from 'prop-types';
import { List, Delete, ListItem } from './contact-list.styled';

function ContactList({ findContactsArray, onClick }) {
  return (
    <List>
      {findContactsArray.map(item => {
        return (
          <ListItem key={item.id}>
            <span>
              {item.name}:{item.number}
            </span>

            <Delete onClick={() => onClick(item.id)} type="button">
              Delete
            </Delete>
          </ListItem>
        );
      })}
    </List>
  );
}

export default ContactList;

ContactList.propTypes = {
  onClick: PropTypes.func.isRequired,
  findContactsArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
