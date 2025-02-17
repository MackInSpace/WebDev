//import React from "react";
//import { Container, Navbar, NavbarBrand } from "reactstrap";
//import NucampLogo from "./app/assets/img/logo.png";
import "./App.css";
import CampsitesDirectoryPage from './pages/CampsitesDirectoryPage';
import Header from './components/Header';
import Footer from './components/Footer';
//import { CAMPSITES } from './app/shared/CAMPSITES';

function App() {
  return (
    <div className="App">
      <Header />
      <CampsitesDirectoryPage campsite={[0]} />
      <Footer />
    </div>
  );
}

export default App;
