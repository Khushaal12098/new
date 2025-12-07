# Wood Camp Pharma - Complete Website Guide

## 🎯 How to Use This Website

### Getting Started
1. Navigate to `c:\Users\asus\OneDrive\Desktop\PC`
2. Right-click on `index.html` → Open with → Your favorite browser
3. Or drag `index.html` to your browser window

### Navigation Overview

#### Home Page (index.html)
1. **Navbar** (Fixed on scroll)
   - Company logo with gradient
   - Navigation links to all sections
   - Login button for admin access
   - Mobile hamburger menu

2. **Hero Section**
   - Eye-catching headline animation
   - Glassmorphic "Get in Touch" form
   - Animated background gradients
   - Lead capture form fields:
     - Full Name
     - Email
     - Phone
     - Country (dropdown)
     - Product Interest (dropdown)

3. **Product Categories**
   - Wood Products card → links to `wood.html`
   - Chemical Products card → links to `chemicals.html`
   - Pharmaceutical Products card → links to `pharma.html`
   - Cards hover up with glow effect

4. **About Section**
   - Company description
   - Animated counters (Years, Countries, Products)
   - Real-time counting animation when scrolling into view

5. **Features Section (Why Choose Us)**
   - 6 feature cards with icons
   - Quality Assurance, Compliance, R&D, Sustainability, Delivery, Support

6. **Contact Section**
   - Contact form (Name, Email, Message)
   - Contact information cards (Address, Phone, Email)
   - Embedded Google Map

7. **Footer**
   - Quick links
   - Social media icons
   - Copyright information

---

#### Product Pages (wood.html, chemicals.html, pharma.html)

**Wood Products Page Features:**
- Hero section with wood-themed gradient
- 8 product cards with specs:
  - Marine Plywood, Commercial Plywood, Teak Timber, etc.
- Filter pills: All, Plywood, Timber, Boards, Veneer
- Quote request modal for each product

**Chemical Products Page Features:**
- Hero section with chemistry-themed gradient
- ⚠️ Safety & Compliance notice banner
- 8 chemical product cards with grades
- Filter pills: All, Industrial, Laboratory, Pharma Grade, Specialty
- Product grades and packaging info
- Quote request functionality

**Pharma Products Page Features:**
- Hero section with medical-themed gradient
- ✓ Quality & Compliance Assured banner
- 8 pharmaceutical product cards
- Filter pills: All, APIs, Formulations, Intermediates
- WHO-GMP certification details
- Regulatory compliance badges
- Quality commitment section with 6 quality features

---

#### Login Page (login.html)

**Demo Credentials:**
```
Email: admin@demo.com
Password: Admin@123
```

**Features:**
- Centered login card
- Error message display for wrong credentials
- Demo credentials reminder
- Redirects to dashboard on successful login
- Redirects from dashboard if not logged in

---

#### Admin Dashboard (admin/dashboard.html)

**Layout:**
- Left Sidebar (Navigation)
- Top Bar (Welcome message + user avatar)
- Main Content Area

**Summary Cards:**
- Total User Leads (from home form submissions)
- Total Wood Products
- Total Chemical Products
- Total Pharma Products

**Distribution Chart:**
- Visual bar chart showing interest distribution
- Shows breakdown: Wood / Chemicals / Pharma / All

**Recent Leads Table:**
- Last 5 user submissions from home page form
- Shows: Name, Email, Phone, Country, Interest
- Auto-updates when new leads come in

**Sidebar Navigation:**
- Dashboard (current page)
- Products management
- Reports (placeholder)
- Settings (placeholder)
- Logout button

---

#### Admin Products Page (admin/products.html)

**Layout:**
- Same sidebar and top bar as dashboard
- Category tabs: Wood, Chemicals, Pharma

**Actions:**
- **Add Product** button → prompts for product name
- **Import Products** button (placeholder)
- Products table with columns:
  - ID
  - Product Name
  - Category
  - Status (Active/Inactive with color badge)
  - Actions (Edit, Delete buttons)

**CRUD Operations:**
1. **Add**: Click "+ Add Product" → enter name → appears in table
2. **Edit**: Click "Edit" → modify product name
3. **Delete**: Click "Delete" → confirmation → removes from list
4. **Toggle Status**: Status shown with color badges (Active = green, Inactive = red)

**Data Persistence:**
- All changes saved to localStorage
- Data persists between page refreshes
- Separate storage for each product category

---

## 🎨 Design Highlights

