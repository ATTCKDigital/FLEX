// Block dependencies
import classnames from 'classnames';

// Internal block libraries
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PlainText, InspectorControls } = wp.blockEditor;

// Internal dependencies
import MarginOptions, {
	MarginOptionsAttributes,
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import BorderOptions, {
	BorderOptionsAttributes,
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import PaddingOptions, {
	PaddingOptionsAttributes,
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';

// Register block
export default registerBlockType( 'flexlayout/shortcode', {
	title: __( 'Shortcode' ),
	description: __( 'Display Wordpress shortcodes.' ),
	category: 'common',
	// icon: 'plus',
	// icon: icons.wordpress,
	icon: 'shortcode',
	example: {},
	// parent: ['flexlayout/column'],
	keywords: [ __( 'Shortcode', 'flexlayout' ), __( 'Code', 'flexlayout' ) ],
	attributes: {
		content: {
			type: 'string',
			default: '',
		},
		...MarginOptionsAttributes,
		...PaddingOptionsAttributes,
		...BorderOptionsAttributes,
	},

	supports: {
		html: true,
	},

	edit: ( props ) => {
		const {
			attributes: { content },
			setAttributes,
		} = props;

		return [
			<InspectorControls key="inspector">
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<BorderOptions { ...props } />
			</InspectorControls>,
			<div
				key="block"
				className={ classnames(
					`component-shortcode`,
					...MarginOptionsClasses( props ),
					...PaddingOptionsClasses( props ),
					...BorderOptionsClasses( props )
				) }
			>
				<PlainText
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
					placeholder={ __( 'Paste shortcode…' ) }
					aria-label={ __( 'shortcode' ) }
				/>
			</div>,
		];
	},

	save() {
		return null;
	},
} );
