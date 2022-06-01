import React from "react";
import "./Recipe.css";


const Recipe = ({ title, image, ingredients, full }) => {
  return (
    <div className="recipe">
      <h2>{title}</h2>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <button className='search-button'><a href={full} target="_blank" rel="noreferrer">Full recipe</a></button>
      {/* {console.log(full)} */}

      <img className="style.image" src={image} alt="" />

    </div>
  );
};

export default Recipe;
