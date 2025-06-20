import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    Cell,
} from "recharts";

const data = [
    { range: "0-5", applicants: 60 },
    { range: "5-7", applicants: 130 },
    { range: "7-10", applicants: 175 },
    { range: "10-12", applicants: 190 }, // highlighted
    { range: "12-15", applicants: 160 },
    { range: "15-20", applicants: 110 },
    { range: "20-25", applicants: 55 },
    { range: "25-30", applicants: 25 },
    { range: "30-35", applicants: 30 },
    { range: "35-40", applicants: 28 },
    { range: "40-45", applicants: 10 },
    { range: "45-50", applicants: 12 },
    { range: "50+", applicants: 4 },
];
const dataValue = {
    below_3_lpa: "0-3",
    lpa_3_5: "3-5",
    lpa_5_7: "5-7",
    lpa_7_10: "7-10",
    lpa_10_12: "10-12",
    lpa_12_15: "12-15",
    lpa_15_20: "15-20",
    lpa_20_25: "20-25",
    lpa_25_30: "25-30",
    lpa_30_35: "30-35",
    lpa_35_40: "35-40",
    lpa_40_45: "40-45",
    lpa_45_50: "45-50",
    lpa_50_55: "50-55",
    lpa_55_60: "55-60",
    above_60_lpa: "60+"
}

const SalaryRangeGraph = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.salary_range ? Object.entries(InsightsGraphData?.salary_range).map(([key, value]) => ({
        range: dataValue[key],
        applicants: value
    })) : [];
    return (
        <div style={{ width: "100%", height: 330 }}>
            <ResponsiveContainer>
                <BarChart data={convertedData} margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range"
                        tick={({ x, y, payload, index }) => {                            
                            return (
                                <g transform={`translate(${x},${y + 10})`}>
                                    <text x={0} y={0} dy={14} textAnchor="middle" fill="#666" fontSize="10">
                                        {payload.value}
                                    </text>
                                </g>
                            );
                        }}
                        axisLine={false} />
                    <YAxis label={{ value: "Number of Applicants", angle: -90, position: "insideLeft" }} domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} axisLine={false} />
                    <Tooltip />
                    <Bar
                        dataKey="applicants"
                        radius={[10, 10, 0, 0]}
                        fill="#87CEFA"
                        // label={{ position: "top", fill: "#000" }}
                        barSize={20}
                    >
                        {
                            convertedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.range === "10-12" ? "#FFA500" : "#87CEFA"}
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalaryRangeGraph;
