const API_BASE = '/api/v1/vendors';

export async function getVendors({ search = '', page = 1, limit = 20 } = {}) {
  const qs = new URLSearchParams({ search, page, limit });
  const response = await fetch(`${API_BASE}?${qs}`);
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || 'Failed to load vendors');
  return body;
}