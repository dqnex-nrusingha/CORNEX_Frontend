import React from 'react';

/*
 * =====================================================
 * VENDOR COMMERCIAL TERMS
 * =====================================================
 *
 * The current Vendor database model keeps commercial/payment
 * information on the `vendor` record itself. Therefore this
 * component receives `commercialTerms` from VendorDetailsPage,
 * where the object is built from the vendor response.
 *
 * This avoids hard-coded contract values.
 *
 * Expected fields:
 *   currency
 *   openingBalance
 *   accountsPayable
 *   paymentTerms
 *   advanceRequired
 */

const VendorCommercialTerms = ({
    commercialTerms = {}
}) => {

    const {
        currencyCode = 'INR',
        openingBalance = 0,
        accountsPayable = 0,
        paymentTerms = '-',
        advanceRequired = false,
        outstandingBalance = 0,
        totalBilledAmount = 0
    } = commercialTerms;


    return (

        <div className="space-y-4">

            {/* =========================================
                PAYMENT TERMS
            ========================================= */}

            <section className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">

                <div className="border-b border-gray-100 pb-3 mb-4">

                    <h3 className="text-[16px] font-bold text-[#1a233a]">
                        Payment Terms
                    </h3>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                    <CommercialCard
                        label="Payment Terms"
                        value={commercialTerms.paymentTerms}
                    />

                    <CommercialCard
                        label="Advance Required"
                        value={commercialTerms.advanceRequired}
                    />

                    <CommercialCard
                        label="Accounts Payable"
                        value={formatCurrency(
                            commercialTerms.accountsPayable,
                            commercialTerms.currencyCode
                        )}
                    />

                    <CommercialCard
                        label="Opening Balance"
                        value={formatCurrency(
                            commercialTerms.openingBalance,
                            commercialTerms.currencyCode
                        )}
                    />

                </div>

            </section>


            {/* =========================================
                CURRENCY / COMMERCIAL INFORMATION
            ========================================= */}

            <section className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">

                <div className="border-b border-gray-100 pb-3 mb-4">

                    <h3 className="text-[16px] font-bold text-[#1a233a]">
                        Commercial Information
                    </h3>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                    <CommercialCard
                        label="Currency"
                        value={
                            commercialTerms.currencyCode === 'INR'
                                ? 'INR (₹)'
                                : commercialTerms.currencyCode
                        }
                    />

                    <CommercialCard
                        label="Payment Terms"
                        value={commercialTerms.paymentTerms}
                    />

                    <CommercialCard
                        label="Advance Required"
                        value={commercialTerms.advanceRequired}
                    />

                    <CommercialCard
                        label="Payable Outstanding"
                        value={formatCurrency(
                            commercialTerms.accountsPayable,
                            commercialTerms.currencyCode
                        )}
                    />

                </div>

            </section>


            {/* =========================================
                NOTE
            ========================================= */}

            <section className="bg-white rounded-[12px] border border-blue-50 shadow-sm p-5">

                <div className="text-[11px] text-gray-400 leading-relaxed">
                    Commercial values displayed above are read from
                    the Vendor master record and current payable
                    information. Rate contracts, escalation clauses
                    or other procurement-specific agreements should
                    be added here when those fields/entities are
                    introduced in the backend.
                </div>

            </section>

        </div>
    );
};


// =====================================================
// COMMERCIAL CARD
// =====================================================

const CommercialCard = ({
    label,
    value
}) => {

    return (

        <div className="bg-[#f9fafb] rounded-[12px] border border-gray-100 p-4">

            <div className="text-[11px] text-gray-500 font-medium">
                {label}
            </div>

            <div className="mt-1 text-[15px] font-bold text-[#1a233a]">
                {value || '-'}
            </div>

        </div>
    );
};


// =====================================================
// CURRENCY
// =====================================================

function formatCurrency(
    value,
    currencyCode = 'INR'
) {

    const amount =
        Number(value || 0);


    if (currencyCode === 'INR') {
        return `₹${amount.toLocaleString('en-IN')}`;
    }


    if (!currencyCode) {
        return `₹${amount.toLocaleString('en-IN')}`;
    }


    return new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            currency: currencyCode
        }
    ).format(amount);
}


export default VendorCommercialTerms;