# Banking System Backend 🏦

A high-integrity Node.js/Express backend for a digital banking system. It features secure authentication, double-entry ledger accounting, and an idempotent transaction engine to ensure financial data consistency.

---

## ✨ Core Features

* **🔐 Secure Authentication:** JWT-based login using HTTP-only cookies and Bearer tokens.
* **💸 Idempotent Transactions:** Prevents duplicate transfers using unique idempotency keys—critical for banking stability.
* **📖 Ledger System:** Double-entry accounting via a Ledger model to track every credit and debit accurately.
* **📧 Automated Notifications:** Real-time email alerts for registration and transaction status (Success/Failure) via Nodemailer & OAuth2.
* **🛡️ Protected Routes:** Robust middleware to verify user identity before sensitive account operations.

---

## 🛠️ Tech Stack

| Component | Technology |
| --- | --- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB & Mongoose ODM |
| **Auth** | JWT, Bcryptjs, Cookie-Parser |
| **Email** | Nodemailer (Google OAuth2) |

---

## 📂 Project Architecture

```text
src/
├── controllers/    # Request handling logic (Auth, Account, Txn)
├── db/             # Database connection & configuration
├── middleware/     # JWT Auth & Validation guards
├── models/         # Mongoose Schemas (User, Account, Transaction, Ledger)
├── routes/         # API Endpoint definitions
├── services/       # Email & Third-party service integrations
├── app.js          # Express app configuration
└── server.js       # Server entry point

```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas account
* Google Cloud Console credentials (for OAuth2 Email)

### Installation

1. **Clone & Install**
```bash
git clone https://github.com/YOUR_USERNAME/bank-backend.git
cd bank-backend
npm install

```


2. **Environment Variables**
Create a `.env` file in the root:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
CLIENT_ID=google_oauth_client_id
CLIENT_SECRET=google_oauth_client_secret
REFRESH_TOKEN=google_oauth_refresh_token

```


3. **Run**
```bash
# Development
npm run dev
# Production
npm start

```



---

## 🛰️ API Reference

### Auth (`/api/auth`)

* `POST /register` - Create user & send welcome email.
* `POST /login` - Authenticate & return JWT.

### Accounts (`/api/accounts`)

* `POST /` - Create a new bank account (Auth Required).

### Transactions (`/api/transaction`)

* `POST /` - Execute transfer. Requires `fromAccount`, `toAccount`, `amount`, and `idempotenceKey`.

---

## ✅ Implementation Checklist (Current Status)

* [x] JWT Authentication & Bcrypt Hashing
* [x] Ledger-based tracking
* [ ] **Fix:** Ensure password verification in Login controller.
* [ ] **Fix:** Correct mount paths for Account/Transaction routes in `app.js`.
* [ ] **Fix:** Refactor transaction controller for full idempotency logic.

---

## 👤 Author

**Ankit kumar**

* **GitHub:** [@Ordinary-Boy20](https://github.com/Ordinary-Boy20)

