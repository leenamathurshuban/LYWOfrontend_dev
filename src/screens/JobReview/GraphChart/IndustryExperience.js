import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip
} from "recharts";

// Example dynamic data (can be fetched or passed as props)
const data = [
    { name: "Mathematics", value: 10 },
    { name: "Computer Science", value: 15 },
    { name: "Engineering", value: 20 },
    { name: "Electronic and Telecommunication", value: 5 },
    { name: "Electronic and Instrumentation", value: 12 },
    { name: "Electronic and Communication", value: 18 },
    { name: "Computer Engineering", value: 10 },
    { name: "Software Engineering", value: 7 },
    { name: "Software Developer", value: 8 },
    { name: "AI and ML", value: 9 },
    { name: "Cybersecurity", value: 6 }
];

const convertKeyToLabel = (key) => {
    key = key.replace(/_count$/, '');

    if (/^\d+_\d+_days$/.test(key)) {
        return key
            .replace(/_/g, ' ')
            .replace(/^(\d+)\s(\d+)/, '$1 - $2')
            .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return key
        .replace(/_count$/, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

const groupMinorValues = (data, threshold = 2) => {
    const major = data.filter(d => d.value >= threshold);
    const minor = data.filter(d => d.value < threshold);
    const otherTotal = minor.reduce((sum, d) => sum + d.value, 0);

    if (otherTotal > 0) {
        major.push({ name: "Others", value: otherTotal });
    }

    return major;
};

// Dynamic color generator (for more than 9 values)
const generateColors = (count) => {
    const baseColors = [
        "#1b56e3", "#1d6df2", "#2f88f3", "#53a5f4", "#79c3f6", "#9ee2f8",
        "#ffc67f", "#ffb54f", "#ff9c1a", "#d17eeb", "#f3799c", "#4dd091"
    ];
    // Repeat base colors if data length > baseColors.length
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
};

const IndustryExperienceChart = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.applicant_industry_data?.length > 0 ? InsightsGraphData?.applicant_industry_data?.map((val, index) => ({
        name: convertKeyToLabel(val?.past_industry),
        value: val?.applicant_count,
    })) : [];
    
    
    const data = groupMinorValues(convertedData, 2);
    const dataLength = data.length;

    const COLORS = generateColors(dataLength);
    // const COLORS = Array.from({ length: dataLength }, (_, i) =>
    //     `hsl(${(i * 360) / dataLength}, 70%, 70%)`
    // );

    // const dynamicRadius = Math.max(100, 280 - dataLength * 3);
    const dynamicRadius = Math.max(100, 280 - dataLength * 7);
    const legendHeight = Math.min(500, dataLength * 22); // 22px per item

    return (
        <div style={{ width: "100%", height: 330 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={130}
                        dataKey="value"
                        paddingAngle={2}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    {/* <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        iconType="circle"
                        formatter={(value) => <span style={{ fontSize: 13 }}>{value}</span>}
                    /> */}
                    <Tooltip />
                     <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        wrapperStyle={{
                            overflowY: "auto",
                            maxHeight: legendHeight
                        }}
                        iconType="circle"
                        formatter={(value) => {
                            const item = data.find(d => d.name === value);
                            return (
                                <span style={{ color: "#2e3a59", fontWeight: "bold",fontSize:"10px" }}>
                                    {value} — {item?.value}
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IndustryExperienceChart;