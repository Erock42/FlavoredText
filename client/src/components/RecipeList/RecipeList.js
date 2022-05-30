import React from "react";
import "./RecipeList.css";

const RecipeList = ({ title }) => {
  return (
    <div className="recipe-list">
      <h2>
        <a href="https://www.edamam.com/recipes/{title}" target="_blank" rel="noreferrer">{title}</a>
      </h2>
    </div>
  );
};

export default RecipeList;