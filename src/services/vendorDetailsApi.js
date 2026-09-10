const API_BASE = '/api/v1/vendors';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || 'Request failed');
  return body;
}

export function getVendorDetails(vendorId) {
  return request(`${API_BASE}/${vendorId}`);
}

export function getVendorReelSpecifications(vendorId, search = '') {
  const qs = new URLSearchParams({ search });
  return request(`${API_BASE}/${vendorId}/reel-specifications?${qs}`);
}

export function getVendorOrderHistory(vendorId, params = {}) {
  const qs = new URLSearchParams(params);
  return request(`${API_BASE}/${vendorId}/order-history?${qs}`);
}

export function updateVendor(vendorId, payload) {
  return request(`${API_BASE}/${vendorId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteVendor(vendorId) {
  return request(`${API_BASE}/${vendorId}`, { method: 'DELETE' });
}
