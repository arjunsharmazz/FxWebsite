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
import OfferOverlay from "./componenets/OfferOverlay"; // typo fixed: "componenets" → "components"
import { AuthProvider } from "./context/AuthContext";
import Education from "./pages/Education";

function ScrollToTopWrapper({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return children;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          {/* Overlay should be outside Routes */}
          <OfferOverlay />

          <ScrollToTopWrapper>
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
          </ScrollToTopWrapper>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
