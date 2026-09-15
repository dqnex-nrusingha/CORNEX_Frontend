import React from 'react';

import {
    Mail,
    Edit
} from 'lucide-react';


/*
 * =====================================================
 * VENDOR OVERVIEW
 * =====================================================
 *
 * This is the Vendor equivalent of CustomerOverview.jsx.
 *
 * The structure remains the same:
 *
 *   1. Edit button
 *   2. Vendor Profile + Payment Details
 *   3. Billing + Shipping Address
 *   4. Contacts Directory
 *   5. Bank Details
 *
 * The only material change is the business terminology and
 * the Vendor API field names.
 */

const VendorOverview = ({
    vendor,
    billingAddress,
    shippingAddress,
    contacts = [],
    bankDetails = [],
    onEdit
}) => {

    if (!vendor) {
        return null;
    }


    return (

        <div className="bg-white rounded-[12px] p-2.5 shadow-sm border border-gray-100">

            <div className="space-y-4">

                {/* =========================================
                    Edit Button
                ========================================= */}

                <div className="flex justify-end">

                    <button
                        type="button"
                        onClick={onEdit}
                        className="p-1.5 border border-gray-100 rounded-md bg-white hover:bg-gray-50 text-gray-400 transition-colors shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                    </button>

                </div>


                {/* =========================================
                    Profile + Payment
                ========================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <VendorProfile
                        vendor={vendor}
                    />

                    <PaymentDetails
                        vendor={vendor}
                    />

                </div>


                {/* =========================================
                    Addresses
                ========================================= */}

                <Addresses
                    billingAddress={billingAddress}
                    shippingAddress={shippingAddress}
                />


                {/* =========================================
                    Contacts
                ========================================= */}

                <ContactsDirectory
                    contacts={contacts}
                />


                {/* =========================================
                    Bank Details
                ========================================= */}

                <BankDetails
                    bankDetails={bankDetails}
                />

            </div>

        </div>
    );
};


// =====================================================
// VENDOR PROFILE
// =====================================================

const VendorProfile = ({
    vendor
}) => {

    const initials =
        (vendor.displayName || 'VE')
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0])
            .join('')
            .toUpperCase();


    return (

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">

            <div className="border-b border-gray-100 pb-3 mb-4">

                <h3 className="text-[16px] font-medium text-[#1a233a]">
                    Vendor Profile
                </h3>

            </div>


            <div className="flex items-center gap-4 mb-5">

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#9333ea] flex items-center justify-center text-white text-[15px] font-bold shadow-sm shrink-0">
                    {initials}
                </div>

                <div>

                    <h4 className="text-[14px] font-bold text-[#1a233a] leading-tight">
                        {vendor.displayName || '-'}
                    </h4>

                    <span className="text-[11px] text-gray-400 font-medium">
                        {vendor.vendorCode || '-'}
                    </span>

                </div>

            </div>


            <div className="space-y-2.5">

                <InfoRow
                    label="Vendor Type"
                    value={vendor.vendorType}
                />

                <InfoRow
                    label="PAN"
                    value={vendor.pan}
                />

                <InfoRow
                    label="GSTIN"
                    value={vendor.gstin}
                />

                <InfoRow
                    label="MSME"
                    value={vendor.msme}
                />

            </div>

        </div>
    );
};


// =====================================================
// PAYMENT DETAILS
// =====================================================

const PaymentDetails = ({
    vendor
}) => {

    return (

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">

            <div className="border-b border-gray-100 pb-3 mb-4">

                <h3 className="text-[16px] font-medium text-[#1a233a]">
                    Payment Details
                </h3>

            </div>


            <div className="space-y-3 mt-[44px]">

                <InfoRow
                    label="Purchase Region"
                    value={
                        vendor.purchaseRegionName ||
                        vendor.purchaseRegionId ||
                        vendor.salesRegionName ||
                        vendor.salesRegionId
                    }
                />

                <InfoRow
                    label="Currency"
                    value={
                        vendor.currency === 'INR'
                            ? 'INR (₹)'
                            : vendor.currency
                    }
                />

                <InfoRow
                    label="Opening Balance"
                    value={formatCurrency(
                        vendor.openingBalance
                    )}
                />

                <InfoRow
                    label="Payment Terms"
                    value={vendor.paymentTerms}
                />

            </div>

        </div>
    );
};


// =====================================================
// ADDRESS
// =====================================================

const Addresses = ({
    billingAddress,
    shippingAddress
}) => {

    return (

        <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">

            <div className="grid grid-cols-1 md:grid-cols-2 relative gap-0">

                <AddressBlock
                    title="Billing Address"
                    address={billingAddress}
                    left
                />

                <AddressBlock
                    title="Shipping Address"
                    address={shippingAddress}
                />

            </div>

        </div>
    );
};


