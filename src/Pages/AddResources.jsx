import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResource = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Te rugăm să completezi toate câmpurile!");
      return;
    }
    const newResource = { name, description };

    try {
      await axios.post("http://localhost:5000/resources", newResource);
      setName("");
      setDescription("");
      alert("Datele au fost adăugate cu succes!");
      navigate("/");
    } catch (error) {
      console.error("Eroare la adăugarea datelor:", error);
      alert("A apărut o eroare la adăugarea datelor.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Adaugă Date
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nume"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descriere"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Adaugă
        </button>
      </form>
    </div>
  );
};

export default AddResource;
