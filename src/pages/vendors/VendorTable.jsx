import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';


const VendorTable = ({
  vendors,
  selectedIds,
  onToggleSelectAll,
  onToggleSelect,
  searchQuery
}) => {

  const navigate = useNavigate();


  // =====================================================
  // SELECT ALL STATE
  // =====================================================

  const allSelected =
    vendors.length > 0 &&
    selectedIds.length === vendors.length;


  return (

    <div className="flex-1 pb-8 w-full overflow-x-auto">

      <div className="w-full">

        <table className="w-full text-left border-collapse">


          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <thead>

            <tr className="bg-[#f4f6f8] border-b border-gray-200 text-sm">


              {/* CHECKBOX */}

              <th className="py-3 pl-6 pr-4 font-bold text-[#6b778c] w-16 text-center">

                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                />

              </th>


              {/* NAME */}

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Name
              </th>


              {/* GST */}

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                GST
              </th>


              {/* PRIMARY CONTACT */}

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Primary Contact
              </th>


              {/* COMPANY NAME */}

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Company Name
              </th>


              {/* EMAIL */}

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                E-Mail Address
              </th>


              {/* PHONE */}

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Phone No
              </th>


              {/* PAYABLE */}

              <th className="py-4 pr-6 pl-4 font-bold text-[#6b778c] whitespace-nowrap">
                Payables (BCY)
              </th>

            </tr>

          </thead>


          {/* =================================================
              TABLE BODY
          ================================================= */}

          <tbody>

            {vendors.length > 0 ? (

              vendors.map((vendor) => (

                <tr
                  key={vendor.vendorId}
                  onClick={() =>
                    navigate(
                      `/vendors/${vendor.vendorId}`
                    )
                  }
                  className={`
                    border-b border-gray-100
                    hover:bg-gray-50/50
                    transition-colors
                    text-[13px]
                    cursor-pointer
                    ${
                      selectedIds.includes(
                        vendor.vendorId
                      )
                        ? 'bg-blue-50/50'
                        : ''
                    }
                  `}
                >


                  {/* =================================================
                      CHECKBOX
                  ================================================= */}

                  <td
                    className="py-3 pl-6 pr-4 text-center"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      checked={selectedIds.includes(
                        vendor.vendorId
                      )}
                      onChange={() =>
                        onToggleSelect(
                          vendor.vendorId
                        )
                      }
                    />

                  </td>


                  {/* =================================================
                      NAME
                  ================================================= */}

                  <td className="py-4 px-4 text-blue-600 font-medium hover:underline whitespace-nowrap">

                    {vendor.displayName || '—'}

                  </td>


                  {/* =================================================
                      GST
                  ================================================= */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">

                    {vendor.gstin || '—'}

                  </td>


                  {/* =================================================
                      PRIMARY CONTACT
                  ================================================= */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">

                    {vendor.primaryContact || '—'}

                  </td>


                  {/* =================================================
                      COMPANY NAME
                  ================================================= */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">

                    {vendor.companyName || '—'}

                  </td>


                  {/* =================================================
                      EMAIL
                  ================================================= */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">

                    {vendor.email || '—'}

                  </td>


                  {/* =================================================
                      PHONE
                  ================================================= */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">

                    {vendor.phone || '—'}

                  </td>


                  {/* =================================================
                      PAYABLE
                  ================================================= */}

                  <td className="py-4 pr-6 pl-4 text-[#1a233a] font-medium whitespace-nowrap">

                    ₹
                    {Number(
                      vendor.payable ||
                      vendor.payables ||
                      0
                    ).toLocaleString(
                      'en-IN',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="py-8 text-center text-gray-500 text-[13px]"
                >

                  No vendors found{' '}

                  {searchQuery
                    ? `matching "${searchQuery}"`
                    : ''}

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};


export default VendorTable;