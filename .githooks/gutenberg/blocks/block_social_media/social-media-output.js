/**
 * Set social media output.
 * @param {object} props - The block object.
 * @return {string} The social media output container.
 */
function SocialOptionsOutput( props ) {
	if ( props.attributes.facebook ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-facebook-f"></i></mark>
		);
	}

	if ( props.attributes.twitter ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-twitter"></i></mark>
		);
	}

	if ( props.attributes.instagram ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-instagram"></i></mark>
		);
	}

	if ( props.attributes.linkedin ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-linkedin-in"></i></mark>
		);
	}

	if ( props.attributes.pinterest ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-pinterest-p"></i></mark>
		);
	}

	if ( props.attributes.medium ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-medium-m"></i></mark>
		);
	}

	if ( props.attributes.youtube ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-youtube"></i></mark>
		);
	}

	if ( props.attributes.github ) {
		return (
			<mark className="social-icon margin-global-right-2x"><i className="fab fa-github"></i></mark>
		);
	}
}

export default SocialOptionsOutput;