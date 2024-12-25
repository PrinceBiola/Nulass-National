import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import Contact from './Pages/Contact/Contact'
import Blog from './Pages/Blog/Blog'
import About from './Pages/About/About'
import Applications from './Pages/Apply/Apply'
import Eventss from './Pages/Eventss/Eventss';


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/apply" element={<Applications />} />
      <Route path="/events" element={<Eventss />} />

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
