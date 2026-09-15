import React from 'react';

/*
 * =====================================================
 * VENDOR SUMMARY
 * =====================================================
 *
 * This component intentionally follows the visual layout
 * of CustomerSummary.jsx.
 *
 * Vendor metrics are based on the Vendor/PO model:
 *
 *   - Total Purchase Orders
 *   - Lifetime Purchase Value
 *   - Outstanding Payable
 *   - Active Purchase Orders
 *   - On-Time Delivery
 *
 * The backend vendor summary currently provides:
 *   total_orders
 *   total_purchase_value
 *   outstanding_value
 *   on_time_delivery
 *   qc_rejection_rate
 */

const VendorSummary = ({
    summary,
    currencyCode = 'INR'
}) => {

    const data = summary || {};


    return (

        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">

            <div className="px-3 lg:px-4 p-3">

                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">

                    {/* =========================================
                        Total Purchase Orders
                    ========================================= */}

                    <SummaryCard
                        title="Total Purchase Orders"
                        value={
                            Number(
                                data.lifetimeOrders || 0
                            ).toLocaleString('en-IN')
                        }
                        subtitle="Purchase Orders Placed"
                    />


                    {/* =========================================
                        Lifetime Purchase Value
                    ========================================= */}

                    <SummaryCard
                        title="Lifetime Purchase Value"
                        value={formatCurrency(
                            data.lifetimeValue,
                            currencyCode
                        )}
                        subtitle="Total Purchase Value"
                    />


                    {/* =========================================
                        Outstanding Payable
                    ========================================= */}

                    <SummaryCard
                        title="Outstanding Payable"
                        value={formatCurrency(
                            data.outstandingBalance,
                            currencyCode
                        )}
                        subtitle="Amount Payable"
                    />


                    {/* =========================================
                        Active Purchase Orders
                    ========================================= */}

                    <SummaryCard
                        title="Active Purchase Orders"
                        value={
                            Number(
                                data.activeOrders || 0
                            ).toLocaleString('en-IN')
                        }
                        subtitle="Currently Active"
                    />


                    {/* =========================================
                        On-Time Delivery
                    ========================================= */}

                    <SummaryCard
                        title="On-Time Delivery"
                        value={`${Number(
                            data.onTimeDeliveryPercentage || 0
                        ).toFixed(1)}%`}
                        subtitle="Purchase Orders"
                    />

                </div>

            </div>

        </div>
    );
};


// =====================================================
// SUMMARY CARD
// =====================================================

const SummaryCard = ({
    title,
    value,
    subtitle,
    valueClass = 'text-[#111827]'
}) => {

    return (

        <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">

            <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">
                {title}
            </div>

            <div
                className={`text-[24px] font-bold leading-none ${valueClass}`}
            >
                {value}
            </div>

            <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">
                {subtitle}
            </div>

        </div>
    );
};


// =====================================================
// CURRENCY FORMATTER
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


    return new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            currency: currencyCode
        }
    ).format(amount);
}


export default VendorSummary;
