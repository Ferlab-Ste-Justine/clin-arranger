// extract the inner_hits from ES response if available and copy its content where is should be normally:
// - inner_hits.donors (is from beforeES/nestedDonors)
// - (add more inner_hits bellow ...)
export default function (_, hits) {
    if (hits?.hits) {
        hits.hits = hits.hits?.map((hit) => {
            if (hit?.inner_hits) {
                const innerHitsDonors = hit?.inner_hits?.donors?.hits?.hits?.map((h)=> h._source)
                // don't replace donors if already exist for complex nested queries
                if (innerHitsDonors && innerHitsDonors.length > 0 && !hit._source.donors) {
                    hit._source.donors = structuredClone(innerHitsDonors);
                }
                delete hit.inner_hits;
            }
            return hit;
        });
        // console.log('[variantDonors]', hits)
    }
    return hits
}