import React from "react";

interface Feature {
  id: string;
  label: string;
  value: string;
}

interface FeatureGridProps {
  features: Feature[];
  iconMap: Record<string, React.ElementType>;
  fallbackIcon?: React.ElementType;
  iconClassName?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  iconMap,
  fallbackIcon: FallbackIcon,
  iconClassName = "w-6 h-6 text-blue-600 mt-1 flex-shrink-0",
}) => {
  if (!features?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature, idx) => {
        const Icon = iconMap[feature.id] || FallbackIcon;
        return (
          <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            {Icon && <Icon className={iconClassName} />}
            <div>
              <p className="font-semibold text-gray-900 text-sm">{feature.label}</p>
              <p className="text-gray-600 text-xs">{feature.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureGrid; 