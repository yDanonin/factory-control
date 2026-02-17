"use client";

import React from "react";
import { TimeAdjustmentStatus, TimeAdjustmentStatusLabel } from "@/types/time-adjustment-request.types";

interface StatusBadgeProps {
  status: TimeAdjustmentStatus;
}

const statusConfig: Record<TimeAdjustmentStatus, { label: string; className: string }> = {
  [TimeAdjustmentStatus.PENDING]: {
    label: TimeAdjustmentStatusLabel[TimeAdjustmentStatus.PENDING],
    className: "bg-yellow-100 text-yellow-800 border-yellow-300"
  },
  [TimeAdjustmentStatus.APPROVED]: {
    label: TimeAdjustmentStatusLabel[TimeAdjustmentStatus.APPROVED],
    className: "bg-green-100 text-green-800 border-green-300"
  },
  [TimeAdjustmentStatus.REJECTED]: {
    label: TimeAdjustmentStatusLabel[TimeAdjustmentStatus.REJECTED],
    className: "bg-red-100 text-red-800 border-red-300"
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
