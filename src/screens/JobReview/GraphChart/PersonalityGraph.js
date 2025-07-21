import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
    Cell
} from 'recharts';

const dataAll = [
    { name: 'Pioneer', value: 72 },
    { name: 'Influencer', value: 45 },
    { name: 'Team Player', value: 83, highlight: true },
    { name: 'Logical Thinker', value: 83, highlight: true },
    { name: 'Persuader', value: 22 },
    { name: 'Achiever', value: 52 },
    { name: 'Perfectionist', value: 13 },
    { name: 'Collaborator', value: 25 },
    { name: 'Assessor', value: 8 },
    { name: 'Implementor', value: 42 },
    { name: 'Motivator', value: 70 },
    { name: 'Leader', value: 37 },
    { name: 'Administrator', value: 11 },
    { name: 'Mediator', value: 27 },
    { name: 'Mediator', value: 19 },
];

const PersonalityGraph = ({InsightsGraphData,personalityAll}) => {
    console.log("---------------->",InsightsGraphData,personalityAll)
    const data =InsightsGraphData?.personality_data? personalityAll?.map((item)=>({
        ...item,
        name:item?.behaviours_name,
        value:InsightsGraphData?.personality_data[item?.behaviour_type_name]

    })):[]
    // debugger
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    interval={0}
                    tick={({ x, y, payload, index }) => {
                        const value = data[index]?.personality_percentage;
                        return (
                            <g transform={`translate(${x},${y + 10})`}>
                                <text x={0} y={0} dy={14} textAnchor="middle" fill="#666" fontSize="12">
                                    {payload.value}
                                </text>
                                <text x={0} y={14} dy={14} textAnchor="middle" fill="#999" fontSize="12">
                                    {value}%
                                </text>
                            </g>
                        );
                    }}
                    axisLine={false}
                />
                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(value) => `${value}%`} axisLine={false} />
                <Tooltip />
                <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    fill="#82caff"
                    // Dynamic fill color
                    isAnimationActive={false}
                    barSize={20}
                >
                    {/* <LabelList
                        dataKey="value"
                        position="insideBottom"
                        // formatter={(value) => `${value}%`}
                    /> */}
                    {
                        data?.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.highlight ? '#f9a825' : '#82caff'}
                            />
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default PersonalityGraph;
