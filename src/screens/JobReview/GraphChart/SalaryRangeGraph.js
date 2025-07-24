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
};

const SalaryRangeGraph = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.salary_range 
        ? Object.entries(InsightsGraphData.salary_range).map(([key, value]) => ({
            range: dataValue[key] || key,
            applicants: value
        }))
        : [];

    return (
        <div style={{ width: '100%', height: 330 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    data={convertedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }} // Increased bottom margin
                    layout="horizontal"
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="range"
                        interval={0}
                        tick={({ x, y, payload }) => (
                            <text
                                x={x}
                                y={y}
                                dy={20} // Increased dy for better spacing
                                textAnchor="middle"
                                fill="#666"
                                fontSize={12}
                            >
                                {payload.value}
                            </text>
                        )}
                        axisLine={false}
                        tickLine={false}
                        height={20} // Explicit height for axis
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
                        labelFormatter={(label) => `Salary Range: ${label}`}
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
                                fill={entry.range === "10-12" ? "#FFA500" : "#87CEFA"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalaryRangeGraph;