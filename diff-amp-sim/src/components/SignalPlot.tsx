import React from 'react';
import Plot from 'react-plotly.js';

interface SignalPlotProps {
  x: number[];
  y: number[];
  title: string;
  color?: string;
}

const SignalPlot: React.FC<SignalPlotProps> = ({ x, y, title, color }) => (
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
      title,
      margin: { t: 40, l: 40, r: 20, b: 40 },
    }}
    config={{ displayModeBar: false }}
  />
);

export default SignalPlot;
