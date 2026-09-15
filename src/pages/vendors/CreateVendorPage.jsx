import React, { useState } from 'react';

import { Mail, ChevronDown, Bookmark, Globe, Check, UploadCloud, Copy, Receipt, Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createVendor } from '../../services/vendors/createvendorApi';

const CreateVendorPage = () => {
  const navigate = useNavigate();
  const [vendorType, setVendorType] = useState('Business');
  const [activeTab, setActiveTab] = useState('Other Details');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
vendor_type: 'Business',

    primary_contact_salutation: '',
    primary_contact_first_name: '',
    primary_contact_last_name: '',

    display_name: '',
    company_name: '',
    vendor_language: 'English',

    primary_number: '',
    secondary_number: '',
    email_address: '',

    pan: '',
    gstin: '',
    msme: '',

    sales_region: '',
    currency: '',
    opening_balance: '0.00',
    payment_terms: ''
  });

  const emptyAddress = {
    attention: '',
    country_region: 'India',
    street_1: '',
    street_2: '',
    city: '',
    district: '',
    state: '',
    zip_code: '',
    phone: '',
    fax: ''
};

const [billingAddress, setBillingAddress] = useState({
    ...emptyAddress
});

const [shippingAddress, setShippingAddress] = useState({
    ...emptyAddress
});

  const [bankDetails, setBankDetails] = useState([{
    bank_name: '',
    account_holder: '',
    account_number: '',
    ifsc_code: '',
  }]);

  const [contactPersons, setContactPersons] = useState([{
    name: '',
    email: '',
    mobile_number: '',
    designation: '',
  }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (type, e) => {

    const { name, value } = e.target;

    if (type === 'billing') {

        setBillingAddress(prev => ({
            ...prev,
            [name]: value
        }));

    } else {

        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    }
};

  const handleBankDetailChange = (index, e) => {
    setBankDetails((currentDetails) => currentDetails.map((details, detailIndex) => (
      detailIndex === index
        ? { ...details, [e.target.name]: e.target.value }
        : details
    )));
  };

  const addBankDetails = () => {
    setBankDetails((currentDetails) => [
      ...currentDetails,
      {
        bank_name: '',
        account_holder: '',
        account_number: '',
        ifsc_code: '',
      },
    ]);
  };

  const handleContactPersonChange = (index, e) => {
    setContactPersons((currentContacts) => currentContacts.map((contact, contactIndex) => (
      contactIndex === index
        ? { ...contact, [e.target.name]: e.target.value }
        : contact
    )));
  };

  const addContactPerson = () => {
    setContactPersons((currentContacts) => [
      ...currentContacts,
      {
        name: '',
        email: '',
        mobile_number: '',
        designation: '',
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = {
        vendorType: formData.vendor_type,
        primaryContactPrefix: formData.primary_contact_salutation,
        primaryContactFirstName: formData.primary_contact_first_name,
        primaryContactLastName: formData.primary_contact_last_name,
        displayName: formData.display_name,
        companyName: formData.company_name,
        vendorLanguage: formData.vendor_language,
        emailAddress: formData.email_address,
        primaryNumber: formData.primary_number,
        secondaryNumber: formData.secondary_number,
        pan: formData.pan,
        gstin: formData.gstin,
        msme: formData.msme,
        salesRegionId: formData.sales_region,
        currencyCode: formData.currency,
        openingBalance: formData.opening_balance,
        paymentTermsId: formData.payment_terms,
        billingAddress: {
          attention: billingAddress.attention,
          country: billingAddress.country_region,
          street1: billingAddress.street_1,
          street2: billingAddress.street_2,
          city: billingAddress.city,
          district: billingAddress.district,
          state: billingAddress.state,
          zipCode: billingAddress.zip_code,
          phone: billingAddress.phone,
          fax: billingAddress.fax,
        },
        shippingAddress: {
          attention: shippingAddress.attention,
          country: shippingAddress.country_region,
          street1: shippingAddress.street_1,
          street2: shippingAddress.street_2,
          city: shippingAddress.city,
          district: shippingAddress.district,
          state: shippingAddress.state,
          zipCode: shippingAddress.zip_code,
          phone: shippingAddress.phone,
          fax: shippingAddress.fax,
        },
        bankDetails: bankDetails.map((bank) => ({
          bankName: bank.bank_name,
          accountHolder: bank.account_holder,
          accountNumber: bank.account_number,
          ifscCode: bank.ifsc_code,
        })),
        contacts: contactPersons.map((contact) => ({
          name: contact.name,
          emailAddress: contact.email,
          mobileNumber: contact.mobile_number,
          designation: contact.designation,
        })),
      };

      const response = await createVendor(payload);
      console.log('Vendor created successfully:', response);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error creating vendor:', error);
      alert(error.message || 'Failed to create vendor');
    } finally {
      setIsSubmitting(false);
    }
  };


  const tabs = ['Other Details', 'Address', 'Contact Directory', 'Bank Details'];

  return (
    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">

      {/* Top Banner with Stepper */}
      <div className="bg-white px-6 py-2 md:px-8 md:py-2 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
        <h2 className="text-[20px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
          Create New Vendor Profile
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
                <line x1="4" y1="11" x2="20" y2="11" />
                <line x1="12" y1="6" x2="12" y2="11" />
                <line x1="7" y1="15" x2="11" y2="15" />
                <line x1="7" y1="18" x2="13" y2="18" />
              </svg>
            </div>
            <span className="text-[12px] font-medium text-gray-500 mt-2 whitespace-nowrap">Vendor Onboarded</span>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pt-5 pb-24 md:px-8 md:pt-6">
          <form id="vendor-form" className="max-w-6xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

              {/* Left Column */}
              <div className="space-y-5 min-w-0">
                {/* Vendor Type */}
                <div className="flex items-center">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Vendor Type <span className="text-red-500">*</span></label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer text-[15px] text-[#1a233a] font-medium">
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full mr-2.5 transition-all ${vendorType === 'Business' ? 'bg-gradient-to-br from-[#ff3b30] to-[#b82db8]' : 'border border-gray-300'}`}>
                        {vendorType === 'Business' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={formData.vendor_type === 'Business'}
                        onChange={() => {
                          setVendorType('Business');
                          setFormData({ ...formData, vendor_type: 'Business' });
                        }}
                      />
                      Business
                    </label>
                    <label className="flex items-center cursor-pointer text-[15px] text-[#1a233a] font-medium">
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full mr-2.5 transition-all ${vendorType === 'Individual' ? 'bg-gradient-to-br from-[#ff3b30] to-[#b82db8]' : 'border border-gray-300'}`}>
                        {vendorType === 'Individual' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        checked={formData.vendor_type === 'Individual'}
                        onChange={() => {
                          setVendorType('Individual');
                          setFormData({ ...formData, vendor_type: 'Individual' });
                        }}
                      />
                      Individual
                    </label>
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="flex items-start min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0 mt-2.5">Primary Contact <span className="text-red-500">*</span></label>
                  <div className="flex-1 flex items-center space-x-3 min-w-0">
                    <div className="relative w-12 shrink-0">
                      <select
                        name="primary_contact_salutation"
                        value={formData.primary_contact_salutation}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md px-1 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm text-center"
                      >
                        <option value=""></option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                      </select>
                      <ChevronDown className="absolute right-1 top-2.5 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                    <input type="text" placeholder="First Name" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" name="primary_contact_first_name" value={formData.primary_contact_first_name} onChange={handleChange} />
                    <input type="text" placeholder="Last Name" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" name="primary_contact_last_name" value={formData.primary_contact_last_name} onChange={handleChange} />
                  </div>
                </div>

                {/* Display Name */}
                <div className="flex items-center relative min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Display Name <span className="text-red-500">*</span></label>
                  <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="display_name" value={formData.display_name} onChange={handleChange} required />
                  <span className="absolute right-2 top-1.5 bg-[#fce8e8] text-[#d9534f] text-[10px] px-2 py-0.5 rounded-full font-semibold">Required</span>
                </div>

                {/* Vendor Language */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Vendor Language <span className="text-red-500">*</span></label>
                  <div className="relative flex-1 min-w-0">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                    </span>
                    <select
                      name="vendor_language"
                      value={formData.vendor_language}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                    >
                      <option value="">Select</option>
                      <option value="English">English</option>
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
                    <input type="text" placeholder="Work Number" className="w-full min-w-0 pl-13 border border-gray-200 rounded-md pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm" name="primary_number" value={formData.primary_number} onChange={handleChange} required />
                  </div>
                </div>

                {/* PAN */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">
                    PAN <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    maxLength={10}
                    className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm uppercase"
                    placeholder="Enter PAN"
                    required
                  />
                </div>
                {/* MSME */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">MSME <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="msme"
                    value={formData.msme}
                    onChange={handleChange}
                    className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5 min-w-0">
                {/* Spacer for Vendor Type row to align grids */}
                <div className="hidden md:block h-[24px]"></div>

                {/* Spacer for Primary Contact row to align grids (shifted down by 1 field) */}
                <div className="hidden md:block h-[38px]"></div>

                {/* Company Name */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Company Name <span className="text-red-500">*</span></label>
                  <input type="text" className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="company_name" value={formData.company_name} onChange={handleChange} />
                </div>

                {/* Email Address */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative flex-1 min-w-0">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </span>
                    <input type="email" className="w-full min-w-0 border border-gray-200 rounded-md pl-9 pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm" name="email_address" value={formData.email_address} onChange={handleChange} />
                  </div>
                </div>

                {/* Secondary Number */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">Secondary Number <span className="text-red-500">*</span></label>
                  <div className="flex-1 flex relative min-w-0">
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center border-r border-gray-200 bg-gray-50 rounded-l-md px-3 text-[13px] text-gray-500 shrink-0">
                      +91
                    </div>
                    <input
                      type="text"
                      name="secondary_number"
                      value={formData.secondary_number}
                      onChange={handleChange}
                      placeholder="Work Number"
                      className="w-full min-w-0 pl-13 border border-gray-200 rounded-md pr-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 placeholder-gray-400 bg-white shadow-sm"
                    />
                  </div>
                </div>

                {/* GSTIN */}
                <div className="flex items-center min-w-0">
                  <label className="w-36 text-[13px] font-bold text-[#1a233a] shrink-0">
                    GSTIN
                  </label>

                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    maxLength={15}
                    className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm uppercase"
                    placeholder="Enter GSTIN"
                  />
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
                    {/* Left Column - All fields are now here */}
                    <div className="space-y-5 min-w-0 md:pr-4">
                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Sales Region <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative">
                          <select
                            name="sales_region"
                            value={formData.sales_region}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                          >
                            <option value="">Select</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Currency <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative">
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                          >
                            <option value="">Select</option>
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Opening Balance <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="opening_balance"
                          value={formData.opening_balance}
                          onChange={handleChange}
                          className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                        />
                      </div>

                      <div className="flex items-center min-w-0">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0">
                          Payment Terms <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative">
                          <select
                            name="payment_terms"
                            value={formData.payment_terms}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                          >
                            <option value="">Select</option>
                            <option value="Net 15">Net 15</option>
                            <option value="Net 30">Net 30</option>
                            <option value="Net 60">Net 60</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-start">
                        <label className="text-[13px] font-bold text-[#1a233a] w-36 shrink-0 pt-2">
                          Documents 
                          {/* <span className="text-red-500">*</span> */}
                        </label>
                        <div className="flex-1">
                          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                            <UploadCloud className="w-6 h-6 text-gray-500 mb-2" strokeWidth={2} />
                            <p className="text-[12px] font-medium text-[#1a233a]">click to upload or drag and drop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* === ADDRESS TAB === */}
                {activeTab === 'Address' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Billing Address */}
                    <div>
                      <h3 className="text-[15px] font-bold text-[#1a233a] mb-5">Billing Address</h3>
                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Attention <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="attention"
                            value={billingAddress.attention}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Country / Region <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <select
                              name="country_region"
                              value={billingAddress.country_region}
                              onChange={(e) => handleAddressChange('billing', e)}
                              required
                              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                            >
                              <option value="India">India</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Address <span className="text-red-500">*</span></label>
                          <textarea
                            name="street_1"
                            value={billingAddress.street_1}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            rows="2"
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none"
                            placeholder="Street 1"
                          ></textarea>
                          <textarea
                            name="street_2"
                            value={billingAddress.street_2}
                            onChange={(e) => handleAddressChange('billing', e)}
                            rows="2"
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none mt-3"
                            placeholder="Street 2"
                          ></textarea>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">City <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="city"
                            value={billingAddress.city}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">District <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="district"
                            value={billingAddress.district}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">State <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="state"
                            value={billingAddress.state}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Zip Code <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="zip_code"
                            value={billingAddress.zip_code}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Phone <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="phone"
                            value={billingAddress.phone}
                            onChange={(e) => handleAddressChange('billing', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Fax</label>
                          <input
                            type="text"
                            name="fax"
                            value={billingAddress.fax}
                            onChange={(e) => handleAddressChange('billing', e)}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[15px] font-bold text-[#1a233a]">Shipping Address</h3>
                        <button
                          type="button"
                          onClick={() => setShippingAddress({ ...billingAddress })}
                          className="text-[12px] font-semibold text-blue-600 flex items-center hover:underline"
                        >
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copy billing address
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Attention <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="attention"
                            value={shippingAddress.attention}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Country / Region <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <select
                              name="country_region"
                              value={shippingAddress.country_region}
                              onChange={(e) => handleAddressChange('shipping', e)}
                              required
                              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                            >
                              <option value="India">India</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Address <span className="text-red-500">*</span></label>
                          <textarea
                            name="street_1"
                            value={shippingAddress.street_1}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            rows="2"
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none"
                            placeholder="Street 1"
                          ></textarea>
                          <textarea
                            name="street_2"
                            value={shippingAddress.street_2}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            rows="2"
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none mt-3"
                            placeholder="Street 2"
                          ></textarea>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">City <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">District <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="district"
                            value={shippingAddress.district}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">State <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="state"
                            value={shippingAddress.state}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Zip Code <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="zip_code"
                            value={shippingAddress.zip_code}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Phone <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="phone"
                            value={shippingAddress.phone}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            required
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-[13px] font-bold text-[#1a233a] mb-1">Fax</label>
                          <input
                            type="text"
                            name="fax"
                            value={shippingAddress.fax}
                            onChange={(e) => handleAddressChange('shipping', e)}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* === CONTACT DIRECTORY TAB === */}
                {activeTab === 'Contact Directory' && (
                  <div className="max-w-4xl space-y-6">
                    <div className="space-y-6">
                      {contactPersons.map((contact, index) => (
                        <div key={`contact-person-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                          <div className="md:col-span-2 flex items-center justify-between border-b border-gray-100 pb-2">
                            <h3 className="text-[13px] font-bold text-[#1a233a]">Contact Person {index + 1}</h3>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor={`contact-name-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">Name</label>
                            <input id={`contact-name-${index}`} type="text" name="name" value={contact.name} onChange={(e) => handleContactPersonChange(index, e)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Contact Person Name" />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`contact-email-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">Email Address</label>
                            <input id={`contact-email-${index}`} type="email" name="email" value={contact.email} onChange={(e) => handleContactPersonChange(index, e)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Email Address" />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`contact-mobile-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">Mobile Number</label>
                            <input id={`contact-mobile-${index}`} type="text" name="mobile_number" value={contact.mobile_number} onChange={(e) => handleContactPersonChange(index, e)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Mobile Number" />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`contact-designation-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">Designation</label>
                            <input id={`contact-designation-${index}`} type="text" name="designation" value={contact.designation} onChange={(e) => handleContactPersonChange(index, e)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" placeholder="Designation" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <button type="button" onClick={addContactPerson} className="text-blue-600 hover:text-blue-700 text-[13px] font-semibold flex items-center gap-1.5 transition-colors hover:underline">
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Contact Person
                      </button>
                    </div>
                  </div>
                )}

                {/* === BANK DETAILS TAB === */}
                {activeTab === 'Bank Details' && (
                  <div className="max-w-4xl">
                    <div className="mb-6">
                      <h3 className="text-[15px] font-bold text-[#1a233a]">Bank Details</h3>
                      <p className="text-[12px] text-gray-500 mt-1">Add the vendor&apos;s primary bank account information.</p>
                    </div>

                    <div className="space-y-6">
                      {bankDetails.map((details, index) => (
                        <div key={`bank-details-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                          <div className="md:col-span-2 flex items-center justify-between border-b border-gray-100 pb-2">
                            <h4 className="text-[13px] font-bold text-[#1a233a]">Bank Account {index + 1}</h4>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor={`bank-name-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">
                              Bank Name <span className="text-red-500">*</span>
                            </label>
                            <input id={`bank-name-${index}`} type="text" name="bank_name" value={details.bank_name} onChange={(e) => handleBankDetailChange(index, e)} placeholder="Enter bank name" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" required />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor={`account-holder-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">
                              Account Holder <span className="text-red-500">*</span>
                            </label>
                            <input id={`account-holder-${index}`} type="text" name="account_holder" value={details.account_holder} onChange={(e) => handleBankDetailChange(index, e)} placeholder="Enter account holder name" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" required />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor={`account-number-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">
                              Account No <span className="text-red-500">*</span>
                            </label>
                            <input id={`account-number-${index}`} type="text" name="account_number" value={details.account_number} onChange={(e) => handleBankDetailChange(index, e)} placeholder="Enter account number" inputMode="numeric" className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400" required />
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor={`ifsc-code-${index}`} className="text-[13px] font-bold text-[#1a233a] mb-1">
                              IFSC Code <span className="text-red-500">*</span>
                            </label>
                            <input id={`ifsc-code-${index}`} type="text" name="ifsc_code" value={details.ifsc_code} onChange={(e) => handleBankDetailChange(index, e)} placeholder="Enter IFSC code" maxLength={11} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm placeholder-gray-400 " required />
                          </div>
                        </div>
                      ))}

                      <button type="button" onClick={addBankDetails} className="text-blue-600 hover:text-blue-700 text-[13px] font-semibold flex items-center gap-1.5 transition-colors hover:underline">
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        Add Bank Details
                      </button>
                    </div>
                  </div>
                )}

                {/* === OTHER TABS PLACEHOLDER === */}
                {activeTab !== 'Other Details' && activeTab !== 'Address' && activeTab !== 'Contact Directory' && activeTab !== 'Bank Details' && (
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
          type="submit"
          form="vendor-form"
          disabled={isSubmitting}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
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
