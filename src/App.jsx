import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BASE_ROUTE, ROOT_LINK } from "./component/util/Constants";
import CreateMenu from "./component/util/CreateMenu";
import CreateRoute from "./component/util/CreateRoute.jsx";

import Navbar from "./component/backbone/Header";
import Form from "./component/page/pendaftaran-peserta/Add.jsx";
import Footer from "./component/backbone/Footer";


export default function App() {
  return (
    <>
    <div>
      <Navbar />  
    </div>
    <div>
      <Form /> 
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
}
