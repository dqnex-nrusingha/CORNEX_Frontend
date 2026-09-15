import React, {
    useEffect,
    useState
} from 'react';

import {
    useNavigate,
    useParams
} from 'react-router-dom';

import {
    ChevronDown,
    Plus,
    MoreHorizontal,
    Search
} from 'lucide-react';


// =====================================================
// COMPONENTS
// =====================================================

import VendorHeader
    from "../../components/vendors/VendorHeader";

import VendorSummary
    from "../../components/vendors/VendorSummary";

import VendorOverview
    from "../../components/vendors/VendorOverview";

import VendorCommercialTerms
    from "../../components/vendors/VendorCommercialTerms";

import ReelSpecifications
    from "../../components/vendors/ReelSpecifications";

import PurchaseOrderHistory
    from "../../components/vendors/PurchaseOrderHistory";


// =====================================================
// SERVICES
// =====================================================

import {
    getVendorDetails,
    getVendorReelSpecifications,
    getVendorOrderHistory
} from "../../services/vendors/vendorDetailsApi";

import {
    getVendors
} from "../../services/vendors/vendorlistApi";


/*
 * =====================================================
 * VENDOR DETAILS PAGE
 * =====================================================
 *
 * This page intentionally follows the same page architecture
 * as CustomerDetailsPage.jsx.
 *
 * Layout:
 *
 *   LEFT
 *     Vendor list / search
 *
 *   RIGHT
 *     VendorHeader
 *     VendorSummary
 *     Tabs
 *       - Overview
 *       - Commercial Terms
 *       - Reel Specifications
 *       - Purchase Order History
 *
 * Important Vendor-specific mapping:
 *
 *   Customer -> Vendor
 *   Box Specifications -> Reel Specifications
 *   Order History -> Purchase Order History
 *
 * The Vendor backend returns the vendor master together with
 * addresses, contacts, banks, documents, reel specifications,
 * purchase-order history and summary.
 */

