/**
 * Block dependencies
 */
import icon from './icon'; //only if we are using an svg, if using dashicons, do not include this line
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
	'flexls/static', //name space - flexls/block-name
	{
			title: __( 'Example - Static Block', 'flexls' ),
			description: __( 'Demonstration of how to make a static call to action block.', 'flexls' ),
			category: 'common',
			icon: {
				background: 'rgba(254, 243, 224, 0.52)',
				src: icon,
			},        
			keywords: [
					__( 'Banner', 'flexls' ),
					__( 'CTA', 'flexls' ),
					__( 'Shout Out', 'flexls' ),
			],
			edit: props => {
				const { className, isSelected } = props;
				//className is created by wp wp-block-flexls-block-name
				return (
					<div className={ className }>
						<h2>{ __( 'Static Call to Action', 'flexls' ) }</h2>
						<p>{ __( 'This is really important!', 'flexls' ) }</p>
						{
							//returns true if user clicks into the block editor, useful to show a message when editing is happening
							isSelected && (
								<p className="sorry warning">{ __( '✋ Sorry! You cannot edit this block ✋', 'flexls' ) }</p>
							)
						}
					</div>
				);
			},
			save: props => {
				return (
					<div>
						<h2>{ __( 'Call to Action', 'flexls' ) }</h2>
						<p>{ __( 'This is really important!', 'flexls' ) }</p>
					</div>
				);
			},
	},
);
