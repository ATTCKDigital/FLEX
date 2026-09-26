/**
 * Links between nearby particles and the hop distances along them.
 */
import { Vector3 } from 'three';
import {
	LINK_KEEP_PROBABILITY,
	LINK_MAX_DISTANCE,
	PARTICLE_COUNT,
} from './config';

/**
 * Reads particle `index` from the flat positions array.
 *
 * @param {Float32Array} positions Particle positions.
 * @param {number}       index     Particle index.
 * @return {Vector3} The particle's position.
 */
function particleAt( positions, index ) {
	const i3 = index * 3;
	return new Vector3(
		positions[ i3 ],
		positions[ i3 + 1 ],
		positions[ i3 + 2 ]
	);
}

/**
 * Links a random subset of the particle pairs closer than LINK_MAX_DISTANCE.
 *
 * Pairs are visited in `i < j` order and each in-range pair draws
 * Math.random() exactly once; it is kept when the draw is at most
 * LINK_KEEP_PROBABILITY.
 *
 * @param {Float32Array} positions Particle positions.
 * @return {{linePositions: number[], adjacency: Map<number, Set<number>>}}
 *   Segment end points (6 numbers per link) and each particle's neighbours.
 */
export function linkParticles( positions ) {
	const linePositions = [];
	const adjacency = new Map();

	for ( let i = 0; i < PARTICLE_COUNT; i++ ) {
		adjacency.set( i, new Set() );
	}

	for ( let i = 0; i < PARTICLE_COUNT; i++ ) {
		const from = particleAt( positions, i );

		for ( let j = i + 1; j < PARTICLE_COUNT; j++ ) {
			const to = particleAt( positions, j );

			if ( from.distanceTo( to ) >= LINK_MAX_DISTANCE ) {
				continue;
			}
			if ( Math.random() > LINK_KEEP_PROBABILITY ) {
				continue;
			}

			linePositions.push( from.x, from.y, from.z, to.x, to.y, to.z );
			adjacency.get( i ).add( j );
			adjacency.get( j ).add( i );
		}
	}

	return { linePositions, adjacency };
}

/**
 * Breadth-first hop counts from one particle to every other.
 *
 * @param {Map<number, Set<number>>} adjacency Neighbours per particle.
 * @param {number}                   source    Start particle.
 * @return {number[]} Hops per particle; -1 when unreachable.
 */
function hopsFrom( adjacency, source ) {
	const hops = new Array( PARTICLE_COUNT ).fill( -1 );
	const queue = [ source ];
	hops[ source ] = 0;

	for ( let head = 0; head < queue.length; head++ ) {
		const current = queue[ head ];

		for ( const neighbour of adjacency.get( current ) ) {
			if ( hops[ neighbour ] === -1 ) {
				hops[ neighbour ] = hops[ current ] + 1;
				queue.push( neighbour );
			}
		}
	}

	return hops;
}

/**
 * Hop counts between every pair of particles, computed once at mount.
 *
 * @param {Map<number, Set<number>>} adjacency Neighbours per particle.
 * @return {number[][]} `result[ source ][ target ]`; -1 when unreachable.
 */
export function computeHopDistances( adjacency ) {
	const hopDistances = [];

	for ( let source = 0; source < PARTICLE_COUNT; source++ ) {
		hopDistances[ source ] = hopsFrom( adjacency, source );
	}

	return hopDistances;
}
