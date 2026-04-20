import { scaleBand, scaleLinear, max } from "d3";

const data = [
  { country: "United States", students: 4200 },
  { country: "India", students: 3800 },
  { country: "China", students: 3100 },
  { country: "Brazil", students: 2400 },
  { country: "Nigeria", students: 1900 },
  { country: "Germany", students: 1600 },
  { country: "Japan", students: 1300 },
  { country: "Canada", students: 1050 },
];

const width = 500;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 130;

export default function Barplot({ data: propData = data }) {
  const yScale = scaleBand()
    .domain(propData.map((d) => d.country))
    .range([marginTop, height - marginBottom])
    .padding(0.2);

  const xScale = scaleLinear()
    .domain([0, max(propData, (d) => d.students)])
    .range([marginLeft, width - marginRight]);

  return (
    <svg width={width} height={height}>
      {propData.map((d) => (
        <rect
          key={d.country}
          x={xScale(0)}
          y={yScale(d.country)}
          width={xScale(d.students) - xScale(0)}
          height={yScale.bandwidth()}
          fill="steelblue"
        />
      ))}

      {propData.map((d) => (
        <text
          key={d.country}
          x={xScale(0) - 6}
          y={yScale(d.country) + yScale.bandwidth() / 2}
          dy="0.35em"
          textAnchor="end"
          fontSize={12}
          fill="currentColor">
          {d.country}
        </text>
      ))}

      {propData.map((d) => (
        <text
          key={d.country + "-val"}
          x={xScale(d.students) + 4}
          y={yScale(d.country) + yScale.bandwidth() / 2}
          dy="0.35em"
          fontSize={12}
          fill="currentColor">
          {d.students.toLocaleString()}
        </text>
      ))}
    </svg>
  );
}
