import React from 'react';

function Field({ label, value }) {
  return (
    <div>
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 font-semibold text-slate-900">{value || '-'}</div>
    </div>
  );
}

export default function VendorOverview({ vendor }) {
  const billing = vendor.addresses?.find(a => a.address_type === 'Billing');
  const shipping = vendor.addresses?.find(a => a.address_type === 'Shipping');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <section className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Vendor Profile</h2>
          <div className="my-4 border-t" />
          <div className="grid grid-cols-2 gap-5">
            <Field label="Vendor Type" value={vendor.vendor_type} />
            <Field label="PAN" value={vendor.pan} />
            <Field label="GSTIN" value={vendor.gstin} />
            <Field label="MSME Register" value={vendor.msme} />
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <div className="my-4 border-t" />
          <div className="grid grid-cols-2 gap-5">
            <Field label="Currency" value={`${vendor.currency} - Indian Rupee`} />
            <Field label="Opening Balance" value={`₹${Number(vendor.opening_balance || 0).toLocaleString('en-IN')}`} />
            <Field label="Payment Terms" value={vendor.payment_terms} />
            <Field label="Accounts Payable" value={`₹${Number(vendor.accounts_payable || 0).toLocaleString('en-IN')}`} />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border bg-white p-5">
        <div className="grid grid-cols-2 divide-x">
          {[['Billing Address', billing], ['Shipping Address', shipping]].map(([title, a]) => (
            <div key={title} className="px-4 first:pl-0 last:pr-0">
              <h3 className="font-semibold text-slate-600">{title}</h3>
              {a ? (
                <p className="mt-3 text-sm font-medium leading-5 text-slate-700">
                  {a.contact_name}<br />{a.address_line1}<br />
                  {a.address_line2 && <>{a.address_line2}<br /></>}
                  {a.city}, {a.state} {a.pincode}
                </p>
              ) : <p className="mt-3 text-sm text-slate-400">No address</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Contacts Directory</h2>
        <div className="mt-4 divide-y">
          {(vendor.contacts || []).map(c => (
            <div key={c.contact_id} className="flex items-center justify-between py-4">
              <div>
                <div className="font-semibold">{c.first_name} {c.last_name}</div>
                <div className="text-sm text-slate-400">{c.designation || c.department || '-'}</div>
              </div>
              <div className="text-sm text-slate-500">{c.phone} · {c.email || '-'}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold">Bank Details</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-slate-500">
              <tr><th className="py-3">Bank Name</th><th>Account Holder Name</th><th>Account No</th><th>IFSC Code</th><th>Open Date</th></tr>
            </thead>
            <tbody>
              {(vendor.banks || []).map(b => (
                <tr key={b.bank_id} className="border-b last:border-0">
                  <td className="py-3">{b.bank_name}</td><td>{b.account_holder_name}</td>
                  <td>{b.account_number}</td><td>{b.ifsc_code}</td>
                  <td>{b.open_date ? new Date(b.open_date).toLocaleDateString('en-GB') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}