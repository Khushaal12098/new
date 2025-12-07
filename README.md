# Wood Camp Pharma Pvt. Ltd. - Complete Website & Admin Panel

A premium, dark-themed responsive website and admin panel for Wood Camp Pharma, a manufacturing and trading company specializing in wood products, industrial chemicals, and pharmaceutical formulations.

## 🌟 Features

### Frontend Website
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Premium dark aesthetic with neon accents (blue, purple, teal)
- **Smooth Animations**: GSAP-powered scroll triggers and interactive effects
- **Modern Components**: Glassmorphism cards, gradient borders, smooth transitions
- **Product Showcase**: Three dedicated product category pages with filtering

### Pages Included
1. **Home (`index.html`)** - Hero section with lead capture form, product highlights, about section, features, contact, and footer
2. **Wood Products (`wood.html`)** - Filterable product grid with quote request modal
3. **Chemical Products (`chemicals.html`)** - Safety compliance info and product listings
4. **Pharmaceutical Products (`pharma.html`)** - WHO-GMP certification highlights
5. **Login (`login.html`)** - Admin authentication portal
6. **Admin Dashboard (`admin/dashboard.html`)** - Summary cards, lead analytics, distribution chart
7. **Admin Products (`admin/products.html`)** - CRUD operations for product management

### Admin Features
- **Authentication**: Secure login with demo credentials
- **Lead Management**: View and track user inquiries from the home form
- **Product Management**: Add, edit, delete products across three categories
- **Analytics**: Visual distribution chart of customer interests
- **Summary Dashboard**: Product counts and lead metrics

## 📁 Project Structure

```
├── index.html                    # Home page
├── wood.html                     # Wood products page
├── chemicals.html                # Chemical products page
├── pharma.html                   # Pharma products page
├── login.html                    # Admin login
├── admin/
│   ├── dashboard.html           # Admin dashboard
│   └── products.html            # Admin product management
├── assets/
│   ├── css/
│   │   └── styles.css           # Global stylesheet (1000+ lines)
│   ├── js/
│   │   ├── main.js              # Frontend interactions & animations
│   │   └── admin.js             # Admin-specific functionality
│   └── img/                     # Placeholder for images (using emojis)
└── README.md                     # This file
```

## 🚀 Quick Start

1. **Open in Browser**: Simply double-click `index.html` or open it with any modern web browser
2. **No Installation Required**: Pure HTML5, CSS3, and vanilla JavaScript using CDN links
3. **No Backend Needed**: All data stored in browser's localStorage

## 🔐 Demo Credentials

**Admin Login:**
- Email: `admin@demo.com`
- Password: `Admin@123`

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Advanced layouts, animations, responsive design
- **JavaScript**: Vanilla JS (no frameworks)
- **GSAP**: Animation library via CDN
- **localStorage**: Client-side data persistence
- **Google Fonts**: Poppins & Inter font families

## 📦 Key Features

### Design Elements
- Dark background (#050509, #0a0a0f)
- Accent colors: Cyan (#00d9ff), Purple (#b300ff), Magenta (#ff00ff), Teal (#00ffcc)
- Glassmorphism effects with backdrop blur
- Smooth gradient animations
- Responsive grid and flexbox layouts

### Interactions
- Navbar scroll behavior with blur effect
- Card hover animations with scale and glow
- Counter animations for statistics
- Smooth scroll-to-section navigation
- Mobile-friendly hamburger menu
- Modal dialogs for quote requests

### Admin Panel
- Sidebar navigation with active states
- Summary statistic cards
- Distribution bar chart
- Data table with action buttons
- localStorage-based CRUD operations
- Session management with login/logout

## 📊 Data Management

All data is stored locally in the browser using `localStorage`:
- **userLeads**: Customer inquiries from home page form
- **quoteRequests**: Product quote requests
- **contactMessages**: Contact form submissions
- **products_wood**: Wood product catalog
- **products_chemicals**: Chemical product catalog
- **products_pharma**: Pharmaceutical product catalog
- **isLoggedIn**: Admin authentication state

## 🎨 Customization

### Colors
Edit CSS variables in `assets/css/styles.css`:
```css
:root {
  --bg-dark: #050509;
  --accent-blue: #00d9ff;
  --accent-purple: #b300ff;
  /* ... more colors ... */
}
```

### Content
- Edit product names in product pages
- Update company info in contact section
- Modify hero text and descriptions
- Change Google Maps embed location

### Animations
- GSAP animations in `assets/js/main.js`
- CSS animations in `assets/css/styles.css`
- ScrollTrigger for scroll-based effects

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full multi-column layout)
- **Tablet**: 768px - 1024px (2-column layouts)
- **Mobile**: Below 768px (single-column stacked)
- **Small Mobile**: Below 480px (optimized spacing)

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Usage Tips

1. **Submit Lead Form** on home page to see data in admin dashboard
2. **Request Quotes** on product pages to test modal functionality
3. **Add Products** in admin panel to test CRUD operations
4. **Filter Products** to see dynamic filtering in action
5. **Check localStorage** in browser DevTools (F12 > Application > Storage) to view saved data

## 🎯 Future Enhancements

- Backend API integration for real data persistence
- Email notifications for form submissions
- Advanced product filtering and search
- User authentication system
- Payment gateway integration
- CMS for dynamic content management
- Multi-language support
- Performance analytics

## 📄 File Sizes

- `styles.css`: ~20KB (comprehensive styling)
- `main.js`: ~6KB (frontend interactions)
- `admin.js`: ~5KB (admin functionality)
- Total HTML: ~25KB (all pages)
- **Total Project**: < 100KB (very lightweight!)

## ⚡ Performance

- Pure CSS animations (GPU-accelerated)
- Minimal JavaScript footprint
- CDN-based libraries (no local dependencies)
- Optimized for fast loading
- No image bloat (emoji icons)

## 📝 Notes

- All forms use localStorage - no server required
- Admin authentication is demo-only (no real security)
- Product images are replaced with emoji icons
- Maps embed is a placeholder
- Ready for migration to real backend

## 🎓 Learning Resource

This project demonstrates:
- Responsive web design principles
- CSS Grid and Flexbox layouts
- Modern CSS (variables, gradients, animations)
- JavaScript DOM manipulation
- localStorage API usage
- GSAP animation library
- Mobile-first development
- Semantic HTML structure

## 📞 Support

For questions or issues:
1. Check browser console for errors (F12)
2. Verify localStorage is enabled
3. Clear cache if experiencing issues
4. Test in different browsers

---

**Created with ❤️ for Wood Camp Pharma Pvt. Ltd.**

Version 1.0 | December 2024
