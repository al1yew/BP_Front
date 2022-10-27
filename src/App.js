import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Link, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <main className="maincontent">
        <Outlet />
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
