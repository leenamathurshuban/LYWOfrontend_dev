import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const COLORS = {
    excellent: "#69D3A7",
    good: "#C2B2F0",
    average: "#6EC5F0",
    below_average: "#F7E3A0",
    incomplete: "#E6E7EA",
};

const ApplicantStatusGraph = ({ InsightsGraphData }) => {
    const colorKeys = Object.keys(COLORS);

    const convertedData = InsightsGraphData?.applicant_status
        ? Object.entries(InsightsGraphData?.applicant_status).map(([key, value]) => ({
              name: key,
              ...value,
          }))
        : [];

    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={convertedData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    barCategoryGap={20}
                >
                    <XAxis type="number" tick={{ fontSize: 12 }} domain={[0, 200]} tickLine={false} axisLine={false} />
                    <YAxis
                        type="category"
                        dataKey="name"
                        width={240}
                        tickLine={false}
                        axisLine={false}
                        tick={({ x, y, payload }) => (
                            <text
                                x={x - 250}
                                y={y + 5}
                                textAnchor="start"
                                fill="#444"
                                fontSize={12}
                                fontWeight={600}
                            >
                                {payload.value
                                    .split('_')
                                    .join(' ')
                                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </text>
                        )}
                    />
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: 20 }} />

                    {colorKeys.map((key) => (
                        <Bar key={key} dataKey={key} stackId="a" fill={COLORS[key]}>
                            {convertedData.map((entry, index) => {
                                const presentKeys = colorKeys.filter(k => entry[k] > 0);
                                const barIndex = presentKeys.indexOf(key);

                                const isOnly = presentKeys.length === 1;
                                const isFirst = barIndex === 0;
                                const isLast = barIndex === presentKeys.length - 1;

                                let radius = [0, 0, 0, 0];
                                if (isOnly) radius = [10, 10, 10, 10];
                                else if (isFirst) radius = [10, 0, 0, 10];
                                else if (isLast) radius = [0, 10, 10, 0];

                                return <Cell key={`cell-${index}`} radius={radius} />;
                            })}
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ApplicantStatusGraph;
