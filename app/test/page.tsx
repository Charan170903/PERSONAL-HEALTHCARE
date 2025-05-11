'use client';
import { useState } from 'react';

export default function CPUPredictor() {
  const [result, setResult] = useState<number | null>(null);

  const predict = async () => {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Threads: 16,
        TDP: 65,
        PowerPerf: 0.85,
        Cores: 8,
        Year: 2023
      })
    });
    const data = await response.json();
    setResult(data.cpuMark);
  };

  return (
    <div className="p-4">
      <button onClick={predict} className="bg-blue-500 px-4 py-2 text-white rounded">
        Predict CPU Mark
      </button>
      {result && (
        <p className="mt-4 text-green-600 font-semibold">
          Predicted Score: {result}
        </p>
      )}
    </div>
  );
}