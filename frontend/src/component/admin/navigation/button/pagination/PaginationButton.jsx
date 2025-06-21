import styles from './PaginationButton.module.css';
import PropTypes from 'prop-types';

/**
 * PaginationButton 컴포넌트는 페이지네이션을 위한 버튼을 렌더링합니다.
 * 버튼 안에 이미지를 포함하고 있으며, 다양한 이벤트 핸들러를 전달받을 수 있습니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성들
 * @param {string} props.buttonImagePath - 버튼에 표시될 이미지의 경로
 * @returns {JSX.Element} 렌더링된 페이지네이션 버튼 컴포넌트
 */
const PaginationButton = ({ buttonImagePath, ...props }) => {
  return (
    // 버튼 요소를 렌더링합니다.
    // 나머지 전달된 props (예: onClick, disabled 등)를 버튼에 전달합니다.
    <button {...props} className={styles.paginationButton}>
      {/* 버튼에 표시될 이미지를 렌더링합니다. */}
      <img
        className={styles.paginationButtonImage} // 이미지에 적용할 CSS 클래스
        src={buttonImagePath} // 이미지의 소스 경로
        alt='버튼 이미지' // 이미지의 대체 텍스트 (접근성을 위해 필수)
      />
    </button>
  );
};

// PaginationButton 컴포넌트의 prop 타입을 정의하여 잘못된 타입의 props가 전달되는 것을 방지합니다.
PaginationButton.propTypes = {
  // buttonImagePath는 문자열이어야 하며, 필수 prop으로 지정할 수도 있습니다.
  buttonImagePath: PropTypes.string.isRequired,
};

// PaginationButton 컴포넌트를 기본으로 내보냅니다.
export default PaginationButton;
