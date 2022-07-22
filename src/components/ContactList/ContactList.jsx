import styles from './ContactList.module.css';
import ContactListItem from './ContactListItem/ContactListItem';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelClick }) => {
  if (contacts.length === 0) {
    return <p className={styles.empty}>No contact with this name</p>;
  }
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          <ContactListItem
            id={id}
            name={name}
            number={number}
            onClick={onDelClick}
          />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelClick: PropTypes.func.isRequired,
};

export default ContactList;
