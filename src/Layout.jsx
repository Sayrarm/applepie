import {Outlet, ScrollRestoration} from 'react-router-dom';
import Header from '@components/header/Header.jsx';
import Footer from '@components/footer/Footer.jsx';
import BackTopButton from "@components/ui/BackTopButton.jsx";

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