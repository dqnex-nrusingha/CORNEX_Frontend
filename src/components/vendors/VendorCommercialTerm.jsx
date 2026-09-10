import React from 'react';

const money = value => `₹${Number(value || 0).toLocaleString('en-IN')}`;

export default function VendorCommercialTerm({ vendor }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Payment Terms</h2>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {[
            ['Payment Terms', `${vendor.payment_terms || '-'} Post GRN`],
            ['Advance Required', vendor.advance_required || 'None'],
            ['Payable Outstanding', money(vendor.accounts_payable)],
            ['Overdue Status', 'No Overdue'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-2 text-lg font-semibold">{value}</div>
              {label === 'Overdue Status' && <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">No Overdue</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Rate Contract</h2>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {[
            ['Contract Reference', `RC-${vendor.vendor_code || 'VENDOR'}-2026-Q3`],
            ['Valid Till', '30-Sep-2026'],
            ['Price Basis', 'Per Kg, Ex-Mill'],
            ['Escalation Clause', 'Quarterly review linked to pulp index'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-2 font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Recent Payment Activity</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y text-slate-500">
              <tr><th className="py-3">Bill No.</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {(vendor.order_history || []).slice(0, 5).map((o, i) => (
                <tr key={`${o.purchase_order_id}-${i}`} className="border-b last:border-0">
                  <td className="py-3">{`BILL-${String(i + 1).padStart(4, '0')}`}</td>
                  <td>{money(o.value)}</td>
                  <td>-</td>
                  <td><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Pending</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
