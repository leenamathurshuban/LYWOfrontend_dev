import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from "recharts";

const experienceValueMap = {
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
    above_40_years: "35-40+"
};

const ExperienceGraphComponent = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.job_applicant_experience_data 
        ? Object.entries(InsightsGraphData.job_applicant_experience_data).map(([key, value]) => ({
            range: experienceValueMap[key] || key.replace(/_/g, ' '),
            applicants: value
        }))
        : [];

    return (
        <div style={{ width: "100%", height: 330 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    data={convertedData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="range"
                        interval={0}
                        tick={({ x, y, payload }) => (
                            <text
                                x={x}
                                y={y}
                                dy={20}
                                textAnchor="middle"
                                fill="#666"
                                fontSize={12}
                            >
                                {payload.value}
                            </text>
                        )}
                        axisLine={false}
                        tickLine={false}
                        height={20}
                    />
                    <YAxis
                        label={{ 
                            value: "Number of Applicants", 
                            angle: -90, 
                            position: "insideLeft",
                            style: { fontSize: 12 }
                        }}
                        domain={[0, 250]}
                        ticks={[0, 50, 100, 150, 200, 250]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                        formatter={(value) => [`${value}`, 'Applicants']}
                        labelFormatter={(label) => `Experience: ${label}`}
                    />
                    <Bar
                        dataKey="applicants"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                        isAnimationActive={false}
                    >
                        {convertedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.range === "4-6" ? "#FFA500" : "#87CEFA"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExperienceGraphComponent;