import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import IndexPage from "./pages/IndexPage";
import Layout from "./pages/__layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
