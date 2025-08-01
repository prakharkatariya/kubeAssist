// import Logo from '@/assets/images/iD-W.svg';
import CarelonLogo from '@/assets/images/logo_carelon_text.png';
import LoginForm from '@components/auth/LoginForm';

function Login() {
  return (
    <>
      <img
        src={CarelonLogo}
        alt="logo"
        style={{
          height: '30px',
        }}
      />
      <LoginForm />
    </>
  );
}

export default Login;
