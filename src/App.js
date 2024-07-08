import { useState } from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import TopNavigation from "./components/TopNavigation";
import HomePage from "./pages/HomePage";

export default function App() {
  const [value, setValue] = useState("");

  return (

    <div>
      <TopNavigation />
      <HomePage />
    </div>
  );
}