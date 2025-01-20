 import { BrowserRouter, Route, Routes } from "react-router";
 import "./App.css";
 import Home from "./Pages/Home/Home";
 import Login from "./Pages/Auth/Login";
 import SignUp from "./Pages/Auth/SignUp";
 import Contact from "./Pages/Contact/Contact";
 import Blog from "./Pages/Blog/Blog";
 import About from "./Pages/About/About";
 import Applications from "./Pages/Apply/Apply";
 import Eventss from "./Pages/Eventss/Eventss";
 import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
 import Dashboard from "./Pages/Dashboard/Dashboard";
 import UserManagemnt from "./Pages/User Mangement/UserManagemnt";
 import BlogManagement from "./Pages/Blog Management/BlogManagement";
 import Events from "./Pages/Events/Events";
 import Financials from "./Pages/Financials/Financials";
 import Analytics from "./Pages/Analytics/Analytics";
 import Communication from "./Pages/Communication/Communication";
 import Settings from "./Pages/Settings/Settings";
 import BackupAndMaintenance from "./Pages/BackupAndMaintenance/BackupAndMaintenance";
import InstitutionDashboard from "./Pages/InstitutionDashboard/InstitutionDashboard";
import InstitutionDashboardLayout from "./Pages/InstitutionDashboard/InstitutionDashboardLayout";
import MembersManagement from "./Pages/MembersManagement/MembersManagement";
import Insti_Communication from "./Pages/Communication/Insti_Communication";
import Insti_Finance from "./Pages/Financials/Insti_Finance";
import Insti_Analytics from "./Pages/Analytics/Insti_Analytics";
import ResetPassword from "./Pages/Auth/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
// import InstiEvent from "./Pages/InstiEvent/InstiEvent";


 function App() {
   return (
     <>
     <AuthProvider>
       <BrowserRouter>

         {/* <Nav /> */}
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<SignUp />} />
           <Route path="//forgot-password" element={<ForgotPassword />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/blog" element={<Blog />} />
           <Route path="/about" element={<About />} />
           <Route path="/reset-password" element={<ResetPassword />} />
           <Route path="/apply" element={<Applications />} />
           <Route path="/events" element={<Eventss />} />
           <Route
             path="/dashboard"
             element={
               <DashboardLayout>
                 <Dashboard />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/users"
             element={
               <DashboardLayout>
                 <UserManagemnt />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/blog"
             element={
               <DashboardLayout>
                 <BlogManagement />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/events"
             element={
               <DashboardLayout>
                 <Events />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/finance"
             element={
               <DashboardLayout>
                 <Financials />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/analytics"
             element={
               <DashboardLayout>
                 <Analytics />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/messages"
             element={
               <DashboardLayout>
                 <Communication />
               </DashboardLayout>
             }
           />
           <Route
             path="/dashboard/settings"
             element={
               <DashboardLayout>
                 <Settings />
               </DashboardLayout>
             }
           />
           
           <Route
             path="/dashboard/backup"
             element={
               <DashboardLayout>
                 <BackupAndMaintenance />
               </DashboardLayout>
             }
           />
           
           <Route
             path="/institution-dashboard"
             element={
               <InstitutionDashboardLayout>
                 <InstitutionDashboard />
               </InstitutionDashboardLayout>
             }
           />
           <Route
             path="/institution-dashboard/members"
             element={
               <InstitutionDashboardLayout>
                 <MembersManagement />
               </InstitutionDashboardLayout>
             }
           />
           <Route
             path="/institution-dashboard/communication"
             element={
               <InstitutionDashboardLayout>
                 <Insti_Communication />
               </InstitutionDashboardLayout>
             }
           />
           <Route
             path="/institution-dashboard/finance"
             element={
               <InstitutionDashboardLayout>
                 <Insti_Finance />
               </InstitutionDashboardLayout>
             }
           />
           <Route
             path="/institution-dashboard/analytics"
             element={
               <InstitutionDashboardLayout>
                 <Insti_Analytics />
               </InstitutionDashboardLayout>
             }
           />
           {/* <Route
             path="/institution-dashboard/events"
             element={
               <InstitutionDashboardLayout>
                 <InstiEvent />
               </InstitutionDashboardLayout>
             }
           /> */}
         </Routes>
       </BrowserRouter>
       </AuthProvider>
     </>
   );
 }

 
 export default App;

 