/**
 * One animation frame: hover state, shader uniforms, camera drift, render.
 */
import { Vector3 } from 'three';
import {
	CAMERA_MIN_RADIUS,
	CAMERA_RADIUS,
	CAMERA_SPEED,
	CAMERA_ZOOM_RATE,
} from './config';
import { hoverClosestParticle } from './pointer';

/**
 * Initial hover state: nothing hovered yet.
 *
 * @return {{closestIndex: number, closestPosition: Vector3, previousPosition: Vector3, transitionStartTime: number}}
 *   Hover state; `transitionStartTime` is in Date.now() milliseconds.
 */
export function createHoverState() {
	return {
		closestIndex: -1,
		closestPosition: new Vector3( 0, 0, 0 ),
		previousPosition: new Vector3( 0, 0, 0 ),
		transitionStartTime: Date.now(),
	};
}

/**
 * Updates the hover state for this frame and restarts the hover transition
 * when the pointer moved to a different particle.
 *
 * @param {Object} frame Per-frame state (see renderFrame).
 */
function updateHover( frame ) {
	const { hover, geometry, stage, pointer, hopDistances } = frame;
	const previousIndex = hover.closestIndex;
	const closest = hoverClosestParticle( {
		geometry,
		camera: stage.camera,
		pointer,
		hopDistances,
	} );

	hover.closestIndex = closest.index;
	hover.closestPosition = closest.position;

	if ( previousIndex === hover.closestIndex ) {
		return;
	}
	if ( previousIndex >= 0 ) {
		hover.previousPosition.fromArray(
			geometry.getAttribute( 'position' ).array,
			previousIndex * 3
		);
	}
	hover.transitionStartTime = Date.now();
}

/**
 * Moves the camera on its circle around the origin; the radius shrinks from
 * CAMERA_RADIUS towards CAMERA_MIN_RADIUS as `time` grows.
 *
 * @param {import('three').PerspectiveCamera} camera Scene camera.
 * @param {number}                            time   Animation time in seconds.
 */
function moveCamera( camera, time ) {
	const radius = Math.max(
		CAMERA_MIN_RADIUS,
		CAMERA_RADIUS - time * CAMERA_ZOOM_RATE
	);

	camera.position.x = 0;
	camera.position.y = Math.sin( time * CAMERA_SPEED ) * radius;
	camera.position.z = Math.cos( time * CAMERA_SPEED ) * radius;
	camera.lookAt( 0, 0, 0 );
}

/**
 * Renders one frame.
 *
 * @param {Object}                         frame                  Per-frame state.
 * @param {Object}                         frame.stage            Scene, camera and renderer.
 * @param {import('three').BufferGeometry} frame.geometry         Particle geometry.
 * @param {import('three').ShaderMaterial} frame.particleMaterial Particle material.
 * @param {import('three').ShaderMaterial} frame.lineMaterial     Line material.
 * @param {Object}                         frame.hover            State from createHoverState().
 */
export function renderFrame( frame ) {
	const { stage, hover, particleMaterial, lineMaterial } = frame;
	// Epoch seconds, the FLEX v4.0.2 time base.
	const time = Date.now() * 0.001;

	updateHover( frame );

	const transitionTime = ( Date.now() - hover.transitionStartTime ) / 1000;
	const particleUniforms = particleMaterial.uniforms;

	particleUniforms.activeParticleIndex.value = hover.closestIndex;
	particleUniforms.time.value = time;
	particleUniforms.activeParticleOrigin.value = hover.closestPosition;
	particleUniforms.previousActiveParticle.value = hover.previousPosition;
	particleUniforms.transitionTime.value = transitionTime;

	lineMaterial.uniforms.time.value = time;
	lineMaterial.uniforms.activeParticleOrigin.value = hover.closestPosition;

	moveCamera( stage.camera, time );
	stage.renderer.render( stage.scene, stage.camera );
}
