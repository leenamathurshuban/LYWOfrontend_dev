// import React from "react";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
//     ResponsiveContainer,
//     Legend,
//     Cell,
// } from "recharts";

// const dataValue = {
//     below_3_lpa: "0-3",
//     lpa_3_5: "3-5",
//     lpa_5_7: "5-7",
//     lpa_7_10: "7-10",
//     lpa_10_12: "10-12",
//     lpa_12_15: "12-15",
//     lpa_15_20: "15-20",
//     lpa_20_25: "20-25",
//     lpa_25_30: "25-30",
//     lpa_30_35: "30-35",
//     lpa_35_40: "35-40",
//     lpa_40_45: "40-45",
//     lpa_45_50: "45-50",
//     lpa_50_55: "50-55",
//     lpa_55_60: "55-60",
//     above_60_lpa: "60+"
// }

// const EducationLevelGraph = ({ InsightsGraphData }) => {
//     const convertedData = InsightsGraphData?.applicant_education_level?.length>0 ? InsightsGraphData?.applicant_education_level?.map((val, index) => ({
//         name: val?.education_level,
//         value: val?.level_count,
//     })) : [];

//     return (
//         <div style={{ width: "100%", height: 330 }}>
//             <ResponsiveContainer>
//                 <BarChart data={convertedData} margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name"
//                         tick={({ x, y, payload, index }) => {                            
//                             return (
//                                 <g transform={`translate(${x},${y + 10})`}>
//                                     <text x={0} y={0} dy={14} textAnchor="middle" fill="#666" fontSize="10">
//                                         {payload.value}
//                                     </text>
//                                 </g>
//                             );
//                         }}
//                         axisLine={false} />
//                     <YAxis label={{ value: "Number of Applicants", angle: -90, position: "insideLeft" }} domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} axisLine={false} />
//                     <Tooltip />
//                     <Bar
//                         dataKey="value"
//                         radius={[5, 5, 0, 0]}
//                         fill="#87CEFA"
//                         // label={{ position: "top", fill: "#000" }}
//                         barSize={20}
//                     >
//                         {
//                             convertedData.map((entry, index) => (
//                                 <Cell
//                                     key={`cell-${index}`}
//                                     fill={entry.name === "10-12" ? "#FFA500" : "#87CEFA"}
//                                 />
//                             ))
//                         }
//                     </Bar>
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default EducationLevelGraph;


import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LabelList,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Under Graduation", value: 10, fill: "#73c2fb" },
    { name: "Post Graduation", value: 20, fill: "#fba23c" },
    { name: "Bachelors", value: 40, fill: "#73c2fb" },
    { name: "Masters", value: 100, fill: "#fba23c" },
    { name: "PHD", value: 20, fill: "#73c2fb" },
    { name: "Post Doctoral", value: 10, fill: "#73c2fb" },
];


const EducationLevelGraph = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.applicant_education_level?.length > 0 ? InsightsGraphData?.applicant_education_level?.map((val, index) => ({
        name: val?.education_level,
        value: val?.level_count,
        fill:val?.education_level==="Master's Degree" || val?.education_level==="Professional Degree (e.g., MD, JD)" ?"#fba23c":"#73c2fb"
    })) : [];
    return (
        <>
            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        layout="vertical"
                        data={convertedData}
                        margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
                        barSize={15}
                    >
                        <XAxis
                            type="number"
                            domain={[0, 200]}
                            tick={{fontSize:12}}
                            ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]}
                            axisLine={false}
                            tickLine={false}
                        />
                         <YAxis
                            type="category"
                            dataKey="name"
                            width={230}
                            tickLine={false}
                            axisLine={false}
                            tick={({ x, y, payload }) => {
                                const words = payload.value
                                    .split('_')
                                    .join(' ')
                                    .replace(/\b\w/g, (char) => char.toUpperCase())
                                    .split(' ');

                                const lines = [];
                                let currentLine = words[0];

                                for (let i = 1; i < words.length; i++) {
                                    const testLine = currentLine + ' ' + words[i];
                                    // Estimate text width using approx char width (you can tweak 7)
                                    if (testLine.length * 7 < 380) {
                                        currentLine = testLine;
                                    } else {
                                        lines.push(currentLine);
                                        currentLine = words[i];
                                    }
                                }
                                lines.push(currentLine);

                                return (
                                    <text
                                        x={x - 200}
                                        y={y}
                                        textAnchor="start"
                                        fill="#444"
                                        fontSize={12}
                                        // fontWeight={600}
                                    >
                                        {lines.map((line, index) => (
                                            <tspan key={index} x={x - 320} dy={index === 0 ? 5 : 15}>
                                                {line}
                                            </tspan>
                                        ))}
                                    </text>
                                );
                            }}
                        />

                        {/* <YAxis type="category" dataKey="name" axisLine={false} /> */}
                        <Tooltip formatter={(value) => `${value}/200`} />
                        <Bar dataKey="value" radius={[10, 10, 10, 10]} isAnimationActive={false}>
                            {convertedData.map((entry, index) => (
                                <cell key={`cell-${index}`} fill={entry.fill}  />
                            ))}
                            <LabelList
                                dataKey="value"
                                position="right"
                                content={({ x, y, value }) => (
                                    <text
                                    x={x + 300}  // adjust to push label further right
                                    y={y + 12}   // adjust vertical centering
                                    fontSize={12} // smaller font size
                                    fill="#444"
                                    textAnchor="end"
                                    >
                                    {`${value}/200`}
                                    </text>
                                )}
                                />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default EducationLevelGraph;

