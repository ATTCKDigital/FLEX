/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl, PanelBody } = wp.components;

/**
 * Register example block
 */
export default registerBlockType(
    'FLEX/meta-box',
    {
        title: __( 'Example - Meta Box', 'FLEX' ),
        description: __( 'An example of how to build a block with a meta box field.', 'FLEX'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },
        keywords: [
            __( 'Meta', 'FLEX' ),
            __( 'Custom field', 'FLEX' ),
            __( 'Box', 'FLEX' ),
        ],
        attributes: {
            text: {
                type: 'string',
                source: 'meta',
                meta: 'FLEX_gb_metabox',
            },
        },
        edit: props => {
            const { attributes: { text }, className, setAttributes } = props;
            return [
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label={ __( 'Meta box', 'FLEX' ) }
                            value={ text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                    </PanelBody>
                </InspectorControls>,
                <div className={ className } >
                    <p>{ __( 'Check the meta', 'FLEX' ) }</p>
                </div>
            ];
        },
        save: props => {
            return (
                <p>{ __( 'Check the meta', 'FLEX' ) }</p>
            );
        },
    },
);
