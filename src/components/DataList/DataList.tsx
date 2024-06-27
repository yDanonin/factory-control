"use client";

import React from "react";

interface Props {
  items: Array<{
    title: string;
    data: string;
  }>;
}

const DataList: React.FC<Props> = ({ items }) => {
  return (
    <dl className="grid gap-3">
      {items.map((obj) => (
        <div className="flex items-center justify-between" key={obj.title}>
          <dt className="text-muted-foreground">{obj.title}</dt>
          <dd>{obj.data}</dd>
        </div>
      ))}
    </dl>
  );
};

export default DataList;
