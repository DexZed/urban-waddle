import { Outlet } from "react-router"


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
