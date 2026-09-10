const API_BASE = '/api/v1/vendors';

export async function createVendor(payload) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message || 'Failed to create vendor');
  return body;
}