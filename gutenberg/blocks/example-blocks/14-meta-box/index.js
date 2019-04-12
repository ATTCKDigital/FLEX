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
const { InspectorControls } = wp.editor;
const { TextControl, PanelBody } = wp.components;

/**
 * Register example block
 */
export default registerBlockType(
    'flexlayout/meta-box',
    {
        title: __( 'Example - Meta Box', 'flexlayout' ),
        description: __( 'An example of how to build a block with a meta box field.', 'flexlayout'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },         
        keywords: [
            __( 'Meta', 'flexlayout' ),
            __( 'Custom field', 'flexlayout' ),
            __( 'Box', 'flexlayout' ),
        ],
        attributes: {
            text: {
                type: 'string',
                source: 'meta',
                meta: 'flexlayout_gb_metabox',
            },
        },
        edit: props => {
            const { attributes: { text }, className, setAttributes } = props;
            return [
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label={ __( 'Meta box', 'flexlayout' ) }
                            value={ text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                    </PanelBody>
                </InspectorControls>,                
                <div className={ className } >
                    <p>{ __( 'Check the meta', 'flexlayout' ) }</p>
                </div>
            ];
        },
        save: props => {
            return (
                <p>{ __( 'Check the meta', 'flexlayout' ) }</p>
            );
        },
    },
);
