import React from 'react';
import Plot from 'react-plotly.js';


interface SignalPlotProps {
  x: number[];
  y: number[];
  title: string;
  color?: string;
  interactive?: boolean;
}


const SignalPlot: React.FC<SignalPlotProps> = ({ x, y, title, color, interactive }) => (
  <Plot
    data={[
      {
        x,
        y,
        type: 'scatter',
        mode: 'lines',
        marker: { color: color || 'blue' },
      },
    ]}
    layout={{
      width: 500,
      height: 250,
      title: {
        text: title,
      },
      margin: { t: 40, l: 40, r: 20, b: 40 },
    }}
    config={{ displayModeBar: interactive, scrollZoom: interactive }}
  />
);

export default SignalPlot;
