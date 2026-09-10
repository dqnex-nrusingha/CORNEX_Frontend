import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVendorDetails } from '../../services/vendorDetailsApi';
import VendorHeader from '../../components/vendors/VendorHeader';
import VendorSummary from '../../components/vendors/VendorSummary';
import VendorOverview from '../../components/vendors/VendorOverview';
import VendorCommercialTerm from '../../components/vendors/VendorCommercialTerm';
import VendorReelsSpecification from '../../components/vendors/VendorReelsSpecification';
import VendorOrderHistory from '../../components/vendors/VendorOrderHistory';

export default function VendorDetailsPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [tab, setTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getVendorDetails(id)
      .then(r => mounted && setVendor(r.data))
      .catch(e => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-8">Loading vendor...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!vendor) return <div className="p-8">Vendor not found.</div>;

  const tabs = ['Overview', 'Commercial Terms', 'Reel Specification', 'Order History'];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <VendorHeader vendor={vendor} />
      <div className="mt-4"><VendorSummary vendor={vendor} summary={vendor.summary} /></div>

      <div className="mt-4 rounded-2xl border bg-white">
        <div className="flex gap-7 border-b px-5">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`py-4 text-sm font-medium ${tab === t ? 'border-b-2 border-fuchsia-500 text-fuchsia-600' : 'text-slate-600'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="bg-slate-50 p-5">
          {tab === 'Overview' && <VendorOverview vendor={vendor} />}
          {tab === 'Commercial Terms' && <VendorCommercialTerm vendor={vendor} />}
          {tab === 'Reel Specification' && <VendorReelsSpecification specifications={vendor.reel_specifications} />}
          {tab === 'Order History' && <VendorOrderHistory orders={vendor.order_history} />}
        </div>
      </div>
    </div>
  );
}
