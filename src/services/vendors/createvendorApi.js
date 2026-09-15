const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:3000/api/v1';


// =====================================================
// CREATE VENDOR
// =====================================================
//
// Creates a new Vendor master record.
//
// Backend endpoint:
//
// POST /api/v1/vendors
//
// The payload is prepared by CreateVendorPage.jsx.
//
// Expected payload structure:
//
// {
//     vendorType,
//     primaryContactPrefix,
//     primaryContactFirstName,
//     primaryContactLastName,
//     displayName,
//     companyName,
//     vendorLanguage,
//     emailAddress,
//     primaryNumber,
//     secondaryNumber,
//     pan,
//     gstin,
//     msme,
//     salesRegionId,
//     currencyCode,
//     openingBalance,
//     paymentTermsId,
//     billingAddress,
//     shippingAddress,
//     bankDetails,
//     contacts
// }
// =====================================================

export const createVendor = async (
    vendorData
) => {

    const response =
        await fetch(
            `${API_BASE_URL}/vendors`,
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body:
                    JSON.stringify(
                        vendorData
                    )
            }
        );


    // -------------------------------------------------
    // Convert API response into JSON.
    // -------------------------------------------------

    const result =
        await response.json();


    // -------------------------------------------------
    // Handle backend validation / server errors.
    // -------------------------------------------------

    if (!response.ok) {

        throw new Error(
            result.message ||
            'Failed to create vendor'
        );
    }


    // -------------------------------------------------
    // Return the complete backend response.
    // -------------------------------------------------

    return result;
};