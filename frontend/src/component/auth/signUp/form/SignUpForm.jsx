// SignUpForm.jsx
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormInput from '../../login/form/input/LoginFormInput.jsx';
import SizedBox from '../../../main/sizedBox/SizedBox.jsx';
import styles from './SignUpForm.module.css';
import AddressAuth from './addressAuth/AddressAuth.jsx';
import FlexCenterDiv from '../../../common/div/FlexCenterDiv.jsx';
import LoginFormButton from '../../login/button/LoginFormButton.jsx';
import {
  resetForm,
  setFormErrors,
  updateFormField,
} from '../../../../redux/slices/signUp/SignUpSlice.js';
import {
  checkId,
  signUp,
} from '../../../../redux/slices/signUp/SignUpThunk.js';

const SubTitle = () => <div className={styles.subTitle}>회원가입</div>;

const SignUpForm = () => {
  const dispatch = useDispatch();
  const idCardImageInputRef = useRef(null);

  // Redux 상태 가져오기
  const formData = useSelector((state) => state.signUp.formData);
  const formErrors = useSelector((state) => state.signUp.formErrors);
  const checkIdError = useSelector((state) => state.signUp.checkIdError);
  const isSigningUp = useSelector((state) => state.signUp.isSigningUp);
  const signUpSuccess = useSelector((state) => state.signUp.signUpSuccess);
  const signUpError = useSelector((state) => state.signUp.signUpError);

  const [idCardImage, setIdCardImage] = useState(null);

  /**
   * 입력 값 변경 핸들러
   * @param {Object} e - 이벤트 객체
   */
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idCardImage') {
      setIdCardImage(files[0]);
    } else {
      dispatch(updateFormField({ field: name, value }));
    }
  };

  /**
   * 주소 인증 상태 변경 핸들러
   * @param {number} value - 변경된 주소 인증 값 (0 또는 1)
   */
  const handleAddressAuthChange = (value) => {
    dispatch(updateFormField({ field: 'addressAuth', value }));
  };

  /**
   * 신분증 첨부 버튼 클릭 핸들러
   */
  const handleIdCardInputButtonClick = () => {
    idCardImageInputRef.current.click();
  };

  /**
   * 폼 데이터 검증 함수
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  const validateForm = () => {
    const errors = {
      id: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      idCardImage: '',
    };
    let isValid = true;

    // 아이디 검증
    if (!formData.id.trim()) {
      errors.id = '아이디를 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 검증
    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 확인 검증
    if (!formData.passwordConfirmation) {
      errors.passwordConfirmation = '비밀번호 확인을 입력해주세요.';
      isValid = false;
    }

    // 비밀번호 일치 검증
    if (formData.password !== formData.passwordConfirmation) {
      errors.passwordConfirmation =
        '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      isValid = false;
    }

    if (formData.addressAuth === 0) {
      errors.addressAuth = '현재 신분증 자동 인증은 구현중에 있습니다.';
      isValid = false;
    }

    // 이메일 검증
    if (!formData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = '유효한 이메일 주소를 입력해주세요.';
        isValid = false;
      }
    }

    // 신분증 이미지 검증
    if (!idCardImage) {
      errors.idCardImage = '신분증 이미지를 첨부해주세요.';
      isValid = false;
    }

    return {
      isValid,
      errors,
    };
  };

  /**
   * 회원가입 버튼 클릭 핸들러
   * @param {Object} e - 이벤트 객체
   */
  const handleSignUp = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    console.log('hi');

    // 폼 데이터 검증
    const { isValid, errors } = validateForm();
    console.log('hi2');
    if (!isValid) {
      // 검증 실패 시 에러 메시지 상태 업데이트
      dispatch(setFormErrors(errors));
      return;
    }
    console.log('hi3');

    // 검증 통과 시 서버로 데이터 전송을 위한 액션 디스패치
    dispatch(signUp({ ...formData, idCardImage }));
  };

  /**
   * 아이디 중복 검증 핸들러
   * @param {Object} e - 이벤트 객체
   */
  const handleIdBlur = async (e) => {
    const id = formData.id.trim();
    if (!id) return; // 아이디가 비어있으면 검증하지 않음

    // Redux 액션 디스패치하여 아이디 중복 검증 요청
    dispatch(checkId(id));
  };

  /**
   * 회원가입 성공 시 알림 및 폼 초기화
   */
  useEffect(() => {
    if (signUpSuccess) {
      alert('회원가입에 성공했습니다!');
      dispatch(resetForm());
      // 로그인 페이지로 이동
      window.location.href = '/login';
    }
  }, [signUpSuccess, dispatch]);

  /**
   * 회원가입 실패 시 알림
   */
  useEffect(() => {
    if (signUpError) {
      alert(`회원가입에 실패했습니다: ${signUpError}`);
    }
  }, [signUpError]);

  return (
    <form onSubmit={handleSignUp}>
      {/* 서브 타이틀 컴포넌트 */}
      <SubTitle />
      <div>
        {/* 아이디 입력 필드 */}
        <LoginFormInput
          type='text'
          value={formData.id}
          name='id'
          onChange={handleInputChange}
          onBlur={handleIdBlur} // onBlur 핸들러 전달
          placeholder='아이디'
          error={formErrors.id || checkIdError} // 에러 메시지 전달
        />
        <SizedBox height={20} /> {/* 입력 필드 간 공간 추가 */}
        {/* 비밀번호 입력 필드 */}
        <LoginFormInput
          type='password'
          value={formData.password}
          name='password'
          onChange={handleInputChange}
          placeholder='비밀번호'
          error={formErrors.password} // 에러 메시지 전달
        />
        <SizedBox height={20} />
        {/* 비밀번호 확인 입력 필드 */}
        <LoginFormInput
          type='password'
          value={formData.passwordConfirmation}
          name='passwordConfirmation'
          onChange={handleInputChange}
          placeholder='비밀번호 확인'
          error={formErrors.passwordConfirmation} // 에러 메시지 전달
        />
        <SizedBox height={20} />
        {/* 이메일 입력 필드 */}
        <LoginFormInput
          type='email'
          value={formData.email}
          name='email'
          onChange={handleInputChange}
          placeholder='이메일'
          error={formErrors.email} // 에러 메시지 전달
        />
        <SizedBox height={20} />
      </div>

      {/* 주소 인증 컴포넌트 */}
      <AddressAuth
        error={formErrors.addressAuth}
        addressAuth={formData.addressAuth} // 현재 주소 인증 상태 전달
        setAddressAuth={handleAddressAuthChange} // 주소 인증 상태 변경 함수 전달
      />

      {/* 신분증 첨부하기 버튼 */}
      {!idCardImage && (
        <div
          className={styles.addIdCard}
          onClick={handleIdCardInputButtonClick}
        >
          + 신분증 첨부하기
        </div>
      )}
      {idCardImage && (
        <div
          className={styles.idCardImageName}
          onClick={handleIdCardInputButtonClick}
        >
          {idCardImage.name}
        </div>
      )}

      {/* 신분증 이미지 업로드 input (숨김 처리) */}
      <input
        type='file'
        name='idCardImage'
        ref={idCardImageInputRef}
        onChange={handleInputChange}
        style={{ display: 'none' }} // 화면에 보이지 않도록 숨김
        accept='image/*' // 이미지 파일만 선택 가능하도록 설정
      />

      {/* 회원가입 버튼을 중앙에 배치 */}
      <FlexCenterDiv
        marginTop={40}
        Content={
          <LoginFormButton
            type='submit' // 폼 제출 버튼으로 설정
            buttonText='회원가입' // 버튼 텍스트 설정
            disabled={isSigningUp} // 회원가입 중일 때 버튼 비활성화
          />
        }
      />
    </form>
  );
};

export default SignUpForm; // SignUpForm 컴포넌트 내보내기
