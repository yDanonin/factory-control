/**
 * An array with routes that are used for authentication
 * @type { string[] }
 * */
export const authRoutes = ["/auth/login", "/auth/reset"];

/**
 * Prefix for API authentication
 * @type { string }
 * */
export const apiAuthPrefix = "/api/authentication";

/**
 * Default redirect path after logging in
 * @type { string }
 * */
export const DEFAULT_LOGIN_REDIRECT = "/register/customers";
