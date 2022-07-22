import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = props => (
  <>
    <label className={styles.label} htmlFor="name">
      Find contact by name:
    </label>
    <input
      onChange={props.onChange}
      value={props.value}
      className={styles.input}
      type="text"
      name="name"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
    />
  </>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
