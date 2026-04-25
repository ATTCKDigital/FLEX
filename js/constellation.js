document.addEventListener('DOMContentLoaded', function() {
    let scene, camera, renderer, particles, lines;
    let animationId;
    let mouse = { x: 0, y: 0 };
    let closestParticle = new THREE.Vector3(0, 0, 0);
    let closestParticleIndex = -1;
    let transitionStartTime = Date.now();
    let previousParticle = new THREE.Vector3(0, 0, 0);
    let allHopDistances = [];
    let connections = new Map();
    let particleGeometry, particleMaterial, lineGeometry, lineMaterial;

    function init() {
        const container = document.getElementById('constellation-container');
        
        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1);
        container.appendChild(renderer.domElement);

        // Create particles
        const particleCount = 800;
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);
        
        // Initialize connections map
        for (let i = 0; i < particleCount; i++) {
            connections.set(i, new Set());
        }

        // Generate particles with distribution favoring edges
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Create distribution heavily concentrated at edges
            const edgeBias = Math.pow(Math.random(), 0.15);
            const radius = (1 - edgeBias) * 120 + 40;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Varying sizes
            const distance = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2);
            sizes[i] = (Math.random() * 2 + (distance / 80) + 1) * 0.5;

            // White color with slight variations
            const brightness = 0.9 + Math.random() * 0.1;
            colors[i3] = brightness;
            colors[i3 + 1] = brightness;
            colors[i3 + 2] = brightness;
        }

        // Create particle geometry
        particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Add attributes for connected particles and hop counts
        const connectedAttribute = new Float32Array(particleCount);
        const hopCountAttribute = new Float32Array(particleCount);
        particleGeometry.setAttribute('connected', new THREE.BufferAttribute(connectedAttribute, 1));
        particleGeometry.setAttribute('hopCount', new THREE.BufferAttribute(hopCountAttribute, 1));

        // Particle material with working sequential animation
        particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                activeParticleOrigin: { value: new THREE.Vector3(0, 0, 0) },
                activeParticleIndex: { value: -1 },
                effectRadius: { value: 50 },
                previousActiveParticle: { value: new THREE.Vector3(0, 0, 0) },
                transitionTime: { value: 0 },
                maxEffectDistance: { value: 200 }
            },
            vertexShader: `
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
            `,
            fragmentShader: `
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
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.renderOrder = 1;
        scene.add(particles);

        // Create connecting lines
        const linePositions = [];
        const maxDistance = 18;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const pos1 = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);

            for (let j = i + 1; j < particleCount; j++) {
                const j3 = j * 3;
                const pos2 = new THREE.Vector3(positions[j3], positions[j3 + 1], positions[j3 + 2]);
                
                const distance = pos1.distanceTo(pos2);
                
                if (distance < maxDistance) {
                    if (Math.random() > 0.25) continue;
                    
                    linePositions.push(pos1.x, pos1.y, pos1.z);
                    linePositions.push(pos2.x, pos2.y, pos2.z);
                    
                    connections.get(i).add(j);
                    connections.get(j).add(i);
                }
            }
        }

        // Pre-calculate hop distances using BFS
        const calculateHopDistances = () => {
            const allHopDistances = [];
            
            for (let sourceIndex = 0; sourceIndex < particleCount; sourceIndex++) {
                const hopDistances = new Array(particleCount).fill(-1);
                const queue = [sourceIndex];
                hopDistances[sourceIndex] = 0;
                
                let queueIndex = 0;
                while (queueIndex < queue.length) {
                    const currentIndex = queue[queueIndex++];
                    const currentHopCount = hopDistances[currentIndex];
                    
                    const neighbors = connections.get(currentIndex);
                    if (neighbors) {
                        for (const neighborIndex of neighbors) {
                            if (hopDistances[neighborIndex] === -1) {
                                hopDistances[neighborIndex] = currentHopCount + 1;
                                queue.push(neighborIndex);
                            }
                        }
                    }
                }
                
                allHopDistances[sourceIndex] = hopDistances;
            }
            
            return allHopDistances;
        };
        
        allHopDistances = calculateHopDistances();

        // Create lines
        lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        lineMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                linePositions: { value: new Float32Array(linePositions) },
                activeParticleOrigin: { value: new THREE.Vector3(0, 0, 0) },
                effectRadius: { value: 50 }
            },
            vertexShader: `
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
            `,
            fragmentShader: `
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
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        lines.renderOrder = -1;
        scene.add(lines);

        // Camera position
        camera.position.z = 8;

        // Mouse tracking
        document.addEventListener('mousemove', function(event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        // Window resize
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Function to find closest particle to mouse
    function findClosestParticle() {
        const positions = particleGeometry.attributes.position.array;
        
        let closestDistance = Infinity;
        let closestPosition = new THREE.Vector3(0, 0, 0);
        let closestIndex = -1;
        
        const mouseNormalized = new THREE.Vector2(
            (mouse.x / window.innerWidth) * 2 - 1,
            -(mouse.y / window.innerHeight) * 2 + 1
        );
        
        for (let i = 0; i < positions.length; i += 3) {
            const particleIndex = i / 3;
            const worldPos = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
            
            const screenPos = worldPos.clone().project(camera);
            
            const distance = Math.sqrt(
                Math.pow(screenPos.x - mouseNormalized.x, 2) + 
                Math.pow(screenPos.y - mouseNormalized.y, 2)
            );
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPosition = worldPos;
                closestIndex = particleIndex;
            }
        }
        
        closestParticle = closestPosition;
        closestParticleIndex = closestIndex;
        
        // Update connected particles and hop counts
        const connectedAttribute = particleGeometry.getAttribute('connected');
        const hopCountAttribute = particleGeometry.getAttribute('hopCount');
        const connectedArray = connectedAttribute.array;
        const hopCountsArray = hopCountAttribute.array;
        
        // Reset all particles
        connectedArray.fill(0);
        hopCountsArray.fill(999);
        
        if (closestIndex >= 0) {
            // Mark the closest particle as connected
            connectedArray[closestIndex] = 1;
            
            const hopDistances = allHopDistances[closestIndex];
            if (hopDistances) {
                for (let i = 0; i < 800; i++) {
                    hopCountsArray[i] = hopDistances[i] >= 0 ? hopDistances[i] : 999;
                    if (hopDistances[i] >= 0 && hopDistances[i] <= 20) {
                        connectedArray[i] = 1;
                    }
                }
            }
        }
        
        connectedAttribute.needsUpdate = true;
        hopCountAttribute.needsUpdate = true;
        
        // Update active particle index in shader
        if (particleMaterial.uniforms) {
            particleMaterial.uniforms.activeParticleIndex.value = closestIndex;
        }
    }

    // Animation loop
    function animate() {
        animationId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Find closest particle to mouse
        const previousClosestIndex = closestParticleIndex;
        findClosestParticle();
        
        // Check if we've moved to a different particle
        if (previousClosestIndex !== closestParticleIndex) {
            if (previousClosestIndex >= 0) {
                const positions = particleGeometry.attributes.position.array;
                const i3 = previousClosestIndex * 3;
                previousParticle.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            }
            transitionStartTime = Date.now();
        }
        
        const transitionTime = (Date.now() - transitionStartTime) / 1000;
        
        // Update shader uniforms
        if (particleMaterial.uniforms) {
            particleMaterial.uniforms.time.value = time;
            particleMaterial.uniforms.activeParticleOrigin.value = closestParticle;
            particleMaterial.uniforms.previousActiveParticle.value = previousParticle;
            particleMaterial.uniforms.transitionTime.value = transitionTime;
        }

        if (lineMaterial.uniforms) {
            lineMaterial.uniforms.time.value = time;
            lineMaterial.uniforms.activeParticleOrigin.value = closestParticle;
        }

        // Camera animation
        const radius = 8;
        const speed = 0.005;
        const zoomSpeed = 0.001;
        const minRadius = 2;
        const currentRadius = Math.max(minRadius, radius - (time * zoomSpeed));
        
        camera.position.x = 0;
        camera.position.y = Math.sin(time * speed) * currentRadius;
        camera.position.z = Math.cos(time * speed) * currentRadius;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    // Initialize and start animation
    init();
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (renderer) {
            renderer.dispose();
        }
    });
});