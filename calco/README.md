# Calculator App with Supabase Integration

This is a comprehensive calculator web application with Supabase backend integration for user authentication and data storage.

## Features

- **Scientific Calculator**: Full-featured scientific calculator with memory functions and keyboard support
- **Unit Converter**: Convert between various units across multiple categories
- **Formula Library**: Browse and save useful formulas across different fields
- **Health Calculators**: BMI, Calorie, and Fitness calculators
- **User Authentication**: Secure signup, login, and profile management
- **Data Persistence**: Save calculation history, favorite formulas, and user settings
- **Responsive Design**: Works on all device sizes
- **Dark/Light Theme**: Toggle between themes based on user preference

## Setting Up Supabase Integration

To properly set up the Supabase backend for this application, follow these steps:

### 1. Create a Supabase Project

1. Sign up or log in at [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon/public key (found in Project Settings > API)

### 2. Update Configuration

In the file `js/supabase-config.js`, we've replaced the placeholder values with the actual Supabase credentials:

```js
const SUPABASE_URL = 'https://vrrkqbeojrglyjgqzkxb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycmtxYmVvanJnbHlqZ3F6a3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTc4NjEsImV4cCI6MjA1OTM3Mzg2MX0.o8k3kaE8T3gSc_OdkLY6kOZjfrWLj2y8HMUDP3vw-FY';
```

### 3. Set Up Database Tables

Execute the SQL in `database-schema.sql` in the Supabase SQL Editor to create the necessary tables:

- `calculations`: Stores user calculation history
- `formula_favorites`: Stores user's favorite formulas
- `user_settings`: Stores user preferences like theme and decimal places

### 4. Configure Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure Site URL to match your deployment URL
3. Enable Email provider for authentication
4. Optionally, configure OAuth providers like Google, Github, etc.

### 5. Set Up Storage Buckets (Optional)

If you want to allow users to upload profile pictures:

1. In Supabase, go to Storage
2. Create a new bucket called `avatars`
3. Set up appropriate RLS policies for access control

## Local Development

1. Clone this repository
2. Configure Supabase credentials as described above
3. Open `index.html` in your browser or use a local server

## Deployment

You can deploy this application to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any web server that can serve static files

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Supabase for backend services
- FontAwesome for icons
- CSS Grid and Flexbox for layouts

## License

MIT License - See LICENSE file for details 