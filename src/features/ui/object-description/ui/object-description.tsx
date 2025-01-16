import { useState } from "react";

interface IObjectDescription {
  text: string;
}

export const ObjectDescription: React.FC<IObjectDescription> = ({ text }) => {
  const MAX_LENGTH = 200; // Maximum number of characters before truncation
  const [isExpanded, setIsExpanded] = useState(false);

  const isTruncated = text.length > MAX_LENGTH;
  const displayedText =
    isExpanded || !isTruncated ? text : text.slice(0, MAX_LENGTH) + "...";

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      <h2 className="font-semibold text-lg">Описание:</h2>
      <div className="space-y-2 text-[#2f2f2f]/70">
        {/* Ensure proper text wrapping */}
        <p
          className="break-words whitespace-pre-line"
          title={!isExpanded && isTruncated ? text : undefined}
        >
          {displayedText}
        </p>
      </div>
      {isTruncated && (
        <button
          className="text-[#00a859] font-medium hover:underline"
          onClick={toggleExpand}
        >
          {isExpanded ? "Свернуть" : "Читать подробнее"}
        </button>
      )}
    </div>
  );
};
