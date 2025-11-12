/**
 * Set User Role in Clerk
 * 
 * This utility function sets the user role in Clerk's publicMetadata.
 * Since Clerk's React SDK doesn't allow setting metadata client-side,
 * this requires a backend API endpoint.
 * 
 * For production, set up a backend API route that uses Clerk Management API.
 */

/**
 * Set user role via backend API
 * @param {string} userId - Clerk user ID
 * @param {string} role - Role to set ('student' or 'admin')
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const setUserRole = async (userId, role) => {
  try {
    // Call your backend API endpoint
    // Replace with your actual API endpoint
    const response = await fetch('/api/users/set-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to set user role');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error setting user role:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Store role selection temporarily in localStorage
 * This is used before the user signs up/logs in
 */
export const storeRoleSelection = (role) => {
  try {
    localStorage.setItem('selectedRole', role);
    return true;
  } catch (error) {
    console.error('Error storing role selection:', error);
    return false;
  }
};

/**
 * Get stored role selection from localStorage
 */
export const getStoredRoleSelection = () => {
  try {
    return localStorage.getItem('selectedRole') || 'student';
  } catch (error) {
    console.error('Error getting stored role selection:', error);
    return 'student';
  }
};

/**
 * Clear stored role selection
 */
export const clearStoredRoleSelection = () => {
  try {
    localStorage.removeItem('selectedRole');
    return true;
  } catch (error) {
    console.error('Error clearing role selection:', error);
    return false;
  }
};

export default {
  setUserRole,
  storeRoleSelection,
  getStoredRoleSelection,
  clearStoredRoleSelection,
};

