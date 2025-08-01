import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    navigate(`/dashboard`);
  };

  return (
    <>
      <div>
        <button type="button" onClick={handleLogin}>
          SignIn
        </button>
      </div>
    </>
  );
}

export default LoginForm;
