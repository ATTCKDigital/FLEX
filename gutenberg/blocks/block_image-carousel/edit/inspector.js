/**
 * Sidebar: "Carousel settings" (arrows, loop, aspect ratio, accessible
 * label), the slide list passed as children, then the shared FLEX option
 * panels as block_image uses them.
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, TextControl, ToggleControl } = wp.components;

import BorderOptions from '../../../components/gb-component_border';
import DataComponentNameOptions from '../../../components/gb-component_data-component-name';
import MarginOptions from '../../../components/gb-component_margin';
import PaddingOptions from '../../../components/gb-component_padding';

export const ASPECT_RATIOS = [
	{ label: __( 'Auto (first image)', 'flexlayout' ), value: '' },
	{ label: '16:9', value: '16/9' },
	{ label: '4:3', value: '4/3' },
	{ label: '1:1', value: '1/1' },
	{ label: '3:4', value: '3/4' },
];

/**
 * @param {Object}  props          Block edit props.
 * @param {Element} props.children Extra panels (the slide list).
 * @return {Element} Inspector controls.
 */
export default function Inspector( props ) {
	const { attributes, setAttributes, children } = props;
	const { showArrows, loop, aspectRatio, ariaLabel } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Carousel settings', 'flexlayout' ) }>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Show arrows', 'flexlayout' ) }
					help={ __( 'Thumbnails always navigate.', 'flexlayout' ) }
					checked={ !! showArrows }
					onChange={ ( value ) =>
						setAttributes( { showArrows: value } )
					}
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Loop', 'flexlayout' ) }
					help={ __(
						'Next on the last slide goes back to the first.',
						'flexlayout'
					) }
					checked={ loop !== false }
					onChange={ ( value ) => setAttributes( { loop: value } ) }
				/>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Aspect ratio', 'flexlayout' ) }
					help={ __(
						'Every slide fits inside the stage without cropping.',
						'flexlayout'
					) }
					value={ aspectRatio || '' }
					options={ ASPECT_RATIOS }
					onChange={ ( value ) =>
						setAttributes( { aspectRatio: value } )
					}
				/>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Accessible label', 'flexlayout' ) }
					help={ __(
						'Names the carousel for screen readers.',
						'flexlayout'
					) }
					placeholder={ __( 'Image carousel', 'flexlayout' ) }
					value={ ariaLabel || '' }
					onChange={ ( value ) =>
						setAttributes( { ariaLabel: value } )
					}
				/>
			</PanelBody>
			{ children }
			<BorderOptions { ...props } />
			<MarginOptions { ...props } />
			<PaddingOptions { ...props } />
			<DataComponentNameOptions { ...props } />
		</InspectorControls>
	);
}
