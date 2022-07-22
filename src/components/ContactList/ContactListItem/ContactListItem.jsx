import styles from './ContactListItem.module.css';
import PropTypes from 'prop-types';
const ContactListItem = ({ id, name, number, onClick }) => {
  return (
    <>
      <p className={styles.text}>
        <span className={styles.span}>{name}:</span> {number}
      </p>
      <button
        className={styles.delBtn}
        onClick={() => onClick(id)}
        type="button"
      >
        Delete
      </button>
    </>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactListItem;
