import { getCookie } from "../../helper/cookie";

const HomePage = ({  }) => {

    const authorized = getCookie('authorized');

    return (
        <div>{authorized ?? 'null'}</div>
    );
}
export default HomePage;