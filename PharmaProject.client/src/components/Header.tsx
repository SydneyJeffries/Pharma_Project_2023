
function Header() {

    const env: string = import.meta.env.MODE;

    return (
        <ul className="nav">
            <li className="nav-item">
                <span className="nav-link text-green fw-bold"> {env.charAt(0).toUpperCase() + env.slice(1)} Environment</span>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="#">Pharmacies</a>
            </li>
            {/*<li className="nav-item">*/}
            {/*    <a className="nav-link" href="#">Link</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*    <a className="nav-link" href="#">Link</a>*/}
            {/*</li>*/}
        </ul>
    );
}

export default Header;
