/**
 * The stage: canvas, renderer, scene and camera.
 *
 * Color handling is left at three.js defaults on purpose. Both materials write
 * gl_FragColor directly (no colorspace or tone-mapping chunk) and the renderer
 * draws to the default UnsignedByteType canvas buffer, so no output conversion
 * applies and the hero looks as it did on r125. The default pixel ratio (1) is
 * kept too: it sets the particles' size and sharpness on HiDPI screens.
 */
import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	createCanvasElement,
} from 'three';
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, CLEAR_COLOR } from './config';

// The attributes WebGLRenderer requests for `{ antialias: true }`. Probing with
// the same attributes creates the very context the renderer then reuses.
const CONTEXT_ATTRIBUTES = {
	alpha: true,
	depth: true,
	stencil: false,
	antialias: true,
	premultipliedAlpha: true,
	preserveDrawingBuffer: false,
	powerPreference: 'default',
	failIfMajorPerformanceCaveat: false,
};

/**
 * Whether the canvas can provide the WebGL2 context three.js requires.
 *
 * @param {HTMLCanvasElement} canvas Canvas the renderer will draw on.
 * @return {boolean} True when a WebGL2 context was created.
 */
function hasWebGL2( canvas ) {
	return null !== canvas.getContext( 'webgl2', CONTEXT_ATTRIBUTES );
}

/**
 * Creates the renderer on a canvas, or null when three.js cannot use it.
 *
 * @param {HTMLCanvasElement} canvas Canvas with a WebGL2 context.
 * @return {WebGLRenderer|null} The renderer.
 */
function createRenderer( canvas ) {
	try {
		return new WebGLRenderer( { canvas, antialias: true } );
	} catch {
		return null;
	}
}

/**
 * Builds the stage inside the hero container.
 *
 * Without WebGL2 nothing is created or appended, so the container keeps its
 * static look and the console stays clean.
 *
 * @param {HTMLElement} container The #constellation-container element.
 * @return {{scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, canvas: HTMLCanvasElement}|null}
 *   The stage, or null when WebGL2 is unavailable.
 */
export function createStage( container ) {
	const canvas = createCanvasElement();
	if ( ! hasWebGL2( canvas ) ) {
		return null;
	}

	const scene = new Scene();
	const camera = new PerspectiveCamera(
		CAMERA_FOV,
		window.innerWidth / window.innerHeight,
		CAMERA_NEAR,
		CAMERA_FAR
	);
	const renderer = createRenderer( canvas );
	if ( ! renderer ) {
		return null;
	}

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( CLEAR_COLOR, 1 );
	container.appendChild( canvas );

	return { scene, camera, renderer, canvas };
}

/**
 * Keeps the camera and canvas fitted to the window.
 *
 * @param {{camera: PerspectiveCamera, renderer: WebGLRenderer}} stage The stage.
 * @return {() => void} Removes the resize listener.
 */
export function fitStageToWindow( { camera, renderer } ) {
	const onResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	};

	window.addEventListener( 'resize', onResize );

	return () => window.removeEventListener( 'resize', onResize );
}
