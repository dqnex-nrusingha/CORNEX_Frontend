import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  ChevronDown,
  Plus,
  MoreHorizontal
} from 'lucide-react';

import VendorTable from './VendorTable';
import {
    getVendors
} from '../../services/vendors/vendorlistApi';


const VendorsPage = () => {

  const { searchQuery = '' } =
    useOutletContext() || {};


  // =====================================================
  // STATE
  // =====================================================

  const [vendors, setVendors] =
    useState([]);

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(10);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 10,
      totalRecords: 0,
      totalPages: 0
    });


  // =====================================================
  // FETCH VENDORS
  // =====================================================

  useEffect(() => {

    const fetchVendors = async () => {

      try {

        setIsLoading(true);
        setError('');


        const result =
          await getVendors({
            page,
            limit,
            search: searchQuery,
            status: '',
            sortBy: 'createdAt',
            sortOrder: 'desc'
          });


        // =================================================
        // SET VENDOR DATA
        // =================================================

        setVendors(
          result.data || []
        );


        // =================================================
        // SET PAGINATION
        // =================================================

        setPagination(
          result.pagination || {
            page,
            limit,
            totalRecords: 0,
            totalPages: 0
          }
        );


      } catch (error) {

        console.error(
          'Failed to fetch vendors:',
          error
        );


        setError(
          error.message ||
          'Failed to load vendors'
        );


        setVendors([]);

      } finally {

        setIsLoading(false);

      }

    };


    fetchVendors();

  }, [page, limit, searchQuery]);


  // =====================================================
  // RESET PAGE WHEN SEARCH CHANGES
  // =====================================================

  useEffect(() => {

    setPage(1);

  }, [searchQuery]);


  // =====================================================
  // SELECTION LOGIC
  // =====================================================

  const handleToggleSelectAll = () => {

    if (
      selectedIds.length === vendors.length &&
      vendors.length > 0
    ) {

      setSelectedIds([]);

    } else {

      setSelectedIds(
        vendors.map(
          vendor => vendor.vendorId
        )
      );

    }

  };


  const handleToggleSelect = (id) => {

    if (selectedIds.includes(id)) {

      setSelectedIds(
        selectedIds.filter(
          selectedId => selectedId !== id
        )
      );

    } else {

      setSelectedIds([
        ...selectedIds,
        id
      ]);

    }

  };


  // =====================================================
  // PAGINATION
  // =====================================================

  const handlePreviousPage = () => {

    if (page > 1) {

      setPage(page - 1);

    }

  };


  const handleNextPage = () => {

    if (
      page < pagination.totalPages
    ) {

      setPage(page + 1);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <main className="flex-1 overflow-y-auto bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5">


      {/* =================================================
          PAGE TOOLBAR
      ================================================= */}

      <div className="flex items-center justify-between px-8 py-3 bg-white border border-gray-200 rounded-xl shadow-sm shrink-0">


        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <div className="flex items-center space-x-1 cursor-pointer">

          <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">

            All Vendors

          </h2>


          <ChevronDown
            className="w-5 h-5 text-[#8b5cf6]"
          />

        </div>


        {/* =================================================
            PAGE ACTIONS
        ================================================= */}

        <div className="flex items-center space-x-3">


          {/* =================================================
              NEW VENDOR
          ================================================= */}

          <Link
            to="/vendors/new"
            className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center transition-opacity shadow-sm"
          >

            <Plus
              className="w-3 h-3 mr-1"
              strokeWidth={2.5}
            />

            New

          </Link>


          {/* =================================================
              MORE OPTIONS
          ================================================= */}

          <button
            type="button"
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors"
          >

            <MoreHorizontal
              className="w-4 h-4"
              strokeWidth={2}
            />

          </button>

        </div>

      </div>


      {/* =================================================
          TABLE CONTAINER
      ================================================= */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">


        {/* =================================================
            LOADING
        ================================================= */}

        {isLoading && (

          <div className="flex items-center justify-center py-10 text-sm text-gray-500">

            Loading vendors...

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!isLoading && error && (

          <div className="flex items-center justify-center py-10 text-sm text-red-500">

            {error}

          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!isLoading &&
          !error &&
          vendors.length === 0 && (

            <div className="flex items-center justify-center py-10 text-sm text-gray-500">

              No vendors found.

            </div>

          )}


        {/* =================================================
            VENDOR TABLE
        ================================================= */}

        {!isLoading &&
          !error &&
          vendors.length > 0 && (

            <VendorTable

              vendors={vendors}

              selectedIds={selectedIds}

              onToggleSelectAll={
                handleToggleSelectAll
              }

              onToggleSelect={
                handleToggleSelect
              }

              searchQuery={searchQuery}

            />

          )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-500 flex justify-between items-center mt-auto">


          {/* =================================================
              RECORD COUNT
          ================================================= */}

          <span>

            Showing {vendors.length} of{' '}

            {pagination.totalRecords || 0}

            {' '}vendor(s)

          </span>


          {/* =================================================
              SELECTED COUNT
          ================================================= */}

          {selectedIds.length > 0 && (

            <span className="text-blue-600 font-medium">

              {selectedIds.length} selected

            </span>

          )}


          {/* =================================================
              PAGINATION
          ================================================= */}

          {pagination.totalPages > 1 && (

            <div className="flex items-center gap-2">


              {/* =================================================
                  PREVIOUS
              ================================================= */}

              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >

                Previous

              </button>


              {/* =================================================
                  CURRENT PAGE
              ================================================= */}

              <span>

                Page {page} of{' '}

                {pagination.totalPages}

              </span>


              {/* =================================================
                  NEXT
              ================================================= */}

              <button
                type="button"
                onClick={handleNextPage}
                disabled={
                  page === pagination.totalPages
                }
                className="px-3 py-1 border rounded disabled:opacity-40"
              >

                Next

              </button>

            </div>

          )}

        </div>

      </div>

    </main>

  );

};


export default VendorsPage;