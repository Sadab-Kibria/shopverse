
export type SpecsDisplayProps = {
  specs?: Record<string, any> | null;
};

export default function SpecsDisplay({ specs }: SpecsDisplayProps) {
  if (!specs || Object.keys(specs).length === 0) {
    return null;
  }

  // Convert snake_case keys to Title Case
  const formatKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section className="mt-12 bg-gradient-to-b from-white to-gray-50 p-8 rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-black">Specifications</h2>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(specs).map(([key, value], index) => (
          <div
            key={key}
            className="flex items-start border-b border-gray-300 pb-4 last:border-b-0"
          >
            {/* Label - Left Side (lighter) */}
            <div className="flex-1">
              <p className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                {formatKey(key)}
              </p>
            </div>

            {/* Value - Right Side (darker/bold) */}
            <div className="flex-1">
              <p className="text-black font-medium text-base text-right">
                {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider for visual separation */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300">
        <p className="text-xs text-gray-500 italic">
          All specifications are subject to change without prior notice. Please verify with the manufacturer for the most accurate information.
        </p>
      </div>
    </section>
  );
}
