/**
 * Set video output.
 * @param {Object} props - The block object.
 * @return {Element|undefined} The video output container, or undefined when there is no background video.
 */
function BackgroundOptionsVideoOutput( props ) {
	if (
		'video' === props.attributes.backgroundType &&
		props.attributes.backgroundVideo
	) {
		return (
			(
				<video
					className="video-container video-container-overlay"
					autoPlay="true"
					loop="true"
					muted="true"
				>
					<source
						type="video/mp4"
						src={ props.attributes.backgroundVideo.url }
					/>
				</video>
			 ),
			(
				<div className="video-thumbnail-wrapper">
					{ props.attributes.backgroundVideoThumb && (
						// eslint-disable-next-line jsx-a11y/alt-text -- saved markup must stay identical for block validation; alt text is a separate content change
						<img
							src={ props.attributes.backgroundVideoThumb.url }
						/>
					) }
				</div>
			 )
		 );
	}
}

export default BackgroundOptionsVideoOutput;
