
import React, { useState, useMemo } from 'react';
import './App.css';
import SignalPlot from './components/SignalPlot';
import SignalControls, { SignalType } from './components/SignalControls';

// Helper to generate signals
function generateSignal(type: SignalType, amplitude: number, frequency: number, t: number[]): number[] {
  switch (type) {
    case 'sine':
      return t.map(x => amplitude * Math.sin(2 * Math.PI * frequency * x));
    case 'square':
      return t.map(x => amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * x)));
    case 'noisy':
      return t.map(x => amplitude * Math.sin(2 * Math.PI * frequency * x) + (Math.random() - 0.5) * amplitude * 0.7);
    default:
      return t.map(() => 0);
  }
}

function App() {
  // Signal controls
  // (No longer using signalType, amplitude, frequency, or old gain)

  // Time axis: 0 to 5 ms, 500 points
  const t = useMemo(() => Array.from({ length: 500 }, (_, i) => i * 0.005 / 500), []); // 0 to 0.005 s (5 ms)

  // Vin+ (input1): small sine, amplitude 1V, freq 1kHz
  const vinp = useMemo(() => t.map(x => 1 * Math.sin(2 * Math.PI * 1000 * x)), [t]);
  // Vin- (input2): small sine, amplitude 1V, freq 1kHz, 180 deg out of phase
  const vinn = useMemo(() => t.map(x => 1 * Math.sin(2 * Math.PI * 1000 * x + Math.PI)), [t]);
  // Vout: gain * (vinp - vinn), gain = 6
  const gain = 6;
  const vout = useMemo(() => vinp.map((v, i) => gain * (v - vinn[i])), [vinp, vinn, gain]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Differential Amplifier Simulator</h1>
        <p style={{ maxWidth: 700, margin: '0 auto', fontSize: 18 }}>
          A differential amplifier amplifies the difference between two input signals, helping reduce noise and providing high Common-Mode Rejection Ratio (CMRR). It generates an output proportional to the difference, with a gain (here, gain = 2).
        </p>
        {/* No controls for this demo, fixed waveform */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <SignalPlot x={t.map(x => x * 1000)} y={vout} title="V(out)" color="black" />
          <SignalPlot x={t.map(x => x * 1000)} y={vinp} title="V(in+)" color="blue" />
        </div>
        <div style={{ margin: '30px 0', background: '#222', padding: 20, borderRadius: 10, maxWidth: 700 }}>
          <h2 style={{ margin: 0 }}>Internal Mechanism</h2>
          <p style={{ fontSize: 16, margin: 0 }}>
            The differential amplifier subtracts Input 2 from Input 1 and multiplies the result by the gain. Common-mode signals (like noise present in both inputs) are largely cancelled, resulting in high CMRR.
          </p>
        </div>
  {/* Output already shown above */}
        <div style={{ marginTop: 30, fontSize: 16, maxWidth: 700 }}>
          <b>CMRR (Common-Mode Rejection Ratio):</b> The ability of the amplifier to reject signals common to both inputs (like noise). Higher CMRR means better noise rejection.
        </div>
      </header>
    </div>
  );
}

export default App;
