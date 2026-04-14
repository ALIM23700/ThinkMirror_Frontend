"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [thought, setThought] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!thought) return;

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/analyze", {
        thought,
      });

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">
        
        <h1 className="text-3xl font-bold mb-4 text-center">
          ThinkMirror 🧠
        </h1>

        {/* Input */}
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Enter your thought..."
          className="w-full p-3 border rounded-md mb-4 dark:bg-zinc-800"
          rows={4}
        />

        {/* Button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6">
            <h3 className="font-semibold">Type: {result.type}</h3>
            <p className="mb-2">Risk Score: {result.riskScore}</p>

            <h4 className="font-semibold">Advantages</h4>
            <ul className="list-disc ml-5 mb-3">
              {result.advantages?.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            <h4 className="font-semibold">Counter Arguments</h4>
            <ul className="list-disc ml-5 mb-3">
              {result.counterArguments?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <p>
              <strong>Recommendation:</strong> {result.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}