import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5000/resources");
      setResources(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Eroare la preluarea datelor:", error);
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteResource = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/resources/${id}`);
      alert("Datele au fost șterse!");
      fetchResources();
    } catch (error) {
      console.error("Eroare la ștergerea datelor:", error);
      alert("A apărut o eroare la ștergere datelor.");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-700 mt-10">Încărcăm resursele...</p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Date client
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {resource.name}
              </h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(resource.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Editează
                </button>
                <button
                  onClick={() => deleteResource(resource.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
