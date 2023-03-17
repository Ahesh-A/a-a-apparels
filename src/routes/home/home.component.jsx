import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Directory from "../../components/Directory/Directory.component";


const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let data = require("../../Data/catgeories.json");
    setCategories(data);
  }, [categories]);

  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
