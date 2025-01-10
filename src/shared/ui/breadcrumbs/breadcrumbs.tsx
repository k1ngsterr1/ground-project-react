import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string; // Allows customization of the separator (default: "•")
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "•",
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href && !item.isActive ? (
            <a href={item.href} className="text-[#2f2f2f]/70 hover:underline">
              {item.label}
            </a>
          ) : (
            <span
              className={`${
                item.isActive ? "text-[#00a859]" : "text-[#2f2f2f]/70"
              }`}
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span className="text-[#2f2f2f]/70">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
