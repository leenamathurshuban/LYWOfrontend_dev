import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer
} from "recharts";

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
const COLORS = ["#8fd3fe", "#42a5f5", "#ffcc80", "#ffb74d"];

// Group low-value categories into "Others" if needed
const groupMinorValues = (data, threshold = 2) => {
    const major = data.filter(d => d.value >= threshold);
    const minor = data.filter(d => d.value < threshold);
    const otherTotal = minor.reduce((sum, d) => sum + d.value, 0);

    if (otherTotal > 0) {
        major.push({ name: "Others", value: otherTotal });
    }

    return major;
};

const CustomerChartComponent = ({ InsightsGraphData,index }) => {
    const convertedData = InsightsGraphData?.quetion_option_wise_count ? Object.entries(InsightsGraphData?.quetion_option_wise_count).map(([key, value]) => ({
        name: convertKeyToLabel(key),
        value: value,
    })) : [];
    // const data = groupMinorValues(convertedData, 2);
    // const dataLength = data.length;

    // const COLORS = Array.from({ length: dataLength }, (_, i) =>
    //     `hsl(${(i * 360) / dataLength}, 70%, 70%)`
    // );

    // const dynamicRadius = Math.max(100, 280 - dataLength * 3);
    // const dynamicRadius = Math.max(100, 280 - dataLength * 7);
    // const legendHeight = Math.min(500, dataLength * 22); // 22px per item
    return (
        <div style={{ width: "100%", height: 330 }}>
        <h6>Question{index+1}</h6>        
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={convertedData}
                        cx="40%"
                        cy="50%"
                        outerRadius={145}
                        label={false}
                        dataKey="value"
                    >
                        {convertedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"                        
                        iconType="circle"
                        formatter={(value) => {
                            const item = convertedData.find(d => d.name === value);
                            return (
                                <span style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "12px" }}>
                                 <span className="left-value">{value}</span>    <span className="right-value"> {item?.value}</span>
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomerChartComponent;
