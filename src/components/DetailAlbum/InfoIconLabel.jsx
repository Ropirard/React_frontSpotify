import React from "react";
import { styleIcon } from "../../constants/appContant";

const InfoIconLabel = ({ icon, label, value }) => {
  const IconComponent = icon?.iconName;
  if (!IconComponent) return null;

  return (
    <div className="flex items-center gap-3 py-2">
        <IconComponent className="text-blue shrink-0" style={styleIcon} />
        <div className="min-w-0">
            <span className="text-gray-400 text-sm block">{label}</span>
            <span className="font-semibold text-white truncate block">{value ?? "-"}</span>
        </div>
    </div>
)
};

export default InfoIconLabel;
