import React from 'react';

const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0]).join('').toUpperCase() || 'V';

export default function VendorHeader({ vendor }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white flex items-center justify-center text-xl font-bold">
          {initials(vendor?.display_name)}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">{vendor?.display_name}</h1>
            <span className="text-sm text-slate-400">{vendor?.vendor_code}</span>
          </div>
          <p className="text-sm text-slate-500">
            {vendor?.company_name} · {vendor?.vendor_language} · Vendor Since {vendor?.created_at ? new Date(vendor.created_at).toLocaleDateString('en-GB') : '-'}
          </p>
        </div>
      </div>
      <span className="rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold text-sky-700">
        {vendor?.status || 'Approved'}
      </span>
    </div>
  );
}