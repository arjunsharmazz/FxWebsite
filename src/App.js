import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";

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
import Review from "./pages/Review";
import CurrencyChart from "./charts/CurrencyChart";
import TradingPanel from "./charts/TradingPanel";
import SocialMediaPage from "./pages/SocialMediaPage";
import BlogInsights from "./pages/BlogInsights";
import ForexAccountComparison from "./pages/ForexAccountComparison";
import ForexAccountComparePanel from "./pages/ForexAccountComparePanel";

import ChatOverlay from "./animcomponents/ChatOverlay.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <OfferOverlay />
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
              <Route path="/liveforex" element={<TradingPanel />} />
              <Route path="/liveforex2" element={<CurrencyChart />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Term />} />
              <Route path="/demo" element={<TradingPanel />} />
              <Route path="/education" element={<Education />} />
              <Route path="/review" element={<Review />} />
              <Route path="/socialmedia" element={<SocialMediaPage />} />
              <Route path="/blog" element={<BlogInsights />} />
              <Route path="/forexaccount" element={<ForexAccountComparison />} />
              <Route path="/compare" element={<ForexAccountComparePanel />} />
            </Route>
          </Routes>

          {!chatOpen && (
            <button style={styles.chatButton} onClick={() => setChatOpen(true)}>
              <FaComments />
            </button>
          )}


          {chatOpen && <ChatOverlay onClose={() => setChatOpen(false)} />}
        </AuthProvider>
      </BrowserRouter>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#e90e0e",
    color: "white",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 9999,
  },
};

export default App;
