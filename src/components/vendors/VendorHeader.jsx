import React from 'react';

/*
 * =====================================================
 * VENDOR HEADER
 * =====================================================
 *
 *
 * Purpose:
 *   Displays the main identity/header information for the
 *   selected vendor.
 *
 * Vendor-specific changes:
 *   - customer -> vendor
 *   - customerCode -> vendorCode
 *   - customerType -> vendorType
 *   - customerLanguage -> vendorLanguage
 *   - Customer status wording -> Vendor status wording
 */

const VendorHeader = ({ vendor }) => {

    // -------------------------------------------------
    // Do not render the header until vendor data exists.
    // -------------------------------------------------
    if (!vendor) {
        return null;
    }


    // -------------------------------------------------
    // Generate initials from the vendor display name.
    // Example:
    //   "ABC Paper Mills" -> "AP"
    // -------------------------------------------------
    const initials =
        (vendor.displayName || 'VE')
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0])
            .join('')
            .toUpperCase();


    return (

        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">

            <div className="px-3 lg:px-4 p-3">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-5">

                        {/* -----------------------------------------
                            Vendor Initials
                        ----------------------------------------- */}

                        <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center text-white text-[18px] font-bold shadow-sm shrink-0">
                            {initials}
                        </div>


                        {/* -----------------------------------------
                            Vendor Information
                        ----------------------------------------- */}

                        <div>

                            <div className="flex items-center gap-3">

                                <h1 className="text-[18px] font-bold text-[#1a233a] uppercase">
                                    {vendor.displayName || '-'}
                                </h1>

                                <span className="text-[12px] text-gray-400 font-medium">
                                    {vendor.vendorCode || '-'}
                                </span>

                            </div>


                            <div className="text-[11.5px] text-gray-500 mt-1 font-medium">

                                {vendor.vendorType || '-'}

                                {vendor.vendorLanguage && (
                                    <>
                                        {' • '}
                                        {vendor.vendorLanguage}
                                    </>
                                )}

                                {vendor.createdAt && (
                                    <>
                                        {' • Onboarded '}
                                        {formatDate(vendor.createdAt)}
                                    </>
                                )}

                                {vendor.ownerName && (
                                    <>
                                        {' • Owner: '}
                                        {vendor.ownerName}
                                    </>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* -----------------------------------------
                        Vendor Status
                    ----------------------------------------- */}

                    <span className="px-3 py-1 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-bold rounded-full">

                        {vendor.status === 'ACTIVE'
                            ? 'In Good Standing'
                            : (vendor.status || 'Inactive')}

                    </span>

                </div>

            </div>

        </div>
    );
};


// =====================================================
// DATE FORMATTER
// =====================================================

function formatDate(value) {

    if (!value) {
        return '-';
    }

    const date =
        new Date(value);

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


export default VendorHeader;
