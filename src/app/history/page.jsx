"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔐 extra safety check
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/analyze/thoughts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setThoughts(res.data.data);
    } catch (error) {
      console.error("Error fetching history:", error);

      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black px-3 sm:px-4 py-6 sm:py-10">
      
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        My ThinkMirror History 🧠
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : thoughts.length === 0 ? (
        <p className="text-center">No thoughts found.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {thoughts.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-zinc-900 p-3 sm:p-4 rounded-lg shadow"
            >
              <h2 className="font-semibold mb-2 text-sm sm:text-base">
                {item.text}
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                Risk Score: {item.riskScore}
              </p>

              <p className="text-xs sm:text-sm">
                <strong>Recommendation:</strong> {item.recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}