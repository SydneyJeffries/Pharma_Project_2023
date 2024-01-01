import { Link } from "react-router-dom";
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
                        <Link to={`/`} className="nav-item ">
                            <span className="nav-link link-primary">Pharmacies</span>
                        </Link>
                        <Link to={`/`} className="nav-item">
                            <span className="nav-link link-primary">Deliveries</span>
                        </Link>
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
