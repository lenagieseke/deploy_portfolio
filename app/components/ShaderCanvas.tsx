"use client"

import React, { useEffect, useRef } from "react"

type ShaderCanvasProps = {
    fragmentShader: string
    className?: string
}

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`

export function ShaderCanvas({ fragmentShader, className }: ShaderCanvasProps){

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const stopScroll = (e: Event) => {
            e.preventDefault()         // block panning/zooming
            // also stop propagation so parent scroll handlers don't fire
            e.stopPropagation()
        }

        const gl = canvas.getContext("webgl")
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) throw new Error("Failed to create shader");
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                const log = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error(`Shader compile error: ${log}`);
            }
            return shader;
        }

        const createProgram = (vsSource: string, fsSource: string) => {
            const vs = compileShader(gl.VERTEX_SHADER, vsSource);
            const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
            const program = gl.createProgram();
            if (!program) throw new Error("Failed to create program");
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                const log = gl.getProgramInfoLog(program)
                gl.deleteProgram(program)
                throw new Error(`Program link error: ${log}`)
            }
            return program;
        };

        const program = createProgram(vertexShaderSource, fragmentShader);
        gl.useProgram(program);

        // fullscreen quad
        const positions = new Float32Array([
        -1, -1,
        1, -1,
        -1,  1,
        1,  1,
        ]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        const uResolution = gl.getUniformLocation(program, "u_resolution");
        const uTime = gl.getUniformLocation(program, "u_time");
        const uMouse = gl.getUniformLocation(program, "u_mouse");
        const uMouseActive = gl.getUniformLocation(program, "u_mouseActive");


        const mousePos = { x: 0, y: 0 };
        let pointerInCanvas = false;

    const handlePointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect()
        mousePos.x = e.clientX - rect.left
        mousePos.y = rect.height - (e.clientY - rect.top) // flip y

        pointerInCanvas =
            mousePos.x >= 0 && mousePos.x <= rect.width &&
            mousePos.y >= 0 && mousePos.y <= rect.height
    }

    canvas.addEventListener("pointermove", handlePointerMove);

        

        const handlePointerLeave = () => {
            pointerInCanvas = false;
            // optional: park mousePos somewhere safe
        };
        canvas.addEventListener("pointerleave", handlePointerLeave);
        // Prevent page scroll while interacting with the canvas on touch devices
        canvas.addEventListener("pointerdown", stopScroll, { passive: false })
        canvas.addEventListener("pointermove", stopScroll, { passive: false })
        canvas.addEventListener("touchstart", stopScroll, { passive: false })
        canvas.addEventListener("touchmove", stopScroll, { passive: false })

        const resize = () => {
            const displayWidth = canvas.clientWidth
            const displayHeight = canvas.clientHeight
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth
                canvas.height = displayHeight
            }
            gl.viewport(0, 0, canvas.width, canvas.height)
            if (uResolution) {
                gl.uniform2f(uResolution, canvas.width, canvas.height)
            }
        };

        let frameId: number;
        const start = performance.now();

        const render = () => {
            resize()

            const t = (performance.now() - start) * 0.001;
            if (uTime) gl.uniform1f(uTime, t);
            if (uMouse) gl.uniform2f(uMouse, mousePos.x, mousePos.y);
            if (uMouseActive) gl.uniform1i(uMouseActive, pointerInCanvas ? 1 : 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            frameId = requestAnimationFrame(render)
        };

        render();

        return () => {
            cancelAnimationFrame(frameId);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerleave", handlePointerLeave);
            canvas.removeEventListener("pointerdown", stopScroll)
            canvas.removeEventListener("pointermove", stopScroll)
            canvas.removeEventListener("touchstart", stopScroll)
            canvas.removeEventListener("touchmove", stopScroll)
        };
    }, [fragmentShader])

    return <canvas ref={canvasRef} className={className} />
}





export const fragmentShader = 
`precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2 u_mouse;
// uniform bool u_mouseActive;

const float K_MELT = 0.4;
const float INV_K_MELT = 1.0 / K_MELT;
const float TWO_PI = 6.283185;

// For the melting
// FROM https://iquilezles.org/articles/smin/
// Usually K_MELT would be a function 
// parameter; using a global here to be 
// consistent with INV_K_MELT
float smin(float a, float b)
{
    float h = max(K_MELT - abs(a - b), 0.0) * INV_K_MELT;
    return min(a, b) - h * h * K_MELT * (1.0 / 4.0);
}

