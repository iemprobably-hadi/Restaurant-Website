# 🍔 Hot Spot Kitchen - Complete Project Guide

## 📚 Table of Contents
1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [File Structure](#file-structure)
4. [Technologies Used](#technologies-used)
5. [Features Breakdown](#features-breakdown)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Customization](#customization)
9. [Deployment](#deployment)
10. [Assignment Submission](#assignment-submission)

---

## 🚀 Quick Start

### 5-Minute Setup:

```bash
# 1. Create project folder
mkdir hot-spot-kitchen && cd hot-spot-kitchen

# 2. Create directory structure
mkdir -p templates static/css static/js static/images data

# 3. Install Flask
pip install flask

# 4. Copy all files to their folders
# - HTML files → templates/
# - CSS file → static/css/
# - JS file → static/js/
# - Python file → root directory

# 5. Add images to static/images/

# 6. Run the server
python app.py

# 7. Open browser to http://localhost:5000
```

---

## 📖 Project Overview

### What This Project Does:
Hot Spot Kitchen is a complete restaurant website featuring:
- 6 responsive pages
- Interactive menu with filtering
- Reservation system
- Job application portal
- Gallery with lightbox
- Mobile-friendly design

### MVP Requirements Met:
✅ Multi-page website (6 pages)
✅ HTML - Semantic structure
✅ CSS - Custom styling, animations, responsive
✅ JavaScript - Interactivity, validation, animations
✅ Python - Backend form handling with Flask

---

## 📁 File Structure

```
hot-spot-kitchen/
│
├── 📄 app.py                      # Flask backend (Python)
├── 📄 requirements.txt            # Python dependencies
├── 📄 README.md                   # Main documentation
├── 📄 SETUP_GUIDE.md             # Setup instructions
├── 📄 IMAGE_GUIDE.md             # Image resources
├── 📄 COMPLETE_PROJECT_GUIDE.md  # This file
│
├── 📁 templates/                  # HTML files
│   ├── index.html                # Home page
│   ├── about.html                # About Us
│   ├── menu.html                 # Menu with filtering
│   ├── delivery.html             # Delivery info
│   ├── careers.html              # Job listings
│   └── reservation.html          # Table booking
│
├── 📁 static/                     # Static assets
│   ├── 📁 css/
│   │   └── style.css             # All styles (1500+ lines)
│   ├── 📁 js/
│   │   └── script.js             # All JavaScript (400+ lines)
│   └── 📁 images/                # All images (35 files)
│       ├── logo.png
│       ├── hero-bg.jpg
│       └── ... (menu items, gallery, etc.)
│
└── 📁 data/                       # Form submissions
    ├── reservations.txt          # Auto-created
    ├── applications.txt          # Auto-created
    └── contacts.txt              # Auto-created
```

---

## 🛠️ Technologies Used

### Frontend:

**HTML5**
- Semantic elements
- Form elements
- Accessibility features
- SEO-friendly structure

**CSS3**
- CSS Grid & Flexbox
- Custom properties (variables)
- Media queries (responsive)
- Animations & transitions
- Hover effects

**JavaScript (Vanilla)**
- DOM manipulation
- Event listeners
- Form validation
- Scroll animations
- Intersection Observer API
- Array methods

### Backend:

**Python 3.7+**
- Flask framework
- File I/O operations
- Data processing
- Error handling
- Routing

### External Resources:
- Google Fonts (Playfair Display, Poppins)
- No jQuery or Bootstrap (Pure vanilla JS)

---

## ✨ Features Breakdown

### 1. Navigation System
**Files:** All HTML files, `script.js`
**Features:**
- Sticky navigation bar
- Active page highlighting
- Mobile hamburger menu
- Smooth transitions

**Code Locations:**
- CSS: Lines 40-110 in `style.css`
- JS: Lines 1-20 in `script.js`

### 2. Hero Section
**File:** `index.html`
**Features:**
- Full-width hero image
- Overlay effect
- Call-to-action buttons
- Fade-in animation

**Code Locations:**
- CSS: Lines 120-160 in `style.css`
- HTML: Lines 30-50 in `index.html`

### 3. Image Slider
**File:** `index.html`, `script.js`
**Features:**
- Auto-advance every 5 seconds
- Manual navigation (prev/next)
- Fade transitions
- Responsive design

**Code Locations:**
- CSS: Lines 250-320 in `style.css`
- JS: Lines 40-75 in `script.js`

### 4. Menu Filtering
**File:** `menu.html`, `script.js`
**Features:**
- 6 filter buttons (All + 5 categories)
- Smooth filter transitions
- Category-based filtering
- Hover zoom on images

**Code Locations:**
- CSS: Lines 550-650 in `style.css`
- JS: Lines 90-115 in `script.js`

### 5. Gallery Lightbox
**File:** `about.html`, `script.js`
**Features:**
- Click to enlarge images
- Full-screen overlay
- Close on click or X button
- Smooth fade-in

**Code Locations:**
- CSS: Lines 500-545 in `style.css`
- JS: Lines 120-145 in `script.js`

### 6. Form Validation
**Files:** `reservation.html`, `careers.html`, `script.js`
**Features:**
- Client-side validation
- Email format check
- Phone number validation
- Required field checks
- Date validation

**Code Locations:**
- CSS: Lines 1000-1100 in `style.css`
- JS: Lines 150-250 in `script.js`

### 7. Scroll Animations
**Files:** All pages, `script.js`
**Features:**
- Fade-in on scroll
- Intersection Observer
- Smooth transitions
- Performance optimized

**Code Locations:**
- CSS: Lines 1450-1480 in `style.css`
- JS: Lines 25-38 in `script.js`

### 8. Python Backend
**File:** `app.py`
**Features:**
- Form data handling
- File storage
- Admin pages
- Error handling
- Routing

**Routes:**
- `/` - Home page
- `/<page>` - Other pages
- `/submit-reservation` - Reservation form
- `/submit-career` - Job application
- `/admin/reservations` - View reservations
- `/admin/applications` - View applications

---

## 💻 Installation

### Prerequisites Check:

```bash
# Check Python version (need 3.7+)
python --version

# Check pip
pip --version
```

### Step-by-Step:

**1. Download Project Files**
Extract all files to a folder called `hot-spot-kitchen`

**2. Install Dependencies**
```bash
cd hot-spot-kitchen
pip install -r requirements.txt
```

**3. Verify Structure**
Make sure you have:
```
templates/ (with 6 HTML files)
static/css/ (with style.css)
static/js/ (with script.js)
static/images/ (with all images)
app.py (in root)
```

**4. Run Server**
```bash
python app.py
```

**5. Access Website**
Open browser: `http://localhost:5000`

---

## 🎮 Usage

### Running the Server

**Start:**
```bash
python app.py
```

**Stop:**
Press `Ctrl + C` in terminal

### Testing Features:

**1. Navigation:**
- Click each menu item
- Resize browser to test mobile menu
- Check active page highlighting

**2. Home Page:**
- Wait for slider auto-advance
- Click prev/next buttons
- Click CTA buttons

**3. Menu Page:**
- Click each filter button
- Hover over menu items
- Check all categories

**4. Gallery (About Page):**
- Click any gallery image
- Check lightbox opens
- Click X or outside to close

**5. Forms:**
- Fill out reservation form
- Fill out career application
- Check validation errors
- Submit successfully

**6. Backend:**
- Check terminal for output
- Visit admin pages:
  - `http://localhost:5000/admin/reservations`
  - `http://localhost:5000/admin/applications`

---

## 🎨 Customization

### Changing Colors:

**Location:** `static/css/style.css` (Lines 15-25)

```css
:root {
    --primary-cream: #F5F1E8;    /* Main background */
    --warm-beige: #E8DCC4;       /* Secondary background */
    --olive-green: #6B7A3E;      /* Buttons, accents */
    --deep-red: #C4423C;         /* Primary CTA */
    --golden-yellow: #D4A847;    /* Decorative */
    --dark-brown: #3D2817;       /* Text, headers */
}
```

### Changing Restaurant Info:

**Location:** Footer in each HTML file

```html
<p>📍 Your Address Here</p>
<p>📞 Your Phone Number</p>
<p>✉️ your@email.com</p>
```

### Adding Menu Items:

**Location:** `templates/menu.html`

```html
<div class="menu-card fade-in-scroll" data-category="your-category">
    <div class="menu-image">
        <img src="static/images/new-item.jpg" alt="New Item">
    </div>
    <div class="menu-content">
        <h3>New Dish Name</h3>
        <p>Description of the dish</p>
        <span class="price">$9.99</span>
    </div>
</div>
```

### Changing Fonts:

**Location:** `static/css/style.css` (Line 2)

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

Then update in body/heading styles.

---

## 🌐 Deployment Options

### Option 1: PythonAnywhere (Free)

1. Create account: https://pythonanywhere.com
2. Upload files
3. Configure web app
4. Set Flask as framework
5. Deploy

### Option 2: Heroku

1. Install Heroku CLI
2. Create `Procfile`:
   ```
   web: python app.py
   ```
3. Deploy:
   ```bash
   heroku create
   git push heroku main
   ```

### Option 3: Replit

1. Create account: https://replit.com
2. Import from GitHub or upload
3. Click Run
4. Share link

### Option 4: GitHub Pages + Backend Separately

- Frontend: Host on GitHub Pages
- Backend: Host on PythonAnywhere/Heroku

---

## 📋 Assignment Submission

### What to Include:

**1. Project Files:**
```
hot-spot-kitchen.zip
├── templates/ (6 HTML files)
├── static/
│   ├── css/style.css
│   ├── js/script.js
│   └── images/ (all images)
├── app.py
├── requirements.txt
└── README.md
```

**2. Documentation:**
- README.md (main guide)
- SETUP_GUIDE.md (installation)
- This file (complete reference)

**3. Screenshots:**
Take screenshots of:
- Home page (desktop)
- Home page (mobile)
- Menu with filter active
- Reservation form
- About page gallery
- Terminal showing form submission
- Admin page with data

**4. Code Comments:**
Add comments to explain complex parts:

```javascript
// Filter menu items by category
filterBtns.forEach(btn => {
    // Event listener code...
});
```

### Presentation Order:

1. **Introduction (2 min)**
   - Project overview
   - Technologies used

2. **Live Demo (5 min)**
   - Show navigation
   - Demonstrate slider
   - Filter menu
   - Submit form
   - Show saved data

3. **Code Explanation (5 min)**
   - Show key HTML structure
   - Explain CSS animations
   - Demonstrate JS functionality
   - Show Python backend

4. **Responsive Design (2 min)**
   - Show mobile view
   - Explain breakpoints

5. **Q&A (1 min)**

### Grading Criteria Reference:

**HTML (25 points):**
- ✅ Semantic structure
- ✅ Multiple pages
- ✅ Forms with validation
- ✅ Proper attributes

**CSS (25 points):**
- ✅ Custom styling
- ✅ Responsive design
- ✅ Animations
- ✅ Theme consistency

**JavaScript (25 points):**
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Form validation
- ✅ Interactive features

**Python (25 points):**
- ✅ Flask setup
- ✅ Form handling
- ✅ Data storage
- ✅ Route management

---

## 🐛 Common Issues & Solutions

### Issue: Flask Not Found
```bash
pip install flask
```

### Issue: Port Already in Use
```bash
# Change port in app.py
app.run(port=5001)
```

### Issue: Images Not Loading
- Check file paths
- Use forward slashes: `static/images/file.jpg`
- Check file names (case-sensitive)

### Issue: Forms Not Submitting
- Check Flask server is running
- Verify form action URLs
- Check browser console for errors

### Issue: CSS Not Applying
- Clear browser cache
- Hard refresh: Ctrl+Shift+R
- Check file path in HTML

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| Pages | 6 |
| HTML Lines | ~1,200 |
| CSS Lines | ~1,500 |
| JavaScript Lines | ~400 |
| Python Lines | ~200 |
| Total Features | 15+ |
| Images Required | 35 |
| Forms | 2 |
| Routes | 8 |

---

## 🎓 Learning Outcomes

After completing this project, you will understand:

**HTML:**
- Semantic markup
- Form elements
- Linking pages
- Meta tags

**CSS:**
- Grid & Flexbox
- Responsive design
- Animations
- CSS variables

**JavaScript:**
- DOM manipulation
- Event handling
- Form validation
- Async operations

**Python:**
- Flask framework
- Routing
- Form data handling
- File operations

**Web Development:**
- Client-server architecture
- RESTful principles
- Responsive design
- User experience

---

## 📚 Additional Resources

### Documentation:
- HTML: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Flask: https://flask.palletsprojects.com/

### Tutorials:
- W3Schools: https://w3schools.com
- FreeCodeCamp: https://freecodecamp.org
- Flask Tutorial: https://flask.palletsprojects.com/tutorial/

### Tools:
- VS Code: https://code.visualstudio.com
- Chrome DevTools: Press F12
- Git: https://git-scm.com

---

## ✅ Final Checklist

Before submission:
- [ ] All 6 pages work correctly
- [ ] Navigation functional
- [ ] All images load
- [ ] Forms validate and submit
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Code commented
- [ ] README included
- [ ] Screenshots taken
- [ ] Zip file created

---

## 🎉 Congratulations!

You now have a complete, professional restaurant website!

**Key Achievements:**
✅ Multi-page responsive website
✅ All 4 languages implemented
✅ Interactive features working
✅ Backend form handling
✅ Clean, organized code
✅ Professional design

Good luck with your project! 🍀

---

**For questions or help:**
- Check README.md
- Check SETUP_GUIDE.md
- Check IMAGE_GUIDE.md
- Or ask your instructor

**Made with ❤️ for your success!**