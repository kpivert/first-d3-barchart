import { useState } from "react";
import { scaleBand, scaleLinear, max } from "d3";

const defaultData = [
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

export default function Barplot({ data = defaultData }) {
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([marginTop, height - marginBottom])
    .padding(0.2);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.students)])
    .range([marginLeft, width - marginRight]);

  const total = data.reduce((sum, d) => sum + d.students, 0);
  const hoveredDatum = data.find((d) => d.country === hovered);

  const TOOLTIP_W = 155;
  const TOOLTIP_H = 56;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width={width} height={height} onMouseLeave={() => setHovered(null)}>
        {data.map((d) => {
          const isActive = hovered === d.country;
          const isDimmed = hovered !== null && !isActive;
          const barWidth = xScale(d.students) - xScale(0);
          const barX = xScale(0);
          const barY = yScale(d.country);
          const barH = yScale.bandwidth();

          return (
            <g
              key={d.country}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => {
                setHovered(d.country);
                setTooltipPos({
                  x: barX + barWidth / 2,
                  y: barY,
                });
              }}>
              <rect
                x={barX}
                y={barY}
                width={barWidth}
                height={barH}
                fill="steelblue"
                opacity={isDimmed ? 0.15 : 1}
                style={{ transition: "opacity 0.2s" }}
              />
              <text
                x={barX - 6}
                y={barY + barH / 2}
                dy="0.35em"
                textAnchor="end"
                fontSize={12}
                fill="currentColor"
                opacity={isDimmed ? 0.25 : 1}
                style={{ transition: "opacity 0.2s" }}>
                {d.country}
              </text>
              <text
                x={barX + barWidth + 4}
                y={barY + barH / 2}
                dy="0.35em"
                fontSize={12}
                fill="currentColor"
                opacity={isDimmed ? 0.15 : 1}
                style={{ transition: "opacity 0.2s" }}>
                {d.students.toLocaleString()}
              </text>
            </g>
          );
        })}

        {hoveredDatum &&
          (() => {
            const pct = ((hoveredDatum.students / total) * 100).toFixed(1);
            const rawX = tooltipPos.x - TOOLTIP_W / 2;
            const clampedX = Math.max(
              marginLeft,
              Math.min(rawX, width - marginRight - TOOLTIP_W),
            );
            const rawY = tooltipPos.y - TOOLTIP_H - 8;
            const clampedY =
              rawY < marginTop ? tooltipPos.y + yScale.bandwidth() + 8 : rawY;

            return (
              <g pointerEvents="none">
                <rect
                  x={clampedX}
                  y={clampedY}
                  width={TOOLTIP_W}
                  height={TOOLTIP_H}
                  rx={5}
                  fill="#1e293b"
                  opacity={0.93}
                />
                <text
                  x={clampedX + TOOLTIP_W / 2}
                  y={clampedY + 15}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="600"
                  fill="white">
                  {hoveredDatum.country}
                </text>
                <text
                  x={clampedX + TOOLTIP_W / 2}
                  y={clampedY + 32}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#93c5fd">
                  {hoveredDatum.students.toLocaleString()} students
                </text>
                <text
                  x={clampedX + TOOLTIP_W / 2}
                  y={clampedY + 48}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#6ee7b7">
                  {pct}% of total
                </text>
              </g>
            );
          })()}
      </svg>
    </div>
  );
}
