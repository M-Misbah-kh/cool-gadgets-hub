// Central place to configure Amazon affiliate links.
// Set your Associates tag here (or via VITE_AMAZON_AFFILIATE_TAG env var).
// Example: "coolgadgets-20"
export const AMAZON_AFFILIATE_TAG: string =
  (import.meta.env.VITE_AMAZON_AFFILIATE_TAG as string | undefined) ?? "coolgadge0c40-20";

/**
 * Append the configured affiliate tag to an Amazon product URL.
 * Safe to call with any URL — non-Amazon URLs are returned unchanged.
 */
export function withAffiliateTag(url: string, tag: string = AMAZON_AFFILIATE_TAG): string {
  if (!url || !tag) return url;
  try {
    const u = new URL(url);
    if (!/(^|\.)amazon\./i.test(u.hostname)) return url;
    u.searchParams.set("tag", tag);
    return u.toString();
  } catch {
    return url;
  }
}
