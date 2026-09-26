/**
 * Constellation hero constants.
 *
 * Values are those of the FLEX v4.0.2 constellation script; changing any of them
 * changes the rendered scene. The hover timings (300 ms ease, 50 ms per hop)
 * live in the particle vertex shader, which is kept verbatim.
 */

// Particle field.
export const PARTICLE_COUNT = 800;

// Links: pairs closer than this may be linked; a pair is kept when its random
// draw is at most LINK_KEEP_PROBABILITY.
export const LINK_MAX_DISTANCE = 18;
export const LINK_KEEP_PROBABILITY = 0.25;

// Hover propagation: particles within MAX_HOPS links of the hovered particle
// light up; NO_HOP marks particles it cannot reach.
export const MAX_HOPS = 20;
export const NO_HOP = 999;

// Camera.
export const CAMERA_FOV = 75;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 1000;
export const CAMERA_RADIUS = 8;
export const CAMERA_MIN_RADIUS = 2;
export const CAMERA_SPEED = 0.005;
export const CAMERA_ZOOM_RATE = 0.001;

// Renderer.
export const CLEAR_COLOR = 0x000000;
