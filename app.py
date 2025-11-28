from flask import Flask, request, jsonify, render_template, redirect, url_for
from datetime import datetime
import sqlite3
import os

app = Flask(__name__)

# Database Setup
# Check if running on Vercel (or any read-only env where we need to use /tmp)
if os.environ.get('VERCEL'):
    DB_NAME = '/tmp/kitchen.db'
else:
    DB_NAME = 'kitchen.db'

def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        cursor = conn.cursor()
        # Reservations Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                date TEXT NOT NULL,
                time TEXT NOT NULL,
                guests INTEGER NOT NULL,
                occasion TEXT,
                special_request TEXT,
                timestamp TEXT NOT NULL
            )
        ''')
        # Applications Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                position TEXT NOT NULL,
                experience TEXT,
                availability TEXT,
                message TEXT,
                timestamp TEXT NOT NULL
            )
        ''')
        # Contact Messages Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT,
                message TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        ''')
        conn.commit()

# Initialize DB on startup
init_db()

# --- ROUTES ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/menu.html')
def menu():
    return render_template('menu.html')

@app.route('/delivery.html')
def delivery():
    return render_template('delivery.html')

@app.route('/careers.html')
def careers():
    return render_template('careers.html')

@app.route('/reservation.html')
def reservation():
    return render_template('reservation.html')

# ===== RESERVATION FORM HANDLER =====
@app.route('/submit-reservation', methods=['POST'])
def submit_reservation():
    try:
        data = request.form
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO reservations (first_name, last_name, email, phone, date, time, guests, occasion, special_request, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data.get('firstName'), data.get('lastName'), data.get('email'), data.get('phone'),
                data.get('date'), data.get('time'), data.get('guests'),
                data.get('occasion', 'Not specified'), data.get('specialRequest', 'None'),
                timestamp
            ))
            conn.commit()
        
        return jsonify({
            'status': 'success',
            'message': f'Thank you, {data.get("firstName")}! Your reservation has been confirmed.',
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Database error.'}), 500

# ===== CAREER APPLICATION HANDLER =====
@app.route('/submit-career', methods=['POST'])
def submit_career():
    try:
        data = request.form
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO applications (first_name, last_name, email, phone, position, experience, availability, message, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data.get('firstName'), data.get('lastName'), data.get('email'), data.get('phone'),
                data.get('position'), data.get('experience', '0'), data.get('availability'),
                data.get('message'), timestamp
            ))
            conn.commit()
        
        return jsonify({
            'status': 'success',
            'message': f'Thank you for your application, {data.get("firstName")}! We will review it soon.',
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Database error.'}), 500

# ===== CONTACT FORM HANDLER =====
@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    try:
        data = request.form
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        with sqlite3.connect(DB_NAME) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO contacts (name, email, subject, message, timestamp)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                data.get('name'), data.get('email'), data.get('subject'),
                data.get('message'), timestamp
            ))
            conn.commit()
        
        return jsonify({
            'status': 'success',
            'message': f'Thank you, {data.get("name")}! We have received your message.'
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Database error.'}), 500

# ===== ADMIN ROUTES (Simple View) =====
@app.route('/admin/reservations')
def view_reservations():
    try:
        with sqlite3.connect(DB_NAME) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM reservations ORDER BY timestamp DESC')
            rows = cursor.fetchall()
            
            html = "<h1>Reservations</h1><table border='1'><tr><th>ID</th><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Phone</th></tr>"
            for row in rows:
                html += f"<tr><td>{row['id']}</td><td>{row['first_name']} {row['last_name']}</td><td>{row['date']}</td><td>{row['time']}</td><td>{row['guests']}</td><td>{row['phone']}</td></tr>"
            html += "</table>"
            return html
    except Exception as e:
        return f"Error: {e}"

@app.route('/admin/applications')
def view_applications():
    try:
        with sqlite3.connect(DB_NAME) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM applications ORDER BY timestamp DESC')
            rows = cursor.fetchall()
            
            html = "<h1>Job Applications</h1><table border='1'><tr><th>ID</th><th>Name</th><th>Position</th><th>Experience</th><th>Phone</th></tr>"
            for row in rows:
                html += f"<tr><td>{row['id']}</td><td>{row['first_name']} {row['last_name']}</td><td>{row['position']}</td><td>{row['experience']}</td><td>{row['phone']}</td></tr>"
            html += "</table>"
            return html
    except Exception as e:
        return f"Error: {e}"

# ===== ERROR HANDLERS =====
@app.errorhandler(404)
def not_found(e):
    return "<h1>404 - Page Not Found</h1><p>The page you're looking for doesn't exist.</p>", 404

@app.errorhandler(500)
def server_error(e):
    return "<h1>500 - Server Error</h1><p>Something went wrong on our end. Please try again later.</p>", 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
