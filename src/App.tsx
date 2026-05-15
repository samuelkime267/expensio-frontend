import { Route, Routes } from "react-router-dom";
import { pages } from "@/data/pages.data";
import { AuthSideImg, Header, Sidebar } from "@/components";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-start justify-start relative w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <AuthSideImg />
      <div className="w-full flex items-start justify-start flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="w-full min-h-[calc(100vh-4.75rem)] bg-bg rounded-bl-2xl overflow-x-hidden">
          <Routes>
            {pages.map(({ Component, path }, i) => (
              <Route key={i} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
