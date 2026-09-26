/**
 * The particle field: 800 points on a shell, denser towards its outer edge.
 */
import { BufferAttribute, BufferGeometry } from 'three';
import { PARTICLE_COUNT } from './config';

/**
 * Places one particle and returns its size and brightness.
 *
 * Draws Math.random() exactly five times, in this order: edge bias, theta,
 * phi, size jitter, brightness. The order fixes the scene for a given seed.
 *
 * @param {Float32Array} positions Particle positions, written at index * 3.
 * @param {number}       index     Particle index.
 * @return {{size: number, brightness: number}} Size and grey level.
 */
function placeParticle( positions, index ) {
	const i3 = index * 3;

	const edgeBias = Math.pow( Math.random(), 0.15 );
	const radius = ( 1 - edgeBias ) * 120 + 40;
	const theta = Math.random() * Math.PI * 2;
	const phi = Math.acos( 2 * Math.random() - 1 );

	positions[ i3 ] = radius * Math.sin( phi ) * Math.cos( theta );
	positions[ i3 + 1 ] = radius * Math.sin( phi ) * Math.sin( theta );
	positions[ i3 + 2 ] = radius * Math.cos( phi );

	const distance = Math.sqrt(
		positions[ i3 ] ** 2 +
			positions[ i3 + 1 ] ** 2 +
			positions[ i3 + 2 ] ** 2
	);
	const size = ( Math.random() * 2 + distance / 80 + 1 ) * 0.5;
	const brightness = 0.9 + Math.random() * 0.1;

	return { size, brightness };
}

/**
 * Creates the particle positions and their geometry.
 *
 * The geometry carries `position`, `size` and `color` (grey), plus `connected`
 * and `hopCount`, which the pointer rewrites every frame.
 *
 * @return {{positions: Float32Array, geometry: BufferGeometry}} The field.
 */
export function createParticleField() {
	const positions = new Float32Array( PARTICLE_COUNT * 3 );
	const sizes = new Float32Array( PARTICLE_COUNT );
	const colors = new Float32Array( PARTICLE_COUNT * 3 );

	for ( let i = 0; i < PARTICLE_COUNT; i++ ) {
		const { size, brightness } = placeParticle( positions, i );
		sizes[ i ] = size;
		colors.fill( brightness, i * 3, i * 3 + 3 );
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );
	geometry.setAttribute( 'size', new BufferAttribute( sizes, 1 ) );
	geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );
	geometry.setAttribute(
		'connected',
		new BufferAttribute( new Float32Array( PARTICLE_COUNT ), 1 )
	);
	geometry.setAttribute(
		'hopCount',
		new BufferAttribute( new Float32Array( PARTICLE_COUNT ), 1 )
	);

	return { positions, geometry };
}
