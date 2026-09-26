/**
 * Particle material. Dots rest with a faint, slow breathing; hovering a dot
 * sends one ripple outwards through the dots linked to it. The fragment shader
 * writes gl_FragColor directly (no colorspace chunk), so three.js applies no
 * color conversion.
 */
import { AdditiveBlending, ShaderMaterial, Vector3 } from 'three';

const PARTICLE_VERTEX_SHADER = `
	attribute float size;
	attribute vec3 color;
	attribute float connected;
	attribute float hopCount;
	varying vec3 vColor;
	varying float vAlpha;
	uniform float time;
	uniform vec3 activeParticleOrigin;
	uniform vec3 previousActiveParticle;
	uniform float transitionTime;

	// Hover ease between the previous and the current hovered dot.
	const float HOVER_EASE_SECONDS = 0.3;
	const float HOVER_SIZE = 1.5;

	// One-shot ripple: each linked dot flashes once, 50 ms later per hop.
	const float RIPPLE_DELAY_PER_HOP = 0.05;
	const float RIPPLE_FADE_IN = 0.15;
	const float RIPPLE_FADE_OUT = 0.25;
	const float RIPPLE_MAX_HOPS = 20.0;
	const float RIPPLE_DECAY_PER_HOP = 0.5;
	const float RIPPLE_BRIGHTNESS = 3.0;
	// Peak extra size of the hovered dot's swell: 1.5 x (1 + 1) = 3x at most.
	const float RIPPLE_SWELL = 1.0;

	// Idle breathing: slow and faint (period about 42 s, +/- 5%).
	const float BREATH_SPEED = 0.15;
	const float BREATH_DEPTH = 0.05;

	// Seconds-long envelope of this dot's single ripple flash (0 when none).
	float rippleEnvelope( float hops ) {
		float sinceArrival = transitionTime - hops * RIPPLE_DELAY_PER_HOP;
		if ( connected < 0.5 || hops > RIPPLE_MAX_HOPS || sinceArrival < 0.0 ) {
			return 0.0;
		}
		if ( sinceArrival <= RIPPLE_FADE_IN ) {
			return sinceArrival / RIPPLE_FADE_IN;
		}
		return max( 0.0, 1.0 - ( sinceArrival - RIPPLE_FADE_IN ) / RIPPLE_FADE_OUT );
	}

	void main() {
		vColor = color;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		float distanceFromCenter = length( position );

		// Each dot keeps its own resting level and breathes around it.
		float restLevel = sin( float( gl_VertexID ) * 0.1 ) * 0.4 + 0.6;
		float breathing = 1.0 + BREATH_DEPTH * sin( time * BREATH_SPEED + float( gl_VertexID ) * 0.1 );
		float idle = 0.8 * restLevel * breathing;

		float hoverProgress = clamp( transitionTime / HOVER_EASE_SECONDS, 0.0, 1.0 );
		float easedProgress = 1.0 - pow( 1.0 - hoverProgress, 3.0 );
		float isCurrentOrigin = step( distance( position, activeParticleOrigin ), 0.1 );
		float wasPreviousOrigin = step( distance( position, previousActiveParticle ), 0.1 );
		float hovered = mix( wasPreviousOrigin, isCurrentOrigin, easedProgress );

		float ripple = rippleEnvelope( hopCount ) * pow( RIPPLE_DECAY_PER_HOP, hopCount );

		float baseAlpha = idle * ( 1.0 - smoothstep( 40.0, 120.0, distanceFromCenter ) ) * 0.2;
		float rippleAlpha = ( baseAlpha + ripple * RIPPLE_BRIGHTNESS ) * 6.0;
		vAlpha = mix( rippleAlpha, 0.9, hovered );

		float sizeMultiplier = mix( 1.0, HOVER_SIZE, hovered ) * ( 1.0 + ripple * RIPPLE_SWELL );
		gl_PointSize = size * idle * ( 350.0 / -mvPosition.z ) * sizeMultiplier;
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const PARTICLE_FRAGMENT_SHADER = `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vec2 center = gl_PointCoord - 0.5;
                    float distance = length(center);
                    
                    if (distance > 0.5) discard;
                    
                    // Create a sharper core with slight blur
                    // Sharp core (full brightness)
                    float coreAlpha = vAlpha * (1.0 - smoothstep(0.2, 0.35, distance));
                    
                    // Soft glow (50% brightness)
                    float glowAlpha = vAlpha * 0.5 * (1.0 - smoothstep(0.1, 0.5, distance));
                    
                    // Combine core and glow
                    float alpha = max(coreAlpha, glowAlpha);
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `;

/**
 * Creates the additive particle material.
 *
 * @return {ShaderMaterial} Material for the particle Points.
 */
export function createParticleMaterial() {
	return new ShaderMaterial( {
		uniforms: {
			time: { value: 0 },
			activeParticleOrigin: { value: new Vector3( 0, 0, 0 ) },
			previousActiveParticle: { value: new Vector3( 0, 0, 0 ) },
			transitionTime: { value: 0 },
		},
		vertexShader: PARTICLE_VERTEX_SHADER,
		fragmentShader: PARTICLE_FRAGMENT_SHADER,
		transparent: true,
		blending: AdditiveBlending,
	} );
}
