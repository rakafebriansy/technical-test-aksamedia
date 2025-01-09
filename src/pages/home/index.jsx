import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helper/cookie";
import Layout from "../../components/Layout";

const HomePage = ({  }) => {

    const navigate = useNavigate();
    const authorized = getCookie('authorized');

    if(!authorized) {
        navigate('/login');
    }

    return (
        <Layout>
            <div></div>
        </Layout>
    );
}
export default HomePage;