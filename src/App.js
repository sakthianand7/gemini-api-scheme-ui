import { useState } from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
export default function App() {
  const [value, setValue] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="editProfile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}