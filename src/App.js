import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layout/MainLayout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import News from "./pages/News";
import LiveForex from "./pages/LiveForex";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Term from "./pages/Term";
import DemoTrade from "./pages/DemoTrade";
import OfferOverlay from "./componenets/OfferOverlay"; 
import { AuthProvider } from "./context/AuthContext";
import Education from "./pages/Education";


// ✅ ScrollToTop component sahi tarike se
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // body scroll reset
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // "smooth" bhi use kar sakte ho
    });

    // fallback in case <body> scrollable hai
    document.body.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <OfferOverlay />
          {/* 👇 BrowserRouter ke andar, Routes ke bahar hona chahiye */}
          <ScrollToTop />  
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/help" element={<Help />} />
              <Route path="/news" element={<News />} />
              <Route path="/liveforex" element={<LiveForex />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Term />} />
              <Route path="/demo" element={<DemoTrade />} />
              <Route path="/education" element={<Education />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
