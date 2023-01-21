import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar, ToggleColorMode, LoginForm, RegisterForm } from "./components";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <ToggleColorMode />
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
