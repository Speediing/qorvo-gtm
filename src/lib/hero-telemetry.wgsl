struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn sdBox(p: vec2f, b: vec2f) -> f32 {
  let d = abs(p) - b;
  return length(max(d, vec2f(0.0))) + min(max(d.x, d.y), 0.0);
}

fn sdRoundedBox(p: vec2f, b: vec2f, r: f32) -> f32 {
  return sdBox(p, max(b - vec2f(r), vec2f(0.0))) - r;
}

fn rotate(p: vec2f, a: f32) -> vec2f {
  let c = cos(a);
  let s = sin(a);
  return vec2f(c * p.x + s * p.y, -s * p.x + c * p.y);
}

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn rfSignalMark(p: vec2f) -> f32 {
  let plate = sdRoundedBox(p, vec2f(0.22, 0.18), 0.02);
  var mark = plate;
  for (var i = 0; i < 4; i = i + 1) {
    let fi = f32(i);
    let r = 0.045 + fi * 0.032;
    let ring = abs(length(p - vec2f(-0.02, 0.01)) - r) - 0.0045;
    mark = min(mark, ring);
  }
  let stem = sdBox(p - vec2f(-0.02, 0.11), vec2f(0.008, 0.06));
  mark = min(mark, stem);
  return mark;
}

fn dieGrid(p: vec2f, t: f32) -> f32 {
  let q = p - vec2f(0.12, -0.02);
  let cell = 0.034;
  let g = abs(fract(q / cell) - 0.5);
  let line = min(g.x, g.y);
  let inDie = sdRoundedBox(q, vec2f(0.17, 0.13), 0.01);
  let grid = mix(1.0, 0.0, smoothstep(0.0, 0.012, line));
  let pulse = 0.55 + 0.45 * sin(t * 1.4 + hash21(floor(q / cell)) * 6.2);
  return (1.0 - smoothstep(0.0, 0.008, inDie)) * grid * pulse;
}

fn ribbons(p: vec2f, t: f32) -> f32 {
  var acc = 0.0;
  for (var i = 0; i < 5; i = i + 1) {
    let fi = f32(i);
    let y0 = -0.30 + fi * 0.135;
    let amp = 0.032 + fi * 0.007;
    let freq = 5.4 + fi * 1.65;
    let speed = 0.28 + fi * 0.09;
    let y = y0 + amp * sin(p.x * freq + t * speed + fi * 1.1);
    let d = abs(p.y - y);
    acc += (1.0 - smoothstep(0.0, 0.0032, d)) * (0.28 - fi * 0.03);
    let tick = abs(fract(p.x * 2.6 + t * 0.07 + fi * 0.18) - 0.5);
    acc += (1.0 - smoothstep(0.0, 0.0018, abs(d - 0.014)))
      * (1.0 - smoothstep(0.45, 0.5, tick))
      * 0.09;
  }
  return acc;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let t = params.time;

  let breathe = 1.0 + 0.02 * sin(t * 0.85);
  let markP = rotate((p - vec2f(0.40, -0.10)) / breathe, -0.08);
  let dMark = rfSignalMark(markP);
  let fill = 1.0 - smoothstep(-0.0015, 0.004, dMark);
  let line = 1.0 - smoothstep(0.0, 0.0055, abs(dMark));
  let glow = exp(-max(dMark, 0.0) * 16.0);

  let traces = ribbons(p, t);
  let dies = dieGrid(p, t);
  let cell = floor(uv * vec2f(32.0, 18.0));
  let h = hash21(cell);
  let spark = step(0.972, h) * (0.45 + 0.55 * sin(t * 1.8 + h * 40.0));

  let berry = vec3f(0.694118, 0.121569, 0.227451);
  let paper = vec3f(0.960784, 0.945098, 0.909804);
  let leftClear = smoothstep(0.34, 0.62, uv.x);
  var a = fill * 0.08 + line * 0.28 + glow * 0.08 + traces * 0.28 + dies * 0.16 + spark * 0.06;
  a *= 0.55 * leftClear;
  a = clamp(a, 0.0, 0.34);
  let col = mix(berry, paper, spark * 0.45 + line * 0.05);
  return vec4f(col * a, a);
}
