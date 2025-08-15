import React from 'react';

export type SignalType = 'sine' | 'square' | 'noisy';

interface SignalControlsProps {
  signalType: SignalType;
  setSignalType: (type: SignalType) => void;
  amplitude: number;
  setAmplitude: (a: number) => void;
  frequency: number;
  setFrequency: (f: number) => void;
}

const SignalControls: React.FC<SignalControlsProps> = ({
  signalType,
  setSignalType,
  amplitude,
  setAmplitude,
  frequency,
  setFrequency,
}) => (
  <div style={{ marginBottom: 20 }}>
    <label>
      Signal Type:
      <select value={signalType} onChange={e => setSignalType(e.target.value as SignalType)}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="noisy">Noisy</option>
      </select>
    </label>
    <label style={{ marginLeft: 20 }}>
      Amplitude:
      <input type="number" value={amplitude} min={0} max={10} step={0.1} onChange={e => setAmplitude(Number(e.target.value))} />
    </label>
    <label style={{ marginLeft: 20 }}>
      Frequency (Hz):
      <input type="number" value={frequency} min={0.1} max={10} step={0.1} onChange={e => setFrequency(Number(e.target.value))} />
    </label>
  </div>
);

export default SignalControls;
