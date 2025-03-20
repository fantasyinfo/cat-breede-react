import React, { useEffect, useState } from "react";

import Cat from "./components/Cat";

const API_URL = "https://api.thecatapi.com/v1";

function App() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [seletedbreed, setSelectedBreed] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fethbrred();
  }, []);

  const fethbrred = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');

      const data = await response.json();

      setBreeds(data);

    } catch (error) {
      console.error( error);
    }
  };


  useEffect(() => {
    fetchCats(1, seletedbreed);
  }, [seletedbreed]);

  const fetchCats = async (page, breed) => {
    setLoading(true);
    try {
      const breedQuery = breed ? `&breed_ids=${breed}` : "";
      const response = await fetch(`${API_URL}/images/search?limit=6&page=${page}${breedQuery}`);
      const data = await response.json();
      setCats((prevCats) => (page === 1 ? data : [...prevCats, ...data]));
    } catch (error) {
      console.error( error);
    }
    setLoading(false);
  };


  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
    setPage(1);
  };


  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCats(nextPage, seletedbreed);
  };


  const refeshcat = () => {
    setPage(1);
    fetchCats(1, seletedbreed);
  };

  return (
    <div className="App">
      <h1>Cat breed</h1>

      <select value={seletedbreed} onChange={handleBreedChange}>
        <option value="">all cats</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>


      <button onClick={refeshcat}>refresh bttn</button>


      <div className="cat-grid">
        {cats.map((cat) => (
          <Cat key={cat.id} img={cat.url} name="cat_name" breed="" />
        ))}
      </div>


      <button onClick={loadMore} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

export default App;
