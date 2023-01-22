import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from './theme'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar, LoginForm, RegisterForm, ToggleColorMode } from "./components";
import { Individual } from "./container";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NavBar />
        <ToggleColorMode />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/individual" element={<Individual />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>

);
