import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreHorizontal, Mail, ExternalLink, ChevronUp, ChevronDown, Edit, X, Calendar, Download } from 'lucide-react';

const VendorDetailsPage = () => {
  const navigate = useNavigate();
  const [addressExpanded, setAddressExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedBox, setSelectedBox] = useState(null);

  return (
    <div className="flex h-full bg-[#f4f7f9] p-1.5 gap-1.5 overflow-hidden">

      {/* ── Left Sidebar (List) ── */}
      <div className="w-full lg:w-[260px] shrink-0 flex flex-col bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 cursor-pointer">
              <h2 className="text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]">All Vendor</h2>
              <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/vendors/new')}
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search vendor, product or item..."
              className="w-full pl-8 pr-3 py-2 text-[12px] bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-blue-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3 hide-scrollbar">
          {/* Vendor List Item (Active) */}
          <div className="bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md transition-all shadow-sm border border-transparent mb-2.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">VEND-00287</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide">25/06/2026</span>
            </div>
            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
              Century Pulp & Paper
            </h3>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#111827]">₹45,000.00</span>
            </div>
          </div>

          {/* Vendor List Item 2 (Inactive) */}
          <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">VEND-00288</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide">20/06/2026</span>
            </div>
            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
              Global Supplies Inc
            </h3>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#111827]">₹12,500.00</span>
            </div>
          </div>

          {/* Vendor List Item 3 (Inactive) */}
          <div className="bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[12px] font-medium text-[#374151]">VEND-00289</span>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide">15/06/2026</span>
            </div>
            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
              TechHardware Ltd
            </h3>
            <div className="text-right">
              <span className="text-[14px] font-bold text-[#111827]">₹0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Area (Details) ── */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">

        {/* Top Header Card */}
        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">
          <div className="px-3 lg:px-4 p-3">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center text-white text-[18px] font-bold shadow-sm shrink-0">
                  CP
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-[18px] font-bold text-[#1a233a]">Century Pulp & Paper</h1>
                    <span className="text-[12px] text-gray-400 font-medium">VEND-00287</span>
                  </div>
                  <div className="text-[11.5px] text-gray-500 mt-1 font-medium">
                    Paper Mill · Kraft Liner & Fluting Medium · Vendor Since 08-Jan-2021 · Owner: P. Verma (Purchase)
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-bold rounded-full">Approved</span>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-100 my-5"></div>

            {/* Stat Cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              <div className="bg-[#f8fafc] rounded-[10px] p-3 min-w-[120px] border border-gray-100 flex-1">
                <div className="text-[10px] text-gray-500 font-semibold mb-1 truncate">Total Purchase Value</div>
                <div className="text-[18px] font-bold text-[#1a233a]">₹8.94 <span className="text-[11px] font-bold text-gray-500">Cr</span></div>
                <div className="text-[9.5px] text-gray-400 mt-1 font-medium truncate">Since Mar 2021</div>
              </div>
              <div className="bg-[#f8fafc] rounded-[10px] p-3 min-w-[120px] border border-gray-100 flex-1">
                <div className="text-[10px] text-gray-500 font-semibold mb-1 truncate">Within Terms</div>
                <div className="text-[18px] font-bold text-[#1a233a]">₹32.6 <span className="text-[11px] font-bold text-gray-500">L</span></div>
                <div className="text-[9.5px] text-gray-400 mt-1 font-medium truncate">Within Terms</div>
              </div>
              <div className="bg-[#f8fafc] rounded-[10px] p-3 min-w-[120px] border border-gray-100 flex-1">
                <div className="text-[10px] text-gray-500 font-semibold mb-1 truncate">Payment Terms</div>
                <div className="text-[18px] font-bold text-[#1a233a]">30 <span className="text-[11px] font-bold text-gray-500">Days</span></div>
                <div className="text-[9.5px] text-gray-400 mt-1 font-medium truncate">Post GRN</div>
              </div>
              <div className="bg-[#f8fafc] rounded-[10px] p-3 min-w-[120px] border border-gray-100 flex-1">
                <div className="text-[10px] text-gray-500 font-semibold mb-1 truncate">On-Time Delivery</div>
                <div className="text-[18px] font-bold text-[#16a34a]">96.2%</div>
                <div className="text-[9.5px] text-gray-400 mt-1 font-medium truncate">Last 12 Months</div>
              </div>
              <div className="bg-[#f8fafc] rounded-[10px] p-3 min-w-[120px] border border-gray-100 flex-1">
                <div className="text-[10px] text-gray-500 font-semibold mb-1 truncate">QC Rejection Rate</div>
                <div className="text-[18px] font-bold text-[#1a233a]">0.8%</div>
                <div className="text-[9.5px] text-gray-400 mt-1 font-medium truncate">Inward Inspection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content Card */}
        <div className="bg-white flex-1 flex flex-col overflow-hidden border border-gray-100 rounded-[20px] shadow-sm">
          {/* Tabs */}
          <div className="flex gap-6 px-3 lg:px-4 pt-3 shrink-0 border-b border-gray-100">
            {['Overview', 'Commercial Terms', 'Box Specification', 'Order History'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-[13px] transition-colors ${activeTab === tab
                    ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]'
                    : 'font-semibold text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]"></div>
                )}
              </button>
            ))}
          </div>


          {/* Scrollable Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-[#f8fafc] rounded-b-[20px]">
            {/* Tab Content - Overview */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">

                <div className="bg-white rounded-[12px] p-2.5 shadow-sm border border-gray-100">
                <div className="space-y-4">

                <div className="flex justify-end">
                  <button className="p-1.5 border border-gray-100 rounded-md bg-white hover:bg-gray-50 text-gray-400 transition-colors shadow-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                {/* ── Top Row: Profile & Payment ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {/* Vendor Profile Card */}
                  <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5 relative">
                    <div className="border-b border-gray-100 pb-3 mb-4">
                      <h3 className="text-[16px] font-medium text-[#1a233a]">Customer Profile</h3>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center text-white text-[15px] font-bold shadow-sm shrink-0">
                        CP
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#1a233a] leading-tight">Century Pulp & Paper</h4>
                        <span className="text-[11px] text-gray-400 font-medium">VEND- 00001</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Vendor Type</span>
                        <span className="font-bold text-[#1a233a]">Key Accounts</span>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">PAN</span>
                        <span className="font-bold text-[#1a233a]">AABCC1235H</span>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">GSTIN</span>
                        <span className="font-bold text-[#1a233a]">29BGBBB2222B2Z2</span>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">MSME Register</span>
                        <span className="font-bold text-[#1a233a]">No</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Card */}
                  <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5 relative">
                    <div className="border-b border-gray-100 pb-3 mb-4">
                      <h3 className="text-[16px] font-medium text-[#1a233a]">Payment Details</h3>
                    </div>

                    <div className="space-y-3 mt-[44px]">
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Currency</span>
                        <span className="font-bold text-[#1a233a]">INR - Indian Rupee</span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Opening Balance</span>
                        <span className="font-bold text-[#1a233a]">₹0.00</span>
                      </div>
                      <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">
                        <span className="text-gray-400 font-medium">Payment Terms</span>
                        <span className="font-bold text-[#1a233a]">Net 30</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ── Addresses Card ── */}
                <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 relative gap-0">
                    {/* Left: Billing Address */}
                    <div className="pr-6 border-r-2 border-pink-300">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[14px] font-bold text-gray-500">Billing Address</h3>
                      </div>
                      <div className="text-[12px] font-bold text-[#4b5563] leading-snug">
                        Century Pulp & Paper Mill<br />
                        Gate No. 2, Administrative Office Lalkuan Industrial Area<br />
                        Lalkuan Nainital District Uttarakhand 43552
                      </div>
                    </div>

                    {/* Right: Shipping Address */}
                    <div className="pl-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[14px] font-bold text-gray-500">Shipping Address</h3>
                      </div>
                      <div className="text-[12px] font-bold text-[#4b5563] leading-snug">
                        Century Pulp & Paper Mill<br />
                        Century House, Lalkuan Industrial Complex<br />
                        NH-109, Lalkuan Nainital District<br />
                        Uttarakhand 262402
                      </div>
                    </div>
                  </div>
                </div>

                </div>
              </div>

                {/* Contacts Directory */}
                <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[16px] font-bold text-[#1a233a]">Contacts Directory</h3>
                  </div>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {[1, 2, 3].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-600">
                            SK
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-[#1a233a]">Suresh Kulkarni</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">Purchase Manager • Purchase</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +91 98220 44102
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                            <Mail className="w-3 h-3" />
                            s.kulkarni@veenafoods.in
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[16px] font-bold text-[#1a233a]">Bank Details</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] text-left">
                      <thead>
                        <tr className="text-gray-500 font-medium border-b border-gray-100">
                          <th className="pb-2 px-2">Bank Name</th>
                          <th className="pb-2 px-2">Account Holder Name</th>
                          <th className="pb-2 px-2">Account No</th>
                          <th className="pb-2 px-2">IFSC Code</th>
                          <th className="pb-2 px-2">Open Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#1a233a]">
                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 px-2 font-medium">HDFC Bank</td>
                          <td className="py-2.5 px-2 text-gray-600">Climamex Private Limited</td>
                          <td className="py-2.5 px-2 font-medium">123456789012</td>
                          <td className="py-2.5 px-2 text-gray-600">HDFC0000123</td>
                          <td className="py-2.5 px-2 text-gray-600">01-Jul-2026</td>
                        </tr>
                        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 px-2 font-medium">IDFC Bank</td>
                          <td className="py-2.5 px-2 text-gray-600">Niman Private Limited</td>
                          <td className="py-2.5 px-2 font-medium">123456789012</td>
                          <td className="py-2.5 px-2 text-gray-600">IDFC0000223</td>
                          <td className="py-2.5 px-2 text-gray-600">07-Jul-2026</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-2.5 px-2 font-medium">ICICI Bank</td>
                          <td className="py-2.5 px-2 text-gray-600">Godrej Private Limited</td>
                          <td className="py-2.5 px-2 font-medium">123456789012</td>
                          <td className="py-2.5 px-2 text-gray-600">ICICI0000333</td>
                          <td className="py-2.5 px-2 text-gray-600">12-Jul-2026</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* Tab Content - Commercial Terms */}
            {activeTab === 'Commercial Terms' && (
              <div className="space-y-3">

                {/* Payment Terms */}
                <div className="bg-white border border-blue-50 rounded-[12px] p-5 shadow-sm">
                  <h3 className="text-[16px] font-bold text-[#1a233a] mb-4">Payment Terms</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Payment Terms</div>
                      <div className="text-[16px] font-medium text-black">30 Days Post GRN</div>
                    </div>
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Advance Required</div>
                      <div className="text-[16px] font-medium text-black">None</div>
                    </div>
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">payable Outstanding</div>
                      <div className="text-[16px] font-medium text-black">₹32,60,000</div>
                    </div>
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Overdue Status</div>
                      <div>
                        <span className="inline-flex px-2 py-0.5 bg-[#e0f5e7] text-[#16a34a] text-[11px] font-medium rounded-full mt-0.5">
                          No Overdue
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rate Contract */}
                <div className="bg-white border border-blue-50 rounded-[12px] p-5 shadow-sm">
                  <h3 className="text-[16px] font-bold text-[#1a233a] mb-4">Rate Contract</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Contract Reference</div>
                      <div className="text-[16px] font-medium text-black">RC-CP-2026-Q3</div>
                    </div>
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Valid Till</div>
                      <div className="text-[16px] font-medium text-black">30-Sep-2026</div>
                    </div>
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Price Basic</div>
                      <div className="text-[16px] font-medium text-black">Per Kg, Ex-Mill</div>
                    </div>
                    <div className="bg-[#f7fbff] border border-blue-100 rounded-[8px] p-4 flex flex-col justify-center">
                      <div className="text-[12px] text-gray-800 font-medium mb-1">Escalation Clause</div>
                      <div className="text-[14px] font-medium text-black leading-snug">Quarterly review linked to pulp index</div>
                    </div>
                  </div>
                </div>

                {/* Recent Payment Activity */}
                <div className="bg-white border border-blue-50 rounded-[12px] p-5 shadow-sm">
                  <h3 className="text-[16px] font-bold text-[#1a233a] mb-5">Recent Payment Activity</h3>
                  <div className="space-y-2.5">
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-4 items-center bg-white border border-gray-100 rounded-[8px] px-6 py-1.5 text-[12px] text-gray-400 font-medium">
                      <div>Bill No.</div>
                      <div>Amount</div>
                      <div>Due Date</div>
                      <div>Status</div>
                    </div>

                    {/* Data Rows */}
                    <div className="grid grid-cols-4 items-center bg-white border border-gray-100 rounded-[8px] px-6 py-1.5 text-[12px] text-[#1a233a] font-medium hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
                      <div>CP-BILL-4421</div>
                      <div>₹6,20,000</div>
                      <div>05-Aug-2026</div>
                      <div>
                        <span className="inline-flex px-3 py-1 bg-[#fbe8c7] text-[#92400e] text-[10px] font-medium rounded-full">Pending</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center bg-white border border-gray-100 rounded-[8px] px-6 py-1.5 text-[12px] text-[#1a233a] font-medium hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
                      <div>CP-BILL-4390</div>
                      <div>₹4,10,000</div>
                      <div>18-Jul-2026</div>
                      <div>
                        <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-medium rounded-full">Paid</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center bg-white border border-gray-100 rounded-[8px] px-6 py-1.5 text-[12px] text-[#1a233a] font-medium hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
                      <div>CP-BILL-6490</div>
                      <div>₹8,10,000</div>
                      <div>02-Jul-2026</div>
                      <div>
                        <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-medium rounded-full">Paid</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Tab Content - Box Specification */}
            {activeTab === 'Box Specification' && (
              <div className="space-y-6">
                <h3 className="text-[16px] font-bold text-[#1a233a]">Material Supplied (3)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <div className="bg-white border border-gray-200 rounded-[12px] p-3 shadow-sm flex flex-col hover:border-[#ea580c] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Kraft Liner 150 GSM</h4>
                      <span className="inline-flex px-2 py-0.5 bg-[#dcfce7] text-[#16a34a] text-[10px] font-medium rounded-full">Approved</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mb-1.5">RM-PAP-1150</div>
                    
                    <div className="text-[12px] text-[#1a233a] font-medium mb-2 leading-relaxed">
                      GSM Range: 140-160<br/>
                      Reel Width: 900-1250mm
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] text-gray-500 font-medium">Quality Score</span>
                        <span className="text-[11px] font-bold text-[#1a233a]">96%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#16a34a] rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white border border-gray-200 rounded-[12px] p-3 shadow-sm flex flex-col hover:border-[#ea580c] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[14px] font-bold text-[#1a233a]">Fluting Medium 120 GSM</h4>
                      <span className="inline-flex px-2 py-0.5 bg-[#dcfce7] text-[#16a34a] text-[10px] font-medium rounded-full">Approved</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mb-1.5">RM-PAP-1120</div>
                    
                    <div className="text-[12px] text-[#1a233a] font-medium mb-2 leading-relaxed">
                      GSM Range: 100-140<br/>
                      Reel Width: 900-1250mm
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] text-gray-500 font-medium">Quality Score</span>
                        <span className="text-[11px] font-bold text-[#1a233a]">96%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#16a34a] rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white border border-gray-200 rounded-[12px] p-3 shadow-sm flex flex-col hover:border-[#ea580c] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[14px] font-bold text-[#1a233a] pr-2">Test Linear 100 GSM<br/>(Recycled)</h4>
                      <span className="inline-flex px-2 py-0.5 bg-[#ffedd5] text-[#d97706] text-[10px] font-medium rounded-full whitespace-nowrap shrink-0">Under Evaluation</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mb-1.5">RM-PAP-1120</div>
                    
                    <div className="text-[12px] text-[#1a233a] font-medium mb-2 leading-relaxed">
                      GSM Range: 100-140<br/>
                      Reel Width: 900-1250mm
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] text-gray-500 font-medium">Quality Score</span>
                        <span className="text-[11px] font-bold text-[#1a233a]">78%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#d97706] rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}


            {/* Tab Content - Order History */}
            {activeTab === 'Order History' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-4 lg:p-5 border-b border-gray-100">
                    <h3 className="text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] to-[#5a67d8]">Order History</h3>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Select Date Range
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <Download className="w-3.5 h-3.5 text-gray-400" />
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[12px] whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                          <th className="py-3 pl-4 lg:pl-5 pr-3">PO No.</th>
                          <th className="py-3 px-3">Date</th>
                          <th className="py-3 px-3">Material</th>
                          <th className="py-3 px-3">Quantity</th>
                          <th className="py-3 px-3">Value</th>
                          <th className="py-3 px-3">Delivery Status</th>
                          <th className="py-3 pr-4 lg:pr-5 pl-3">QC Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#1a233a]">
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">PO-2026-2210</td>
                          <td className="py-3 px-3 font-medium text-gray-600">20-Jul-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">Kraft Liner 150 GSM</td>
                          <td className="py-3 px-3 font-bold">8.4 T</td>
                          <td className="py-3 px-3 font-medium">₹4,45,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Received</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Passed</span>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">PO-2026-2175</td>
                          <td className="py-3 px-3 font-medium text-gray-600">15-Jul-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">Fluting Medium 120 GSM</td>
                          <td className="py-3 px-3 font-bold">6.1 T</td>
                          <td className="py-3 px-3 font-medium">₹2,50,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Received</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Passed</span>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">PO-2026-2140</td>
                          <td className="py-3 px-3 font-medium text-gray-600">02-Jul-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">Kraft Linear 150 GSM</td>
                          <td className="py-3 px-3 font-bold">10.2 T</td>
                          <td className="py-3 px-3 font-medium">₹5,40,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Received</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#ffedd5] text-[#d97706] text-[10px] font-bold rounded-full">Minor Deviation</span>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">PO-2026-2098</td>
                          <td className="py-3 px-3 font-medium text-gray-600">18-Jun-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">Test Linear 100 GSM</td>
                          <td className="py-3 px-3 font-bold">4.0 T</td>
                          <td className="py-3 px-3 font-medium">₹1,60,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Received</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#fee2e2] text-[#ef4444] text-[10px] font-bold rounded-full">Rejected - Moisture</span>
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">PO-2026-2044</td>
                          <td className="py-3 px-3 font-medium text-gray-600">29-May-2026</td>
                          <td className="py-3 px-3 font-medium text-gray-700">Kraft Liner 150 GSM</td>
                          <td className="py-3 px-3 font-bold">9.6 T</td>
                          <td className="py-3 px-3 font-medium">₹5,08,000</td>
                          <td className="py-3 px-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Received</span>
                          </td>
                          <td className="py-3 pr-4 lg:pr-5 pl-3">
                            <span className="inline-flex px-3 py-1 bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold rounded-full">Passed</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Box Specification Modal */}
      {selectedBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[550px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 pb-4">
              <div>
                <h2 className="text-[18px] font-bold text-[#1a233a] mb-1">{selectedBox.name}</h2>
                <div className="text-[11px] text-gray-400">{selectedBox.code}</div>
              </div>
              <button onClick={() => setSelectedBox(null)} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 pt-5 flex gap-8">
              {/* Left Column */}
              <div className="flex-1 space-y-6 border-r border-gray-100 pr-8">
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Box Size (L×W×H)</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.size}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Ply</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.ply}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Die Number</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.dieNumber}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">ECT Requirement</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.ect}</div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="flex-1 space-y-6 pl-2">
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Flute Type</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.flute}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">GSM Combo</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.gsm}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Print Colors</div>
                  <div className="text-[13px] text-[#1a233a] font-medium">{selectedBox.print}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Status</div>
                  <div className="text-[12.5px] leading-snug">
                    <span className={selectedBox.status === 'Under Review' ? "text-[#ea580c] font-medium" : "text-[#16a34a] font-medium"}>{selectedBox.status}</span> <span className="text-gray-500">{selectedBox.statusMessage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetailsPage;
