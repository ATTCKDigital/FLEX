/**
 * Line material. Links rest with a faint, slow breathing; hovering a dot sends
 * one bright band outwards along the links. It writes gl_FragColor directly
 * (no colorspace chunk), so three.js applies no color conversion.
 */
import { AdditiveBlending, ShaderMaterial, Vector3 } from 'three';

const LINE_VERTEX_SHADER = `
	varying float vDistance;
	varying vec3 vWorldPosition;
	uniform float time;

	// Idle breathing, as slow as the dots'.
	const float BREATH_SPEED = 0.08;

	void main() {
		// Subtle drift of the point used for the glow, not of the line itself.
		vec3 pos = position;
		float wave = sin( time * BREATH_SPEED + position.x * 0.02 + position.y * 0.015 ) * 0.3;
		pos += normalize( position ) * wave;

		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		vDistance = length( pos );
		vWorldPosition = pos;
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const LINE_FRAGMENT_SHADER = `
	varying float vDistance;
	varying vec3 vWorldPosition;
	uniform float time;
	uniform vec3 activeParticleOrigin;
	uniform float activeParticleIndex;
	uniform float transitionTime;

	// Idle breathing: slow and faint (+/- 5% around the resting glow).
	const float BREATH_SPEED = 0.2;
	const float BREATH_DEPTH = 0.05;
	const float REST_GLOW = 0.05;

	// One-shot ripple: a bright band that travels outwards from the hovered
	// dot once per hover, fading with distance.
	const float RIPPLE_SPEED = 200.0;
	const float RIPPLE_WIDTH = 6.0;
	const float RIPPLE_DECAY = 0.08;
	const float RIPPLE_GAIN = 12.0;

	float rippleGlow( float distanceToOrigin ) {
		if ( activeParticleIndex < 0.0 ) {
			return 0.0;
		}
		float front = transitionTime * RIPPLE_SPEED;
		float band = ( distanceToOrigin - front ) / RIPPLE_WIDTH;
		return exp( -band * band ) * exp( -distanceToOrigin * RIPPLE_DECAY );
	}

	void main() {
		float distanceToOrigin = distance( vWorldPosition, activeParticleOrigin );
		float breathing = 1.0 + BREATH_DEPTH * sin( time * BREATH_SPEED + vWorldPosition.x * 0.03 + vWorldPosition.y * 0.025 );
		float restAlpha = 0.05 * ( 1.0 - smoothstep( 40.0, 200.0, vDistance ) ) + REST_GLOW * breathing;

		float finalAlpha = restAlpha * ( 1.0 + rippleGlow( distanceToOrigin ) * RIPPLE_GAIN );
		gl_FragColor = vec4( 1.0, 1.0, 1.0, finalAlpha );
	}
`;

/**
 * Creates the additive line material.
 *
 * @return {ShaderMaterial} Material for the link LineSegments.
 */
export function createLineMaterial() {
	return new ShaderMaterial( {
		uniforms: {
			time: { value: 0 },
			activeParticleOrigin: { value: new Vector3( 0, 0, 0 ) },
			activeParticleIndex: { value: -1 },
			transitionTime: { value: 0 },
		},
		vertexShader: LINE_VERTEX_SHADER,
		fragmentShader: LINE_FRAGMENT_SHADER,
		transparent: true,
		blending: AdditiveBlending,
	} );
}
