/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	ColorPalette,
	PanelColorSettings,
	MediaUpload,
} = wp.editor;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	CheckboxControl,
	TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import ScrollerOptionsAttributes from './attributes';
import ScrollerOptionsOutput from './scroller-output';

// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	ScrollerOptionsAttributes,
	ScrollerOptionsOutput
};

function ScrollerOptions( props ) {
	const setShowScroller = value => props.setAttributes( { showScroller: value } );
	const setScrollerId = value => props.setAttributes( { scrollerId: value } );
	const showScrollerID = () => {
		if ( props.attributes.showScroller ) {
			return (
				<TextControl
					label={__("Scroller ID", "flexlayout")}
					help={__("Set ID to scroll to. ID should already be set on row to scroll to.", "flexlayout")}
					value={props.attributes.scrollerId}
					onChange={setScrollerId}
				/>
			);
		}
	};

	return (
		<PanelBody
			title={ __( 'Scroller Options' ) }
			className="flexlayout-scroller-options"
			initialOpen={ false }
		>
			<PanelRow>
				<CheckboxControl
					heading={__("Show scroller?", "flexlayout")}
					label={__("Yes", "flexlayout")}
					help={__("Adds a scroll down arrow to the row", "flexlayout")}
					onChange={setShowScroller}
					checked={props.attributes.showScroller}
				/>
				{ showScrollerID() }
			</PanelRow>
		</PanelBody>
	);
}

export default ScrollerOptions;
