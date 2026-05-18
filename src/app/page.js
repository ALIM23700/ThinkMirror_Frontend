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

      const res = await axios.post(
        "https://thinkmirror-backend.onrender.com/api/analyze",
        { thought }
      );

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black px-3 sm:px-4 py-6 sm:py-10">
      
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          ThinkMirror 🧠
        </h1>

        {/* Input */}
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Enter your thought..."
          className="w-full p-3 border rounded-md mb-4 dark:bg-zinc-800 text-sm sm:text-base"
          rows={4}
        />

        {/* Button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm sm:text-base"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-2">
            
            <h3 className="font-semibold text-sm sm:text-base">
              Type: {result.type}
            </h3>

            <p className="text-sm sm:text-base">
              Risk Score: {result.riskScore}
            </p>

            <h4 className="font-semibold text-sm sm:text-base">
              Advantages
            </h4>

            <ul className="list-disc ml-5 text-sm sm:text-base">
              {result.advantages?.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-sm sm:text-base">
              Counter Arguments
            </h4>

            <ul className="list-disc ml-5 text-sm sm:text-base">
              {result.counterArguments?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <p className="text-sm sm:text-base">
              <strong>Recommendation:</strong> {result.recommendation}
            </p>

          </div>
        )}
      </div>
    </div>
  );
}