import AuthForm from '../components/AuthForm';

const LoginPage = ({ setIsAuthenticated, setUser }) => {
    return (
        <div className="login-page">
            <AuthForm type="login" setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        </div>
    );
};

export default LoginPage;