const VendorDetailsPage = () => {

    const navigate =
        useNavigate();


    const {
        vendorId
    } = useParams();


    // =================================================
    // SIDEBAR VENDOR LIST
    // =================================================

    const [
        vendors,
        setVendors
    ] = useState([]);


    const [
        vendorSearch,
        setVendorSearch
    ] = useState('');


    const [
        loadingVendors,
        setLoadingVendors
    ] = useState(false);


    // =================================================
    // ACTIVE TAB
    // =================================================

    const [
        activeTab,
        setActiveTab
    ] = useState('Overview');


    // =================================================
    // VENDOR
    // =================================================

    const [
        vendor,
        setVendor
    ] = useState(null);


    // =================================================
    // SUMMARY
    // =================================================

    const [
        summary,
        setSummary
    ] = useState(null);


    // =================================================
    // OVERVIEW DATA
    // =================================================

    const [
        addresses,
        setAddresses
    ] = useState({
        billing: null,
        shipping: null
    });


    const [
        contacts,
        setContacts
    ] = useState([]);


    const [
        bankDetails,
        setBankDetails
    ] = useState([]);


    // =================================================
    // COMMERCIAL TERMS
    // =================================================

    const [
        commercialTerms,
        setCommercialTerms
    ] = useState(null);


    // =================================================
    // REEL SPECIFICATIONS
    // =================================================

    const [
        reelSpecifications,
        setReelSpecifications
    ] = useState([]);


    // =================================================
    // PURCHASE ORDER HISTORY
    // =================================================

    const [
        purchaseOrderHistory,
        setPurchaseOrderHistory
    ] = useState([]);


    const [
        purchaseOrderPagination,
        setPurchaseOrderPagination
    ] = useState(null);


    const [
        purchaseOrderSearch,
        setPurchaseOrderSearch
    ] = useState('');


    // =================================================
    // LOADING
    // =================================================

    const [
        loadingVendor,
        setLoadingVendor
    ] = useState(true);


    const [
        loadingTab,
        setLoadingTab
    ] = useState(false);


    const [
        error,
        setError
    ] = useState(null);


    // =================================================
    // LOAD VENDOR LIST FOR SIDEBAR
    // =================================================

    useEffect(() => {

        const loadVendors =
            async () => {

                try {

                    setLoadingVendors(
                        true
                    );


                    const result =
                        await getVendors({
                            page: 1,
                            limit: 50,
                            search: vendorSearch
                        });


                    const data =
                        result.data || [];


                    const vendorRows =
                        Array.isArray(data)
                            ? data
                            : (
                                data.vendors ||
                                data.rows ||
                                []
                            );


                    setVendors(
                        vendorRows
                    );

                } catch (err) {

                    console.error(
                        'Vendor list error:',
                        err
                    );

                } finally {

                    setLoadingVendors(
                        false
                    );
                }
            };


        loadVendors();

    }, [
        vendorSearch
    ]);


    // =================================================
    // LOAD VENDOR DETAILS
    // =================================================

    useEffect(() => {

        if (!vendorId) {

            console.log(
                'No vendorId found'
            );

            return;
        }


        const loadVendor =
            async () => {

                try {

                    setLoadingVendor(
                        true
                    );

                    setError(null);


                    const result =
                        await getVendorDetails(
                            vendorId
                        );


                    const data =
                        result.data || {};


                    /*
                    * =====================================================
                    * EXTRACT VENDOR MASTER
                    * =====================================================
                    *
                    * The Vendor API may return the vendor master inside
                    * `data.vendor`.
                    *
                    * Example:
                    *
                    * {
                    *     vendor: {
                    *         vendorId: 22,
                    *         vendorCode: "VEND-000008",
                    *         vendorType: "Regular",
                    *         displayName: "Tiwari Pvt Ltd",
                    *         ...
                    *     },
                    *     summary: {},
                    *     addresses: [],
                    *     contacts: [],
                    *     banks: []
                    * }
                    *
                    * If the backend returns the vendor fields directly,
                    * `data` itself is used.
                    */

                    const vendorData =
                        data.vendor || data;


                    /*
                    * Normalize ONLY the vendor master object.
                    */

                    setVendor(
                        normalizeVendor(
                            vendorData
                        )
                    );


                    /*
                    * Summary remains at the response level.
                    */

                    setSummary(
                        normalizeSummary(
                            data.summary
                        )
                    );


                    setAddresses(
                        normalizeAddresses(
                            data.addresses
                        )
                    );


                    setContacts(
                        normalizeContacts(
                            data.contacts
                        )
                    );


                    setBankDetails(
                        normalizeBanks(
                            data.banks
                        )
                    );


                    setReelSpecifications(
                        Array.isArray(
                            data.reel_specifications
                        )
                            ? data.reel_specifications
                            : []
                    );


                    setPurchaseOrderHistory(
                        Array.isArray(
                            data.order_history
                        )
                            ? data.order_history
                            : []
                    );


                    /*
                     * Commercial terms are currently stored
                     * directly on the Vendor master record.
                     */
                    setCommercialTerms(
                        buildCommercialTerms(
                            data
                        )
                    );


                    /*
                     * The current backend order-history endpoint
                     * does not return pagination. We still keep
                     * the state so the component remains compatible
                     * if server-side pagination is introduced later.
                     */
                    setPurchaseOrderPagination(
                        null
                    );

                } catch (err) {

                    console.error(
                        'Vendor details error:',
                        err
                    );


                    setError(
                        err.message ||
                        'Failed to load vendor details'
                    );

                } finally {

                    setLoadingVendor(
                        false
                    );
                }
            };


        loadVendor();

    }, [
        vendorId
    ]);


    // =================================================
    // LOAD TAB DATA
    // =================================================
    //
    // Reel specification and PO history are already returned
    // by getVendorDetails(). The tab loader therefore only
    // refreshes those collections when a tab is opened.
    //
    // This preserves the Customer page's lazy-tab structure
    // without requiring unsupported backend endpoints.

    useEffect(() => {

        if (
            !vendorId ||
            activeTab === 'Overview' ||
            activeTab === 'Commercial Terms'
        ) {

            return;
        }


        const loadTab =
            async () => {

                try {

                    setLoadingTab(
                        true
                    );


                    // =========================================
                    // REEL SPECIFICATIONS
                    // =========================================

                    if (
                        activeTab === 'Reel Specifications'
                    ) {

                        const result =
                            await getVendorReelSpecifications(
                                vendorId
                            );


                        setReelSpecifications(
                            result.data || []
                        );
                    }


                    // =========================================
                    // PURCHASE ORDER HISTORY
                    // =========================================

                    if (
                        activeTab === 'Purchase Order History'
                    ) {

                        await loadPurchaseOrders(
                            purchaseOrderSearch
                        );
                    }

                } catch (err) {

                    console.error(
                        'Vendor tab data error:',
                        err
                    );


                    setError(
                        err.message ||
                        'Failed to load vendor tab data'
                    );

                } finally {

                    setLoadingTab(
                        false
                    );
                }
            };


        loadTab();

    }, [
        activeTab,
        vendorId
    ]);


    // =================================================
    // PURCHASE ORDER HISTORY API
    // =================================================

    const loadPurchaseOrders =
        async (
            search = ''
        ) => {

            try {

                setLoadingTab(
                    true
                );


                const result =
                    await getVendorOrderHistory(
                        vendorId,
                        {
                            search
                        }
                    );


                setPurchaseOrderHistory(
                    result.data || []
                );


                /*
                 * Current backend does not provide pagination.
                 * Keep null instead of inventing page totals.
                 */
                setPurchaseOrderPagination(
                    result.pagination || null
                );

            } catch (err) {

                console.error(
                    'Purchase order history error:',
                    err
                );


                setError(
                    err.message ||
                    'Failed to load purchase order history'
                );

            } finally {

                setLoadingTab(
                    false
                );
            }
        };


    // =================================================
    // PURCHASE ORDER SEARCH
    // =================================================

    const handlePurchaseOrderSearch =
        (search) => {

            setPurchaseOrderSearch(
                search
            );


            loadPurchaseOrders(
                search
            );
        };


    // =================================================
    // PURCHASE ORDER PAGE
    // =================================================

    const handlePurchaseOrderPageChange =
        (page) => {

            /*
             * The current Vendor backend does not expose
             * server-side pagination, so this handler is
             * intentionally guarded.
             */
            if (
                purchaseOrderPagination &&
                purchaseOrderPagination.page
            ) {

                loadPurchaseOrders(
                    purchaseOrderSearch
                );
            }
        };


    // =================================================
    // LOADING SCREEN
    // =================================================

    if (loadingVendor) {

        return (

            <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

                <div className="text-[13px] text-gray-500">
                    Loading vendor details...
                </div>

            </div>
        );
    }


    // =================================================
    // ERROR SCREEN
    // =================================================

    if (error && !vendor) {

        return (

            <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

                <div className="text-[13px] text-red-500">
                    {error}
                </div>

            </div>
        );
    }


    // =================================================
    // VENDOR NOT FOUND
    // =================================================

    if (!vendor) {

        return (

            <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

                <div className="text-[13px] text-gray-500">
                    Vendor not found.
                </div>

            </div>
        );
    }


    return (

        <div className="flex-1 min-h-0 overflow-hidden bg-[#f4f7f9] p-1.5">

            <div className="flex h-full gap-1.5">

                {/* =================================================
                    LEFT SIDEBAR
                ================================================= */}

                <div className="w-[280px] shrink-0 bg-white border border-gray-100 rounded-[20px] shadow-sm overflow-hidden flex flex-col">

                    {/* -----------------------------------------
                        Sidebar Header
                    ----------------------------------------- */}

                    <div className="px-4 py-3 border-b border-gray-100">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center space-x-1">

                                <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
                                    All Vendor
                                </h2>

                                <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        '/vendors/new'
                                    )
                                }
                                className="w-8 h-8 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white rounded-full flex items-center justify-center shadow-sm"
                                title="Add Vendor"
                            >
                                <Plus className="w-4 h-4" />
                            </button>

                        </div>


                        {/* -----------------------------------------
                            Search
                        ----------------------------------------- */}

                        <div className="relative mt-3">

                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

                            <input
                                type="text"
                                value={vendorSearch}
                                onChange={(e) =>
                                    setVendorSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search vendor..."
                                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[11px] outline-none focus:border-[#b82db8]"
                            />

                        </div>

                    </div>


                    {/* -----------------------------------------
                        Vendor List
                    ----------------------------------------- */}

                    <div className="flex-1 overflow-y-auto p-2">

                        {loadingVendors ? (

                            <div className="py-8 text-center text-[11px] text-gray-400">
                                Loading vendors...
                            </div>

                        ) : vendors.length === 0 ? (

                            <div className="py-8 text-center text-[11px] text-gray-400">
                                No vendors found.
                            </div>

                        ) : (

                            vendors.map(
                                item => {

                                    const itemId =
                                        item.vendorId ||
                                        item.vendor_id;

                                    const isSelected =
                                        String(itemId) ===
                                        String(vendorId);


                                    return (

                                        <button
                                            key={itemId}
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/vendors/${itemId}`
                                                )
                                            }
                                            className={`
                                                w-full text-left rounded-[14px] border p-3 mb-2 transition-all
                                                ${
                                                    isSelected
                                                        ? 'bg-gradient-to-br from-[#fff7f3] via-[#faf1fb] to-[#f3efff] border-[#ead8f4]'
                                                        : 'bg-white border-gray-100 hover:bg-gray-50'
                                                }
                                            `}
                                        >

                                            {/* Vendor Code + Date */}

                                            <div className="flex justify-between items-center mb-0.5">

                                                <span className="text-[12px] font-medium text-[#374151]">
                                                    {
                                                        item.vendorCode ||
                                                        item.vendor_code ||
                                                        '-'
                                                    }
                                                </span>

                                                <span className="text-[9px] text-gray-400 font-medium tracking-wide">
                                                    {formatDate(
                                                        item.createdAt ||
                                                        item.created_at
                                                    )}
                                                </span>

                                            </div>


                                            {/* Vendor Name */}

                                            <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                                                {
                                                    item.displayName ||
                                                    item.display_name ||
                                                    '-'
                                                }
                                            </h3>


                                            {/* Payable */}

                                            <div className="text-right">

                                                <span className="text-[14px] font-bold text-[#111827]">
                                                    {formatCurrency(
                                                        item.accountsPayable ??
                                                        item.accounts_payable ??
                                                        item.openingBalance ??
                                                        item.opening_balance ??
                                                        0
                                                    )}
                                                </span>

                                            </div>

                                        </button>
                                    );
                                }
                            )

                        )}

                    </div>

                </div>


                {/* =================================================
                    RIGHT AREA
                ================================================= */}

                <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">

                    {/* -----------------------------------------
                        HEADER
                    ----------------------------------------- */}

                    <VendorHeader
                        vendor={vendor}
                    />


                    {/* -----------------------------------------
                        SUMMARY
                    ----------------------------------------- */}

                    <VendorSummary
                        summary={summary}
                        currencyCode={
                            vendor?.currency ||
                            'INR'
                        }
                    />


                    {/* =================================================
                        MAIN CONTENT
                    ================================================= */}

                    <div className="bg-white flex-1 flex flex-col overflow-hidden border border-gray-100 rounded-[20px] shadow-sm">

                        {/* =============================================
                            TABS
                        ============================================= */}

                        <div className="flex gap-6 px-3 lg:px-4 pt-3 shrink-0 border-b border-gray-100">

                            {[
                                'Overview',
                                'Commercial Terms',
                                'Reel Specifications',
                                'Purchase Order History'
                            ].map(tab => (

                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() =>
                                        setActiveTab(
                                            tab
                                        )
                                    }
                                    className={`
                                        relative pb-3 text-[13px] transition-colors
                                        ${
                                            activeTab === tab
                                                ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]'
                                                : 'font-semibold text-gray-500 hover:text-gray-700'
                                        }
                                    `}
                                >

                                    {tab}


                                    {activeTab === tab && (

                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]"></div>

                                    )}

                                </button>
                            ))}

                        </div>


                        {/* =============================================
                            TAB CONTENT
                        ============================================= */}

                        <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-[#f8fafc] rounded-b-[20px]">

                            {/* =========================================
                                OVERVIEW
                            ========================================= */}

                            {activeTab === 'Overview' && (

                                <VendorOverview
                                    vendor={vendor}
                                    billingAddress={
                                        addresses.billing
                                    }
                                    shippingAddress={
                                        addresses.shipping
                                    }
                                    contacts={contacts}
                                    bankDetails={bankDetails}
                                    onEdit={() =>
                                        console.log(
                                            'Edit vendor:',
                                            vendorId
                                        )
                                    }
                                />

                            )}


                            {/* =========================================
                                COMMERCIAL TERMS
                            ========================================= */}

                            {activeTab === 'Commercial Terms' && (

                                loadingTab &&
                                !commercialTerms
                                    ? (
                                        <LoadingTab />
                                    )
                                    : (
                                        <VendorCommercialTerms
                                            commercialTerms={
                                                commercialTerms
                                            }
                                        />
                                    )

                            )}


                            {/* =========================================
                                REEL SPECIFICATIONS
                            ========================================= */}

                            {activeTab === 'Reel Specifications' && (

                                loadingTab &&
                                reelSpecifications.length === 0
                                    ? (
                                        <LoadingTab />
                                    )
                                    : (
                                        <ReelSpecifications
                                            specifications={
                                                reelSpecifications
                                            }
                                        />
                                    )

                            )}


                            {/* =========================================
                                PURCHASE ORDER HISTORY
                            ========================================= */}

                            {activeTab === 'Purchase Order History' && (

                                loadingTab &&
                                purchaseOrderHistory.length === 0
                                    ? (
                                        <LoadingTab />
                                    )
                                    : (
                                        <PurchaseOrderHistory
                                            orders={
                                                purchaseOrderHistory
                                            }
                                            pagination={
                                                purchaseOrderPagination
                                            }
                                            onPageChange={
                                                handlePurchaseOrderPageChange
                                            }
                                            onSearch={
                                                handlePurchaseOrderSearch
                                            }
                                        />
                                    )

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};


// =====================================================
// NORMALIZE VENDOR
// =====================================================
//
// Converts the Vendor API response into the exact
// camelCase structure expected by the Vendor components.
//
// IMPORTANT:
// Backend getVendorById() returns:
//
//   vendorId
//   vendorCode
//   vendorType
//   primaryContactPrefix
//   primaryContactFirstName
//   primaryContactLastName
//   displayName
//   companyName
//   vendorLanguage
//   email
//   primaryPhone
//   secondaryPhone
//   pan
//   gstin
//   msme
//   currencyCode
//   openingBalance
//   accountsPayable
//   paymentTerms
//   advanceRequired
//   status
//
// The UI should consume these exact names.
// =====================================================

function normalizeVendor(data = {}) {

    return {

        ...data,

        // -------------------------------------------------
        // IDENTITY
        // -------------------------------------------------

        vendorId:
            data.vendorId ??
            data.vendor_id,

        vendorCode:
            data.vendorCode ??
            data.vendor_code,

        vendorType:
            data.vendorType ??
            data.vendor_type,

        displayName:
            data.displayName ??
            data.display_name,

        companyName:
            data.companyName ??
            data.company_name,

        vendorLanguage:
            data.vendorLanguage ??
            data.vendor_language,


        // -------------------------------------------------
        // PRIMARY CONTACT
        // -------------------------------------------------

        primaryContactPrefix:
            data.primaryContactPrefix ??
            data.primarySalutation ??
            data.primary_salutation,

        primaryContactFirstName:
            data.primaryContactFirstName ??
            data.primaryFirstName ??
            data.primary_first_name,

        primaryContactLastName:
            data.primaryContactLastName ??
            data.primaryLastName ??
            data.primary_last_name,


        // -------------------------------------------------
        // CONTACT INFORMATION
        // -------------------------------------------------

        email:
            data.email ??
            data.emailAddress,

        primaryPhone:
            data.primaryPhone ??
            data.primaryNumber ??
            data.primary_number,

        secondaryPhone:
            data.secondaryPhone ??
            data.secondaryNumber ??
            data.secondary_number,


        // -------------------------------------------------
        // TAX / REGISTRATION
        // -------------------------------------------------

        pan:
            data.pan,

        gstin:
            data.gstin,

        msme:
            data.msme,


        // -------------------------------------------------
        // COMMERCIAL
        // -------------------------------------------------

        currencyCode:
            data.currencyCode ??
            data.currency ??
            data.currency_code,

        // Keep currency as an alias because
        // some existing Vendor components use it.
        currency:
            data.currency ??
            data.currencyCode ??
            data.currency_code,

        openingBalance:
            data.openingBalance ??
            data.opening_balance ??
            0,

        accountsPayable:
            data.accountsPayable ??
            data.accounts_payable ??
            0,

        paymentTerms:
            data.paymentTerms ??
            data.payment_terms,

        advanceRequired:
            data.advanceRequired ??
            data.advance_required,


        // -------------------------------------------------
        // STATUS / AUDIT
        // -------------------------------------------------

        status:
            data.status,

        createdAt:
            data.createdAt ??
            data.created_at,

        updatedAt:
            data.updatedAt ??
            data.updated_at
    };
}


// =====================================================
// NORMALIZE SUMMARY
// =====================================================
//
// Backend returns:
//
//   lifetimeOrders
//   lifetimeValue
//   outstandingBalance
//   activeOrders
//   onTimeDeliveryPercentage
//
// VendorSummary.jsx consumes the same names.
// =====================================================

function normalizeSummary(summary = {}) {

    return {

        lifetimeOrders:
            summary.lifetimeOrders ??
            summary.totalOrders ??
            summary.total_orders ??
            0,

        lifetimeValue:
            summary.lifetimeValue ??
            summary.totalPurchaseValue ??
            summary.total_purchase_value ??
            0,

        outstandingBalance:
            summary.outstandingBalance ??
            summary.outstandingValue ??
            summary.outstanding_value ??
            0,

        activeOrders:
            summary.activeOrders ??
            summary.active_orders ??
            0,

        onTimeDeliveryPercentage:
            summary.onTimeDeliveryPercentage ??
            summary.onTimeDelivery ??
            summary.on_time_delivery ??
            0
    };
}

// =====================================================
// NORMALIZE ADDRESSES
// =====================================================
//
// Backend may return addresses in either of these forms:
//
// 1. OBJECT FORMAT
//
// {
//     billing: {...},
//     shipping: {...}
// }
//
// 2. ARRAY FORMAT
//
// [
//     {...},
//     {...}
// ]
//
// The VendorOverview component expects:
//
// {
//     billing: {...},
//     shipping: {...}
// }
//
// Therefore this function normalizes both formats into
// the same frontend structure.
// =====================================================

function normalizeAddresses(
    addressData = {}
) {

    // =================================================
    // STEP 1
    // HANDLE OBJECT RESPONSE
    // =================================================
    //
    // Current backend response:
    //
    //     {
    //         addresses: {
    //             billing: {...},
    //             shipping: {...}
    //         }
    //     }
    //
    // =================================================

    if (
        addressData &&
        !Array.isArray(addressData) &&
        typeof addressData === 'object'
    ) {

        const normalizeAddress =
            (address = null) => {

                if (!address) {
                    return null;
                }

                return {

                    addressId:
                        address.addressId ??
                        address.address_id,

                    vendorId:
                        address.vendorId ??
                        address.vendor_id,

                    addressType:
                        address.addressType ??
                        address.address_type,

                    contactName:
                        address.contactName ??
                        address.attention ??
                        address.contact_name,

                    addressLine1:
                        address.addressLine1 ??
                        address.street1 ??
                        address.address_line1,

                    addressLine2:
                        address.addressLine2 ??
                        address.street2 ??
                        address.address_line2,

                    city:
                        address.city,

                    state:
                        address.state,

                    country:
                        address.country,

                    pincode:
                        address.pincode ??
                        address.zipCode ??
                        address.zip_code,

                    phone:
                        address.phone,

                    fax:
                        address.fax,

                    createdAt:
                        address.createdAt ??
                        address.created_at
                };
            };


        return {

            billing:
                normalizeAddress(
                    addressData.billing
                ),

            shipping:
                normalizeAddress(
                    addressData.shipping
                )
        };
    }


    // =================================================
    // STEP 2
    // HANDLE ARRAY RESPONSE
    // =================================================
    //
    // This keeps the function compatible with an API
    // response such as:
    //
    // [
    //     {
    //         addressType: "Billing",
    //         ...
    //     },
    //     {
    //         addressType: "Shipping",
    //         ...
    //     }
    // ]
    //
    // =================================================

    if (Array.isArray(addressData)) {

        const normalized =
            addressData.map(address => ({

                addressId:
                    address.addressId ??
                    address.address_id,

                vendorId:
                    address.vendorId ??
                    address.vendor_id,

                addressType:
                    address.addressType ??
                    address.address_type,

                contactName:
                    address.contactName ??
                    address.attention ??
                    address.contact_name,

                addressLine1:
                    address.addressLine1 ??
                    address.street1 ??
                    address.address_line1,

                addressLine2:
                    address.addressLine2 ??
                    address.street2 ??
                    address.address_line2,

                city:
                    address.city,

                state:
                    address.state,

                country:
                    address.country,

                pincode:
                    address.pincode ??
                    address.zipCode ??
                    address.zip_code,

                phone:
                    address.phone,

                fax:
                    address.fax,

                createdAt:
                    address.createdAt ??
                    address.created_at

            }));


        return {

            billing:
                normalized.find(
                    address =>
                        String(
                            address.addressType || ''
                        ).toLowerCase() ===
                        'billing'
                ) || null,

            shipping:
                normalized.find(
                    address =>
                        String(
                            address.addressType || ''
                        ).toLowerCase() ===
                        'shipping'
                ) || null
        };
    }


    // =================================================
    // STEP 3
    // NO ADDRESS DATA
    // =================================================

    return {
        billing: null,
        shipping: null
    };
}

// =====================================================
// NORMALIZE CONTACTS
// =====================================================

function normalizeContacts(
    rows = []
) {

    return (
        Array.isArray(rows)
            ? rows
            : []
    ).map(contact => ({

        contactId:
            contact.contactId ??
            contact.contact_id,

        firstName:
            contact.firstName ??
            contact.first_name,

        lastName:
            contact.lastName ??
            contact.last_name,

        designation:
            contact.designation,

        department:
            contact.department,

        phone:
            contact.phone ??
            contact.mobileNumber,

        email:
            contact.email ??
            contact.emailAddress,

        isPrimary:
            contact.isPrimary ??
            contact.is_primary
    }));
}

// =====================================================
// NORMALIZE BANKS
// =====================================================

function normalizeBanks(
    rows = []
) {

    return (
        Array.isArray(rows)
            ? rows
            : []
    ).map(bank => ({

        bankId:
            bank.bankId ??
            bank.bank_id,

        bankName:
            bank.bankName ??
            bank.bank_name,

        accountHolderName:
            bank.accountHolderName ??
            bank.accountHolder ??
            bank.account_holder_name,

        accountNumber:
            bank.accountNumber ??
            bank.account_number,

        ifscCode:
            bank.ifscCode ??
            bank.ifsc_code,

        openDate:
            bank.openDate ??
            bank.open_date,

        isPrimary:
            bank.isPrimary ??
            bank.is_primary
    }));
}


// =====================================================
// COMMERCIAL TERMS BUILDER
// =====================================================

function buildCommercialTerms(data = {}) {

    const currencyCode =
        data.currencyCode ??
        data.currency ??
        data.currency_code ??
        'INR';

    return {

        currencyCode,

        // Keep currency for backward compatibility
        // with any existing component.
        currency: currencyCode,

        openingBalance:
            data.openingBalance ??
            data.opening_balance ??
            0,

        accountsPayable:
            data.accountsPayable ??
            data.accounts_payable ??
            0,

        paymentTerms:
            data.paymentTerms ??
            data.payment_terms,

        advanceRequired:
            data.advanceRequired ??
            data.advance_required
    };
}


// =====================================================
// COMMON HELPERS
// =====================================================

function formatCurrency(
    value
) {

    return `₹${Number(
        value || 0
    ).toLocaleString('en-IN')}`;
}


function formatDate(
    value
) {

    if (!value) {
        return '-';
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

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
// LOADING TAB
// =====================================================

const LoadingTab = () => {

    return (

        <div className="bg-white rounded-[12px] border border-gray-100 p-10 text-center">

            <div className="text-[12px] text-gray-400">
                Loading...
            </div>

        </div>
    );
};


export default VendorDetailsPage;
