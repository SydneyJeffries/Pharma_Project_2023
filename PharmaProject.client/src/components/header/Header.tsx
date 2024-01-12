import { NavLink } from "react-router-dom";
import './header.css';
function Header() {

    const env: string = import.meta.env.MODE;

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> My Pharmacies</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to={`/`} exact className="nav-item " activeClassName="active-link">
                            <span className="nav-link link-primary">Pharmacies</span>
                        </NavLink>
                        <NavLink to={`/delivey/0`} className="nav-item" activeClassName="active-link" id="deliveryNav" >
                            <span className="nav-link link-primary">Deliveries</span>
                        </NavLink>
                    </div>
                    <div className=" text-md-end flex-1 text-start">
                        <span className=" nav-link text-green  fw-bold" > {env == "development" ? env.charAt(0).toUpperCase() + env.slice(1) + ' Environment' : ""} </span>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Header;
