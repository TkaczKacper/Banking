import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar, LoginForm, RegisterForm } from "./components";
import {
   Account,
   Individual,
   BankCurrency,
   MoneyTransfer,
   TransactionHistory,
} from "./container";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <CookiesProvider>
            <NavBar />
            <Routes>
               <Route path="/" element={<App />} />
               <Route path="/account" element={<Account />} />
               <Route path="/account/exchange" element={<BankCurrency />} />
               <Route path="/account/transfer" element={<MoneyTransfer />} />
               <Route
                  path="/account/history"
                  element={<TransactionHistory />}
               />
               <Route path="/individual" element={<Individual />} />
               <Route path="/login" element={<LoginForm />} />
               <Route path="/register" element={<RegisterForm />} />
               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </CookiesProvider>
      </BrowserRouter>
   </React.StrictMode>
);
