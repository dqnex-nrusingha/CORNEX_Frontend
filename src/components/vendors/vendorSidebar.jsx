import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function VendorSidebar({ vendors = [], selectedId, onSelect, onAdd }) {
  return (
    <aside className="w-72 shrink-0 rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent">All Vendor</h2>
        <div className="flex gap-2">
          <button onClick={onAdd} className="rounded-full bg-black p-2 text-white"><Plus size={18}/></button>
        </div>
      </div>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400"/>
        <input placeholder="Search vendor..." className="w-full rounded-lg bg-slate-100 px-9 py-2.5 text-sm outline-none"/>
      </div>
      <div className="mt-3 space-y-2">
        {vendors.map(v => (
          <button key={v.vendor_id} onClick={() => onSelect(v.vendor_id)}
            className={`w-full rounded-2xl border p-4 text-left ${
              selectedId === v.vendor_id ? 'border-fuchsia-100 bg-fuchsia-50' : 'bg-white'
            }`}>
            <div className="flex justify-between text-xs text-slate-500"><span>{v.vendor_code}</span><span>{new Date(v.created_at).toLocaleDateString('en-GB')}</span></div>
            <div className="mt-1 font-semibold text-slate-900">{v.display_name}</div>
            <div className="mt-2 text-right font-bold">₹{Number(v.accounts_payable || 0).toLocaleString('en-IN')}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}