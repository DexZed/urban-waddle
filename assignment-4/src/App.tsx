import { Outlet } from "react-router"
import AppContainer from "./layout/Container";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <AppContainer>
        <Nav></Nav>
        <Outlet></Outlet>
        <Footer></Footer>
      </AppContainer>
    </>
  );
}

export default App;
