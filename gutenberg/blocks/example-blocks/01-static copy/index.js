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
	'flex/static', //name space - FLEX/block-name
	{
			title: __( 'Example - Static Block', 'FLEX' ),
			description: __( 'Demonstration of how to make a static call to action block.', 'FLEX' ),
			category: 'common',
			icon: {
				background: 'rgba(254, 243, 224, 0.52)',
				src: icon,
			},        
			keywords: [
					__( 'Banner', 'FLEX' ),
					__( 'CTA', 'FLEX' ),
					__( 'Shout Out', 'FLEX' ),
			],
			edit: props => {
				const { className, isSelected } = props;
				//className is created by wp wp-block-FLEX-block-name
				return (
					<div className={ className }>
						<h2>{ __( 'Static Call to Action', 'FLEX' ) }</h2>
						<p>{ __( 'This is really important!', 'FLEX' ) }</p>
						{
							//returns true if user clicks into the block editor, useful to show a message when editing is happening
							isSelected && (
								<p className="sorry warning">{ __( '✋ Sorry! You cannot edit this block ✋', 'FLEX' ) }</p>
							)
						}
					</div>
				);
			},
			save: props => {
				return (
					<div>
						<h2>{ __( 'Call to Action', 'FLEX' ) }</h2>
						<p>{ __( 'This is really important!', 'FLEX' ) }</p>
					</div>
				);
			},
	},
);
