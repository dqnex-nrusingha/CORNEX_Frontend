import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorSidebar from '../../components/vendors/VendorSidebar';
import { getVendors } from '../../services/vendorlistApi';

export default function VendorsPage() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getVendors().then(r => {
      setVendors(r.data || []);
      if (r.data?.[0]) setSelectedId(r.data[0].vendor_id);
    }).catch(e => setError(e.message));
  }, []);

  return (
    <div className="flex min-h-screen gap-4 bg-slate-50 p-4">
      <VendorSidebar
        vendors={vendors}
        selectedId={selectedId}
        onSelect={id => { setSelectedId(id); navigate(`/vendors/${id}`); }}
        onAdd={() => navigate('/vendors/new')}
      />

      <main className="min-w-0 flex-1">
        <div className="rounded-2xl border bg-white px-5 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent">All Vendors</h1>
          <button onClick={() => navigate('/vendors/new')} className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 px-5 py-2 font-semibold text-white">+ New</button>
        </div>

        {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-red-600">{error}</div>}

        <div className="mt-4 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="px-5 py-4">Name</th><th>GST</th><th>Primary Contact</th><th>Company Name</th><th>E-Mail Address</th><th>Phone No</th><th>Payables(BCY)</th></tr>
            </thead>
            <tbody>
              {vendors.map(v => (
                <tr key={v.vendor_id} onClick={() => { setSelectedId(v.vendor_id); navigate(`/vendors/${v.vendor_id}`); }} className="cursor-pointer border-t hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-blue-700">{v.display_name}</td>
                  <td>{v.gstin || '-'}</td>
                  <td>{[v.primary_first_name, v.primary_last_name].filter(Boolean).join(' ') || '—'}</td>
                  <td>{v.company_name}</td>
                  <td>{v.email}</td>
                  <td>{v.primary_number}</td>
                  <td className="font-semibold">₹{Number(v.accounts_payable || 0).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
