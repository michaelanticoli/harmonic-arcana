"use client";
import React from "react";
import * as ChakraUI from "@chakra-ui/react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function MainComponent() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [lastFetched, setLastFetched] = React.useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/major-arcana", { method: "POST" });
      if (!response.ok) {
        throw new Error(
          `API returned [${response.status}] ${response.statusText}`
        );
      }
      const result = await response.json();
      setData(result);
      setLastFetched(new Date());
    } catch (err) {
      console.error("Error fetching major arcana:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-thin tracking-tight mb-3 text-[#E2C17B]">
            API Diagnostics
          </h1>
          <p className="text-white/60 text-sm tracking-wide uppercase">
            /api/major-arcana endpoint testing
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-8 py-3 bg-[#E2C17B] text-[#0A0A0A] font-medium tracking-wide uppercase text-sm hover:bg-[#D4B36A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i className={`fas fa-sync-alt ${loading ? "fa-spin" : ""}`}></i>
            {loading ? "Fetching..." : "Refresh Data"}
          </button>

          {lastFetched && (
            <div className="text-white/40 text-sm">
              Last fetched: {lastFetched.toLocaleTimeString()}
            </div>
          )}
        </div>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  loading
                    ? "bg-yellow-500 animate-pulse"
                    : error
                    ? "bg-red-500"
                    : data
                    ? "bg-green-500"
                    : "bg-white/20"
                }`}
              ></div>
              <span className="text-sm font-medium tracking-wide uppercase">
                {loading
                  ? "Loading"
                  : error
                  ? "Error"
                  : data
                  ? "Success"
                  : "Ready"}
              </span>
            </div>

            {data && (
              <div className="text-xs text-white/40">
                {Array.isArray(data)
                  ? `${data.length} cards`
                  : "Object response"}
              </div>
            )}
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-[#E2C17B]/20 border-t-[#E2C17B] rounded-full animate-spin mb-4"></div>
                <p className="text-white/60 text-sm tracking-wide">
                  Connecting to API...
                </p>
              </div>
            )}

            {error && (
              <div className="py-8">
                <div className="flex items-start gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <i className="fas fa-exclamation-triangle text-red-500 text-xl mt-1"></i>
                  <div className="flex-1">
                    <h3 className="text-red-400 font-medium mb-2 tracking-wide">
                      Error Occurred
                    </h3>
                    <p className="text-white/80 text-sm font-mono">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && data && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="text-sm text-white/60">
                    Response received successfully
                  </span>
                </div>

                <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/5 overflow-x-auto">
                  <pre className="text-xs md:text-sm text-[#E2C17B] font-mono leading-relaxed whitespace-pre-wrap break-words">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>

                {Array.isArray(data) && data.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.slice(0, 6).map((card, index) => (
                      <div
                        key={index}
                        className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 hover:border-[#E2C17B]/30 transition-all duration-300"
                      >
                        <div className="text-[#E2C17B] font-medium mb-2 text-sm">
                          {card.name || card.title || `Card ${index + 1}`}
                        </div>
                        <div className="text-white/40 text-xs font-mono">
                          {Object.keys(card).length} properties
                        </div>
                      </div>
                    ))}
                    {data.length > 6 && (
                      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 flex items-center justify-center">
                        <span className="text-white/40 text-sm">
                          +{data.length - 6} more cards
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {!loading && !error && !data && (
              <div className="py-16 text-center">
                <i className="fas fa-database text-white/20 text-4xl mb-4"></i>
                <p className="text-white/40 text-sm">
                  No data loaded yet. Click refresh to fetch.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
            <div className="text-[#E2C17B] text-xs uppercase tracking-wider mb-2">
              Endpoint
            </div>
            <div className="text-white/80 font-mono text-sm">
              /api/major-arcana
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
            <div className="text-[#E2C17B] text-xs uppercase tracking-wider mb-2">
              Method
            </div>
            <div className="text-white/80 font-mono text-sm">GET</div>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6">
            <div className="text-[#E2C17B] text-xs uppercase tracking-wider mb-2">
              Status
            </div>
            <div className="text-white/80 font-mono text-sm">
              {loading ? "Pending..." : error ? "Failed" : data ? "OK" : "Idle"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;