/**
 * Block dependencies
 */
import classnames from 'classnames';
import metadata from './block.json';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, AlignmentToolbar, InspectorControls, useBlockProps } =
	wp.blockEditor;
const { Button, PanelBody, PanelRow } = wp.components;

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
// Import all of our Text Color Options requirements.
import TextColorOptions, {
	TextColorClasses,
	TextColorInlineStyles,
} from '../../components/gb-component_text-colors';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: { content, align, ordered },
		setAttributes,
	} = props;

	const toggleOrderedList = () => setAttributes( { ordered: ! ordered } );

	const blockProps = useBlockProps( {
		className: classnames(
			`component-list`,
			`align-${ align }`,
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props ),
			...TextColorClasses( props )
		),
	} );

	return (
		<>
			<InspectorControls>
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<BorderOptions { ...props } />
				<PanelBody title={ __( 'List Settings' ) }>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) =>
							setAttributes( { align: nextAlign } )
						}
					/>
					<PanelRow>
						<label htmlFor="ordered-toggle">
							{ __( 'List order:' ) }
						</label>
						<Button
							isPrimary={ ordered }
							isSecondary={ ! ordered }
							onClick={ toggleOrderedList }
							id="ordered-toggle"
						>
							{ ordered
								? __( 'Ordered (ol)' )
								: __( 'Unordered (ul)' ) }
						</Button>
					</PanelRow>
				</PanelBody>
				<TextColorOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					identifier="content"
					multiline="li"
					tagName={ ordered ? 'ol' : 'ul' }
					value={ content }
					onChange={ ( newContent ) =>
						setAttributes( { content: newContent } )
					}
					placeholder={ __( 'Write list…' ) }
					style={ {
						textAlign: align,
						...TextColorInlineStyles( props ),
					} }
					className={ classnames(
						// Apply text color classes directly to the list element
						...TextColorClasses( props )
					) }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
					] }
					// __unstablePreserveWhiteSpace
				/>
			</div>
		</>
	);
};

/**
 * Register block
 */
export default registerBlockType( metadata, {
	icon: 'editor-ul',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
