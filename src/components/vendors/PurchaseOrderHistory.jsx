import React, { useMemo, useState } from 'react';

import {
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';


/*
 * =====================================================
 * PURCHASE ORDER HISTORY
 * =====================================================
 *
 * Customer equivalent:
 *   OrderHistory.jsx
 *
 * Vendor-specific change:
 *   Customer Sales Orders -> Vendor Purchase Orders
 *
 * Backend source:
 *   purchase_order
 *   purchase_order_item
 *
 * Current backend response fields:
 *   purchase_order_id
 *   po_number
 *   po_date
 *   material_description
 *   quantity
 *   unit
 *   value
 *   delivery_status
 *   qc_status
 *
 * The component keeps search + pagination behaviour similar
 * to the Customer OrderHistory tab.
 */

const PurchaseOrderHistory = ({
    orders = [],
    pagination,
    onPageChange,
    onSearch
}) => {

    const [searchQuery, setSearchQuery] =
        useState('');

    // -------------------------------------------------
    // The current vendor backend returns the complete PO
    // history. We therefore maintain a local filtered list.
    //
    // If the backend is later changed to return pagination,
    // onPageChange can be used by the parent without changing
    // the table itself.
    // -------------------------------------------------

    const filteredOrders =
        useMemo(() => {

            const query =
                searchQuery.trim().toLowerCase();

            if (!query) {
                return orders;
            }

            return orders.filter(
                order => {

                    return [
                        order.poNumber,
                        order.po_number,
                        order.materialDescription,
                        order.material_description,
                        order.deliveryStatus,
                        order.delivery_status,
                        order.qcStatus,
                        order.qc_status
                    ]
                        .filter(Boolean)
                        .join(' ')
                        .toLowerCase()
                        .includes(query);
                }
            );

        }, [
            orders,
            searchQuery
        ]);


    const handleSearch = (value) => {

        setSearchQuery(value);

        // Notify parent when it provides an API-backed search.
        if (onSearch) {
            onSearch(value);
        }
    };


    return (

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-2.5">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                <div>

                    <h3 className="text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]">
                        Purchase Order History
                    </h3>

                    <div className="text-[10px] text-gray-400 mt-0.5">
                        Purchase orders placed with this vendor
                    </div>

                </div>


                {/* -----------------------------------------
                    Search
                ----------------------------------------- */}

                <div className="relative">

                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                        placeholder="Search PO or material..."
                        className="w-full md:w-72 pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-[12px] outline-none focus:border-[#b82db8]"
                    />

                </div>

            </div>


            {/* =========================================
                TABLE
            ========================================= */}

            <div className="overflow-x-auto mt-4">

                <table className="w-full text-[12px] text-left">

                    <thead>

                        <tr className="text-gray-500 font-medium border-y border-gray-100 bg-[#f9fafb]">

                            <th className="py-2.5 px-3">
                                PO No.
                            </th>

                            <th className="py-2.5 px-3">
                                Date
                            </th>

                            <th className="py-2.5 px-3">
                                Material
                            </th>

                            <th className="py-2.5 px-3">
                                Quantity
                            </th>

                            <th className="py-2.5 px-3">
                                Value
                            </th>

                            <th className="py-2.5 px-3">
                                Delivery Status
                            </th>

                            <th className="py-2.5 px-3">
                                QC Status
                            </th>

                        </tr>

                    </thead>


                    <tbody className="text-[#1a233a]">

                        {filteredOrders.length > 0 ? (

                            filteredOrders.map(
                                (order, index) => {

                                    const poNumber =
                                        order.poNumber ||
                                        order.po_number;

                                    const poDate =
                                        order.poDate ||
                                        order.po_date;

                                    const material =
                                        order.materialDescription ||
                                        order.material_description;

                                    const quantity =
                                        order.quantity;

                                    const unit =
                                        order.unit;

                                    const value =
                                        order.value;

                                    const deliveryStatus =
                                        order.deliveryStatus ||
                                        order.delivery_status ||
                                        'Pending';

                                    const qcStatus =
                                        order.qcStatus ||
                                        order.qc_status ||
                                        'Under Evaluation';


                                    return (

                                        <tr
                                            key={
                                                order.purchaseOrderId ||
                                                order.purchase_order_id ||
                                                `${poNumber}-${index}`
                                            }
                                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                        >

                                            <td className="py-2.5 px-3 font-bold text-[#2563eb]">
                                                {poNumber || '-'}
                                            </td>

                                            <td className="py-2.5 px-3 text-gray-600">
                                                {formatDate(poDate)}
                                            </td>

                                            <td className="py-2.5 px-3">
                                                {material || '-'}
                                            </td>

                                            <td className="py-2.5 px-3 font-medium">
                                                {quantity !== undefined &&
                                                quantity !== null
                                                    ? Number(
                                                        quantity
                                                    ).toLocaleString(
                                                        'en-IN'
                                                    )
                                                    : '-'}
                                                {unit ? ` ${unit}` : ''}
                                            </td>

                                            <td className="py-2.5 px-3 font-bold">
                                                {formatCurrency(value)}
                                            </td>

                                            <td className="py-2.5 px-3">
                                                <StatusBadge
                                                    status={
                                                        deliveryStatus
                                                    }
                                                    type="delivery"
                                                />
                                            </td>

                                            <td className="py-2.5 px-3">
                                                <StatusBadge
                                                    status={
                                                        qcStatus
                                                    }
                                                    type="qc"
                                                />
                                            </td>

                                        </tr>
                                    );
                                }
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="py-10 text-center text-[12px] text-gray-400"
                                >
                                    No purchase orders found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =========================================
                PAGINATION
            ========================================= */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t border-gray-100 mt-2 pt-3 text-[11px] text-gray-500">

                <span>
                    Showing {filteredOrders.length} purchase order item(s)
                </span>


                {pagination && pagination.totalPages > 1 && (

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            disabled={
                                !pagination.page ||
                                pagination.page <= 1
                            }
                            onClick={() =>
                                onPageChange &&
                                onPageChange(
                                    pagination.page - 1
                                )
                            }
                            className="p-1.5 border border-gray-200 rounded-md disabled:opacity-40"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-2.5 py-1 border border-gray-200 rounded-md font-medium">
                            Page {pagination.page} of {pagination.totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={
                                pagination.page >=
                                pagination.totalPages
                            }
                            onClick={() =>
                                onPageChange &&
                                onPageChange(
                                    pagination.page + 1
                                )
                            }
                            className="p-1.5 border border-gray-200 rounded-md disabled:opacity-40"
                        >
                            <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
};


// =====================================================
// STATUS BADGE
// =====================================================

const StatusBadge = ({
    status,
    type
}) => {

    const normalized =
        String(status || '')
            .toLowerCase();


    let classes =
        'bg-amber-50 text-amber-700 border-amber-100';


    if (
        normalized.includes('complete') ||
        normalized.includes('deliver') ||
        normalized === 'passed' ||
        normalized === 'approved'
    ) {

        classes =
            'bg-green-50 text-green-700 border-green-100';
    }


    if (
        normalized.includes('reject') ||
        normalized.includes('cancel')
    ) {

        classes =
            'bg-red-50 text-red-700 border-red-100';
    }


    return (

        <span
            className={`inline-flex px-2.5 py-1 rounded-full border text-[10px] font-bold ${classes}`}
        >
            {status || '-'}
        </span>
    );
};


// =====================================================
// DATE
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


// =====================================================
// CURRENCY
// =====================================================

function formatCurrency(value) {

    return `₹${Number(
        value || 0
    ).toLocaleString('en-IN')}`;
}


export default PurchaseOrderHistory;