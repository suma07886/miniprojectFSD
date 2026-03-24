import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/search?q=${query}`);

      const sorted = res.data.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ""));
        const priceB = parseInt(b.price.replace(/\D/g, ""));
        return priceA - priceB;
      });

      setResults(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        🔍 Price Comparison App
      </h1>

      <div className="flex justify-center gap-2 mb-6">
        <input
          className="border p-2 rounded w-64"
          type="text"
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={searchProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <p className="text-center mb-4 text-green-600 font-semibold">
          Showing lowest price first 💰
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow hover:shadow-lg p-4 transition">

            {/* 🖼️ Product Image */}
           <img
           src={item.image ? item.image : "https://via.placeholder.com/150"}
           alt="product"
           className="w-full h-40 object-contain mb-3"
            />

            {/* 📦 Title */}
            <h2 className="font-semibold text-md mb-1">{item.title}</h2>

            {/* 🌐 Website */}
            <p className="text-gray-500 text-sm">{item.site}</p>

            {/* 💰 Price */}
            <p className="text-green-600 font-bold text-lg mt-2">
              {item.price}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;