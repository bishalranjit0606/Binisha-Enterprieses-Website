# Binisha Enterprises Website

A modern, bilingual (English/Nepali) website for Binisha Enterprises - a trusted local digital and financial service provider in Pathalaiya, Bara, Nepal.

![Website Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

## 🌟 Features

- **Bilingual Support**: Full English and Nepali translations
- **Responsive Design**: Mobile-first, works on all devices
- **Admin Panel**: Manage content without touching code
- **Modern Stack**: React, Node.js, PostgreSQL
- **Fast Performance**: Vite for lightning-fast builds
- **Secure**: JWT authentication, password hashing
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
binisha/
├── backend/              # Node.js + Express API
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── uploads/         # File uploads
│   ├── seed.js          # Database seeding
│   └── index.js         # Server entry point
├── frontend/            # React + Vite app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── styles/      # CSS styles
│   │   └── App.jsx      # Main app component
│   ├── public/          # Static assets
│   └── index.html       # HTML template
└── package.json         # Root package (concurrently)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bishalranjit0606/Binisha-Enterprieses-Website.git
   cd Binisha-Enterprieses-Website
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up PostgreSQL database:**
   ```bash
   # Create database
   createdb binisha_db
   ```

4. **Configure environment variables:**

   **Backend** (`backend/.env`):
   ```bash
   DB_NAME=binisha_db
   DB_USER=your_postgres_user
   DB_PASS=your_postgres_password
   DB_HOST=localhost
   DB_DIALECT=postgres
   JWT_SECRET=your_secret_key_here
   PORT=5001
   ```

   **Frontend** (`frontend/.env.local`):
   ```bash
   VITE_API_URL=http://localhost:5001
   ```

5. **Seed the database:**
   ```bash
   cd backend
   node seed.js
   ```

6. **Start development servers:**
   ```bash
   # From root directory - starts both backend and frontend
   npm run dev

   # Or start separately:
   npm run backend  # Backend on http://localhost:5001
   npm run frontend # Frontend on http://localhost:5173
   ```

7. **Open your browser:**
   - Website: http://localhost:5173
   - Admin Panel: http://localhost:5173/login

## 🔐 Admin Access

**Default Credentials:**
- Email: `pathlaiya123@gmail.com`
- Password: `admin123`

**⚠️ Important:** Change the password immediately after first login!

## 🔐 Admin Access

**Default Credentials:**
- Email: `pathlaiya123@gmail.com`
- Password: `admin123`

**⚠️ Important:** Change the password immediately after first login!

## 🎨 Features Overview

### Public Website
- **Hero Section**: Eye-catching introduction with floating badges
- **Services**: 5 main services with 60+ service providers
  - Insurance Services (20 companies)
  - Remittance/Money Transfer (7 providers)
  - Air Ticket Booking (9 airlines)
  - Mobile & DTH Recharge (7 providers)
  - Bill Payment Service (6 utilities)
- **Why Choose Us**: Business history and credentials
- **Gallery**: Photo gallery with auto-scroll
- **News**: Latest updates and announcements
- **Contact**: Contact form, map, and social links
- **Language Toggle**: Switch between English and Nepali

### Admin Panel
- **Translations Manager**: Edit all text content
- **Services Manager**: Add/edit/delete services
- **Gallery Manager**: Upload and manage images
- **News Manager**: Create and publish news articles
- **Settings Manager**: Update contact info, map, etc.

## 🧪 Testing

```bash
# Frontend
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build

# Backend
cd backend
npm run dev      # Development with nodemon
npm start        # Production server
```

## 📝 Available Scripts

### Root Directory
- `npm run dev` - Start both backend and frontend
- `npm run backend` - Start backend only
- `npm run frontend` - Start frontend only

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/content` - Get all website content
- `GET /api/news/:id` - Get single news item

### Auth Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/user` - Verify token

### Admin Endpoints (Protected)
- `PUT /api/admin/translations/:key` - Update translation
- `POST/PUT/DELETE /api/admin/services` - Manage services
- `POST/DELETE /api/admin/gallery` - Manage gallery
- `POST/PUT/DELETE /api/admin/news` - Manage news
- `PUT /api/admin/settings/:key` - Update settings
- `POST /api/admin/upload` - Upload image

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

**Binisha Enterprises**
- Phone: +977 9855029952, +977 9705252952
- Email: pathlaiya123@gmail.com
- Address: Pathalaiya Bazar, Bara, Nepal

## 🙏 Acknowledgments

- Built with ❤️ for the Pathalaiya community
- Special thanks to all service providers and partners
- Icons by Font Awesome and React Icons
- Fonts by Google Fonts

## 📊 Project Status

- ✅ **Development**: Complete
- ✅ **Testing**: Passed
- ✅ **Documentation**: Complete
- ✅ **Deployment Ready**: Yes
- 🚀 **Status**: Production Ready

---

**Made with ❤️ in Nepal 🇳🇵**
