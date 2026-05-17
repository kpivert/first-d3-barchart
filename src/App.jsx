import * as d3 from "d3";
import { useState } from "react";
import Barplot from "./Barplot";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];
function App() {
  // console.log(data.map((d) => d.country));
  // console.log(d3.mean(data.map((d) => d.students)));
  // console.log(d3.median(data.map((d) => d.students)));
  const myData = [
    { country: "France", students: 2100 },
    { country: "Spain", students: 1750 },
  ];

  console.log(myData);

  return (
    <>
      <h2>Distribution of d3❤️React Cohort</h2>
      <Barplot data={data} />
    </>
  );
}

export default App;
