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

import './editor.scss'; 

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
					label={__("Scroller ID", "flexls")}
					help={__("Set ID to scroll to. ID should already be set on row to scroll to.", "flexls")}
					value={props.attributes.scrollerId}
					onChange={setScrollerId}
				/>
			);
		}
	};

	return (
		<PanelBody
			title={ __( 'Scroller Options' ) }
			className="flexls-scroller-options"
			initialOpen={ false }
		>
			<PanelRow>
				<CheckboxControl
					heading={__("Show scroller?", "flexls")}
					label={__("Yes", "flexls")}
					help={__("Adds a scroll down arrow to the row", "flexls")}
					onChange={setShowScroller}
				/>
				{ showScrollerID() }
			</PanelRow>
		</PanelBody>
	);
}

export default ScrollerOptions;
