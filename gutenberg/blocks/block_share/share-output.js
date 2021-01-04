/**
 * Set share output.
 * @param {object} props - The block object.
 * @return {string} The social media output container.
 */
function ShareOutput( props ) {
	var facebookLink;
	var twitterLink;
	var linkedinLink;
	var emailLink;

	if ( props.attributes.facebook ) {
		facebookLink = <mark className="social-icon margin-right-2x"><i className="fab fa-facebook-f"></i></mark>;
	}

	if ( props.attributes.twitter ) {
		twitterLink = <mark className="social-icon margin-right-2x"><i className="fab fa-twitter"></i></mark>;
	}

	if ( props.attributes.linkedin ) {
		linkedinLink = <mark className="social-icon margin-right-2x"><i className="fab fa-linkedin-in"></i></mark>;
	}

	if ( props.attributes.email ) {
		emailLink = <mark className="social-icon margin-right-2x"><i className="far fa-email"></i></mark>;
	}

	return (
		<div className="component-share component" data-component-name="Share">
			<div className="share-list">
				<span className="caption2 display-inline-block uppercase margin-right-2x">Share</span>
				{facebookLink}
				{twitterLink}
				{linkedinLink}
				{emailLink}
			</div>
		</div>
	)
}

export default ShareOutput;