/*
The motion:
The shader can't keep a state and with that can't remember the current direction. 
Instead it re-derives the current direction every frame directly from time. 
For that position is expressed as a triangle wave, which automatically encodes direction:
* In the rising part of the wave, the point moves from box_min → box_max.
* In the falling part, it moves from box_max → box_min.

There is no stored velocity flip and no branching logic that remembers previous motion. The “direction” is simply which half of the triangle wave time currently lies in. Direction emerges from the shape of the wave itself, not from state.

This makes the bounce fully deterministic, stateless, and entirely driven by time.
*/


/*
Bouncing motion between box_min and box_max with 
per-axis velocity, no state needed.
The motion is a 2D triangle wave:
    * The point moves from box_min -> box_max
    * Then back from box_max -> box_min
    * And repeats forever...
Everything is derived from time t, as the shader has no memory.
*/
vec2 bounce_2D(float t, vec2 range, vec2 velocity, vec2 start_box_space) 
{

    // 1. Create a sawtooth in [0, 2 * range] per axis
    //     * t * velocity increases without limit.
    //     * mod maps it to the repeating range [0, 2*range)
    // Why 2*range?
    //     * Because one full cycle per axis is:
    //          * go up from 0 → range
    //          * go down from range → 0
    //       → Total cycle length = 2*range

    vec2 motion = start_box_space + t * velocity;
    vec2 sawtooth = mod(motion, 2.0 * range);

    // 2) Turn the sawtooth into a triangle wave in [0, range]
    // (Folds the second half of the sawtooth
    //  down to form a triangle wave)
    // sawtooth - range: centers the sawtooth around 0 in [-range, range]
    // abs(sawtooth - range): makes a V-shape from 0 up to range
    // range - abs(...): inverts that V into a triangle in [0, range]
    //
    // sawtooth : 0 1 2 3 4 5 6...
    // triangle : 0 1 2 3 2 1 0... (back-and-forth motion)
    vec2 triangle_wave = range - abs(sawtooth - range); 

    // Alternative explicit form (per component):
    // vec2 triangle_wave = vec2(
    //     (sawtooth.x <= range.x) ? sawtooth.x : 2.0 * range.x - sawtooth.x,
    //     (sawtooth.y <= range.y) ? sawtooth.y : 2.0 * range.y - sawtooth.y
    // );

    // 3. Shift the triangle wave into the desired range [box_min, box_max]
    // (up to this point, triangle_wave moves in [0, range])
    return triangle_wave;
}


// Compute the movement box for a given blob radius
void get_box_bounds(float radius, out vec2 box_min, out vec2 box_max, float aspect)
{
    // margin around the blob
    vec2 box_margin = vec2(radius + 0.2);

    box_min = vec2(-aspect + box_margin.x, -1.0 + box_margin.y);
    box_max = vec2( aspect - box_margin.x,  1.0 - box_margin.y);
}

// From p-space to box space
vec2 motion_point_2D(float radius, vec2 velocity, vec2 start, float aspect)
{
    // Define the box in which the center is allowed to move
    vec2 box_min, box_max;
    get_box_bounds(radius, box_min, box_max, aspect);

    // Length of the movement range per axis
    vec2 range = box_max - box_min;
    // Convert start position from p-space to box-local space [0, range]
    vec2 start_box_space = clamp(start - box_min, vec2(0.0), range);

    // Bouncing center in box-space, deterministic from time
    vec2 box_pos = bounce_2D(u_time, range, velocity, start_box_space);

    return box_min + box_pos;   // back to p-space

}

// return value is positive if point is outside,
// negative if p is inside of the circle
float sdf_circle(vec2 p, float radius)
{
    return length(p) - radius;
}


float motion_circle_2D(vec2 pt, float radius, vec2 velocity, vec2 start_position, float aspect)
{
    vec2 center = motion_point_2D(radius, velocity, start_position, aspect);
    return sdf_circle(pt - center, radius);
}

// Mouse in the same p-space as p in main()
vec2 mouse_p() {
    
    return (2.0 * u_mouse - u_resolution) / u_resolution.y;
}

float mouse_circle_2D(vec2 pt, float radius, float aspect)
{
    // if(u_mouseActive) {
    vec2 m = mouse_p();
    vec2 box_min, box_max;
    get_box_bounds(radius, box_min, box_max, aspect); // radius of the mouse blob
    m = clamp(m, box_min, box_max);
    return sdf_circle(pt - m, radius);  // negative inside
    // }
}

// cosine based palette, 4 vec3 params
// FROM https://iquilezles.org/articles/palettes/
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos(TWO_PI*(c*t+d) );
}



