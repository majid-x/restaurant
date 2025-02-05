import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import {} from "react-icons/fa6";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}>
      Next
    </div>
  );
};
const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}>
      Previous
    </div>
  );
};
const Special = () => {
  const [recipes, setRecipe] = useState([]);
  const slider = React.useRef(null);
  useEffect(() => {
    fetch("http://localhost:111/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipe(specials);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <simpleNextArrow></simpleNextArrow>,
    prevArrow: <simplePrevArrow></simplePrevArrow>,
  };
  return (
    <div className="section-container my-20 bg-white relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Standout Dishes From Our Menu</h2>
      </div>
      <div className="md:absolut right-3 top-8 mb-10 md:mr-2">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full bg-white hover:bg-white ml-5">
          <FaAngleLeft className="w-8 h-8 p-1"></FaAngleLeft>
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full bg-green hover:bg-green ml-5">
          <FaAngleRight className="w-8 h-8 p-1 bg-green hover:bg-green"></FaAngleRight>
        </button>
      </div>
      <Slider
        ref={slider}
        {...settings}
        className="overflow-hidden mt-10 space-x-5">
        {recipes.map((item, i) => {
          return (
            <div>
              <Cards key={i} item={item}></Cards>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Special;
