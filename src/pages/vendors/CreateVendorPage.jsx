import React, { useState } from 'react';
import { Mail, ChevronDown, Bookmark, Globe, Check, UploadCloud, Copy, Receipt, Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateVendorPage = () => {
  const navigate = useNavigate();
  const [vendorType, setVendorType] = useState('Business');
  const [activeTab, setActiveTab] = useState('Other Details');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const tabs = ['Other Details', 'Billing & Delivery Address', 'Contact Person', 'Remark & Audit Log'];

  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">

      {/* Top Banner with Stepper */}
      <div className="bg-white px-6 py-2 md:px-8 md:py-2 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
        <h2 className="text-[20px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
          Create New Vendor
        </h2>

        <div className="flex items-start mr-4 w-72">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-shrink-0 w-24">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff3b30] to-[#b82db8] text-white flex items-center justify-center shadow-md relative z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15l-3.5-2.5L12 21l-3.5-2.5L5 21V6z" />
                <line x1="8" y1="10" x2="15" y2="10" />
                <line x1="8" y1="14" x2="12" y2="14" />
              </svg>
            </div>
            <span className="text-[12px] font-semibold text-gray-700 mt-2 whitespace-nowrap">Create Vendor</span>
          </div>

          {/* Connecting line */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#b82db8] to-[#ff3b30] mt-5 -mx-8 z-0"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center flex-shrink-0 w-24">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center shadow-sm relative z-10">
              <Package width="16" height="16" strokeWidth="2" />
            </div>
            <span className="text-[12px] font-semibold text-gray-700 mt-2 whitespace-nowrap">Sales Tag</span>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pt-3 pb-6 md:px-8 md:pt-4 md:pb-8">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200 max-w-6xl">
            <h3 className="text-[18px] font-bold text-black">Vendor Details</h3>
            <span className="text-[11px] font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">Draft — Auto-saving</span>
          </div>
          <form className="max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

              {/* Left Column */}
              <div className="space-y-5 min-w-0">
                {/* Primary Contact */}
                <div className="flex items-start min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0 mt-2.5">Primary Contact <span className="text-red-500">*</span></label>
                  <div className="flex-1 flex items-center space-x-2 min-w-0">
                    <div className="relative w-20 shrink-0">
                      <select className="w-full border border-gray-200 rounded-md px-2 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                        <option></option>
                        <option>Mr.</option>
                        <option>Ms.</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <input type="text" placeholder="First Name" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" />
                    <input type="text" placeholder="Last Name" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" />
                  </div>
                </div>

                {/* Display Name */}
                <div className="flex items-center relative min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Display Name <span className="text-red-500">*</span></label>
                  <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                  <span className="absolute right-2 top-1.5 bg-[#fce8e8] text-[#d9534f] text-[10px] px-2 py-0.5 rounded-full font-semibold">Required</span>
                </div>

                {/* Vendor Language */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Vendor Language <span className="text-red-500">*</span></label>
                  <div className="relative flex-1 min-w-0">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                    </span>
                    <select className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                      <option></option>
                      <option>English</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Primary Number */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Primary Number <span className="text-red-500">*</span></label>
                  <div className="flex-1 flex relative min-w-0">
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center border-r border-gray-200 bg-gray-50 rounded-l-md px-3 text-[13px] text-gray-500 shrink-0">
                      +91
                    </div>
                    <input type="text" placeholder="Work Number" className="w-full min-w-0 pl-13 border border-gray-200 rounded-md pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5 min-w-0">
                {/* Company Name */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>

                {/* Email Address */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative flex-1 min-w-0">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </span>
                    <input type="email" className="w-full min-w-0 border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                  </div>
                </div>

                {/* Spacer to align with Language */}
                <div className="hidden md:block h-[38px]"></div>

                {/* Secondary Number */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Secondary Number <span className="text-red-500">*</span></label>
                  <div className="flex-1 flex relative min-w-0">
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center border-r border-gray-200 bg-gray-50 rounded-l-md px-3 text-[13px] text-gray-500 shrink-0">
                      +91
                    </div>
                    <input type="text" placeholder="Work Number" className="w-full min-w-0 pl-13 border border-gray-200 rounded-md pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-[14px] font-medium transition-colors relative ${activeTab === tab
                        ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab content placeholder */}
              <div className="py-6">

                {/* === OTHER DETAILS TAB === */}
                {activeTab === 'Other Details' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    {/* Left Column */}
                    <div className="space-y-5 min-w-0">
                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          PAN <span className="text-red-500">*</span>
                        </label>
                        <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          GSTIN
                        </label>
                        <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          MSME Registered? <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 flex items-center">
                          <input type="radio" className="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 w-3 h-3" />
                          <span className="text-[12px] font-medium text-[#1a233a]">This Vendor Is MSME Registered</span>
                        </div>
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Currency <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative">
                          <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                            <option>INR - Indian Rupees</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Accounts Payable
                        </label>
                        <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5 min-w-0">
                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Payment Terms <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative">
                          <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                            <option></option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Opening Balance <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 flex relative">
                          <div className="absolute inset-y-0 left-0 flex items-center justify-center border-r border-gray-200 bg-gray-50 rounded-l-md px-3 text-[13px] text-gray-500 shrink-0">
                            INR
                          </div>
                          <input type="text" placeholder="0.00" className="w-full min-w-0 pl-12 border border-gray-200 rounded-md pr-8 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-800 bg-white shadow-sm" />
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0 mt-0.5">
                          Client Portal
                        </label>
                        <div className="flex-1 flex items-start">
                          <input type="checkbox" className="mt-0.5 mr-3 rounded border-gray-300 text-blue-600 w-4 h-4 cursor-pointer" />
                          <p className="text-[12px] text-[#1a233a] font-medium leading-tight">
                            Allow Secure Customer Portal Access.<br />Customers Can Log In Directly To View Invoices<br />And Pay Balances.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0 pt-2">
                          Documents <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1">
                          <div className="border border-dashed border-gray-300 rounded-lg py-5 px-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                            <UploadCloud className="w-5 h-5 text-gray-400 mb-1" strokeWidth={2} />
                            <p className="text-[12px] font-medium text-[#1a233a]">click to upload or drag and drop</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">click to upload or drag and drop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* === BILLING & DELIVERY ADDRESS TAB === */}
                {activeTab === 'Billing & Delivery Address' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Billing Address */}
                    <div>
                      <h3 className="text-[15px] font-bold text-[#1a233a] mb-5">Billing Address</h3>
                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Attention</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Country / Region</label>
                          <div className="relative">
                            <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                              <option>India</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Address</label>
                          <textarea rows="2" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none" placeholder="Street 1"></textarea>
                          <textarea rows="2" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none mt-3" placeholder="Street 2"></textarea>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">City</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">State</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Zip Code</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Phone</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Fax</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[15px] font-bold text-[#1a233a]">Shipping Address</h3>
                        <button className="text-[12px] font-semibold text-blue-600 flex items-center hover:underline">
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copy billing address
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Attention</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Country / Region</label>
                          <div className="relative">
                            <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm">
                              <option>India</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Address</label>
                          <textarea rows="2" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none" placeholder="Street 1"></textarea>
                          <textarea rows="2" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none mt-3" placeholder="Street 2"></textarea>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">City</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">State</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Zip Code</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Phone</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Fax</label>
                          <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* === CONTACT PERSON TAB === */}
                {activeTab === 'Contact Person' && (
                  <div className="max-w-4xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      <div className="flex flex-col">
                        <label className="text-[13px] font-bold text-[#1a233a] mb-1">Name</label>
                        <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Contact Person Name" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[13px] font-bold text-[#1a233a] mb-1">Email Address</label>
                        <input type="email" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Email Address" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[13px] font-bold text-[#1a233a] mb-1">Mobile Number</label>
                        <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Mobile Number" />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[13px] font-bold text-[#1a233a] mb-1">Designation</label>
                        <input type="text" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Designation" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <button type="button" className="text-blue-600 hover:text-blue-700 text-[13px] font-semibold flex items-center gap-1.5 transition-colors hover:underline">
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Contact Person
                      </button>
                    </div>
                  </div>
                )}

                {/* === OTHER TABS PLACEHOLDER === */}
                {activeTab !== 'Other Details' && activeTab !== 'Billing & Delivery Address' && activeTab !== 'Contact Person' && (
                  <div className="h-64 flex items-center justify-center text-gray-400 italic">
                    {activeTab} content will go here.
                  </div>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* ── Fixed Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3 z-20">
        <button 
          onClick={() => navigate('/vendors')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button 
          onClick={() => navigate('/vendors')}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
        >
          Save
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-112.5 min-h-100 flex flex-col items-center relative overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* Green Curved Header */}
            <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[150%] h-70 bg-[#22c55e] rounded-b-[50%]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full px-8 pt-21.25 pb-8">

              {/* Checkmark Circle */}
              <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-6">
                <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" strokeWidth={4} />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-[22px] font-bold text-[#22c55e] text-center mb-4 leading-snug">
                Vendor Profile<br />Successfully Created.
              </h3>

              <p className="text-[10px] font-bold text-gray-400 mb-6 tracking-wide">
                *Redirect in 3 Sec*
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/vendors');
                }}
                className="px-10 py-1.5 border-2 border-[#22c55e] text-[#22c55e] rounded-[10px] font-bold text-sm hover:bg-green-50 transition-colors bg-white shadow-sm"
              >
                Okay
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
};

export default CreateVendorPage;
