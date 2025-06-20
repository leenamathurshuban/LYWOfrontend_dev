import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
    Cell
} from 'recharts';

const data = [
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

const SkillGraphComponent = ({ InsightsGraphData }) => {
    const convertedData = InsightsGraphData?.skills_data?.length > 0 ? InsightsGraphData?.skills_data?.map((val, index) => ({
        name: convertKeyToLabel(val?.skill_name),
        value: val?.applicant_skill_count,
    })) : [];
    console.log(InsightsGraphData)
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={convertedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    interval={0}
                    tick={({ x, y, payload, index }) => {
                        const value = convertedData[index]?.value;
                        return (
                            <g transform={`translate(${x},${y + 10})`}>
                                <text x={0} y={0} dy={14} textAnchor="middle" fill="#666" fontSize="10">
                                    {payload.value}
                                </text>
                                <text x={0} y={14} dy={14} textAnchor="middle" fill="#999" fontSize="10">
                                    {value}%
                                </text>
                            </g>
                        );
                    }}
                    axisLine={false}
                />
                <YAxis domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} tickFormatter={(value) => `${value}%`} axisLine={false} />
                <Tooltip />
                <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    fill="#82caff"
                    // Dynamic fill color
                    isAnimationActive={false}
                    barSize={15}
                >
                    {/* <LabelList
                        dataKey="value"
                        position="insideBottom"
                        // formatter={(value) => `${value}%`}
                    /> */}
                    {
                        convertedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.name=="Document Management" || entry.name==="Time Management" ? '#f9a825' : '#82caff'}
                            />
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SkillGraphComponent;
