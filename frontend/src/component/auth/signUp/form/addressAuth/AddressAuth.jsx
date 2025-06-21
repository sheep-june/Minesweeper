import styles from './AddressAuth.module.css';
import PropTypes from 'prop-types';

const AddressAuth = ({ error, addressAuth, setAddressAuth }) => {
  const handleRadioChange = (e) => {
    const NewValue = Number(e.target.value);
    setAddressAuth(NewValue);
  };

  return (
    <div className={styles.container}>
      <AddressAuthTitle />
      {/*Radio 버튼 Div*/}
      <div className={styles.radioDiv}>
        {/*자동인증 버튼*/}
        <label className={styles.radioLabel}>
          <input
            type='radio'
            name='addressAuth'
            value={0}
            checked={addressAuth === 0}
            onChange={handleRadioChange}
            className={styles.radioInput}
          />
          <span className={styles.customRadio}></span>
          자동인증
        </label>
        {/*수동인증 버튼*/}
        <label className={styles.radioLabel}>
          <input
            type='radio'
            name='addressAuth'
            value={1}
            checked={addressAuth === 1}
            onChange={handleRadioChange}
            className={styles.radioInput}
          />
          <span className={styles.customRadio}></span>
          수동인증
        </label>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

const AddressAuthTitle = () => (
  <div className={styles.addressAuthTitle}>주소인증</div>
);

AddressAuth.propTypes = {
  error: PropTypes.string,
  addressAuth: PropTypes.number.isRequired,
  setAddressAuth: PropTypes.func.isRequired,
};

export default AddressAuth;
