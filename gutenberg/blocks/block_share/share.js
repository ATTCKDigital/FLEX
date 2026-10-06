/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, AlignmentToolbar, useBlockProps } = wp.blockEditor;
const { PanelBody, CheckboxControl } = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
// Import all of our Border Options requirements.
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';
// Import all of our Background Options requirements.
import BackgroundColorOptions, {
	BackgroundColorOptionsInlineStyles,
} from '../../components/gb-component_background-color';
// Import all of our Text Color Options requirements.
import TextColorOptions from '../../components/gb-component_text-colors';
import ShareOutput from '../../blocks/block_share/share-output.js';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: { facebook, twitter, linkedin, email, align },
		setAttributes,
	} = props;

	const blockProps = useBlockProps( {
		className: classnames(
			'component-share',
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props )
		),
		style: {
			...BackgroundColorOptionsInlineStyles( props ),
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon Alignment', 'flexlayout' ) }
					className="FLEX-icon-alignment"
					initialOpen={ false }
				>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Share Options', 'flexlayout' ) }
					className="FLEX-share-options"
					initialOpen={ false }
				>
					<p>
						Set your accounts in Global Settings. Only platforms
						with set accounts will appear on the front end.
					</p>
					<CheckboxControl
						label={ __( 'Show Facebook?', 'flexlayout' ) }
						checked={ facebook }
						onChange={ ( newFacebook ) =>
							setAttributes( { facebook: newFacebook } )
						}
					/>
					<CheckboxControl
						label={ __( 'Show Twitter?', 'flexlayout' ) }
						checked={ twitter }
						onChange={ ( newTwitter ) =>
							setAttributes( { twitter: newTwitter } )
						}
					/>
					<CheckboxControl
						label={ __( 'Show LinkedIn?', 'flexlayout' ) }
						checked={ linkedin }
						onChange={ ( newLinkedin ) =>
							setAttributes( { linkedin: newLinkedin } )
						}
					/>
					<CheckboxControl
						label={ __( 'Show email?', 'flexlayout' ) }
						checked={ email }
						onChange={ ( newEmail ) =>
							setAttributes( { email: newEmail } )
						}
					/>
				</PanelBody>
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<BorderOptions { ...props } />
				<BackgroundColorOptions { ...props } />
				<TextColorOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				<div
					className={ classnames( 'share-list', `align-${ align }` ) }
				>
					{ ShareOutput( props ) }
				</div>
			</div>
		</>
	);
};

/**
 * Register social media block
 */
export default registerBlockType( metadata, {
	icon: icons.share,
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
