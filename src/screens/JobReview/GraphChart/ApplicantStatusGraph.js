import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Job Application",
        Excellent: 30,
        Good: 50,
        Average: 30,
        BelowAverage: 20,
        Incomplete: 52,
    },
    {
        name: "Behaviour",
        Excellent: 25,
        Good: 45,
        Average: 30,
        BelowAverage: 20,
        Incomplete: 21,
    },
    {
        name: "Quiz 1",
        Excellent: 22,
        Good: 40,
        Average: 25,
        BelowAverage: 20,
        Incomplete: 27,
    },
    {
        name: "Assignment 1",
        Excellent: 20,
        Good: 30,
        Average: 20,
        BelowAverage: 15,
        Incomplete: 17,
    },
    {
        name: "Final list",
        Excellent: 20,
        Good: 0,
        Average: 0,
        BelowAverage: 0,
        Incomplete: 0,
    },
];

const COLORS = {
    excellent: "#69D3A7",
    good: "#C2B2F0",
    average: "#6EC5F0",
    below_average: "#F7E3A0",
    incomplete: "#E6E7EA",
};

const ApplicantStatusGraph = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.applicant_status ? Object.entries(InsightsGraphData?.applicant_status).map(([key, value]) => ({
        name: key,
        ...value,
    })) : [];
    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={convertedData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    barCategoryGap={20}
                >
                    {/* <XAxis type="number" /> */}
                    <XAxis type="number" tickCount={11} interval={0} tick={{ fontSize: 12 }} domain={[0, 200]} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <YAxis type="category" dataKey="name" axisLine={false} />
                    <Tooltip />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ paddingTop: 20 }}
                    />
                    {Object.keys(COLORS).map((key) => (
                        <Bar key={key} dataKey={key} stackId="a" fill={COLORS[key]}>
                            {/* <LabelList dataKey={key} position="inside" fill="#fff" /> */}
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ApplicantStatusGraph;

