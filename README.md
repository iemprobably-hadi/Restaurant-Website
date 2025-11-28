# 🍔 Hot Spot Kitchen - Restaurant Website

A fully responsive, multi-page restaurant website built with HTML, CSS, JavaScript, and Python Flask.

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Pages Overview](#pages-overview)
- [Color Palette](#color-palette)
- [Credits](#credits)

## ✨ Features

- **Fully Responsive Design** - Works on all devices
- **Interactive Navigation** - Mobile-friendly hamburger menu
- **Image Slider** - Showcases featured dishes
- **Menu Filtering** - Filter menu items by category
- **Gallery Lightbox** - Click to view images in full screen
- **Form Validation** - JavaScript validation for all forms
- **Python Backend** - Flask handles form submissions
- **Scroll Animations** - Smooth fade-in effects
- **Rustic Theme** - Warm, welcoming design

## 🛠️ Technology Stack

- **HTML5** - Structure and content
- **CSS3** - Styling, animations, and responsive design
- **JavaScript** - Interactivity and form validation
- **Python 3.x** - Backend form handling
- **Flask** - Web framework

## 📁 Project Structure

```
hot-spot-kitchen/
│
├── app.py                  # Flask backend application
├── README.md               # This file
├── requirements.txt        # Python dependencies
│
├── templates/              # HTML files
│   ├── index.html         # Home page
│   ├── about.html         # About Us page
│   ├── menu.html          # Menu page
│   ├── delivery.html      # Delivery page
│   ├── careers.html       # Careers page
│   └── reservation.html   # Reservation page
│
├── static/                # Static assets
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── script.js      # JavaScript file
│   └── images/            # Image assets
│       ├── logo.png
│       ├── hero-bg.jpg
│       ├── dish1.jpg
│       ├── dish2.jpg
│       ├── dish3.jpg
│       ├── burger.jpg
│       ├── pizza.jpg
│       ├── biryani.jpg
│       ├── karahi.jpg
│       └── ... (more images)
│
└── data/                  # Form submissions storage
    ├── reservations.txt
    ├── applications.txt
    └── contacts.txt
```

## 🚀 Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Step 1: Download/Clone the Project
Download and extract the project files or clone from repository.

### Step 2: Install Flask
Open terminal/command prompt in the project directory and run:

```bash
pip install flask
```

Or use the requirements.txt file:

```bash
pip install -r requirements.txt
```

### Step 3: Set Up Directory Structure
Make sure your directory structure matches the one shown above. The Flask app expects:
- HTML files in `templates/` folder
- CSS in `static/css/` folder
- JS in `static/js/` folder
- Images in `static/images/` folder

## 📖 Usage

### Running the Server

1. Open terminal/command prompt in the project directory
2. Run the Flask application:

```bash
python app.py
```

3. Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

4. To stop the server, press `CTRL+C` in the terminal

### Accessing Admin Pages

View submitted reservations:
```
http://127.0.0.1:5000/admin/reservations
```

View job applications:
```
http://127.0.0.1:5000/admin/applications
```

## 📄 Pages Overview

### 1. Home Page (index.html)
- Hero banner with call-to-action buttons
- About preview section
- Featured dishes slider
- Call-to-action section

### 2. About Us Page (about.html)
- Meet the team section (3 team members)
- Customer reviews (6 reviews)
- Restaurant photo gallery (6 photos with lightbox)

### 3. Menu Page (menu.html)
- Filter buttons for categories
- 5 Categories:
  - Fast Food (4 items)
  - Desi Route (4 items)
  - Spicy Route (4 items)
  - Drinks Route (4 items)
  - Dessert Route (4 items)

### 4. Delivery Page (delivery.html)
- How it works (4 steps)
- Delivery zones (3 zones with pricing)
- Order now options (4 platforms)
- FAQ section

### 5. Careers Page (careers.html)
- Why work with us (6 benefits)
- Current job openings (6 positions)
- Job application form with validation

### 6. Reservation Page (reservation.html)
- Restaurant contact information
- Table reservation form
- Reservation guidelines

## 🎨 Color Palette

```css
Primary Cream:   #F5F1E8  /* Backgrounds */
Warm Beige:      #E8DCC4  /* Secondary backgrounds */
Olive Green:     #6B7A3E  /* Accents, links */
Deep Red:        #C4423C  /* Primary buttons, highlights */
Golden Yellow:   #D4A847  /* Decorative elements */
Dark Brown:      #3D2817  /* Text, headings */
White:           #FFFFFF  /* Clean backgrounds */
```

## 🎯 Features Breakdown

### JavaScript Features
- ✅ Mobile hamburger menu toggle
- ✅ Image slider with auto-advance
- ✅ Menu category filtering
- ✅ Gallery lightbox
- ✅ Form validation (reservation & career)
- ✅ Scroll animations (fade-in on scroll)
- ✅ Smooth scrolling
- ✅ Scroll-to-top button

### Python Backend Features
- ✅ Form data handling (POST requests)
- ✅ Data storage in text files
- ✅ Console logging
- ✅ Admin pages to view submissions
- ✅ Error handling
- ✅ Timestamp generation

## 🔧 Customization

### Changing Colors
Edit `static/css/style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-cream: #F5F1E8;
    --deep-red: #C4423C;
    /* ... other colors ... */
}
```

### Adding More Menu Items
Edit `templates/menu.html` and add more menu cards:

```html
<div class="menu-card fade-in-scroll" data-category="your-category">
    <div class="menu-image">
        <img src="static/images/your-image.jpg" alt="Dish Name">
    </div>
    <div class="menu-content">
        <h3>Dish Name</h3>
        <p>Description</p>
        <span class="price">$9.99</span>
    </div>
</div>
```

### Modifying Forms
Forms can be customized in:
- `templates/reservation.html` - Reservation form
- `templates/careers.html` - Job application form

Backend handling is in `app.py` under the respective route functions.

## 📱 Responsive Breakpoints

- **Desktop**: 992px and above
- **Tablet**: 768px - 991px
- **Mobile**: Below 768px

## 🐛 Troubleshooting

### Issue: Images not loading
**Solution**: Make sure all images are in the `static/images/` folder and paths in HTML use `static/images/filename.jpg`

### Issue: Forms not submitting
**Solution**: 
1. Check that Flask server is running
2. Verify form action URLs match routes in `app.py`
3. Check browser console for JavaScript errors

### Issue: CSS not applying
**Solution**: Clear browser cache or use hard refresh (Ctrl+Shift+R)

### Issue: Python module not found
**Solution**: Install Flask: `pip install flask`

## 📝 TODO / Future Enhancements

- [ ] Add database integration (SQLite/MySQL)
- [ ] Email confirmation system
- [ ] Online ordering system
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Real-time table availability
- [ ] Customer review submission

## 📞 Support

For questions or issues, please contact:
- Email: info@hotspotkitchen.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is for educational purposes. Feel free to modify and use for your own projects.

## 👨‍💻 Credits

**Developed by**: Hot Spot Kitchen Development Team
**Design Theme**: Rustic, Warm, Homestyle
**Fonts**: Google Fonts (Playfair Display, Poppins)

---

**Enjoy building with Hot Spot Kitchen! 🍔🍕🍰**