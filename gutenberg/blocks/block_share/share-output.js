/**
 * Set share output.
 * @param {object} props - The block object.
 * @return {string} The social media output container.
 */
function ShareOutput( props ) {
	if ( props.attributes.facebook ) {
		return (
			<mark className="social-icon margin-right-2x"><i className="fab fa-facebook-f"></i></mark>
		);
	}

	if ( props.attributes.twitter ) {
		return (
			<mark className="social-icon margin-right-2x"><i className="fab fa-twitter"></i></mark>
		);
	}

	if ( props.attributes.linkedin ) {
		return (
			<mark className="social-icon margin-right-2x"><i className="fab fa-linkedin-in"></i></mark>
		);
	}

	if ( props.attributes.email ) {
		return (
			<mark className="social-icon margin-right-2x"><i className="far fa-email"></i></mark>
		);
	}

}

export default ShareOutput;