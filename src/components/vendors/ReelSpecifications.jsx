import React, {
    useEffect,
    useState
} from 'react';

import {
    Search,
    Info,
    MoreHorizontal
} from 'lucide-react';


/*
 * =====================================================
 * VENDOR REEL SPECIFICATIONS
 * =====================================================
 *
 * Displays reel specifications associated with the
 * selected vendor.
 *
 * IMPORTANT:
 *
 * The backend does NOT store vendor_id directly in
 * reel_specification.
 *
 * Vendor reel specifications are derived through:
 *
 * Vendor
 *    ↓
 * Purchase Order
 *    ↓
 * Purchase Order Item
 *    ↓
 * Reel Specification
 *
 *
 * Current API fields:
 *
 * reelId
 * reelCode
 * reelSpec
 * reelDescription
 * paperType
 * paperGsm
 * reelWidth
 * reelBf
 *
 * =====================================================
 */

const ReelSpecifications = ({
    specifications = []
}) => {

    const [
        searchQuery,
        setSearchQuery
    ] = useState('');


    const [
        filteredSpecifications,
        setFilteredSpecifications
    ] = useState([]);


    /*
     * =================================================
     * FILTER SPECIFICATIONS
     * =================================================
     */

    useEffect(() => {

        const query =
            searchQuery
                .trim()
                .toLowerCase();


        if (!query) {

            setFilteredSpecifications(
                specifications
            );

            return;
        }


        const filtered =
            specifications.filter(
                reel => {

                    return (

                        String(
                            reel.reelCode || ''
                        )
                            .toLowerCase()
                            .includes(query)

                        ||

                        String(
                            reel.reelSpec || ''
                        )
                            .toLowerCase()
                            .includes(query)

                        ||

                        String(
                            reel.reelDescription || ''
                        )
                            .toLowerCase()
                            .includes(query)

                        ||

                        String(
                            reel.paperType || ''
                        )
                            .toLowerCase()
                            .includes(query)

                    );
                }
            );


        setFilteredSpecifications(
            filtered
        );

    }, [
        specifications,
        searchQuery
    ]);


    /*
     * =================================================
     * FORMAT NUMBER
     * =================================================
     */

    const formatNumber =
        value => {

            if (
                value === null ||
                value === undefined ||
                value === ''
            ) {
                return '-';
            }


            const number =
                Number(value);


            if (
                Number.isNaN(number)
            ) {
                return value;
            }


            return number.toLocaleString(
                'en-IN',
                {
                    maximumFractionDigits: 2
                }
            );
        };


    return (

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center justify-between gap-4 mb-4">

                <div className="flex items-center gap-3">

                    {/* -----------------------------------------
                        Icon
                    ----------------------------------------- */}

                    <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center text-white font-bold">

                        R

                    </div>


                    {/* -----------------------------------------
                        Title
                    ----------------------------------------- */}

                    <div>

                        <div className="flex items-center gap-2">

                            <h3 className="text-[16px] font-bold text-[#1a233a]">

                                Reel Specifications

                            </h3>


                            <span className="text-[11px] text-gray-400">

                                {filteredSpecifications.length}

                                {' '}

                                Specification(s)

                            </span>

                        </div>


                        <div className="text-[10px] text-gray-400 mt-0.5">

                            Reel specifications used in purchase orders

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="relative w-[320px] max-w-full">

                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={
                            event =>
                                setSearchQuery(
                                    event.target.value
                                )
                        }
                        placeholder="Search reel code or specification..."
                        className="w-full h-10 pl-9 pr-3 rounded-[10px] border border-gray-200 text-[12px] outline-none focus:border-pink-300"
                    />

                </div>

            </div>


            {/* =================================================
                INFORMATION
            ================================================= */}

            <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-4">

                <Info size={14} />

                <span>
                    Reel width values are displayed in mm.
                </span>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-[#f9fafb]">

                            <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500">
                                Reel Code
                            </th>

                            <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500">
                                Reel Specification
                            </th>

                            <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500">
                                Description
                            </th>

                            <th className="text-left px-3 py-3 text-[11px] font-semibold text-gray-500">
                                Paper Type
                            </th>

                            <th className="text-right px-3 py-3 text-[11px] font-semibold text-gray-500">
                                GSM
                            </th>

                            <th className="text-right px-3 py-3 text-[11px] font-semibold text-gray-500">
                                Reel Width
                            </th>

                            <th className="text-right px-3 py-3 text-[11px] font-semibold text-gray-500">
                                BF
                            </th>

                            <th className="text-center px-3 py-3 text-[11px] font-semibold text-gray-500">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredSpecifications.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center py-12 text-[12px] text-gray-400"
                                >

                                    No reel specifications found.

                                </td>

                            </tr>

                        ) : (

                            filteredSpecifications.map(
                                (reel, index) => {

                                    /*
                                     * IMPORTANT:
                                     *
                                     * Do NOT use reelId alone as
                                     * the React key.
                                     *
                                     * The same reel_id can appear
                                     * in multiple PO items.
                                     *
                                     * Therefore use a composite key.
                                     */

                                    const rowKey =
                                        `${reel.reelId || 'reel'}-${reel.reelCode || ''}-${reel.reelSpec || ''}-${index}`;


                                    return (

                                        <tr
                                            key={rowKey}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >

                                            {/* =================================
                                                REEL CODE
                                            ================================= */}

                                            <td className="px-3 py-4">

                                                <div className="text-[12px] font-semibold text-[#1a233a]">

                                                    {reel.reelCode || '-'}

                                                </div>

                                            </td>


                                            {/* =================================
                                                REEL SPEC
                                            ================================= */}

                                            <td className="px-3 py-4">

                                                <div className="text-[12px] font-medium text-[#1a233a]">

                                                    {reel.reelSpec || '-'}

                                                </div>

                                            </td>


                                            {/* =================================
                                                DESCRIPTION
                                            ================================= */}

                                            <td className="px-3 py-4">

                                                <div className="text-[11px] text-gray-500 max-w-[220px]">

                                                    {reel.reelDescription || '-'}

                                                </div>

                                            </td>


                                            {/* =================================
                                                PAPER TYPE
                                            ================================= */}

                                            <td className="px-3 py-4">

                                                <div className="text-[12px] text-gray-700">

                                                    {reel.paperType || '-'}

                                                </div>

                                            </td>


                                            {/* =================================
                                                GSM
                                            ================================= */}

                                            <td className="px-3 py-4 text-right">

                                                <div className="text-[12px] font-semibold text-[#1a233a]">

                                                    {formatNumber(
                                                        reel.paperGsm
                                                    )}

                                                </div>

                                            </td>


                                            {/* =================================
                                                REEL WIDTH
                                            ================================= */}

                                            <td className="px-3 py-4 text-right">

                                                <div className="text-[12px] font-semibold text-[#1a233a]">

                                                    {formatNumber(
                                                        reel.reelWidth
                                                    )}

                                                    {reel.reelWidth !== null &&
                                                    reel.reelWidth !== undefined &&
                                                    reel.reelWidth !== ''
                                                        ? ' mm'
                                                        : ''}

                                                </div>

                                            </td>


                                            {/* =================================
                                                BF
                                            ================================= */}

                                            <td className="px-3 py-4 text-right">

                                                <div className="text-[12px] font-semibold text-[#1a233a]">

                                                    {formatNumber(
                                                        reel.reelBf
                                                    )}

                                                </div>

                                            </td>


                                            {/* =================================
                                                ACTION
                                            ================================= */}

                                            <td className="px-3 py-4 text-center">

                                                <button
                                                    type="button"
                                                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center mx-auto"
                                                >

                                                    <MoreHorizontal
                                                        size={16}
                                                        className="text-gray-400"
                                                    />

                                                </button>

                                            </td>

                                        </tr>

                                    );

                                }
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default ReelSpecifications;