precision mediump float;

uniform float u_time;

varying vec2 UV;
varying float Displacement;
varying vec3 v_Normal;

void main(){
	UV = uv;
	v_Normal = normal;
	float displacement = cos(UV.x * 40. + sin(UV.y * 20.) * 10. + u_time);
	Displacement = displacement;
	vec3 newPosition = position + normal * displacement;
	vec4 mvPosition = modelViewMatrix*vec4(newPosition, 1.);
	gl_Position = projectionMatrix*mvPosition;
}