// Generate a secure random password with a mix of characters
export const ADMIN_PASSWORD = "xT9p#2Lq7@Zs5*Kf8!Vb3"; // This is a randomly generated secure password

/**
 * Validates if the provided password matches the admin password
 */
export function validateAdminPassword(password: string): boolean {
    return password === ADMIN_PASSWORD;
}

/**
 * Checks if the current request has a valid admin password
 */
export function isAdminRequest(searchParams: {
    [key: string]: string | string[] | undefined;
}): boolean {
    const password = searchParams.password;
    // Handle both string and string[] types
    const passwordValue = Array.isArray(password) ? password[0] : password;
    return passwordValue ? validateAdminPassword(passwordValue) : false;
}
