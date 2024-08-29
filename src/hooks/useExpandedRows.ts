import { useState } from "react";
export const useExpandedRows = () => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return {
    expandedRows,
    handleExpand,
  };
};
