/**
 * Constellation hero entry (compiled by the child build as dist/constellation.js).
 *
 * The only module with an import side effect: it mounts the hero once the DOM
 * is ready, on pages that render #constellation-container.
 */
import {
	BufferGeometry,
	Float32BufferAttribute,
	LineSegments,
	Points,
} from 'three';
import { createHoverState, renderFrame } from './animation';
import { CAMERA_RADIUS } from './config';
import { computeHopDistances, linkParticles } from './connections';
import { bindLifecycle, createLoop } from './lifecycle';
import { createLineMaterial } from './line-material';
import { createParticleMaterial } from './particle-material';
import { createParticleField } from './particles';
import { trackPointer } from './pointer';
import { createStage, fitStageToWindow } from './renderer';

/**
 * Builds the scene in the container and starts the animation.
 *
 * Statement order matches FLEX v4.0.2 (stage, particles, links, camera,
 * listeners), which keeps the Math.random draw order and so the scene.
 *
 * @param {HTMLElement} container The #constellation-container element.
 */
function mountConstellation( container ) {
	const stage = createStage( container );
	if ( ! stage ) {
		return;
	}

	const field = createParticleField();
	const particleMaterial = createParticleMaterial();
	const particles = new Points( field.geometry, particleMaterial );
	particles.renderOrder = 1;
	stage.scene.add( particles );

	const { linePositions, adjacency } = linkParticles( field.positions );
	const hopDistances = computeHopDistances( adjacency );
	const lineGeometry = new BufferGeometry();
	lineGeometry.setAttribute(
		'position',
		new Float32BufferAttribute( linePositions, 3 )
	);
	const lineMaterial = createLineMaterial();
	const lines = new LineSegments( lineGeometry, lineMaterial );
	lines.renderOrder = -1;
	stage.scene.add( lines );

	stage.camera.position.z = CAMERA_RADIUS;

	const pointerTracking = trackPointer();
	const stopFitting = fitStageToWindow( stage );
	const frame = {
		stage,
		geometry: field.geometry,
		particleMaterial,
		lineMaterial,
		pointer: pointerTracking.pointer,
		hopDistances,
		hover: createHoverState(),
		startStamp: performance.now(),
	};
	const loop = createLoop( () => renderFrame( frame ) );

	bindLifecycle( {
		canvas: stage.canvas,
		loop,
		release: () => {
			pointerTracking.stop();
			stopFitting();
			[
				field.geometry,
				particleMaterial,
				lineGeometry,
				lineMaterial,
			].forEach( ( resource ) => resource.dispose() );
			stage.renderer.dispose();
		},
	} );
	loop.start();
}

/**
 * Mounts the hero if this page has its container and it is not mounted yet
 * (a data attribute guards against the bundle being included twice).
 */
function start() {
	const container = document.getElementById( 'constellation-container' );
	if ( ! container || container.dataset.constellationMounted ) {
		return;
	}
	container.dataset.constellationMounted = 'true';
	mountConstellation( container );
}

/**
 * Runs `callback` once the DOM is parsed, also when the script itself runs
 * after DOMContentLoaded (deferred or delayed by an optimiser).
 *
 * @param {() => void} callback Function to run.
 */
function onReady( callback ) {
	if ( 'loading' === document.readyState ) {
		document.addEventListener( 'DOMContentLoaded', callback );
		return;
	}
	callback();
}

onReady( start );
