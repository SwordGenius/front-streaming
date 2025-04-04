import UploadForm from '../components/UploadForm';

const UploadPage = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <div className="unauthorized">Please login to access this page</div>;
    }

    return (
        <div className="upload-page">
            <UploadForm />
        </div>
    );
};

export default UploadPage;