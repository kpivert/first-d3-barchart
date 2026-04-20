import { useMemo } from "react";
import * as d3 from "d3";

const WIDTH = 500;
const HEIGHT = 400;
const MARGIN = { top: 24, right: 48, bottom: 32, left: 110 };

const INNER_W = WIDTH - MARGIN.left - MARGIN.right;
const INNER_H = HEIGHT - MARGIN.top - MARGIN.bottom;

// Curated palette — each bar gets its own hue
const PALETTE = [
  "#00468b", // ASN navy
  "#ff8200", // ASN orange
  "#3a86ff",
  "#06d6a0",
  "#ef476f",
  "#ffd166",
  "#7b5ea7",
  "#118ab2",
];

const sampleData = [
  { country: "United States", students: 4200 },
  { country: "India", students: 3800 },
  { country: "China", students: 3100 },
  { country: "Brazil", students: 2400 },
  { country: "Nigeria", students: 1900 },
  { country: "Germany", students: 1600 },
  { country: "Japan", students: 1300 },
  { country: "Canada", students: 1050 },
];

export default function Barplot({ data = sampleData }) {
  const { yScale, xScale, ticks } = useMemo(() => {
    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, INNER_H])
      .padding(0.28);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.students) * 1.08])
      .range([0, INNER_W]);

    const ticks = xScale.ticks(5);

    return { yScale, xScale, ticks };
  }, [data]);

  return (
    <div
      style={{
        background: "#0d1b2a",
        borderRadius: 16,
        padding: "28px 24px 20px",
        display: "inline-block",
        fontFamily: "'DM Mono', 'Fira Mono', monospace",
        boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
      }}>
      {/* Chart title */}
      <p
        style={{
          margin: "0 0 16px 0",
          color: "#e0eaf8",
          fontSize: 13,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          paddingLeft: MARGIN.left,
        }}>
        Students by Country
      </p>

      <svg width={WIDTH} height={HEIGHT}>
        {/* ── Grid lines ── */}
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={0}
              y2={INNER_H}
              stroke="#1e3352"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
          ))}

          {/* ── Bars ── */}
          {data.map((d, i) => {
            const barW = xScale(d.students);
            const barH = yScale.bandwidth();
            const y = yScale(d.country);
            const color = PALETTE[i % PALETTE.length];

            return (
              <g key={d.country}>
                {/* Glow / shadow bar */}
                <rect
                  x={0}
                  y={y + 2}
                  width={barW}
                  height={barH}
                  rx={4}
                  fill={color}
                  opacity={0.18}
                  filter="blur(4px)"
                />
                {/* Main bar */}
                <rect
                  x={0}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={4}
                  fill={color}
                  opacity={0.9}
                />
                {/* Value label inside / outside bar */}
                <text
                  x={barW + 8}
                  y={y + barH / 2}
                  dominantBaseline="middle"
                  fill={color}
                  fontSize={11}
                  fontWeight={700}
                  letterSpacing="0.04em">
                  {d.students.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* ── Y axis: country labels ── */}
          {data.map((d) => (
            <text
              key={d.country}
              x={-10}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              dominantBaseline="middle"
              textAnchor="end"
              fill="#8ba9cc"
              fontSize={11.5}
              letterSpacing="0.01em">
              {d.country}
            </text>
          ))}

          {/* ── X axis: tick labels ── */}
          {ticks.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={INNER_H + 18}
              textAnchor="middle"
              fill="#4a6580"
              fontSize={10}>
              {tick >= 1000 ? `${tick / 1000}k` : tick}
            </text>
          ))}

          {/* ── Baseline ── */}
          <line
            x1={0}
            x2={0}
            y1={0}
            y2={INNER_H}
            stroke="#1e3352"
            strokeWidth={1.5}
          />
        </g>
      </svg>
    </div>
  );
}

// import * as d3 from "d3";

// export const Barplot = ({ data, width, height }) => {
//   // const xScale = ....
//   // const barHeight = ...
//   // const barColor = ...

//   // 2️⃣ Render with React (JSX!) using the D3 maths
//   return (
//     <div
//       style={
//         {
//           // left: xScale(12),
//           // color: barColor,
//           // height: barHeight,
//         }
//       }
//     />
//   );
// };

// export default Barplot;
