import React from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

export default function ResponsiveBar (props) {
  
  let chartWidth;
  let chartHeight;
  let barSize;
  let xFontSize;
  let yFontSize;
  const data = props.data;
  
  console.log("Window Inner Width: ", window.innerWidth); // don't remove; chart X-axis does ..
  // .. not seem to be responsive (for mobile screens) without this log line. Not sure why.
  if (window.innerWidth < 700) {
    chartWidth = "95%";
    chartHeight = 200;
    barSize = 15;
    xFontSize = '0.8rem';
    yFontSize = '0.8rem';
    data.forEach(i => {
      i["name"] = i["name"].slice(0, 5);
    })
  }
  else {
    chartWidth = "100%";
    chartHeight = 250;
    barSize = 20;
    xFontSize = '1rem';
    yFontSize = '0.8rem';
  }
  
  return (
    <ResponsiveContainer width={chartWidth} height={chartHeight}>
      <BarChart barSize={barSize}  data={data}>
        <CartesianGrid stroke="#C0C0C0" fill="#2F4F4F" vertical={false}/>
        <XAxis dataKey="name" style={{
          fontSize: xFontSize,
          fontFamily: 'Space Grotesk, sans-serif',
          }}
        />
        <YAxis style={{
          fontSize: yFontSize,
          fontFamily: 'Space Grotesk, sans-serif',
          }}
        />
        {/*<Tooltip />*/}
        <Legend iconType="plainline" wrapperStyle={{
          fontSize: yFontSize+5,
          fontFamily: 'Space Grotesk, sans-serif',
          textIndent: 25,
          letterSpacing: 1,
          }}
        />
        <Bar dataKey="Male" fill="#A98743" />
        <Bar dataKey="Female" fill="#755B69" />
      </BarChart>
    </ResponsiveContainer>
  );
}