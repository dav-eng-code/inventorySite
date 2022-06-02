//import React from "react";

const Pet = (props) => {
  return (
    <div>
      <h1>{props.dogName}</h1>
    </div>
  );
};
// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.dogName),
//   ]);
// };

export default Pet;
