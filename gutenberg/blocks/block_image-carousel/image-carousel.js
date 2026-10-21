/**
 * Carousel block (flexlayout/image-carousel): editor registration.
 *
 * A dynamic block: `save` returns null and the server renders the markup
 * (image-carousel.php), so stored content never fails validation. The whole
 * block.json is passed so the editor receives apiVersion 3.
 */
import metadata from './block.json';
import Edit from './edit/edit';

const { registerBlockType } = wp.blocks;

export default registerBlockType( metadata, {
	icon: 'images-alt2',
	edit: Edit,
	save: () => null,
} );
