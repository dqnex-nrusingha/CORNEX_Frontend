import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import CustomerPage from './pages/customers/CustomerPage';
import CreateCustomerPage from './pages/customers/CreateCustomerPage';
import CustomerDetailsPage from './pages/customers/CustomerDetailsPage';
import SalesPage from './pages/sales/SalesPage';
import CreateSalesOrderPage from './pages/sales/CreateSalesOrderPage';
import SalesOrderDetailPage from './pages/sales/SalesOrderDetailPage';
import CreateQuotePage from './pages/sales/CreateQuotePage';
import QuoteDetailPage from './pages/sales/QuoteDetailPage';
import QuotesPage from './pages/sales/QuotesPage';
import InvoicesPage from './pages/sales/InvoicesPage';
import CreateInvoicePage from './pages/sales/CreateInvoicePage';
import InvoiceDetailPage from './pages/sales/InvoiceDetailPage';
import VendorsPage from './pages/vendors/VendorsPage';
import CreateVendorPage from './pages/vendors/CreateVendorPage';
import VendorDetailsPage from './pages/vendors/VendorDetailsPage';
import PurchasePage from './pages/purchase/PurchasePage';
import CreatePurchaseOrderPage from './pages/purchase/CreatePurchaseOrderPage';
import PurchaseOrderDetailPage from './pages/purchase/PurchaseOrderDetailPage';
import CreateExpensePage from './pages/purchase/CreateExpensePage';
import ExpenseDetailPage from './pages/purchase/ExpenseDetailPage';
import CreateBillPage from './pages/purchase/CreateBillPage';
import BillDetailPage from './pages/purchase/BillDetailPage';
import ProcurementDetailPage from './pages/purchase/ProcurementDetailPage';
import CreateProcurementPage from './pages/purchase/CreateProcurementPage';
import ProductionPage from './pages/production/ProductionPage';
import CreateManufacturingPage from './pages/production/CreateManufacturingPage';
import ManufacturingOrderDetailsPage from './pages/production/ManufacturingOrderDetailsPage';
import CreateMachinePage from './pages/machine/CreateMachinePage';
import MachineDetailsPage from './pages/machine/MachineDetailsPage';
import MachinePage from './pages/machine/MachinePage';
import CorrugatorJobDetailsPage from './pages/production/CorrugatorJobDetailsPage';
import UserManagementPage from './pages/user-management/UserManagementPage';
import InventoryPage from './pages/inventory/InventoryPage';
import CreateInventoryItemPage from './pages/inventory/CreateInventoryItemPage';
import InventoryItemDetailPage from './pages/inventory/InventoryItemDetailPage';
import InventoryControlPage from './pages/inventory/InventoryControlPage';
import CreateInventoryControlPage from './pages/inventory/CreateInventoryControlPage';
import InventoryControlDetailPage from './pages/inventory/InventoryControlDetailPage';

// Placeholder for other pages to avoid errors
const PlaceholderPage = ({ title }) => (
  <div className="flex-1 flex items-center justify-center text-gray-500 bg-white m-4 rounded-xl border border-gray-100 shadow-sm">
    <h2 className="text-xl font-medium">{title} Page - Coming Soon</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard Route */}
          <Route index element={<DashboardPage />} />
          
          <Route path="customers" element={<CustomerPage />} />
          <Route path="customers/new" element={<CreateCustomerPage />} />
          <Route path="customers/:customerId" element={<CustomerDetailsPage />} />
          
          {/* Other routes from sidebar */}
          <Route path="sales" element={<Navigate to="/sales/quotes" replace />} />
          <Route path="sales/orders" element={<SalesPage />} />
          <Route path="sales/new" element={<CreateSalesOrderPage />} />
          <Route path="sales/order/:id" element={<SalesOrderDetailPage />} />
          <Route path="sales/quotes" element={<QuotesPage />} />
          <Route path="sales/quotes/new" element={<CreateQuotePage />} />
          <Route path="sales/quotes/:id" element={<QuoteDetailPage />} />
          <Route path="sales/invoices" element={<InvoicesPage />} />
          <Route path="sales/invoices/new" element={<CreateInvoicePage />} />
          <Route path="sales/invoices/:id" element={<InvoiceDetailPage />} />
          // =====================================================
          // VENDOR ROUTES
          // =====================================================
          <Route path="vendors" element={<VendorsPage />}/>
          <Route path="vendors/new" element={<CreateVendorPage />}/>
          <Route path="vendors/:vendorId" element={<VendorDetailsPage />}/>
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="purchase/new" element={<CreatePurchaseOrderPage />} />
          <Route path="purchase/order/:id" element={<PurchaseOrderDetailPage />} />
          <Route path="purchase/expense/new" element={<CreateExpensePage />} />
          <Route path="purchase/expense/:id" element={<ExpenseDetailPage />} />
          <Route path="purchase/bill/new" element={<CreateBillPage />} />
          <Route path="purchase/bill/:id" element={<BillDetailPage />} />
          <Route path="purchase/procurement/new" element={<CreateProcurementPage />} />
          <Route path="purchase/procurement/:id" element={<ProcurementDetailPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory/control" element={<InventoryControlPage />} />
          <Route path="inventory/control/new" element={<CreateInventoryControlPage />} />
          <Route path="inventory/control/:id" element={<InventoryControlDetailPage />} />
          <Route path="inventory/new" element={<CreateInventoryItemPage />} />
          <Route path="inventory/:id" element={<InventoryItemDetailPage />} />
          <Route path="production" element={<ProductionPage />} />
          <Route path="production/manufacturing/new" element={<CreateManufacturingPage />} />
          <Route path="production/manufacturing/:id" element={<ManufacturingOrderDetailsPage />} />
          <Route path="production/job-card/:id" element={<CorrugatorJobDetailsPage />} />
          <Route path="machine" element={<MachinePage />} />
          <Route path="machine/new" element={<CreateMachinePage />} />
          <Route path="machine/:id" element={<MachineDetailsPage />} />
          <Route path="supply-chain" element={<PlaceholderPage title="Supply Chain" />} />
          <Route path="accounting" element={<PlaceholderPage title="Accounting" />} />
          <Route path="hrms" element={<PlaceholderPage title="HRMS" />} />
          <Route path="user-management" element={<UserManagementPage />} />
          <Route path="report" element={<PlaceholderPage title="Report" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