const AddressBlock = ({
    title,
    address,
    left
}) => {

    return (

        <div
            className={
                left
                    ? "pr-6 border-r-2 border-pink-300"
                    : "pl-6"
            }
        >

            <div className="flex justify-between items-center mb-2">

                <h3 className="text-[14px] font-bold text-gray-500">
                    {title}
                </h3>

            </div>


            <div className="text-[12px] font-bold text-[#4b5563] leading-snug">

                {address ? (
                    <>

                        {address.contactName && (
                            <>
                                {address.contactName}
                                <br />
                            </>
                        )}

                        {address.addressLine1 && (
                            <>
                                {address.addressLine1}
                                <br />
                            </>
                        )}

                        {address.addressLine2 && (
                            <>
                                {address.addressLine2}
                                <br />
                            </>
                        )}

                        {address.city}

                        {address.state && (
                            `, ${address.state}`
                        )}

                        {address.pincode && (
                            ` ${address.pincode}`
                        )}

                        {address.country && (
                            <>
                                <br />
                                {address.country}
                            </>
                        )}

                    </>
                ) : (
                    'No address available'
                )}

            </div>

        </div>
    );
};


// =====================================================
// CONTACT DIRECTORY
// =====================================================

const ContactsDirectory = ({
    contacts
}) => {

    return (

        <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">

            <div className="flex justify-between items-center mb-2">

                <h3 className="text-[16px] font-bold text-[#1a233a]">
                    Contacts Directory
                </h3>

            </div>


            <div className="flex flex-col divide-y divide-gray-100">

                {contacts.length > 0 ? (

                    contacts.map(
                        (contact, index) => (

                            <div
                                key={
                                    contact.contactId ||
                                    index
                                }
                                className="flex items-center justify-between py-2.5 hover:bg-gray-50/50 transition-colors"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-600">

                                        {getInitials(
                                            contact.name ||
                                            [
                                                contact.firstName,
                                                contact.lastName
                                            ].filter(Boolean).join(' ')
                                        )}

                                    </div>


                                    <div>

                                        <div className="text-[13px] font-bold text-[#1a233a]">
                                            {
                                                contact.name ||
                                                [
                                                    contact.firstName,
                                                    contact.lastName
                                                ].filter(Boolean).join(' ') ||
                                                '-'
                                            }
                                        </div>

                                        <div className="text-[11px] text-gray-400 mt-0.5">
                                            {
                                                contact.designation ||
                                                contact.department ||
                                                '-'
                                            }
                                        </div>

                                    </div>

                                </div>


                                <div className="flex items-center gap-3">

                                    {contact.phone && (

                                        <div className="text-gray-500 text-[10px] font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                                            {contact.phone}
                                        </div>

                                    )}

                                    {contact.email && (

                                        <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">

                                            <Mail className="w-3 h-3" />

                                            {contact.email}

                                        </div>

                                    )}

                                </div>

                            </div>
                        ))

                ) : (

                    <div className="py-8 text-center text-[12px] text-gray-400">
                        No contacts found.
                    </div>

                )}

            </div>

        </div>
    );
};


// =====================================================
// BANK DETAILS
// =====================================================

const BankDetails = ({
    bankDetails
}) => {

    return (

        <div className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">

            <div className="flex justify-between items-center mb-3">

                <h3 className="text-[16px] font-bold text-[#1a233a]">
                    Bank Details
                </h3>

            </div>


            <div className="overflow-x-auto">

                <table className="w-full text-[12px] text-left">

                    <thead>

                        <tr className="text-gray-500 font-medium border-b border-gray-100">

                            <th className="pb-2 px-2">
                                Bank Name
                            </th>

                            <th className="pb-2 px-2">
                                Account Holder Name
                            </th>

                            <th className="pb-2 px-2">
                                Account No
                            </th>

                            <th className="pb-2 px-2">
                                IFSC Code
                            </th>

                            <th className="pb-2 px-2">
                                Open Date
                            </th>

                        </tr>

                    </thead>


                    <tbody className="text-[#1a233a]">

                        {bankDetails.length > 0 ? (

                            bankDetails.map(
                                (bank, index) => (

                                    <tr
                                        key={
                                            bank.bankId ||
                                            index
                                        }
                                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                    >

                                        <td className="py-2.5 px-2 font-medium">
                                            {bank.bankName || '-'}
                                        </td>

                                        <td className="py-2.5 px-2 text-gray-600">
                                            {bank.accountHolderName || '-'}
                                        </td>

                                        <td className="py-2.5 px-2 font-medium">
                                            {bank.accountNumber || '-'}
                                        </td>

                                        <td className="py-2.5 px-2 text-gray-600">
                                            {bank.ifscCode || '-'}
                                        </td>

                                        <td className="py-2.5 px-2 text-gray-600">
                                            {formatDate(
                                                bank.openDate
                                            )}
                                        </td>

                                    </tr>

                                ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="py-8 text-center text-gray-400"
                                >
                                    No bank details found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


// =====================================================
// COMMON INFO ROW
// =====================================================

const InfoRow = ({
    label,
    value
}) => {

    return (

        <div className="grid grid-cols-[140px_1fr] items-center text-[13px]">

            <span className="text-gray-400 font-medium">
                {label}
            </span>

            <span className="font-bold text-[#1a233a]">
                {value || '-'}
            </span>

        </div>
    );
};


// =====================================================
// HELPERS
// =====================================================

function getInitials(name = '') {

    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase() || 'VE';
}


function formatCurrency(value) {

    return `₹${Number(
        value || 0
    ).toLocaleString('en-IN')}`;
}


function formatDate(value) {

    if (!value) {
        return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString(
        'en-GB',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
    );
}


export default VendorOverview;