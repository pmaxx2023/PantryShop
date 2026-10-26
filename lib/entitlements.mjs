export const PLUS_MONTHLY = 'com.cagefreecapital.pshop.plus.monthly';
export const PLUS_ANNUAL = 'com.cagefreecapital.pshop.plus.annual';
export const FREE_FEATURES = [
  'A local kitchen that works offline',
  'The full recipe library',
  'Photo confirmation and manual inventory',
  'Household planning and the grocery list',
  'Export, and deletion of an account you created'
];
export const PLUS_FEATURES = [
  'Optional sync of one kitchen across your own devices',
  'Cloud backup for more than 30 kitchen photos'
];

export function entitlementFromStore(transactions, now = Date.now()) {
  const active = (transactions || []).find(item => item && item.verified === true && item.revoked !== true && (item.productId === PLUS_MONTHLY || item.productId === PLUS_ANNUAL) && Number(item.expiresAt) > now);
  return {plus: Boolean(active), productId: active?.productId || null, source: active ? 'storekit' : 'none'};
}

export function paywallModel(products) {
  const list = (products || []).filter(item => item && item.productId && item.displayPrice && item.period);
  if (!list.length) {
    return {
      available: false,
      message: 'PShop Plus is an optional auto-renewable subscription sold by Apple. The app does not show a price until StoreKit provides one. Deleting your PShop account does not cancel an Apple subscription.',
      products: []
    };
  }
  return {
    available: true,
    message: 'Billed by Apple to your Apple ID. The subscription renews until you cancel it in Settings → Apple ID → Subscriptions. Deleting your PShop account does not stop billing.',
    products: list
  };
}

export function canSync(entitlement, photoCount) {
  if (entitlement?.plus) return {ok: true};
  if (photoCount > 30) return {ok: false, reason: 'Cloud backup of more than 30 photos is part of PShop Plus. This device keeps every photo locally.'};
  return {ok: true};
}
