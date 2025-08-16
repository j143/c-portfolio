
import React, { useState, useMemo } from 'react';
import './App.css';
import './theme.css';
import SignalPlot from './components/SignalPlot';
import SignalControls, { SignalType } from './components/SignalControls';


function App() {
  // Signal controls
  // (No longer using signalType, amplitude, frequency, or old gain)

  // Signal controls
  const [signalType, setSignalType] = useState<SignalType>('sine');
  const [frequency, setFrequency] = useState(1000); // Hz
  const amplitude = 1; // fixed amplitude for now
  // Time axis: 0 to 5 ms, 500 points
  const t = useMemo(() => Array.from({ length: 500 }, (_, i) => i * 0.005 / 500), []); // 0 to 0.005 s (5 ms)

  // For noisy, use the same noise for both inputs (common-mode noise)
  const [noiseArr] = useState(() => Array.from({ length: t.length }, () => (Math.random() - 0.5) * amplitude * 0.7));
  // Vin+ (input1): user-selected type
  const vinp = useMemo(() => {
    switch (signalType) {
      case 'sine':
        return t.map(x => amplitude * Math.sin(2 * Math.PI * frequency * x));
      case 'square':
        return t.map(x => amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * x)));
      case 'noisy':
        return t.map((x, i) => amplitude * Math.sin(2 * Math.PI * frequency * x) + noiseArr[i]);
      default:
        return t.map(() => 0);
    }
  }, [signalType, frequency, t, noiseArr]);
  // Vin- (input2): same as Vin+ but 180 deg out of phase, same noise
  const vinn = useMemo(() => {
    switch (signalType) {
      case 'sine':
        return t.map(x => amplitude * Math.sin(2 * Math.PI * frequency * x + Math.PI));
      case 'square':
        return t.map(x => amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * x + Math.PI)));
      case 'noisy':
        return t.map((x, i) => amplitude * Math.sin(2 * Math.PI * frequency * x + Math.PI) + noiseArr[i]);
      default:
        return t.map(() => 0);
    }
  }, [signalType, frequency, t, noiseArr]);
  // Vout: gain * (vinp - vinn), gain = 6
  const gain = 6;
  const vout = useMemo(() => vinp.map((v, i) => gain * (v - vinn[i])), [vinp, vinn, gain]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Differential Amplifier Simulator</h1>
        <p className="description">
          A differential amplifier amplifies the difference between two input signals, helping reduce noise and providing high Common-Mode Rejection Ratio (CMRR). It generates an output proportional to the difference, with a gain (here, gain = 6).
        </p>
        <div className="control-panel">
          <SignalControls
            signalType={signalType}
            setSignalType={setSignalType}
            amplitude={amplitude}
            setAmplitude={() => {}} // amplitude is fixed for now
            frequency={frequency}
            setFrequency={setFrequency}
          />
        </div>
        
        <div className="signal-container">
          <h2>Input/Output Signal Analysis</h2>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ color: '#4CAF50' }}>Input Signal V(in+)</h3>
              <SignalPlot x={t.map(x => x * 1000)} y={vinp} title="V(in+)" color="#4CAF50" interactive />
              <p className="description" style={{ fontSize: '0.9em', marginTop: '10px' }}>
                {signalType === 'sine' ? 'Pure sinusoidal input' : 
                 signalType === 'square' ? 'Square wave input' : 
                 'Noisy signal input'} at {frequency} Hz
              </p>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ color: '#FF5722' }}>Differential Output</h3>
              <SignalPlot x={t.map(x => x * 1000)} y={vout} title="V(out) = gain × (V(in+) - V(in-))" color="#FF5722" interactive />
              <p className="description" style={{ fontSize: '0.9em', marginTop: '10px' }}>
                Amplified difference with gain = {gain}
                {signalType === 'noisy' ? ', notice how common-mode noise is rejected' : ''}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ color: '#2196F3' }}>Input Signal V(in-)</h3>
              <SignalPlot x={t.map(x => x * 1000)} y={vinn} title="V(in-)" color="#2196F3" interactive />
              <p className="description" style={{ fontSize: '0.9em', marginTop: '10px' }}>
                {signalType === 'sine' ? 'Inverted sinusoidal input' : 
                 signalType === 'square' ? 'Inverted square wave input' : 
                 'Inverted noisy signal input'} at {frequency} Hz
              </p>
            </div>
            <div style={{ flex: 1, minWidth: '300px', padding: '20px' }}>
              <div style={{ background: '#2d2d2d', padding: '15px', borderRadius: '8px' }}>
                <h3>Signal Characteristics</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li>• Peak-to-peak amplitude: {(2 * amplitude).toFixed(1)}V</li>
                  <li>• Frequency: {frequency} Hz</li>
                  <li>• Output gain: {gain}×</li>
                  <li>• Phase shift between inputs: 180°</li>
                  {signalType === 'noisy' && <li>• Common-mode noise rejection active</li>}
                </ul>
              </div>
            </div>
          </div>
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
