import { useState } from "react";
import LandingPage from "./pages/LandingPage";
export default function App() {
  const [value, setValue] = useState("");

  return (
    <LandingPage/>
  );
}