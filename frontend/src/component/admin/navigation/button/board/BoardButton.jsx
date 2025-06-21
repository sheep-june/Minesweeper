import styles from './BoardButton.module.css';
import PropTypes from 'prop-types';

/**
 * BoardButton 컴포넌트는 특정 타입이 선택되었는지 여부에 따라 다른 스타일을 적용하는 버튼입니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성들
 * @param {string} props.buttonText - 버튼에 표시될 텍스트
 * @param {string} props.selectedType - 현재 선택된 타입
 * @returns {JSX.Element} 렌더링된 버튼 컴포넌트
 */
const BoardButton = ({ buttonText, selectedType, ...props }) => {
  // buttonText와 selectedType을 콘솔에 출력하여 디버깅에 활용합니다.

  return (
    <button
      // buttonText가 selectedType과 같으면 activeButton 스타일을, 그렇지 않으면 unActiveButton 스타일을 적용합니다.
      className={
        buttonText === selectedType
          ? styles.activeButton
          : styles.unActiveButton
      }
      // 나머지 전달된 props를 버튼에 전달합니다 (예: onClick, disabled 등).
      {...props}
    >
      {/* 버튼에 표시될 텍스트를 렌더링합니다. */}
      {buttonText}
    </button>
  );
};

// BoardButton 컴포넌트의 prop 타입을 정의하여 잘못된 타입의 props가 전달되는 것을 방지합니다.
BoardButton.propTypes = {
  // buttonText는 문자열이어야 합니다.
  buttonText: PropTypes.string.isRequired,

  // selectedType은 문자열이어야 합니다.
  selectedType: PropTypes.string.isRequired,
};

// BoardButton 컴포넌트를 기본으로 내보냅니다.
export default BoardButton;
