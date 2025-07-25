// export const BASE_URL =""
export const USERS_URL = '/api/users'
export const PRODUCTS_URL = '/api/products'
export const ORDERS_URL = '/api/orders'
export const PAYPAL_URL = '/api/config/paypal'
export const UPLOAD_URL = '/api/upload'

export const BASE_URL = process.env.NODE_ENV === 'development' ? '' : '/';

// export const PRODUCTS_URL = `${BASE_URL}api/products`;
// export const USERS_URL = `${BASE_URL}api/users`;
// export const ORDERS_URL = `${BASE_URL}api/orders`;
// export const PAYPAL_URL = `${BASE_URL}api/config/paypal`;
// export const UPLOAD_URL = `${BASE_URL}api/upload`;

