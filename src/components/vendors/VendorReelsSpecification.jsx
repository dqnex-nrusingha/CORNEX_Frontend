import React, { useMemo, useState } from 'react';
import { Search, Info, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

export default function VendorReelsSpecification({ specifications = [] }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return specifications.filter(x =>
      `${x.material_code} ${x.material_name}`.toLowerCase().includes(q)
    );
  }, [specifications, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-2 text-white">◇</div>
          <h2 className="text-lg font-semibold">Reel Specification</h2>
          <span className="text-sm text-slate-400">{specifications.length} Specifications</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search reel code or material"
            className="w-72 rounded-xl border px-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fuchsia-200" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
        <Info size={16} /> Dimensions / width in mm
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Reel Spec</th>
              <th>Material</th><th>GSM Range</th><th>Reel Width</th>
              <th>Quality Score</th><th>Status</th><th />
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.reel_specification_id} className="border-t">
                <td className="px-4 py-4 font-semibold text-slate-900">{r.material_code}</td>
                <td>{r.material_name}</td>
                <td>{r.gsm_min}–{r.gsm_max}</td>
                <td>{r.reel_width_min}–{r.reel_width_max}</td>
                <td className="font-semibold">{Number(r.quality_score).toFixed(0)}%</td>
                <td>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    r.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{r.status}</span>
                </td>
                <td><MoreVertical size={16} className="text-slate-400" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-slate-500">
          <span>Showing {filtered.length ? (page - 1) * perPage + 1 : 0} to {Math.min(page * perPage, filtered.length)} of {filtered.length} specifications</span>
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border p-2 disabled:opacity-40"><ChevronLeft size={16} /></button>
            <span className="rounded-lg border px-3 py-2 text-fuchsia-600">{page}</span>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded-lg border p-2 disabled:opacity-40"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
