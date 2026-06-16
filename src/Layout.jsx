import {Outlet, ScrollRestoration} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackTopButton from "./components/BackTopButton.jsx";

function Layout() {
    return (
        <>
            <div className="fixed-bg"></div>
            <div className="container">
                <Header />
                <ScrollRestoration />
                <main className="main">
                    <Outlet /> {/* сюда подставляются страницы */}
                </main>
                <Footer />
                <BackTopButton/>
            </div>
        </>
    );
}

export default Layout;