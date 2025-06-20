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
    fresher_and_less_than_1_year: "0-1",
    exp_1_2_years: "1-2",
    exp_2_4_years: "2-4",
    exp_4_6_years: "4-6",
    exp_6_9_years: "6-9",
    exp_9_12_years: "9-12",
    exp_12_15_years: "12-15",
    exp_15_20_years: "15-20",
    exp_20_25_years: "20-25",
    exp_25_30_years: "25-30",
    exp_30_40_years: "30-35",
    above_40_years: "35-40",
}

const ExperienceGraphComponent = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.job_applicant_experience_data ? Object.entries(InsightsGraphData?.job_applicant_experience_data).map(([key, value]) => ({
        range: dataValue[key],
        applicants: value
    })) : [];
    // debugger
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

export default ExperienceGraphComponent;
