import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from 'victory';


export default function Reports({ update }) {

  const [arrData, setArrData] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:4000/reports')
      const data = await res.json()
      setArrData(data)
      console.log(data);
    })()
  }, [update])


  return (
    <div className='reports'>
      <VictoryChart
        theme={VictoryTheme.materiall}
        domainPadding={30}
      >
        <VictoryBar
          style={{ data: { fill: "red" } }}
          data={arrData}
          x="id"
          y="amount"
          // animate
          barWidth={6}
        />
      </VictoryChart>
    </div>
  );
} 