### Color Scheme
- **Background**: Deep dark (#050509, #0a0a0f)
- **Accent Blue**: #00d9ff (primary accent)
- **Accent Purple**: #b300ff (secondary accent)
- **Accent Teal**: #00ffcc (tertiary accent)
- **Text**: White (#ffffff) for primary, gray (#b0b0c0) for secondary

### Typography
- **Headings**: Poppins font, bold, large sizes
- **Body**: Inter font, clean and readable
- **Clear hierarchy**: H1 → H2 → H3 → p

### Responsive Design
- **Desktop** (1200px+): Full multi-column layouts
- **Tablet** (768px-1024px): 2-column layouts, adjusted navigation
- **Mobile** (< 768px): Single-column, hamburger menu
- **Small Mobile** (< 480px): Optimized spacing and font sizes

### Animations
- **Page Load**: Fade-in and slide-up animations
- **Scroll**: Cards animate in when scrolled into view
- **Hover**: Scale up, glow effects on cards
- **Float**: Background elements float subtly
- **Counters**: Numbers animate to target values
- **Smooth**: All transitions are smooth 0.2-0.5s

---

## 💾 Data Storage (localStorage)

### What Gets Saved
1. **userLeads** - Form submissions from home page
   ```javascript
   {
     name: "John Doe",
     email: "john@example.com",
     phone: "1234567890",
     country: "India",
     interest: "Wood Products",
     timestamp: "12/7/2024, 10:30:45 AM"
   }
   ```

2. **quoteRequests** - Quote requests from product pages
3. **contactMessages** - Contact form submissions
4. **products_wood** - Wood product catalog
5. **products_chemicals** - Chemical product catalog
6. **products_pharma** - Pharma product catalog
7. **isLoggedIn** - Admin login state
8. **adminEmail** - Currently logged-in admin email

### How to View Data
1. Open browser DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Select your domain/file location
5. View and manage all stored data

---

## ✨ Interactive Features

### Home Page Form
1. Enter name, email, phone, country, and product interest
2. Click "Submit"
3. See success message appear
4. Check admin dashboard → new lead appears in table

### Product Quote Requests
1. On any product page, click "Request Quote"
2. Modal dialog appears with product name pre-filled
3. Fill in company details and quantity
4. Submit → stored in localStorage

### Product Filtering
1. Click filter pills (All, Plywood, Timber, etc.)
2. Products filter in real-time
3. Only matching products display

### Admin Product Management
1. Click category tab (Wood, Chemicals, Pharma)
2. View products in table
3. Click "Add Product" → enter name
4. Click "Edit" → modify name
5. Click "Delete" → remove with confirmation
6. Changes persist across sessions

### Navigation
1. Click navbar links → smooth scroll to section
2. Use admin sidebar → navigate between pages
3. Mobile hamburger menu → responsive on small screens

---

## 🔧 Troubleshooting

### Page Not Loading
- Check if you're opening `index.html` directly from file system
- Try right-clicking → Open with → Browser
- Clear browser cache (Ctrl+Shift+Delete)

### Animations Not Playing
- Check if JavaScript is enabled
- Verify GSAP CDN link is working (check console for errors)
- Try a different browser

### Admin Login Issues
- Use exactly: `admin@demo.com` and `Admin@123`
- Clear localStorage if login doesn't work
- Check browser console for error messages

### Data Not Persisting
- Verify localStorage is enabled
- Check if browser is in private/incognito mode
- Try a different browser
- Check localStorage quota isn't exceeded

### Mobile Layout Issues
- Verify viewport meta tag is in HTML
- Test with browser DevTools mobile view
- Clear cache and hard reload (Ctrl+Shift+R)

---

## 📊 File Descriptions

### HTML Files
- **index.html** (5KB) - Home page with all sections
- **wood.html** (3KB) - Wood products showcase
- **chemicals.html** (3KB) - Chemical products showcase
- **pharma.html** (3KB) - Pharma products showcase
- **login.html** (2KB) - Admin login portal
- **admin/dashboard.html** (4KB) - Admin dashboard
- **admin/products.html** (4KB) - Admin product manager

### CSS Files
- **styles.css** (20KB) - Complete global stylesheet
  - Root variables and color scheme
  - Typography and spacing
  - Components (buttons, cards, forms)
  - Layouts (grid, flexbox)
  - Animations (@keyframes)
  - Responsive media queries

### JavaScript Files
- **main.js** (6KB) - Frontend functionality
  - Navbar scroll behavior
  - Form submissions and validation
  - GSAP animations
  - Counter animations
  - Modal interactions
  - Filter functionality

- **admin.js** (5KB) - Admin panel functionality
  - Authentication check
  - localStorage management
  - CRUD operations
  - Table rendering
  - Chart generation

---

## 🚀 Deployment Tips

### For Local Use
- No setup needed, just open `index.html`
- Works offline (all data stored locally)

### For Web Hosting
1. Upload all files maintaining folder structure
2. Point domain to `index.html`
3. Consider replacing localStorage with backend API
4. Add real database for persistence
5. Implement proper authentication

### For Email Features
- Replace `alert()` with actual email service
- Use backend API to handle email sends
- Add email validation

### For Maps
- Replace embed with actual location or API key
- Use Google Maps or Mapbox API

---

## 📱 Testing Checklist

- [ ] Home page loads properly
- [ ] Hero form submits and shows success message
- [ ] Product pages load with correct styling
- [ ] Filter pills work on product pages
- [ ] Quote modals appear and can be submitted
- [ ] Login works with demo credentials
- [ ] Admin dashboard shows leads from home form
- [ ] Products can be added/edited/deleted in admin
- [ ] Admin logout works
- [ ] All pages are responsive on mobile
- [ ] Animations play smoothly
- [ ] Navigation links work correctly
- [ ] Forms submit without errors

---

**Website is fully functional and ready to use!** 🎉

For any customization needs, refer to the code comments in HTML, CSS, and JavaScript files.
