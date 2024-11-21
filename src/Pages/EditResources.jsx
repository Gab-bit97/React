import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditResource = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/resources/${id}`
        );
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Eroare la preluarea datelor pentru editare:", error);
      }
    };

    fetchResource();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedResource = { name, description };

    try {
      await axios.put(`http://localhost:5000/resources/${id}`, updatedResource);
      alert("Datele au fost actualizate!");
      navigate("/");
    } catch (error) {
      console.error("Eroare la actualizarea datelor:", error);
      alert("A apărut o eroare la actualizarea datelor.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Editează Resursa
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
          Actualizează
        </button>
      </form>
    </div>
  );
};

export default EditResource;
