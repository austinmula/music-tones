import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header.js";
import HomepageScreen from "./pages/HomepageScreen.js";
import SharePageScreen from "./pages/ShareSampleScreen.js";
import EditScreenPage from "./pages/EditScreenPage.js";
import CreateSamplePage from "./pages/CreateSamplePage.js";
import Sequencer from "./components/Seq";
import "./App.css";

export const ThemeContext = React.createContext(null);

export default function App() {
  const [mode, setMode] = React.useState("dark");

  const toggleMode = () => {
    setMode((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <Router>
        <div className="body-content" id="dark">
          <Header />
          <main>
            <Route path="/create" component={CreateSamplePage} />
            <Route path="/share/:id" component={SharePageScreen} />
            <Route path="/edit/:id" component={EditScreenPage} />

            <Route path="/" component={HomepageScreen} exact />
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
