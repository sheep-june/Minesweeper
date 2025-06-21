import styles from "./PageSizeSelect.module.css";
import PropTypes from "prop-types";

const PageSizeSelect = ({ pageSize, setPageSize }) => {
  return (
    <select
      className={styles.pageSizeSelect}
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 50, 100].map((size) => (
        <option key={size} value={size}>
          {size}개씩 보기
        </option>
      ))}
    </select>
  );
};

PageSizeSelect.propTypes = {
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default PageSizeSelect;