// Not elegant but practical
vec3 gradient(float t) {

    t = clamp(t, 0.0, 1.0);

    vec3 c0 = vec3(1.); 
    vec3 c5 = vec3(0.3, 0.9, 1.00);
    vec3 c1 = vec3(0.98, 0.31, 1.0);
    vec3 c4 = vec3(0.55, 0.49, 1.00);
    vec3 c2 = vec3(1.0, 0.0, 0.298);
    vec3 c3 = vec3(0.66, 0.0, 0.75);
    // vec3 c2 = vec3(1.0, 0.9843, 0.7098);
    vec3 c6 = vec3(1.0, 0.0, 0.949);  


    // Map t to 6 segments [0..6]
    float x = t * 6.0;
   // Integer segment index: 0, 1, 2, ... (6 when t == 1)
    float seg = floor(x);
    // Fraction inside the current segment, always 0..1
    float u = fract(x);

    // Inside a segment, blend from c0 to c1.
    // u is the local 0..1 position inside the segment,
    // so the color transitions smoothly from c0 (u=0) to c1 (u=1)
    if (seg < 1.0) return mix(c0, c1, u);
    if (seg < 2.0) return mix(c1, c2, u);
    if (seg < 3.0) return mix(c2, c3, u);
    if (seg < 4.0) return mix(c3, c4, u);
    if (seg < 5.0) return mix(c4, c5, u);
                   return mix(c5, c6, u);


}


void main() 
{
    // Computing aspect here once and then carrying it
    // as parameter through the functions for a tiny bit
    // performance gain by not recomputing it in the functions
    float aspect = u_resolution.x / u_resolution.y;

    // Center at (0,0), y in [-1,1], x in [-aspect, aspect]
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

    // // float motion_circle_2D(vec2 pt, float radius, vec2 velocity, vec2 start_position, float aspect)
    float circle1 = motion_circle_2D(p, 0.3, vec2(0.2, 0.3), vec2(0.), aspect);
    float circle2 = motion_circle_2D(p, 0.1, vec2(0.4, -0.8), vec2(.4), aspect);
    float circle3 = motion_circle_2D(p, 0.06, vec2(-0.5, 0.5), vec2(.8, -.8), aspect);
    float circle4 = motion_circle_2D(p, 0.02,  vec2(-1.3, -1.0), vec2(-.6, .9), aspect);
    float circle5 = motion_circle_2D(p, 0.02,  vec2(1., 1.4), vec2(.2, -.4), aspect);

    
    // float d = circle1;
    float d = smin(circle1, circle2);
    d = smin(d, circle3);
    d = smin(d, circle4);
    d = smin(d, circle5);

    //Additional blob at mouse
    d = smin(d, mouse_circle_2D(p, 0.14, aspect));
    // gl_FragColor = vec4(vec3(d), 1.0);


    // Modulate the falloff around the blob.
    // Maps the input range d ∈ [0.0, 0.4] to [0.0, 1.0] using a smooth S-curve.
    // d < 0.0 (inside the blob) → 0   (mask value 0 / black)
    // 0 ≤ d ≤ 0.4 → soft transition from 0 to 1 in the mask / from black to white
    // d > 0.4 → 1   (mask value 1 / fully white)
    // This increases the white area around the blobs and sharpens the visual contrast
    // between the dark interiors and the white exterior.
    float c = smoothstep(0.0, 0.4, d);
    // gl_FragColor = vec4(vec3(d), 1.0);


    // Contrast boost: gamma < 1 
    // brightens mid-range values
    float gamma = .2; 
    c = pow(c, gamma); // pow could be optimized for performance
    // gl_FragColor = vec4(vec3(c), 1.0);

    // Maps colors to c ranges
    vec3 color = gradient(c);
    // gl_FragColor = vec4(color, 1.0);

    // Creates a color gradient
    vec3 paletteColors = palette((p.x*p.y) * 0.8,vec3(0.1, 0.6, 0.2),vec3(0.8,0.8,0.2),vec3(1.),vec3(0.3, 0.5, 0.0));

    // Masking to keep the "insides"
    // of the blobs white by multiplying
    // the palette colors with c (0 inside, 1 outside)
    paletteColors *= c;
    
    color += (paletteColors);
    
    // mixing between color and white
    // based on c
    color = mix(color, vec3(1.), c);
    
    // Safety first
    color = clamp(color, vec3(0.), vec3(1.));


    gl_FragColor = vec4(color, 1.0);


    // gl_FragColor = vec4(vec3(p.x * p.y), 1.0);
    // gl_FragColor = vec4(vec3(c), 1.0);
    // gl_FragColor = vec4(palette, 1.0);
    // if (!u_mouseActive) {
    //     gl_FragColor = vec4(vec3(1., 0., 0.), 1.0);
    // }

}`;