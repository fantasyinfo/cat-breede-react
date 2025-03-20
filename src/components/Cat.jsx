import React from "react";

const Cat = ({ img, name, breed }) => {
  return (
    <div>
      <div >
        <img src={img} style={{ width: "50%" }} />
        <div >
          <h2>{name}</h2>
          <p>{breed}</p>
        </div>
      </div>
    </div>
  );
};

export default Cat;
