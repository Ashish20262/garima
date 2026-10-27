# GARIMA backend

Run `npm install` and `npm start` from this directory. Copy `.env.example` to `.env` and set `MONGODB_URI` to your Atlas connection string. Set `MONGODB_DB_NAME` to the database name (defaults to `garima`) and `PORT` to change the default API port of 5000. The backend does not start unless it can connect to MongoDB. The Vite development server proxies `/api` requests to this port.

Keep the real MongoDB URI only in `backend/.env`; `.env` is ignored by Git. Never place it in frontend configuration, source code, or chat. Replace the placeholders in the local copy of `backend/.env.example`, including URL-encoding any special characters in the Atlas username or password as required by MongoDB connection strings.

## Razorpay test mode

Copy `.env.example` to `.env` and fill in the Razorpay **test-mode** key ID and secret from the Razorpay dashboard. Keep `.env` on the backend only; it is ignored by Git. The backend rejects key IDs that do not start with `rzp_test_`. Never put the secret in frontend variables or source files. With MongoDB configured, COD remains available without Razorpay credentials; Razorpay endpoints return `503` until test credentials are added.

## Endpoints

- `GET /api/health` reports backend availability.
- `POST /api/orders/cod` validates delivery details and catalog items, calculates the INR total server-side, saves the confirmed COD order to MongoDB before responding, and requires an `Idempotency-Key` header. Order IDs and idempotency keys have unique database indexes.
- `POST /api/payments/razorpay/order` validates the same catalog and creates a test-mode Razorpay order. It also requires an `Idempotency-Key` header.
- `POST /api/payments/razorpay/verify` verifies the Razorpay signature and confirms with Razorpay that the payment is captured before returning a paid order.

COD orders are stored in MongoDB, including server-calculated item prices, quantities, sizes, validated customer/shipping details, totals, payment method, status, and creation/update timestamps. Razorpay test orders and their verification state remain in process memory only; that existing test flow has not been converted to persistent payment storage.