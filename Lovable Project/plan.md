Plan to set the Amazon affiliate tag and verify all product links append it.

1. Store the affiliate tag
   - Set the environment variable `VITE_AMAZON_AFFILIATE_TAG` to `coolgadge0c40-20` using the project secrets tool so the Vite build picks it up.

2. Verify the code path
   - Confirm `src/lib/affiliate.ts` reads `import.meta.env.VITE_AMAZON_AFFILIATE_TAG` and that `withAffiliateTag()` only appends `?tag=` to Amazon URLs.
   - Confirm `src/components/ProductCard.tsx`, `src/routes/products.$slug.tsx`, and `src/routes/pinterest.tsx` wrap every product CTA with `withAffiliateTag(product.amazonUrl)`.

3. Validate the build
   - Run the dev/typecheck build to make sure no imports or types break after the env update.

4. Show a working example URL
   - Example output: `https://www.amazon.com/dp/B0EXAMPLE?tag=coolgadge0c40-20`

No other UI or business-logic changes are needed; the existing code already supports configurable affiliate URLs through the `amazonUrl` field.