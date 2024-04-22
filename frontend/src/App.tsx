import './App.css';
import Layout from './components/Layout';
import Learn from './pages/Learn/Learn'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HeroBullets from './pages/Hero/Hero';
import Week from './pages/Week/Week';
import About from './pages/About/About';
import Explore from './pages/Explore/Explore';
import Article from "./pages/Article/Article";
import { AuthenticationForm } from './pages/Login/AuthenticationForm'
import { Register } from './pages/Register/Register';
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
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:id" element={<Article />} />
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
