import AuthForm from '../components/AuthForm';

const RegisterPage = ({ setIsAuthenticated, setUser }) => {
    return (
        <div className="register-page">
            <AuthForm type="register" setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        </div>
    );
};

export default RegisterPage;