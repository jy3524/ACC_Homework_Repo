precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;
varying float Displacement;
varying vec3 v_Normal;

void main(void){
  vec2 position = UV * 2. - 1.;

  float red = abs( 
    sin(position.x * position.y + u_time / 5.) * Displacement
  );
  float green = abs( 
    sin(position.x * position.y + u_time / 4.) * Displacement
  );
  float blue = abs( 
    sin(position.x * position.y + u_time / 3.) * Displacement
  );

  vec3 hue = vec3(UV.x, UV.y, 0);

  gl_FragColor=vec4(v_Normal, 1.0);
}