# Helpdesk Ticket Booking System

## Stack
- **Backend:** Node.js, Express, MongoDB, JWT (httpOnly cookies), Cloudinary, Nodemailer
- **Frontend:** React + Vite, TypeScript, Tailwind CSS, Material UI, React Hook Form + Yup, TanStack Query

## Roles
| Role | Capabilities |
|------|----------------|
| **Admin** | All tickets, assign to agent, create/update/delete tickets, create customers & agents (email credentials) |
| **Agent** | See assigned tickets, resolve, close |
| **Customer** | Create/update/delete own tickets only |

## Setup

### Backend
```bash
cd backend
npm install
# ensure .env is filled (Mongo, JWT, email, Cloudinary)
npm run dev
# runs on http://localhost:3007
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# runs on http://localhost:5173
```

### First admin
Create an admin manually in MongoDB (role: `"admin"`) or via Mongo shell, then log in.  
Only admins can create **customer** and **agent** accounts from User Management.

## CORS / 500 fix applied
- `loginService` was incorrectly using `res` (caused 500 → missing CORS headers). Now throws proper errors.
- Ticket route order fixed (`/tickets/assign` before `/tickets/:id`).
- Assign ticket validation fixed (`!assignedTo`).
- Create-user protected with admin auth; role limited to customer/agent.
- Priority Joi validation fixed.
- ObjectId matching for customer tickets fixed.

## Frontend structure
- Role-based sidebar from `useGetUserProfile`
- Shared layout (Navbar + Sidebar)
- TanStack Query for all API (useQuery / useMutation + invalidate)
- MUI Dialog + RHF + Yup for create/update forms
- MUI Table for ticket lists
- No Redux store (removed usage)
