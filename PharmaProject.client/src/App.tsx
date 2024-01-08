import Home from './views/home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Delivery from './views/delivery/Delivery';

function App() {

    return (
        <div className="app  ">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/delivey/:pharmacyId">
                        <Delivery />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    )
}

export default App;
