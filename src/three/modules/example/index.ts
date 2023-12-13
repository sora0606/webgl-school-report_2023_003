import { DoubleSide, Mesh, PlaneGeometry, RawShaderMaterial, Vector4 } from "three";

import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";

export default class Example {
  private width: number;
	private height: number;

	private geometry: PlaneGeometry;
	private material: RawShaderMaterial;
	public mesh: Mesh;

	private time: number;

  constructor(_width, _height){
    this.width = _width;
    this.height = _height;

    this.time = 0;

    this.createObject();
  }

  private createObject(){
    this.material = new RawShaderMaterial({
      side: DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Vector4() },
      },
      wireframe: false,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new PlaneGeometry(1.0, 1.0, 1.0, 1.0);
    this.mesh = new Mesh(this.geometry, this.material);
  }
}