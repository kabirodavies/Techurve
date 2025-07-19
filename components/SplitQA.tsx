'use client';

import React, { useState } from 'react';

interface QAItem {
  question: string;
  answer: string;
}

export default function SplitQA({ qa }: { qa: QAItem[] }) {
  const [selected, setSelected] = useState(0);

  if (!qa || qa.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[40vh] my-12 rounded-xl shadow-lg overflow-hidden">
      {/* Questions */}
      <div className="md:w-1/2 bg-gray-50 p-6 flex flex-col gap-2">
        {qa.map((item, idx) => (
          <button
            key={idx}
            className={`text-left py-3 px-4 rounded-lg transition ${
              selected === idx ? 'bg-blue-100 font-bold' : 'hover:bg-blue-50'
            }`}
            onClick={() => setSelected(idx)}
          >
            {item.question}
          </button>
        ))}
      </div>
      {/* Answers */}
      <div className="md:w-1/2 bg-white p-8 flex items-center">
        <div>
          <h2 className="text-xl font-semibold mb-4">{qa[selected].question}</h2>
          <p className="text-lg whitespace-pre-line">{qa[selected].answer}</p>
        </div>
      </div>
    </div>
  );
} 