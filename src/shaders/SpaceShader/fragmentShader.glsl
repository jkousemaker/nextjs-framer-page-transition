uniform vec2 iResolution;
uniform float iTime;

varying vec2 vUv;

#define t iTime
#define r iResolution.xy

void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * iResolution;

    vec3 c;
    float l, z = t;
    for(int i = 0; i < 3; i++) {
        vec2 uv, p = fragCoord / r;
        uv = p;
        p -= 0.5;
        p.x *= r.x / r.y;
        z += 0.07;
        l = length(p);
        uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));
        c[i] = 0.01 / length(mod(uv, 1.0) - 0.5);
    }
    fragColor = vec4(c / l, t);

    gl_FragColor = fragColor;
}