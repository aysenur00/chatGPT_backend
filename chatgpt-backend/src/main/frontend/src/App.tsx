import './App.css';
import Layout from './components/Layout';
import Learn from './pages/Learn/Learn'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Button } from '@mantine/core';
import HeroBullets from './pages/Hero/Hero';
import Week from './pages/Week/Week';
import About from './pages/About/About';
import { AuthenticationForm } from './pages/Login/AuthenticationForm'
import { Register } from './pages/Register/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { NotFoundTitle } from './pages/NotFound/NotFoundTitle';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HeroBullets />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:id" element={<Week />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<AuthenticationForm />}></Route>
              <Route path="/signup" element={<Register />}></Route>
            </Route>
            <Route path='*' element={<NotFoundTitle />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
