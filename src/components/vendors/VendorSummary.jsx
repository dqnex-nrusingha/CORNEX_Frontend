import React from 'react';

const money = value =>
  `₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export default function VendorSummary({ summary = {}, vendor = {} }) {
  const cards = [
    ['Total Purchase Value', money(summary.total_purchase_value), 'Since onboarding'],
    ['Within Terms', money(Math.max(Number(summary.total_purchase_value || 0) - Number(summary.outstanding_value || 0), 0)), 'Within Terms'],
    ['Payment Terms', vendor.payment_terms || '-', 'Post GRN'],
    ['On-Time Delivery', `${Number(summary.on_time_delivery || 0).toFixed(1)}%`, 'Last 12 Months'],
    ['QC Rejection Rate', `${Number(summary.qc_rejection_rate || 0).toFixed(1)}%`, 'Inward Inspection'],
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map(([label, value, hint]) => (
        <div key={label} className="rounded-2xl bg-slate-50 px-4 py-4">
          <div className="text-xs text-slate-500">{label}</div>
          <div className="mt-2 text-xl font-bold text-slate-900">{value}</div>
          <div className="mt-1 text-xs text-slate-400">{hint}</div>
        </div>
      ))}
    </div>
  );
}