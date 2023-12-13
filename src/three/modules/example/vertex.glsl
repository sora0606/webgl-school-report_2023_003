precision mediump float;
precision mediump int;

attribute vec3 position;
attribute vec3 offset;
attribute vec4 color;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying vec3 vPosition;

void main(){
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}