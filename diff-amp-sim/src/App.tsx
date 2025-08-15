
import React, { useState, useMemo } from 'react';
import './App.css';
import SignalPlot from './components/SignalPlot';
import SignalControls, { SignalType } from './components/SignalControls';

// Helper to generate signals
function generateSignal(type: SignalType, amplitude: number, frequency: number, noise: boolean, t: number[]): number[] {
  switch (type) {
    case 'sine':
      return t.map(x => amplitude * Math.sin(2 * Math.PI * frequency * x));
    case 'square':
      return t.map(x => amplitude * (Math.sin(2 * Math.PI * frequency * x) >= 0 ? 1 : -1));
    case 'noisy':
      return t.map(x => amplitude * Math.sin(2 * Math.PI * frequency * x) + (Math.random() - 0.5) * amplitude * 0.7);
    default:
      return t.map(() => 0);
  }
}

function App() {
  // Signal controls
  const [signalType, setSignalType] = useState<SignalType>('sine');
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);
  // Differential amplifier parameters
  const gain = 2;
  // Time axis
  const t = useMemo(() => Array.from({ length: 500 }, (_, i) => i / 500), []);
  // Input signals
  const input1 = useMemo(() => generateSignal(signalType, amplitude, frequency, false, t), [signalType, amplitude, frequency, t]);
  // For demo, input2 is input1 plus some common-mode noise
  const input2 = useMemo(() => input1.map((v, i) => v + 0.5 * Math.sin(2 * Math.PI * 5 * t[i])), [input1, t]);
  // Differential amplifier output: gain * (input1 - input2)
  const output = useMemo(() => input1.map((v, i) => gain * (v - input2[i])), [input1, input2, gain]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Differential Amplifier Simulator</h1>
        <p style={{ maxWidth: 700, margin: '0 auto', fontSize: 18 }}>
          A differential amplifier amplifies the difference between two input signals, helping reduce noise and providing high Common-Mode Rejection Ratio (CMRR). It generates an output proportional to the difference, with a gain (here, gain = 2).
        </p>
        <SignalControls
          signalType={signalType}
          setSignalType={setSignalType}
          amplitude={amplitude}
          setAmplitude={setAmplitude}
          frequency={frequency}
          setFrequency={setFrequency}
        />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <SignalPlot x={t} y={input1} title="Input 1" color="blue" />
          <SignalPlot x={t} y={input2} title="Input 2 (with common noise)" color="orange" />
        </div>
        <div style={{ margin: '30px 0', background: '#222', padding: 20, borderRadius: 10, maxWidth: 700 }}>
          <h2 style={{ margin: 0 }}>Internal Mechanism</h2>
          <p style={{ fontSize: 16, margin: 0 }}>
            The differential amplifier subtracts Input 2 from Input 1 and multiplies the result by the gain. Common-mode signals (like noise present in both inputs) are largely cancelled, resulting in high CMRR.
          </p>
        </div>
        <SignalPlot x={t} y={output} title="Output Signal (Amplified Difference)" color="green" />
        <div style={{ marginTop: 30, fontSize: 16, maxWidth: 700 }}>
          <b>CMRR (Common-Mode Rejection Ratio):</b> The ability of the amplifier to reject signals common to both inputs (like noise). Higher CMRR means better noise rejection.
        </div>
      </header>
    </div>
  );
}

export default App;
