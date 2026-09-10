import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVendor } from '../../services/createvendorApi';

const initial = {
  vendor_type: 'Regular',
  primary_salutation: '',
  primary_first_name: '',
  primary_last_name: '',
  display_name: '',
  company_name: '',
  vendor_language: 'English',
  email: '',
  primary_number: '',
  secondary_number: '',
  pan: '',
  gstin: '',
  msme: '',
  currency: 'INR',
  opening_balance: 0,
  accounts_payable: 0,
  payment_terms: 'Net 30',
  advance_required: 'None',
  status: 'Draft',
  addresses: [],
  contacts: [],
  banks: [],
  documents: [],
  reel_specifications: [],
};

function Field({ label, required, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}{required && <b className="text-red-500"> *</b>}</span>
      <input type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-200"/>
    </label>
  );
}

export default function CreateVendorPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [tab, setTab] = useState('Other Details');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const submit = async () => {
    setSaving(true); setError('');
    try {
      const result = await createVendor(form);
      navigate(`/vendors/${result.data.vendor_id}`);
    } catch (e) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="rounded-2xl border bg-white px-8 py-5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent">Create New Vendor</h1>
      </div>

      <div className="mt-3 rounded-2xl border bg-white p-8">
        <h2 className="text-lg font-semibold mb-6">Vendor Details</h2>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          <Field label="Primary Contact" required value={form.primary_first_name} onChange={e => set('primary_first_name', e.target.value)} placeholder="First Name"/>
          <Field label="Company Name" required value={form.company_name} onChange={e => set('company_name', e.target.value)} />
          <Field label="Display Name" required value={form.display_name} onChange={e => set('display_name', e.target.value)} />
          <Field label="Email Address" required value={form.email} onChange={e => set('email', e.target.value)} />
          <Field label="Vendor Language" required value={form.vendor_language} onChange={e => set('vendor_language', e.target.value)} />
          <Field label="Secondary Number" value={form.secondary_number} onChange={e => set('secondary_number', e.target.value)} />
          <Field label="Primary Number" required value={form.primary_number} onChange={e => set('primary_number', e.target.value)} />
          <Field label="PAN" required value={form.pan} onChange={e => set('pan', e.target.value)} placeholder="ENTER PAN"/>
          <Field label="GSTIN" value={form.gstin} onChange={e => set('gstin', e.target.value)} placeholder="ENTER GSTIN"/>
          <Field label="MSME" required value={form.msme} onChange={e => set('msme', e.target.value)} />

        </div>

        <div className="mt-8 flex gap-8 border-b">
          {['Other Details','Address','Contact Directory','Bank Details'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`pb-3 text-sm font-medium ${tab === t ? 'border-b-2 border-fuchsia-500 text-fuchsia-600' : 'text-slate-500'}`}>{t}</button>
          ))}
        </div>

        {tab === 'Other Details' && (
          <div className="mt-6 grid grid-cols-2 gap-8">
            <Field label="Currency" required value={form.currency} onChange={e => set('currency', e.target.value)} />
            <Field label="Payment Terms" value={form.payment_terms} onChange={e => set('payment_terms', e.target.value)} />
            <Field label="Accounts Payable" value={form.accounts_payable} type="number" onChange={e => set('accounts_payable', Number(e.target.value))} />
            <Field label="Advance Required" value={form.advance_required} onChange={e => set('advance_required', e.target.value)} />
          </div>
        )}

        {tab !== 'Other Details' && (
          <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
            The {tab} tab is persisted through the same nested payload structure as the Customer module.
            Add/edit rows here using the existing Customer tab components if your Customer implementation already has reusable address/contact/bank controls.
          </div>
        )}

        {error && <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => navigate('/vendors')} className="rounded-lg border px-5 py-3">Cancel</button>
          <button disabled={saving} onClick={submit} className="rounded-lg bg-gradient-to-r from-rose-500 to-fuchsia-600 px-6 py-3 font-semibold text-white disabled:opacity-50">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
