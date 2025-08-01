import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '85vh',
      }}
    >
      <div style={{ alignItems: 'center', justifyContent: 'center', maxWidth: 'md' }}>
        <span style={{ textAlign: 'center', fontWeight: 700 }} className='p-20'>404: Page Not Found</span>
        <span style={{ textAlign: 'center' }}>
          The page you are looking for could not be found or has been removed
        </span>
        <button type="button" onClick={() => navigate('/', { replace: true })}>
          Go back to home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
