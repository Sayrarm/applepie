import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header, Footer, BackTopButton } from "@components";

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
        <BackTopButton />
      </div>
    </>
  );
}

export default Layout;
