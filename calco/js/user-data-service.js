// User Data Service
// This file provides functions for advanced user data operations

// Get all user visits for the current user
async function getUserVisits() {
    try {
        const supabase = initSupabase();
        
        const { data, error } = await supabase
            .from('user_visits')
            .select('*')
            .order('visit_time', { ascending: false });
            
        if (error) {
            console.error('Error fetching user visits:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('Error in getUserVisits:', error);
        return [];
    }
}

// Get user visit statistics
async function getUserVisitStats() {
    try {
        const supabase = initSupabase();
        
        // Get first visit
        const { data: firstVisit, error: firstError } = await supabase
            .from('user_visits')
            .select('visit_time')
            .order('visit_time', { ascending: true })
            .limit(1)
            .single();
            
        // Get total visits count
        const { count, error: countError } = await supabase
            .from('user_visits')
            .select('id', { count: 'exact', head: true });
            
        // Get visits in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { count: recentCount, error: recentError } = await supabase
            .from('user_visits')
            .select('id', { count: 'exact', head: true })
            .gte('visit_time', sevenDaysAgo.toISOString());
            
        if (firstError || countError || recentError) {
            console.error('Error fetching visit statistics');
            return null;
        }
        
        return {
            firstVisit: firstVisit?.visit_time || null,
            totalVisits: count || 0,
            recentVisits: recentCount || 0
        };
    } catch (error) {
        console.error('Error in getUserVisitStats:', error);
        return null;
    }
}

// For admin users - get all user visits across the system
async function getAllUsersVisits(startDate, endDate) {
    try {
        const supabase = initSupabase();
        
        // Check if user has admin access
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: 'Not authenticated' };
        
        // Start building the query
        let query = supabase
            .from('user_visits')
            .select('*')
            .order('visit_time', { ascending: false });
            
        // Add date filters if provided
        if (startDate) {
            query = query.gte('visit_time', new Date(startDate).toISOString());
        }
        
        if (endDate) {
            // Add one day to include the end date fully
            const endDateTime = new Date(endDate);
            endDateTime.setDate(endDateTime.getDate() + 1);
            query = query.lt('visit_time', endDateTime.toISOString());
        }
        
        // Execute the query
        const { data, error } = await query;
            
        if (error) {
            if (error.code === 'PGRST116') {
                return { error: 'Not authorized to view all visits' };
            }
            
            console.error('Error fetching all users visits:', error);
            return { error: error.message };
        }
        
        return { data: data || [] };
    } catch (error) {
        console.error('Error in getAllUsersVisits:', error);
        return { error: 'Server error' };
    }
}

// Export functions if needed in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getUserVisits,
        getUserVisitStats,
        getAllUsersVisits
    };
} 