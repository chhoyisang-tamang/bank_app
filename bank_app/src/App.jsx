import { useState } from "react";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Deposit from "./pages/Deposit/Deposit";
import Withdraw from "./pages/Withdraw/Withdraw";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions/Transactions";
import Cards from "./pages/Cards/Cards";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import MainLayout from "./provider/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />} />
      
      <Route path = '/'element = {<MainLayout /> }>
          <Route index element = {<Home /> } />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="profile" element={<Profile />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="cards" element={<Cards />} />
      </Route>
    </Routes>
  );
}

export default App;