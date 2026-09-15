const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/v1";


// =====================================================
// COMMON API HANDLER
// =====================================================
//
// Keeps response/error handling consistent across all
// Vendor detail API calls.
// =====================================================

async function handleResponse(
    response,
    defaultMessage
) {

    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            defaultMessage
        );
    }


    return result;
}


// =====================================================
// GET VENDOR DETAILS
// =====================================================
//
// Returns the complete Vendor profile.
//
// Backend endpoint:
//
// GET /api/v1/vendors/:vendorId
//
// Expected response contains the Vendor master data
// together with related information such as:
//
//     vendor
//     addresses
//     contacts
//     banks
//     documents
//     reel_specifications
//     order_history
//     summary
//
// VendorDetailsPage.jsx uses this endpoint to populate
// the main Vendor profile.
// =====================================================

export async function getVendorDetails(
    vendorId
) {

    const response =
        await fetch(
            `${API_BASE_URL}/vendors/${vendorId}`
        );


    return handleResponse(
        response,
        "Failed to fetch vendor details"
    );
}


// =====================================================
// GET VENDOR REEL SPECIFICATIONS
// =====================================================
//
// Vendor equivalent of:
//
// GET /customers/:customerId/box-specifications
//
// Backend endpoint:
//
// GET /api/v1/vendors/:vendorId/reel-specifications
//
// Used by:
//
//     ReelSpecifications.jsx
//
// Expected data:
//
//     material_code
//     material_name
//     gsm_min
//     gsm_max
//     reel_width_min
//     reel_width_max
//     quality_score
//     status
// =====================================================

export async function getVendorReelSpecifications(
    vendorId,
    search = ''
) {

    const searchParams =
        new URLSearchParams();


    // -------------------------------------------------
    // Search is optional.
    // -------------------------------------------------

    if (
        search &&
        search.trim()
    ) {

        searchParams.append(
            'search',
            search.trim()
        );
    }


    const queryString =
        searchParams.toString();


    const url =
        `${API_BASE_URL}/vendors/${vendorId}/reel-specifications` +
        (
            queryString
                ? `?${queryString}`
                : ''
        );


    const response =
        await fetch(url);


    return handleResponse(
        response,
        "Failed to fetch reel specifications"
    );
}


// =====================================================
// GET VENDOR PURCHASE ORDER HISTORY
// =====================================================
//
// Vendor equivalent of:
//
// getCustomerOrderHistory()
//
// But instead of Sales Orders, this retrieves the
// Purchase Orders associated with the Vendor.
//
// Backend endpoint:
//
// GET /api/v1/vendors/:vendorId/order-history
//
// Supported query parameters:
//
//     search
//     page       - if/when backend pagination is enabled
//     limit      - if/when backend pagination is enabled
//     startDate
//     endDate
//
// Current Vendor backend returns PO history from:
//
//     purchase_order
//     purchase_order_item
//
// Used by:
//
//     PurchaseOrderHistory.jsx
// =====================================================

export async function getVendorOrderHistory(
    vendorId,
    params = {}
) {

    const searchParams =
        new URLSearchParams();


    // -------------------------------------------------
    // Pagination
    //
    // Keep these here so the frontend is ready if the
    // backend exposes pagination for Vendor PO history.
    // -------------------------------------------------

    if (params.page) {

        searchParams.append(
            'page',
            params.page
        );
    }


    if (params.limit) {

        searchParams.append(
            'limit',
            params.limit
        );
    }


    // -------------------------------------------------
    // Search
    // -------------------------------------------------

    if (
        params.search &&
        params.search.trim()
    ) {

        searchParams.append(
            'search',
            params.search.trim()
        );
    }


    // -------------------------------------------------
    // Date filters
    //
    // These are included to keep the service consistent
    // with Customer Order History.
    // -------------------------------------------------

    if (params.startDate) {

        searchParams.append(
            'startDate',
            params.startDate
        );
    }


    if (params.endDate) {

        searchParams.append(
            'endDate',
            params.endDate
        );
    }


    const queryString =
        searchParams.toString();


    const url =
        `${API_BASE_URL}/vendors/${vendorId}/order-history` +
        (
            queryString
                ? `?${queryString}`
                : ''
        );


    const response =
        await fetch(url);


    return handleResponse(
        response,
        "Failed to fetch purchase order history"
    );
}