const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api/v1';


// =====================================================
// GET VENDORS
// =====================================================
//
// Fetches the Vendor master list.
//
// Backend endpoint:
//
// GET /api/v1/vendors
//
// Supported query parameters:
//
//     page
//     limit
//     search
//     status
//     sortBy
//     sortOrder
//
// This is intentionally structured exactly like
// customerlistApi.js.
//
// Used by:
//
//     VendorsPage.jsx
//     VendorDetailsPage.jsx
// =====================================================

export const getVendors = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
} = {}) => {

    // -------------------------------------------------
    // Build query parameters.
    // -------------------------------------------------

    const params =
        new URLSearchParams();


    // -------------------------------------------------
    // Pagination
    // -------------------------------------------------

    params.append(
        'page',
        String(page)
    );

    params.append(
        'limit',
        String(limit)
    );


    // -------------------------------------------------
    // Search
    //
    // Only send search when the user has entered
    // something.
    // -------------------------------------------------

    if (
        search &&
        search.trim()
    ) {

        params.append(
            'search',
            search.trim()
        );
    }


    // -------------------------------------------------
    // Status
    //
    // Only send status when selected.
    // -------------------------------------------------

    if (status) {

        params.append(
            'status',
            status
        );
    }


    // -------------------------------------------------
    // Sorting
    // -------------------------------------------------

    params.append(
        'sortBy',
        sortBy
    );

    params.append(
        'sortOrder',
        sortOrder
    );


    // -------------------------------------------------
    // Call Vendor API
    // -------------------------------------------------

    const response =
        await fetch(
            `${API_BASE_URL}/vendors?${params.toString()}`,
            {
                method: 'GET',

                headers: {
                    'Content-Type':
                        'application/json'
                }
            }
        );


    // -------------------------------------------------
    // Read API response.
    // -------------------------------------------------

    const result =
        await response.json();


    // -------------------------------------------------
    // Handle API errors.
    // -------------------------------------------------

    if (!response.ok) {

        throw new Error(
            result.message ||
            'Failed to fetch vendors'
        );
    }


    // -------------------------------------------------
    // Return API response.
    // -------------------------------------------------

    return result;
};