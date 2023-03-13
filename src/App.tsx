import React, { Suspense } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Pages/Main";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/Pages/NotFound";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './components/Pages/Cart'));
const PizzaItem = React.lazy(() => import(/* webpackChunkName: "PizzaItem" */ './components/Pages/PizzaItem'));

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cart" element={
                <Suspense fallback={<div>Загрузка корзины...</div>}>
                  <Cart />
                </Suspense>} />
              <Route path="/pizza/:id" element={
                <Suspense fallback={<div>Загрузка...</div>}>
                  <PizzaItem />
                </Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
