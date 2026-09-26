/**
 * Particle material. GLSL byte-for-byte FLEX v4.0.2; it writes gl_FragColor
 * directly (no colorspace chunk), so three.js applies no color conversion.
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
                uniform float activeParticleIndex;
                uniform float transitionTime;
                uniform float effectRadius;
                uniform float maxEffectDistance;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Check if this particle is connected to the active particle
                    float isConnected = connected;
                    
                    // Get hop count from active particle origin
                    float hopDistance = hopCount;
                    float distanceToPrevious = distance(position, previousActiveParticle);
                    
                    // Only apply effect if connected
                    float shouldApplyEffect = isConnected;
                    
                    // Sharp traveling wave that propagates outward
                    float waveSpeed = 8.0;
                    float waveSharpness = 15.0;
                    float wave = sin(time * waveSpeed - hopDistance * 2.0) * 0.5 + 0.5;
                    wave = pow(wave, 3.0); // Make wave sharper
                    
                    // Linear decay based on hop count - 15% less brightness for each hop
                    float decayFactor = max(0.0, 1.0 - hopDistance * 0.15);
                    
                    // Combine wave and decay for firefly pulse
                    float fireflyPulse = wave * decayFactor;
                    
                    // Only apply if connected
                    if (shouldApplyEffect < 0.5) {
                        fireflyPulse = 0.0;
                    }
                    
                    // Calculate distance to active particle origin
                    float distanceToOrigin = distance(position, activeParticleOrigin);
                    
                    // Smooth transition for hover effect
                    float animationDuration = 0.3; // 300ms animation
                    float animationProgress = clamp(transitionTime / animationDuration, 0.0, 1.0);
                    
                    // Smooth easing function (ease-out)
                    float easedProgress = 1.0 - pow(1.0 - animationProgress, 3.0);
                    
                    // Current hover state
                    float isCurrentOrigin = step(distanceToOrigin, 0.1);
                    float wasPreviousOrigin = step(distanceToPrevious, 0.1);
                    
                    // Animate between previous and current state
                    float targetBrightness = isCurrentOrigin;
                    float previousBrightness = wasPreviousOrigin;
                    float animatedBrightness = mix(previousBrightness, targetBrightness, easedProgress);
                    
                    // Pulsing effect based on distance and time
                    float distance = length(position);
                    float individualFade = sin(time * 1.5 + float(gl_VertexID) * 0.1) * 0.4 + 0.6;
                    float pulse = sin(time * 2.0 + distance * 0.01) * 0.2 + 0.8;
                    
                    // Base alpha with general opacity reduction
                    float baseAlpha = pulse * individualFade * (1.0 - smoothstep(40.0, 120.0, distance)) * 0.2;
                    
                    // Create sequential wave effect - particles brighten based on distance from origin
                    float waveDelay = hopDistance * 0.1; // Delay based on hop count
                    float sequentialWave = sin(time * 8.0 - waveDelay) * 0.5 + 0.5;
                    sequentialWave = pow(sequentialWave, 2.0); // Sharpen the wave
                    
                    // Only apply wave if connected (no distance limit for connected particles)
                    float waveEffect = 0.0;
                    if (shouldApplyEffect > 0.5) {
                        waveEffect = sequentialWave * 2.0; // Much brighter for distant particles
                    }
                    
                    // Create proper sequential delay effect
                    // Fixed delay: 50ms per hop
                    float particleDelay = hopDistance * 0.05; // 50ms per hop
                    float timeSinceTransition = transitionTime;
                    
                    // Only brighten if enough time has passed for this particle's delay
                    float sequentialBrightness = 0.0;
                    if (timeSinceTransition >= particleDelay && shouldApplyEffect > 0.5 && hopDistance <= 20.0) {
                        // One-time pulse: fade in quickly, then fade out
                        float timeAfterDelay = timeSinceTransition - particleDelay;
                        float pulseDuration = 0.40; // Adjusted pulse duration: 400ms
                        float fadeInDuration = 0.15; // Quick fade in: 150ms
                        float fadeOutDuration = 0.25; // Fade out: 250ms
                        
                        if (timeAfterDelay <= pulseDuration) {
                            float brightness = 0.0;
                            
                            if (timeAfterDelay <= fadeInDuration) {
                                // Fade in phase
                                brightness = timeAfterDelay / fadeInDuration;
                            } else {
                                // Fade out phase
                                float fadeOutProgress = (timeAfterDelay - fadeInDuration) / fadeOutDuration;
                                brightness = 1.0 - fadeOutProgress;
                            }
                            
                            // Apply 50% brightness decay per hop (50% brightness retained per hop)
                            float decayFactor = pow(0.50, hopDistance);
                            // Make the decay more prominent by applying it to a higher base brightness
                            sequentialBrightness = max(0.0, brightness * 3.0 * decayFactor);
                        }
                    }
                    
                    float pulsedAlpha = baseAlpha + sequentialBrightness;
                    
                    // Significantly increase base brightness
                    float brightPulsedAlpha = pulsedAlpha * 6.0; // Make dots even brighter
                    vAlpha = mix(brightPulsedAlpha, 0.9, animatedBrightness);
                    
                    // Smooth size transition (1.0x to 1.5x size)
                    float sizeMultiplier = mix(1.0, 1.5, animatedBrightness);
                    gl_PointSize = size * pulse * individualFade * (350.0 / -mvPosition.z) * (1.0 + fireflyPulse * 3.0) * sizeMultiplier;
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
			activeParticleIndex: { value: -1 },
			effectRadius: { value: 50 },
			previousActiveParticle: { value: new Vector3( 0, 0, 0 ) },
			transitionTime: { value: 0 },
			maxEffectDistance: { value: 200 },
		},
		vertexShader: PARTICLE_VERTEX_SHADER,
		fragmentShader: PARTICLE_FRAGMENT_SHADER,
		transparent: true,
		blending: AdditiveBlending,
	} );
}
