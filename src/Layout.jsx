import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { FloatButton } from 'antd';

function Layout() {
    return (
        <div className="container">
            <Header />
            <ScrollRestoration />
            <main className="main">
                <Outlet /> {/* сюда подставляются страницы */}
            </main>
            <Footer />
            <FloatButton.BackTop />
        </div>
    );
}

export default Layout;