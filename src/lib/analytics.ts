/**
 * Track custom events
 * Usage: trackEvent('contact_form_submit', { product: 'restauManager' })
 */
export function trackEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    if (window.va) {
      window.va('event', { eventName, data });
    }
  }
}
