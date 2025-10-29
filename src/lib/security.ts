/**
 * Security utilities for input validation and sanitization
 */

/**
 * Validates and sanitizes URL parameters
 * @param value - The URL parameter value to validate
 * @returns Sanitized string safe for URL usage
 */
export const sanitizeUrlParam = (value: string): string => {
  // Remove potentially dangerous characters
  const sanitized = value.replace(/[<>\"']/g, '');
  // Limit length
  return sanitized.slice(0, 200);
};

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

/**
 * Validates phone number format (international format)
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Allow only digits, +, spaces, and hyphens
  const phoneRegex = /^[\d\s+()-]+$/;
  return phoneRegex.test(phone) && phone.length <= 20;
};

/**
 * Sanitizes text input by limiting length and removing dangerous characters
 * @param text - Input text to sanitize
 * @param maxLength - Maximum allowed length
 * @returns Sanitized text
 */
export const sanitizeTextInput = (text: string, maxLength: number = 1000): string => {
  // Remove HTML tags and limit length
  const withoutTags = text.replace(/<[^>]*>/g, '');
  return withoutTags.slice(0, maxLength).trim();
};

/**
 * Validates video ID format
 * @param videoId - Video ID to validate
 * @returns Boolean indicating if video ID is valid
 */
export const isValidVideoId = (videoId: string): boolean => {
  // Allow only alphanumeric characters, hyphens, and underscores
  const videoIdRegex = /^[a-zA-Z0-9_-]+$/;
  return videoIdRegex.test(videoId) && videoId.length <= 50;
};

/**
 * Rate limiting helper - tracks API calls
 */
class RateLimiter {
  private timestamps: Map<string, number[]> = new Map();
  
  /**
   * Check if an action is rate limited
   * @param key - Unique identifier for the action
   * @param maxRequests - Maximum number of requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Boolean indicating if action should be allowed
   */
  checkLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const timestamps = this.timestamps.get(key) || [];
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(t => now - t < windowMs);
    
    if (validTimestamps.length >= maxRequests) {
      return false;
    }
    
    validTimestamps.push(now);
    this.timestamps.set(key, validTimestamps);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Content Security Policy headers configuration
 */
export const cspHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com",
    "frame-src 'self' https://hglink.to https://short.icu https://www.mediafire.com",
    "media-src 'self' https: blob:",
  ].join('; ')
};
