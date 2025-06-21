import AuthContainer from '../../component/auth/container/AuthContainer.jsx';
import SignUpForm from '../../component/auth/signUp/form/SignUpForm.jsx';

const SignUp = () => (
  <>
    <AuthContainer
      Content={
        <>
          <SignUpForm />
        </>
      }
    />
  </>
);

export default SignUp;
