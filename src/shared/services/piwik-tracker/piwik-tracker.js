/**
 *
 * @param {array} data - Array of tracker event. For more info on the allowed events, see
 * https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-events
 */
export default function piwikTracker(data) {
  window._paq.push(data);
}

export function trackPageNavigation() {
  piwikTracker(['setDocumentTitle', window.document.title]);
  piwikTracker(['setCustomUrl', window.location.href]);
  piwikTracker(['trackPageView']);
}
