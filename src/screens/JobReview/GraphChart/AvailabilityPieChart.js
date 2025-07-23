// import React from "react";
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Legend,
//     ResponsiveContainer
// } from "recharts";

// // const data = [
// //     { name: "Less than 30 Days", value: 40 },
// //     { name: "30 - 60 Days", value: 70 },
// //     { name: "60 - 90 Days", value: 50 },
// //     { name: "More than 90", value: 26 }
// // ];

// const COLORS = ["#8fd3fe", "#42a5f5", "#ffcc80", "#ffb74d"];

// // const RADIAN = Math.PI / 180;

// // const renderCustomizedLabel = ({
// //     cx,
// //     cy,
// //     midAngle,
// //     innerRadius,
// //     outerRadius,
// //     percent,
// //     index
// // }) => {
// //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //     return (
// //         <text
// //             x={x}
// //             y={y}
// //             fill="white"
// //             textAnchor="middle"
// //             dominantBaseline="central"
// //             fontSize={12}
// //         >
// //             {data[index].value}
// //         </text>
// //     );
// // };

// const AvailabilityPieChart = ({ InsightsGraphData }) => {
//     const convertKeyToLabel = (key) => {     
//         key = key.replace(/_count$/, '');

//         if (/^\d+_\d+_days$/.test(key)) {
//             return key
//                 .replace(/_/g, ' ')                     
//                 .replace(/^(\d+)\s(\d+)/, '$1 - $2')    
//                 .replace(/\b\w/g, (c) => c.toUpperCase()); 
//         }

//         return key
//             .replace(/_count$/, '')
//             .replace(/_/g, ' ')
//             .replace(/\b\w/g, (c) => c.toUpperCase()); 
//     };

//     const convertedData = InsightsGraphData?.availability_of_candidates ? Object.entries(InsightsGraphData?.availability_of_candidates).map(([key, value]) => ({
//         name: convertKeyToLabel(key),
//         value: value,
//     })) : [];

//     return (
//         <div style={{ width: "100%", height: 330 }}>
//             <ResponsiveContainer>
//                 <PieChart>
//                     <Pie
//                         data={convertedData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         // label={renderCustomizedLabel}
//                         outerRadius={145}
//                         dataKey="value"
//                     >
//                         {convertedData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Legend
//                         layout="vertical"
//                         align="right"
//                         verticalAlign="middle"
//                         iconType="circle"
//                         formatter={(value, entry, index) => (
//                             <span style={{ color: "#2e3a59", fontWeight: "bold" }}>
//                                 {value}{" "}
//                                 <span style={{ color: "#2e3a59", fontWeight: "bold" }}>
//                                     {convertedData.find(d => d.name === value)?.value}
//                                 </span>
//                             </span>
//                         )}
//                     />
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default AvailabilityPieChart;

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

const AvailabilityPieChart = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.availability_of_candidates ? Object.entries(InsightsGraphData?.availability_of_candidates).map(([key, value]) => ({
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
                                <span style={{ color: "#2e3a59", fontWeight: "600", fontSize: "14px" }}>
                                 <span className="left-value">  {value} </span>  <span className="right-value">  {item?.value} </span>
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AvailabilityPieChart;
