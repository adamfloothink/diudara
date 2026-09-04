import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Discover from "./pages/Discover";
import CommunityHome from "./pages/CommunityHome";
import LiveRoomPage from "./pages/LiveRoomPage";
import Checkout from "./pages/Checkout";
import CreatorDashboard from "./pages/CreatorDashboard";
import PulseOnboarding from "./pages/PulseOnboarding";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-bleed pages without sidebar */}
        <Route path="/live/:id" element={<LiveRoomPage />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/onboarding" element={<PulseOnboarding />} />

        {/* Pages inside the app shell (with sidebar nav) */}
        <Route
          path="/*"
          element={
            <AppShell>
              <Routes>
                <Route path="/discover" element={<Discover />} />
                <Route path="/community/:id" element={<CommunityHome />} />
                <Route path="/creator/dashboard/:id" element={<CreatorDashboard />} />
                <Route path="/creator/dashboard" element={<Navigate to="/creator/dashboard/bimbel-sbmptn" replace />} />
                <Route path="*" element={<Navigate to="/discover" replace />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
