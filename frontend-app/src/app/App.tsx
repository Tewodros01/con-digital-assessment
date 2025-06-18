import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layoutes/PublicLayout";
import { lazy, Suspense } from "react";
import ProtectedLayout from "./layoutes/ProtectedLayout";

// Lazy loaded components
const RegisterPage = lazy(() => import("./features/auth/RegisterPage"));
const ChatPage = lazy(() => import("./features/chat/ChatPage"));

function App() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
