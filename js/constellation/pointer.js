/**
 * Pointer tracking and the particle it hovers.
 */
import { Vector2, Vector3 } from 'three';
import { MAX_HOPS, NO_HOP, PARTICLE_COUNT } from './config';

/**
 * Records the pointer position (client pixels) from mousemove on the document.
 *
 * @return {{pointer: {x: number, y: number}, stop: () => void}}
 *   The live pointer position and a function that removes the listener.
 */
export function trackPointer() {
	const pointer = { x: 0, y: 0 };
	const onMouseMove = ( event ) => {
		pointer.x = event.clientX;
		pointer.y = event.clientY;
	};

	document.addEventListener( 'mousemove', onMouseMove );

	return {
		pointer,
		stop: () => document.removeEventListener( 'mousemove', onMouseMove ),
	};
}

/**
 * Finds the particle whose screen projection is closest to the pointer.
 * On a tie the lower index wins.
 *
 * @param {Float32Array}                      positions Particle positions.
 * @param {import('three').PerspectiveCamera} camera    Camera the scene is rendered with.
 * @param {{x: number, y: number}}            pointer   Pointer position in client pixels.
 * @return {{index: number, position: Vector3}} Closest particle (-1 if none).
 */
function closestToPointer( positions, camera, pointer ) {
	const target = new Vector2(
		( pointer.x / window.innerWidth ) * 2 - 1,
		-( pointer.y / window.innerHeight ) * 2 + 1
	);
	let closest = { index: -1, position: new Vector3( 0, 0, 0 ) };
	let closestDistance = Infinity;

	for ( let i = 0; i < positions.length; i += 3 ) {
		const worldPos = new Vector3(
			positions[ i ],
			positions[ i + 1 ],
			positions[ i + 2 ]
		);
		const screenPos = worldPos.clone().project( camera );
		const distance = Math.sqrt(
			Math.pow( screenPos.x - target.x, 2 ) +
				Math.pow( screenPos.y - target.y, 2 )
		);

		if ( distance < closestDistance ) {
			closestDistance = distance;
			closest = { index: i / 3, position: worldPos };
		}
	}

	return closest;
}

/**
 * Marks the particles within MAX_HOPS links of the hovered particle and writes
 * every particle's hop count (NO_HOP when unreachable).
 *
 * @param {import('three').BufferGeometry} geometry     Particle geometry.
 * @param {number[][]}                     hopDistances Hop counts between particles.
 * @param {number}                         closestIndex Hovered particle, or -1.
 */
function markHops( geometry, hopDistances, closestIndex ) {
	const connectedAttribute = geometry.getAttribute( 'connected' );
	const hopCountAttribute = geometry.getAttribute( 'hopCount' );
	const connected = connectedAttribute.array;
	const hopCounts = hopCountAttribute.array;

	connected.fill( 0 );
	hopCounts.fill( NO_HOP );

	if ( closestIndex >= 0 ) {
		connected[ closestIndex ] = 1;

		const hops = hopDistances[ closestIndex ];
		for ( let i = 0; i < PARTICLE_COUNT; i++ ) {
			hopCounts[ i ] = hops[ i ] >= 0 ? hops[ i ] : NO_HOP;
			if ( hops[ i ] >= 0 && hops[ i ] <= MAX_HOPS ) {
				connected[ i ] = 1;
			}
		}
	}

	connectedAttribute.needsUpdate = true;
	hopCountAttribute.needsUpdate = true;
}

/**
 * Finds the hovered particle and updates the hop attributes for it.
 *
 * @param {Object}                            frame              Per-frame state.
 * @param {import('three').BufferGeometry}    frame.geometry     Particle geometry.
 * @param {import('three').PerspectiveCamera} frame.camera       Scene camera.
 * @param {{x: number, y: number}}            frame.pointer      Pointer position.
 * @param {number[][]}                        frame.hopDistances Hop counts between particles.
 * @return {{index: number, position: Vector3}} The hovered particle.
 */
export function hoverClosestParticle( {
	geometry,
	camera,
	pointer,
	hopDistances,
} ) {
	const closest = closestToPointer(
		geometry.getAttribute( 'position' ).array,
		camera,
		pointer
	);

	markHops( geometry, hopDistances, closest.index );

	return closest;
}
