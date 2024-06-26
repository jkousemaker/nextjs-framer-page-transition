uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;

#define PI 3.14159265358979323846264

// Function definitions
mat2 mm2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

float tri(float x) {
    return clamp(abs(fract(x) - 0.5), 0.01, 0.49);
}

vec2 tri2(vec2 p) {
    return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x)));
}

float triNoise2d(vec2 p, float spd) {
    float z = 1.8;
    float z2 = 2.5;
    float rz = 0.0;
    p *= mm2(p.x * 0.06);
    vec2 bp = p;
    for (float i = 0.0; i < 5.0; i++) {
        vec2 dg = tri2(bp * 1.85) * 0.75;
        dg *= mm2(iTime * spd);
        p -= dg / z2;
        bp *= 1.3;
        z2 *= 0.45;
        z *= 0.42;
        p *= 1.21 + (rz - 1.0) * 0.02;
        rz += tri(p.x + tri(p.y)) * z;
        p *= -mm2(0.0);
    }
    return clamp(1.0 / pow(rz * 29.0, 1.3), 0.0, 0.55);
}

float hash21(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

vec4 aurora(vec3 ro, vec3 rd) {
    vec4 col = vec4(0.0);
    vec4 avgCol = vec4(0.0);
    
    for(float i = 0.0; i < 50.0; i++) {
        float of = 0.006 * hash21(gl_FragCoord.xy) * smoothstep(0.0, 15.0, i);
        float pt = ((0.8 + pow(i, 1.4) * 0.002) - ro.y) / (rd.y * 2.0 + 0.4);
        pt -= of;
        vec3 bpos = ro + pt * rd;
        vec2 p = bpos.zx;
        float rzt = triNoise2d(p, 0.06);
        vec4 col2 = vec4(0.0, 0.0, 0.0, rzt);
        col2.rgb = (sin(1.0 - vec3(2.15, -0.5, 1.2) + i * 0.043) * 0.5 + 0.5) * rzt;
        avgCol = mix(avgCol, col2, 0.5);
        col += avgCol * exp2(-i * 0.065 - 2.5) * smoothstep(0.0, 5.0, i);
    }
    
    col *= (clamp(rd.y * 15.0 + 0.4, 0.0, 1.0));
    return col * 1.8;
}

vec3 bg(vec3 rd) {
    float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd) * 0.5 + 0.5;
    sd = pow(sd, 5.0);
    vec3 col = mix(vec3(0.05, 0.1, 0.2), vec3(0.1, 0.05, 0.2), sd);
    return col * 0.63;
}

void main() {
    vec2 fragCoord = vUv * iResolution;
    vec2 p = fragCoord / iResolution - 0.5;
    p.x *= iResolution.x / iResolution.y;
    
    vec3 ro = vec3(0.0, 0.0, -6.7);
    vec3 rd = normalize(vec3(p, 1.0));
    
    vec2 mo = iMouse / iResolution;
    mo = (mo == vec2(0.0)) ? vec2(-0.2, 0.4) : mo;
    mo.x *= iResolution.x / iResolution.y;
    
    rd.yz *= mm2(mo.y);
    rd.xz *= mm2(mo.x + sin(iTime * 0.05) * 0.2);
    
    vec3 col = vec3(0.0);
    vec3 brd = rd;
    float fade = smoothstep(0.0, 0.01, abs(brd.y)) * 0.1 + 0.9;
    
    col = bg(rd) * fade;
    
    if (rd.y > 0.0) {
        vec4 aur = smoothstep(0.0, 1.5, aurora(ro, rd)) * fade;
        col = col * (1.0 - aur.a) + aur.rgb;
    } else {
        rd.y = abs(rd.y);
        col = bg(rd) * fade * 0.6;
        vec4 aur = smoothstep(0.0, 2.5, aurora(ro, rd));
        col = col * (1.0 - aur.a) + aur.rgb;
        vec3 pos = ro + ((0.5 - ro.y) / rd.y) * rd;
        float nz2 = triNoise2d(pos.xz * vec2(0.5, 0.7), 0.0);
        col += mix(vec3(0.2, 0.25, 0.5) * 0.08, vec3(0.3, 0.3, 0.5) * 0.7, nz2 * 0.4);
    }
    
    gl_FragColor = vec4(col, 1.0);
}