import { Link } from "react-router-dom";
function Header() {

    const env: string = import.meta.env.MODE;

    return (
        <ul className="nav bg-white">
            <li className="nav-item fw-bold">
                <span className="nav-link text-green "> {env == "development" ? env.charAt(0).toUpperCase() + env.slice(1) +  ' Environment' : ""} </span>
            </li>
            <Link to={`/`} className="nav-item ">
                <span className="nav-link ">Pharmacies</span> 
            </Link>
        </ul>
    );
}

export default Header;
