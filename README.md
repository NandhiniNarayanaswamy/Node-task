# Website Analytics Backend API

A scalable backend API for a **Website & Mobile App Analytics** platform. This backend allows clients to collect detailed analytics events such as clicks, page visits, referrer info, device metrics, and provides aggregation endpoints. Built using **Node.js**, **Express**, **MongoDB Atlas**, and optionally **Redis** for caching.

---

## **Features**

### 1. API Key Management
- Register websites or apps to get a unique API key.
- Endpoints to:
  - Create a new API key
  - Revoke or regenerate API keys
  - Handle API key expiration
- Supports Google Auth onboarding (optional).

### 2. Event Data Collection
- Accepts analytics events such as clicks, visits, referrer info, and device details.
- Ensures high-volume ingestion and data integrity.
- Authenticated via API key in request headers.

### 3. Analytics & Reporting
- Event summary by type, app, and time range.
- User-based statistics with device and IP info.
- Redis caching for frequently requested analytics (optional).

### 4. Technical Features
- **Node.js** with **Express** for REST API
- **MongoDB Atlas** for scalable database
- **Redis** caching using cloud Redis (Upstash recommended)
- **Rate limiting** to prevent abuse
- **Swagger** documentation for all endpoints
- Modular and clean code design
- Docker ready (optional)
- JWT authentication for API access

---

## **Folder Structure**

