import React from "react";

export function CardSkeleton() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 animate-pulse">
      <div className="w-full h-48 bg-slate-800 rounded-xl mb-4" />
      <div className="h-6 bg-slate-800 rounded w-3/4 mb-3" />
      <div className="h-4 bg-slate-800 rounded w-1/2 mb-2" />
      <div className="h-4 bg-slate-800 rounded w-full mb-2" />
      <div className="h-4 bg-slate-800 rounded w-2/3" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-slate-800">
      <td className="py-4 px-4"><div className="h-4 bg-slate-800 rounded w-24" /></td>
      <td className="py-4 px-4"><div className="h-4 bg-slate-800 rounded w-32" /></td>
      <td className="py-4 px-4"><div className="h-4 bg-slate-800 rounded w-16" /></td>
      <td className="py-4 px-4"><div className="h-4 bg-slate-800 rounded w-20" /></td>
    </tr>
  );
}

export function BatchSkeleton() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="w-24 h-6 bg-slate-800 rounded-full" />
        <div className="w-20 h-6 bg-slate-800 rounded-full" />
      </div>
      <div className="w-3/4 h-8 bg-slate-800 rounded mb-4" />
      <div className="w-1/2 h-5 bg-slate-800 rounded mb-6" />
      <div className="space-y-3">
        <div className="w-full h-4 bg-slate-800 rounded" />
        <div className="w-full h-4 bg-slate-800 rounded" />
        <div className="w-2/3 h-4 bg-slate-800 rounded" />
      </div>
    </div>
  );
}
