import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BASE_ROUTE, ROOT_LINK } from "./component/util/Constants";
import CreateMenu from "./component/util/CreateMenu";
import CreateRoute from "./component/util/CreateRoute.jsx";

import Navbar from "./component/backbone/Header";
import Root from "./component/page/pendaftaran-peserta/Root.jsx";
import Footer from "./component/backbone/Footer";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Root />
      <Footer />
    </BrowserRouter>
  );
}
