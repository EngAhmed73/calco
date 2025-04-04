// Auth.js - Authentication handling with Supabase integration

document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication state
    checkAuthState();
    
    // Add event listeners for forms
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Add event listeners for social auth
    const googleSignIn = document.getElementById('googleSignIn');
    if (googleSignIn) {
        googleSignIn.addEventListener('click', handleGoogleSignIn);
    }
    
    const googleSignUp = document.getElementById('googleSignUp');
    if (googleSignUp) {
        googleSignUp.addEventListener('click', handleGoogleSignIn);
    }
});

// Check if user is already logged in
async function checkAuthState() {
    const supabase = initSupabase();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        // User is logged in, record the visit
        await recordUserVisit(user);
        
        // Redirect if on auth pages
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'index.html';
        }
        
        // Update UI for logged in user
        updateUIForAuthenticatedUser(user);
    } else {
        // User is not logged in
        updateUIForUnauthenticatedUser();
    }
}

// Record user visit in the database
async function recordUserVisit(user) {
    if (!user) return;
    
    try {
        const supabase = initSupabase();
        const email = user.email || '';
        const name = getUserDisplayName(user);
        
        const { data, error } = await supabase
            .from('user_visits')
            .insert({
                user_id: user.id,
                email: email,
                name: name
            });
            
        if (error) {
            console.error('Error recording user visit:', error);
        }
    } catch (err) {
        console.error('Failed to record user visit:', err);
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    if (!email || !password) {
        showMessage('Please enter both email and password.', 'error');
        return;
    }
    
    try {
        const supabase = initSupabase();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        // Record the user visit
        if (data.user) {
            await recordUserVisit(data.user);
        }
        
        // Login successful
        if (rememberMe) {
            localStorage.setItem('remember_auth', 'true');
        }
        
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        console.error('Login error:', error);
        let errorMsg = 'Invalid email or password. Please try again.';
        
        // Handle specific error messages
        if (error.message) {
            if (error.message.includes('email')) {
                errorMsg = 'Invalid email format or account does not exist.';
            } else if (error.message.includes('password')) {
                errorMsg = 'Incorrect password. Please try again.';
            } else if (error.message.includes('network')) {
                errorMsg = 'Network error. Please check your internet connection.';
            } else if (error.message.includes('auth')) {
                errorMsg = 'Authentication failed. Please try again.';
            } else {
                errorMsg = error.message;
            }
        }
        
        showMessage(errorMsg, 'error');
    }
}

// Handle signup form submission
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('terms').checked;
    
    // Validate inputs
    if (!agreeTerms) {
        showMessage('You must agree to the Terms of Service.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    try {
        const supabase = initSupabase();
        
        // Create user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });
        
        if (error) {
            console.error('Signup error:', error);
            throw error;
        }
        
        // Create default settings for the user
        if (data && data.user) {
            try {
                await supabase
                    .from('user_settings')
                    .insert({
                        user_id: data.user.id,
                        theme: 'dark',
                        decimal_places: 4,
                        angle_unit: 'degrees'
                    });
                    
                // Record the user visit
                await recordUserVisit(data.user);
                
                // Signup successful
                showMessage('Account created successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } catch (settingsError) {
                console.error('Error creating settings:', settingsError);
                // Still consider signup successful even if settings creation fails
                showMessage('Account created successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        } else {
            // This could be an email confirmation case
            showMessage('Please check your email to confirm your account.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        }
    } catch (error) {
        console.error('Signup error:', error);
        let errorMsg = 'Error creating account. Try a different email.';
        
        // Handle specific error messages
        if (error.message) {
            if (error.message.includes('email')) {
                errorMsg = 'This email is already registered or is invalid.';
            } else if (error.message.includes('password')) {
                errorMsg = 'Password is too weak. Use at least 6 characters.';
            } else {
                errorMsg = error.message;
            }
        }
        
        showMessage(errorMsg, 'error');
    }
}

// Handle Google Sign In/Up
async function handleGoogleSignIn() {
    const supabase = initSupabase();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/index.html'
        }
    });
    
    if (error) {
        console.error('Google sign in error:', error);
        showMessage('Error signing in with Google. Please try again.', 'error');
    }
}

// Update UI for authenticated user
function updateUIForAuthenticatedUser(user) {
    // Look for navigation elements
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Get or create user profile link
        let userProfileLink = navLinks.querySelector('#user-profile');
        if (!userProfileLink) {
            // Create user profile element
            const loginLink = navLinks.querySelector('a[href="login.html"]');
            const signupLink = navLinks.querySelector('a[href="signup.html"]');
            
            if (loginLink) {
                loginLink.remove();
            }
            
            if (signupLink) {
                signupLink.remove();
            }
            
            // Add user profile and logout links
            const userDisplay = document.createElement('div');
            userDisplay.className = 'user-profile';
            userDisplay.innerHTML = `
                <a href="profile.html" id="user-profile">${getUserDisplayName(user)}</a>
                <a href="#" id="logout-btn">Sign Out</a>
            `;
            navLinks.appendChild(userDisplay);
            
            // Add event listener for logout
            const logoutBtn = userDisplay.querySelector('#logout-btn');
            logoutBtn.addEventListener('click', handleLogout);
        }
    }
}

// Update UI for unauthenticated user
function updateUIForUnauthenticatedUser() {
    // Implementation depends on your UI structure
}

// Helper function to get user display name
function getUserDisplayName(user) {
    if (user.user_metadata && user.user_metadata.full_name) {
        return user.user_metadata.full_name;
    }
    
    // Fallback to email
    return user.email.split('@')[0];
}

// Handle logout
async function handleLogout(event) {
    event.preventDefault();
    
    const supabase = initSupabase();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Logout error:', error);
        showMessage('Error signing out. Please try again.', 'error');
    } else {
        // Clear any stored auth
        localStorage.removeItem('remember_auth');
        
        showMessage('Signed out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Show message to user
function showMessage(message, type) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.auth-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'auth-message';
        
        // Find a suitable container
        const messageContainer = document.querySelector('.auth-message-container');
        const form = document.querySelector('.auth-form');
        
        if (messageContainer) {
            messageContainer.innerHTML = ''; // Clear previous messages
            messageContainer.appendChild(messageElement);
        } else if (form) {
            form.insertBefore(messageElement, form.firstChild);
        } else {
            document.body.appendChild(messageElement);
        }
    }
    
    // Set message and type
    messageElement.textContent = message;
    messageElement.className = `auth-message ${type}`;
    
    // Reset button state if there's an error
    if (type === 'error') {
        const signupButton = document.getElementById('signupButton');
        if (signupButton) {
            signupButton.innerHTML = 'Create Account';
            signupButton.disabled = false;
        }
        
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.innerHTML = 'Sign In';
            loginButton.disabled = false;
        }
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 5000);
}
