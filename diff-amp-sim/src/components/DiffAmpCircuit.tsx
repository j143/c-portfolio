import React from 'react';

interface DiffAmpCircuitProps {
  vinp: number;
  vinn: number;
  vout: number;
  signalActive: boolean;
}

const DiffAmpCircuit: React.FC<DiffAmpCircuitProps> = ({ vinp, vinn, vout, signalActive }) => {
  // Colors for signal paths
  const activeColor = '#4CAF50';
  const inactiveColor = '#666';
  const pathColor = signalActive ? activeColor : inactiveColor;

  return (
    <div style={{ margin: '20px auto', maxWidth: 600, position: 'relative' }}>
      <svg width="600" height="300" viewBox="0 0 600 300">
        {/* Background */}
        <rect x="150" y="50" width="300" height="200" fill="#1E1E1E" stroke="#333" strokeWidth="2" rx="10" />
        
        {/* Transistor pair */}
        <circle cx="250" cy="150" r="20" fill="#2C2C2C" stroke="#444" strokeWidth="2" />
        <circle cx="350" cy="150" r="20" fill="#2C2C2C" stroke="#444" strokeWidth="2" />
        
        {/* Input paths */}
        <path d="M50,150 H230" stroke={pathColor} strokeWidth="3" fill="none">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M550,150 H370" stroke={pathColor} strokeWidth="3" fill="none">
          <animate attributeName="stroke-dashoffset" from="0" to="100" dur="1s" repeatCount="indefinite" />
        </path>
        
        {/* Output path */}
        <path d="M300,150 V50" stroke={pathColor} strokeWidth="3" fill="none">
          <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.5s" repeatCount="indefinite" />
        </path>
        
        {/* Labels */}
        <text x="210" y="130" fill="#FFF" fontSize="14">V(in+)</text>
        <text x="370" y="130" fill="#FFF" fontSize="14">V(in-)</text>
        <text x="290" y="40" fill="#FFF" fontSize="14">V(out)</text>
        
        {/* Signal values */}
        <text x="50" y="140" fill={activeColor} fontSize="12">{vinp.toFixed(2)}V</text>
        <text x="530" y="140" fill={activeColor} fontSize="12">{vinn.toFixed(2)}V</text>
        <text x="290" y="70" fill={activeColor} fontSize="12">{vout.toFixed(2)}V</text>
      </svg>
    </div>
  );
};

export default DiffAmpCircuit;
