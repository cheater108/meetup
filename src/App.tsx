import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import BookSlotPage from "./pages/BookSlotPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/book" element={<BookSlotPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
