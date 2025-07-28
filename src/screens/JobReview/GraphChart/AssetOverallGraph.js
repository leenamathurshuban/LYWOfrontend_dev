// ScoreDistributionChart.jsx
import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { transformOverallAndSectionData } from "../../../utils/assetgraphLogic";

const overallData = [
    { range: "0–10%", applicants: 40 },
    { range: "11–20%", applicants: 70 },
    { range: "21–30%", applicants: 50 },
    { range: "31–40%", applicants: 65 },
    { range: "41–50%", applicants: 180 },
    { range: "51–60%", applicants: 200 },
    { range: "61–70%", applicants: 95 },
    { range: "71–80%", applicants: 100 },
    { range: "81–90%", applicants: 60 },
    { range: "91–100%", applicants: 45 },
];

const experienceValueMap = {
    percent_0_10: "0-10%",
    percent_11_20: "11-20%",
    percent_21_30: "21-30%",
    percent_31_40: "31-40%",
    percent_41_50: "41-50%",
    percent_51_60: "51-60%",
    percent_61_70: "61-70%",
    percent_71_80: "71-80%",
    percent_81_90: "81-90%",
    percent_91_100: "91-100%",
};
// Example section-wise data (stacked or grouped – here we’ll group them)
const sectionWiseData = [
    { range: "0–10%", Maths: 10, Verbal: 15, Logic: 15 },
    { range: "11–20%", Maths: 20, Verbal: 25, Logic: 25 },
    { range: "21–30%", Maths: 18, Verbal: 15, Logic: 17 },
    { range: "31–40%", Maths: 25, Verbal: 20, Logic: 20 },
    { range: "41–50%", Maths: 60, Verbal: 65, Logic: 55 },
    { range: "51–60%", Maths: 70, Verbal: 65, Logic: 65 },
    { range: "61–70%", Maths: 30, Verbal: 35, Logic: 30 },
    { range: "71–80%", Maths: 32, Verbal: 38, Logic: 30 },
    { range: "81–90%", Maths: 18, Verbal: 20, Logic: 22 },
    { range: "91–100%", Maths: 15, Verbal: 14, Logic: 16 },
];

export default function AssetOverAllGraphComponent({ key,overallData, sectionWiseData, sectionNames, idsMode }) {
    //   const isOverall = mode === "overall";
    console.log("==================>insights", idsMode)
    return (
        <div style={{ width: "100%", height: 380, border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
            {/* <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <input
              type="radio"
              name="mode"
              value="overall"
              checked={isOverall}
              onChange={() => setMode("overall")}
            />
            Over all Score
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input
              type="radio"
              name="mode"
              value="section"
              checked={!isOverall}
              onChange={() => setMode("section")}
            />
            Section wise Scores
          </label>
        </div>
      </header> */}

            {/* <ResponsiveContainer width="100%" height="100%">
                {!mode ? (
                    <BarChart
                        data={overallData}
                        margin={{ top: 24, right: 24, left: 0, bottom: 24 }}
                        barSize={15}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis label={{ value: "Number of Applicants", angle: -90, position: "insideLeft" }} ticks={[0, 50, 100, 150, 200, 250]} />
                        <Tooltip />
                        <Legend />
                        <Bar name="Over all score" dataKey="applicants" fill="#ffba3a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : (
                    <BarChart
                        data={sectionWiseData}
                        margin={{ top: 24, right: 24, left: 0, bottom: 24 }}
                        barSize={10}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis label={{ value: "Number of Applicants", angle: -90, position: "insideLeft" }} ticks={[0, 50, 100, 150, 200, 250]} />
                        <Tooltip />
                        <Legend />
                        Grouped bars per bucket
                        <Bar dataKey="Maths" stackId={undefined} fill="#8884d8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Verbal" stackId={undefined} fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Logic" stackId={undefined} fill="#ffc658" radius={[4, 4, 0, 0]} />
                    </BarChart>
                )}
            </ResponsiveContainer> */}

            <ResponsiveContainer width="100%" height="100%">
                {!idsMode ? (
                    <BarChart data={overallData} barCategoryGap="40%" barSize={15}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tick={{fontSize:12}} dataKey="range" />
                        <YAxis tick={{fontSize:12}} label={{ value: "Number of Applicants", angle: -90, position: "insideLeft" }} ticks={[0, 50, 100, 150, 200, 250]} />
                        <Tooltip />
                        <Legend />
                        <Bar tick={{fontSize:12}} dataKey="applicants" fill="#ffba3a" name="Overall Score" radius={[4, 4, 0, 0]} />
                    </BarChart>
                ) : (
                    <BarChart data={sectionWiseData} barCategoryGap="40%" barSize={10}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tick={{fontSize:12}} dataKey="range" />
                        <YAxis  label={{ value: "Number of Applicants", angle: -90, position: "insideLeft" }} ticks={[0, 50, 100, 150, 200, 250]} tick={{fontSize:10}} />
                        <Tooltip />
                        <Legend />
                        {sectionNames?.map((section, idx) => (
                            <Bar
                                key={section}
                                dataKey={section}
                                fill={["#8884d8", "#82ca9d", "#ffc658", "#d84a4a"][idx % 4]}
                                radius={[4, 4, 0, 0]}
                                name={section}
                            />
                        ))}
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
