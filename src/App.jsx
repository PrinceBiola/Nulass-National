// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { MantineProvider } from "@mantine/core";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoutes from "./Utils/PrivateRoutes";
// import "./App.css";
// import UserOrder from './Pages/UserDashboardfile/UserOrder';

// // Public Page Components
// import Home from "./Pages/PublicPages/Home";
// import About from "./Pages/PublicPages/About";
// import Contact from "./Pages/PublicPages/Contact";
// import Blog from "./Pages/PublicPages/Blog";
// import BlogDetails from "./Pages/PublicPages/BlogDetails";
// import Course from "./Pages/PublicPages/Course";
// import PublicEvents from "./Pages/PublicPages/Eventss";
// import Applications from "./Pages/PublicPages/Apply";

// // Auth Components
// import Login from "./Pages/Auth/Login";
// import SignUp from "./Pages/Auth/SignUp";
// import SignUpModal from "./Pages/Auth/SignUpModal";
// import ForgotPassword from "./Pages/Auth/ForgotPassword";
// import ResetPassword from "./Pages/Auth/ResetPassword";

// // Layout Components
// import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
// import InstitutionDashboardLayout from "./Pages/InstitutionDashboard/InstitutionDashboardLayout";

// // User Dashboard Components
// import Dashboard from "./Pages/UserDashboardfile/Dashboard";
// import Profile from "./Pages/UserDashboardfile/Profile";
// import Application from "./Pages/UserDashboardfile/Application";
// import IdCard from "./Pages/UserDashboardfile/IdCard";

// // Admin Dashboard Components
// import AdminDashboard from "./Components/Dashboard/AdminDashbaord";
// import UserManagemnt from "./Pages/User Mangement/UserManagemnt";
// import BlogManagement from "./Pages/Blog Management/BlogManagement";
// import EventsManagement from "./Pages/Events/Events";
// import Financials from "./Pages/Financials/Financials";
// import Analytics from "./Pages/Analytics/Analytics";
// import Communication from "./Pages/Communication/Communication";
// import Settings from "./Pages/Settings/Settings";
// import BackupAndMaintenance from "./Pages/BackupAndMaintenance/BackupAndMaintenance";
// import ApplicationManagement from "./Pages/Admin/ApplicationManagement";

// // Institution Dashboard Components
// import InstitutionDashboard from "./Pages/InstitutionDashboard/InstitutionDashboard";
// import MembersManagement from "./Pages/MembersManagement/MembersManagement";
// import Insti_Communication from "./Pages/Communication/Insti_Communication";
// import Insti_Finance from "./Pages/Financials/Insti_Finance";
// import Insti_Analytics from "./Pages/Analytics/Insti_Analytics";

// // Commented out for future use
// // import InstiEvent from "./Pages/InstiEvent/InstiEvent";

// // Super Admin Components
// // import UserManagement from './Pages/SuperAdmin/UserManagement';
// // import FinancialsManagement from './Pages/SuperAdmin/FinancialsManagement';
// // import ExecutiveManagement from './Pages/SuperAdmin/ExecutiveManagement';
// // import SystemSettings from './Pages/SuperAdmin/SystemSettings';

// function App() {
//   return (
//     <MantineProvider>
//       <AuthProvider>
//         <BrowserRouter>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/blog/:id" element={<BlogDetails />} />
//             <Route path="/course" element={<Course />} />
//             <Route path="/events" element={<PublicEvents />} />

//             {/* Auth Routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />

//             {/* Protected Routes */}
//             <Route element={<PrivateRoutes />}>
//               {/* User Dashboard Routes */}
//               <Route path="/dashboard" element={<DashboardLayout />}>
//                 <Route index element={<Dashboard />} />
//                 <Route path="profile" element={<Profile />} />
//                 <Route path="application" element={<Application />} />
//                 <Route path="id-card" element={<IdCard />} />
//                 <Route path="user-order" element={<UserOrder />} />
//               </Route>

//               {/* Admin Dashboard Routes */}
//               <Route path="/admin" element={<DashboardLayout />}>
//                 <Route index element={<AdminDashboard />} />
//                 <Route path="applications" element={<ApplicationManagement />} />
//                 <Route path="users" element={<UserManagemnt />} />
//                 <Route path="blog" element={<BlogManagement />} />
//                 <Route path="events" element={<EventsManagement />} />
//                 <Route path="financials" element={<Financials />} />
//                 <Route path="analytics" element={<Analytics />} />
//                 <Route path="communication" element={<Communication />} />
//                 <Route path="settings" element={<Settings />} />
//                 <Route path="backup" element={<BackupAndMaintenance />} />
//               </Route>

