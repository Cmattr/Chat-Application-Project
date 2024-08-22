import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type SignOutProps = {
    socket: any;
    children?: React.ReactNode;
}

const Signout: React.FC<SignOutProps> = ({socket, children}) => {
    const navigate = useNavigate();
    const handleSignout = () => {
        sessionStorage.removeItem('userName')
        socket.emit("signout")
        navigate("/")
    }

    return (
        <Button onClick={handleSignout}>Log Out <i className="bi bi-box-arrow-in-left"></i></Button>
    );
}

export default Signout;
