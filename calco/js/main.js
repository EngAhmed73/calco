// Record anonymous visit if no user is logged in
async function recordAnonymousVisit() {
    try {
        const supabase = initSupabase();
        
        // Check if user is already logged in
        const { data: { user } } = await supabase.auth.getUser();
        
        // If user is logged in, recordUserVisit in auth.js will handle it
        if (user) return;
        
        // Store as anonymous visit with generated session ID
        const sessionId = localStorage.getItem('anonymous_session_id') || 
            'anon_' + Math.random().toString(36).substring(2, 15);
            
        // Save session ID for future visits
        localStorage.setItem('anonymous_session_id', sessionId);
        
        // Record visit with anonymous details
        const { error } = await supabase
            .from('anonymous_visits')
            .insert({
                session_id: sessionId,
                user_agent: navigator.userAgent,
                referrer: document.referrer || 'direct',
                page: window.location.pathname
            });
            
        if (error) {
            console.error('Error recording anonymous visit:', error);
        }
    } catch (err) {
        console.error('Failed to record anonymous visit:', err);
    }
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Record visit for analytics
    recordAnonymousVisit();
    
    // Rest of initialization code
    // ...
}); 