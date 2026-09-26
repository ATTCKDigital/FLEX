/**
 * Line material. GLSL byte-for-byte FLEX v4.0.2; it writes gl_FragColor
 * directly (no colorspace chunk), so three.js applies no color conversion.
 */
import { AdditiveBlending, ShaderMaterial, Vector3 } from 'three';

const LINE_VERTEX_SHADER = `
                varying float vDistance;
                varying vec3 vWorldPosition;
                uniform float time;
                
                void main() {
                    // Add subtle movement to line vertices
                    vec3 pos = position;
                    float wave = sin(time * 0.8 + position.x * 0.02 + position.y * 0.015) * 0.3;
                    pos += normalize(position) * wave;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vDistance = length(pos);
                    vWorldPosition = pos;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `;

const LINE_FRAGMENT_SHADER = `
                varying float vDistance;
                varying vec3 vWorldPosition;
                uniform float time;
                uniform vec3 activeParticleOrigin;
                uniform float effectRadius;
                
                void main() {
                    // Calculate distance from active particle origin
                    float distanceToOrigin = distance(vWorldPosition, activeParticleOrigin);
                    float normalizedDistance = distanceToOrigin / effectRadius;
                    
                    // Sharp traveling wave along lines
                    float waveSpeed = 6.0;
                    float wave = sin(time * waveSpeed - distanceToOrigin * 0.2) * 0.5 + 0.5;
                    wave = pow(wave, 4.0); // Very sharp wave
                    
                    // Exponential decay for lines
                    float decayFactor = exp(-distanceToOrigin * 0.08);
                    
                    // Combine for firefly effect on lines
                    float fireflyEffect = wave * decayFactor;
                    
                    // Moving energy along lines
                    float flow = sin(time * 2.0 + vWorldPosition.x * 0.03 + vWorldPosition.y * 0.025) * 0.05 + 0.05;
                    float alpha = 0.05 * (1.0 - smoothstep(40.0, 200.0, vDistance));
                    
                    // Apply firefly effect to brightness
                    float finalAlpha = (alpha + flow) * (1.0 + fireflyEffect * 12.0);
                    gl_FragColor = vec4(1.0, 1.0, 1.0, finalAlpha);
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
			effectRadius: { value: 50 },
		},
		vertexShader: LINE_VERTEX_SHADER,
		fragmentShader: LINE_FRAGMENT_SHADER,
		transparent: true,
		blending: AdditiveBlending,
	} );
}
