import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddResources from "./pages/AddResources";
import EditResources from "./Pages/EditResources";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="bg-white shadow-md rounded-md py-4 px-6 mb-8">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Adaugă Date
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddResources />} />
        <Route path="/edit/:id" element={<EditResources />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
