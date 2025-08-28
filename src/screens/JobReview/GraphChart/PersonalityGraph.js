import React, { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
    Cell
} from 'recharts';

import { Offcanvas, Modal } from 'react-bootstrap';
import LeaderIcn from "../../../images/icons/Leader-icon.svg";
import InfluencerLarge from "../../../images/icons/Influencer-icon.svg";



const PersonalityGraph = ({InsightsGraphData,personalityAll}) => {

          const [personalityshow, personalitysetShow] = useState(false);
    
      const personalityClose = () => personalitysetShow(false);
      const personalityShow = () => personalitysetShow(true);

    const data =InsightsGraphData?.personality_data? personalityAll?.map((item)=>({
        ...item,
        name:item?.behaviours_name,
        value:InsightsGraphData?.personality_data[item?.behaviour_type_name]

    })):[]
    const topTwo = [...new Set(data)] // remove duplicates if any
    .sort((a, b) => b?.personality_percentage - a?.personality_percentage)             // sort descending
    .slice(0, 2)?.flatMap(group=>group?.personality_percentage);
    return (
        <>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                    tickLine={false}
                />
                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tick={{fontSize:12}} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    fill="#82caff"
                    // Dynamic fill color
                    isAnimationActive={false}
                    barSize={20}
                    onClick={() => personalitysetShow(true)}
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
                                fill={topTwo?.includes(entry?.personality_percentage) ? '#f9a825' : '#82caff'}
                            />
                        ))
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>

         {/* personaty card */}


            <Offcanvas
                    show={personalityshow}   
                    onHide={personalityClose}
                    animation={false}
                    size="md"
                    backdrop={true}
                    className="indleffort-mdl lg-drawer personalty-drawer-new"
                    backdropClassName="custom-backdrop"
                    placement="end"
                  >
                    <Offcanvas.Header className="p-4" closeButton>

                    </Offcanvas.Header>

                    <Offcanvas.Body className="py-4 px-4">

                    <Modal.Header >
                      <img src={LeaderIcn} alt="leader-icon" />
                      <Modal.Title>
                        <span className="count">P</span> Persuader
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="py-5 px-4">
                      <h2 className="h2_title">
                        <span className="count">P</span> Persuader
                      </h2>
                      <div className="indleffort-text">
                        <p>Leaders are practical, innovative, self-reliant, and ambitious individuals that are always pushing to make
            things better. They are friendly, charming, and enthusiastic in casual circumstances but tend to be direct,
            forthright, and assertive in formal setups. They like taking responsibility and taking credit for both wins and
            losses, as long as they have control of the results. They do not shy away from taking command when needed
            and may be impatient with the inefficiencies of others. They are sensitive to the needs of the team. They
            find a balance between personal ambitions and group goals. They are very clear thinkers, make good
            decisions and promote harmony in the team.</p>
                        <ul>
                          <li><strong>Strengths</strong><p>Charming, visionary, adventurous...</p></li>
                          <li><strong>Uniqueness</strong><p>Sound decision making...</p></li>
                          <li><strong>Value to Org.</strong><p>Thrives under pressure...</p></li>
                          <li><strong>Challenges</strong><p>Stagnation; can get aggressive...</p></li>
                          <li><strong>Motivations</strong><p>Success and recognition...</p></li>
                        </ul>
                      </div>
                    </Modal.Body>
                    </Offcanvas.Body>
                  </Offcanvas>

                  </>
    );
};

export default PersonalityGraph;
