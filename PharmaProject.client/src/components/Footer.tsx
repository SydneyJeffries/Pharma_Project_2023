
function Footer() {
    return (
        <footer className="bg-dark text-light text-center p-3 d-flex ">
            <div className="container">
                &copy; {new Date().getFullYear()} Sydney's Project --All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
