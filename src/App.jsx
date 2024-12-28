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
import DashboardLayout from './Pages/Dashboard/DashboardLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import UserManagemnt from './Pages/User Mangement/UserManagemnt'
import BlogManagement from './Pages/Blog Management/BlogManagement'
import Events from './Pages/Events/Events'
import Financials from './Pages/Financials/Financials'
import Analytics from './Pages/Analytics/Analytics'
import Communication from './Pages/Communication/Communication'
import Settings from './Pages/Settings/Settings'
import TaskManagement from './Pages/TaskManagement/TaskManagement'
import BackupAndMaintenance from './Pages/BackupAndMaintenance/BackupAndMaintenance'


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
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/dashboard/users" element={<DashboardLayout><UserManagemnt /></DashboardLayout>} />
      <Route path="/dashboard/blog" element={<DashboardLayout><BlogManagement /></DashboardLayout>} />
      <Route path="/dashboard/events" element={<DashboardLayout><Events /></DashboardLayout>} />
      <Route path="/dashboard/finance" element={<DashboardLayout><Financials /></DashboardLayout>} />
      <Route path="/dashboard/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
      <Route path="/dashboard/messages" element={<DashboardLayout><Communication /></DashboardLayout>} />
      <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      {/* <Route path="/dashboard/taskmanagemnt" element={<DashboardLayout><TaskManagement /></DashboardLayout>} /> */}
      <Route path="/dashboard/backup" element={<DashboardLayout><BackupAndMaintenance /></DashboardLayout>} />

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
