export async function validateProduct(validatorUrl, payload) {
  const response = await fetch(`${validatorUrl}/api/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Validation service unavailable');
  }

  return response.json();
}
