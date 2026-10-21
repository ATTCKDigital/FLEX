/**
 * Editor previews for the slides: attachment ID → media data from the
 * `core` store. Nothing here is stored in the block (no URLs in attributes).
 */
const { useSelect } = wp.data;
const { useMemo } = wp.element;

/**
 * Preview data for one attachment record (or the missing / loading state).
 *
 * @param {number}      id       Attachment ID.
 * @param {Object|null} record   `getMedia( id )` result.
 * @param {boolean}     resolved Whether the request has finished.
 * @return {Object} `{ id, url, thumbUrl, width, height, alt, missing, loading }`.
 */
function toSlideMedia( id, record, resolved ) {
	if ( ! record ) {
		return { id, missing: resolved, loading: ! resolved };
	}

	const details = record.media_details || {};
	const sizes = details.sizes || {};
	const thumb = sizes.medium || sizes.full || {};

	return {
		id,
		url: record.source_url,
		thumbUrl: thumb.source_url || record.source_url,
		width: details.width || 0,
		height: details.height || 0,
		alt: record.alt_text || '',
		missing: record.media_type && record.media_type !== 'image',
		loading: false,
	};
}

/**
 * @param {Array<{id:number}>} slides The `slides` attribute.
 * @return {Object<number, Object>} Preview data keyed by attachment ID.
 */
export default function useSlideMedia( slides ) {
	const key = slides.map( ( slide ) => slide.id ).join( ',' );

	// Store records are stable references, so the shallow compare holds.
	const { records, resolved } = useSelect(
		( select ) => {
			const core = select( 'core' );
			const ids = key ? key.split( ',' ).map( Number ) : [];
			const out = { records: {}, resolved: '' };

			ids.forEach( ( id ) => {
				out.records[ id ] = id ? core.getMedia( id ) || null : null;
				out.resolved +=
					! id || core.hasFinishedResolution( 'getMedia', [ id ] )
						? '1'
						: '0';
			} );

			return out;
		},
		[ key ]
	);

	return useMemo( () => {
		const ids = key ? key.split( ',' ).map( Number ) : [];
		const media = {};

		ids.forEach( ( id, i ) => {
			media[ id ] = toSlideMedia(
				id,
				records[ id ],
				resolved[ i ] === '1'
			);
		} );

		return media;
	}, [ key, records, resolved ] );
}