//               {/* Institution Routes */}
//               <Route path="/institution-dashboard" element={<InstitutionDashboardLayout />}>
//                 <Route index element={<InstitutionDashboard />} />
//                 <Route path="members" element={<MembersManagement />} />
//                 <Route path="communication" element={<Insti_Communication />} />
//                 <Route path="finance" element={<Insti_Finance />} />
//                 <Route path="analytics" element={<Insti_Analytics />} />
//               </Route>

//               {/* Super Admin Routes */}
//               {/* <Route element={<SuperAdminRoute />}>
//                 <Route path="/dashboard/user-management" element={<UserManagement />} />
//                 <Route path="/dashboard/executive-management" element={<ExecutiveManagement />} />
//                 <Route path="/dashboard/settings" element={<SystemSettings />} />
//               </Route>

//               {/* Admin Routes (accessible by both admin and superadmin) 
//               <Route element={<AdminRoute />}>
//                 <Route path="/dashboard/financials" element={<FinancialsManagement />} />
//               </Route> */}
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </MantineProvider>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./Utils/PrivateRoutes";
import "./App.css";
import UserOrder from './Pages/UserDashboardfile/UserOrder';

// Public Page Components
import Home from "./Pages/PublicPages/Home";
import About from "./Pages/PublicPages/About";
import Contact from "./Pages/PublicPages/Contact";
import Blog from "./Pages/PublicPages/Blog";
import BlogDetails from "./Pages/PublicPages/BlogDetails";
import Course from "./Pages/PublicPages/Course";
import PublicEvents from "./Pages/PublicPages/Eventss";
import Applications from "./Pages/PublicPages/Apply";

// Auth Components
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import SignUpModal from "./Pages/Auth/SignUpModal";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

// Layout Components
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import InstitutionDashboardLayout from "./Pages/InstitutionDashboard/InstitutionDashboardLayout";

// User Dashboard Components
import Dashboard from "./Pages/UserDashboardfile/Dashboard";
import Profile from "./Pages/UserDashboardfile/Profile";
import Application from "./Pages/UserDashboardfile/Application";
import IdCard from "./Pages/UserDashboardfile/IdCard";

// Admin Dashboard Components
import AdminDashboard from "./Components/Dashboard/AdminDashbaord";
import UserManagemnt from "./Pages/User Mangement/UserManagemnt";
import BlogManagement from "./Pages/Blog Management/BlogManagement";
import EventsManagement from "./Pages/Events/Events";
import Financials from "./Pages/Financials/Financials";
import Analytics from "./Pages/Analytics/Analytics";
import Communication from "./Pages/Communication/Communication";
import Settings from "./Pages/Settings/Settings";
import BackupAndMaintenance from "./Pages/BackupAndMaintenance/BackupAndMaintenance";
import ApplicationManagement from "./Pages/Admin/ApplicationManagement";

// Institution Dashboard Components
import InstitutionDashboard from "./Pages/InstitutionDashboard/InstitutionDashboard";
import MembersManagement from "./Pages/MembersManagement/MembersManagement";
import Insti_Communication from "./Pages/Communication/Insti_Communication";
import Insti_Finance from "./Pages/Financials/Insti_Finance";
import Insti_Analytics from "./Pages/Analytics/Insti_Analytics";

// Commented out for future use
// import InstiEvent from "./Pages/InstiEvent/InstiEvent";

import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import PaymentVerification from "./Pages/Payment/PaymentVerification";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/course" element={<Course />} />
            <Route path="/events" element={<PublicEvents />} />
            <Route path="payment/verify" element={<PaymentVerification />} />
            <Route path="payment/success" element={<PaymentSuccess />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoutes />}>
              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="application" element={<Application />} />
                <Route path="id-card" element={<IdCard />} />
                <Route path="user-order" element={<UserOrder />} />
                <Route path="payment/verify" element={<PaymentVerification />} />
                <Route path="payment/success" element={<PaymentSuccess />} />
              </Route>

              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="applications" element={<ApplicationManagement />} />
                <Route path="users" element={<UserManagemnt />} />
                <Route path="blog" element={<BlogManagement />} />
                <Route path="events" element={<EventsManagement />} />
                <Route path="financials" element={<Financials />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="communication" element={<Communication />} />
                <Route path="settings" element={<Settings />} />
                <Route path="backup" element={<BackupAndMaintenance />} />
              </Route>

              {/* Institution Routes */}
              <Route path="/institution-dashboard" element={<InstitutionDashboardLayout />}>
                <Route index element={<InstitutionDashboard />} />
                <Route path="members" element={<MembersManagement />} />
                <Route path="communication" element={<Insti_Communication />} />
                <Route path="finance" element={<Insti_Finance />} />
                <Route path="analytics" element={<Insti_Analytics />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;