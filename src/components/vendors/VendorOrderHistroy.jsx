import React, { useMemo, useState } from 'react';
import { Calendar, Download, Search } from 'lucide-react';

export default function VendorOrderHistory({ orders = [] }) {
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter(o =>
      `${o.po_number} ${o.material_description}`.toLowerCase().includes(q)
    );
  }, [orders, search]);

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent">Order History</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search order..." className="w-52 rounded-lg border px-9 py-2 text-sm" />
          </div>
          <button className="rounded-lg border px-3 py-2 text-sm flex items-center gap-2"><Calendar size={15}/> Select Date Range</button>
          <button className="rounded-lg border px-3 py-2 text-sm flex items-center gap-2"><Download size={15}/> Export</button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-y bg-slate-50 text-slate-600">
            <tr><th className="px-4 py-3">PO No.</th><th>Date</th><th>Material</th><th>Quantity</th><th>Value</th><th>Delivery Status</th><th>QC Status</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={`${r.purchase_order_id}-${r.po_number}`} className="border-b">
                <td className="px-4 py-4 font-semibold text-blue-700">{r.po_number}</td>
                <td>{new Date(r.po_date).toLocaleDateString('en-GB')}</td>
                <td>{r.material_description}</td>
                <td className="font-semibold">{Number(r.quantity).toLocaleString('en-IN')} {r.unit}</td>
                <td className="font-semibold">₹{Number(r.value).toLocaleString('en-IN')}</td>
                <td><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">{r.delivery_status}</span></td>
                <td>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    r.qc_status === 'Passed' ? 'bg-green-100 text-green-700' :
                    r.qc_status?.startsWith('Rejected') ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{r.qc_status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
