import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filterd, setFiltered] = useState([]);
  const [selectedCategory, setCategory] = useState("all");
  const [SortOption, setSortOption] = useState("defaul");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch("/menu.json");
        const data = await responce.json();
        console.log(data);
        setMenu(data);
        setFiltered(data);
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    fetchData();
  }, []);
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFiltered(filtered);
    setCategory(category);
    setcurrentPage(1);
  };
  const showAll = () => {
    setFiltered(menu);
    setCategory("all");
    setcurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filterd];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
    }
    setFiltered(sortedItems);
    setcurrentPage(1);
  };
  const indexOFLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOFLast - itemsPerPage;
  const currentItems = filterd.slice(indexOfFirst, indexOFLast);
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  items-center justify-center gap-8">
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold text-black md:leading-snug leading-snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family & feel the joyof mouthwatering food such as Greek
              Salad, Lasagna, Butternut Pumpkin, Tokusen, Wagyu, Olivas, Relinas
              and more for a moderate cost
            </p>
            <button className="btn bg-green text-white px-8 py-3 rounded-full border-white">
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex text-black flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}>
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}>
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}>
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}>
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}>
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}>
              Drinks
            </button>
          </div>

          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white bg-black"></FaFilter>
            </div>
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={SortOption}>
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="high-to-low">High to Low</option>
              <option value="low-to-high">Low to High</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 rounded-md">
          {currentItems.map((item) => {
            return <Cards key={item._id} item={item}></Cards>;
          })}
        </div>
      </div>
      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filterd.length / itemsPerPage) }).map(
          (_, index) => {
            return (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-full${
                  currentPage === index + 1
                    ? " bg-green text-white"
                    : " bg-gray-400 text-white"
                }`}>
                {index + 1}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Menu;
