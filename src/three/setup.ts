import { WebGLRenderer, Scene, Vector3, PerspectiveCamera, AmbientLight, DirectionalLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

import Example from "./modules/example";

export default class Setup {
    public renderer: WebGLRenderer;
	protected scene: Scene;
	protected camera: PerspectiveCamera;

	protected controls: OrbitControls;
	protected gui: dat;

	protected stage: HTMLElement;
	protected root: HTMLElement;
	protected width: number;
	protected height: number;
	protected requestId: number;

    private ro: ResizeObserver;
	private io: IntersectionObserver;

    private example: Example;

    static get CAMERA_PARAM() {
		return {
			fov: 70,
			near: 0.1,
			far: 1000.0,
			lookAt: new Vector3(0.0, 0.0, 0.0),
		};
	}

    static get RENDERER_PARAM() {
		return {
			pixelRatio: Math.min(window.devicePixelRatio, 1.75),
			antialias: true,
			alpha: true,
		};
	}

	constructor({ stage, root }) {
		this.stage = stage;
		this.root = root;
		this.width = this.stage.offsetWidth;
		this.height = this.stage.offsetHeight;
	}

    protected createGUI() {
		this.gui = new dat.GUI();
	}

    protected createControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}

    protected createRenderer(_opacity = 0) {
		this.renderer = new WebGLRenderer({
			antialias: Setup.RENDERER_PARAM.antialias,
			alpha: Setup.RENDERER_PARAM.alpha,
		});
		this.renderer.setPixelRatio(Setup.RENDERER_PARAM.pixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xeeeeee, 1);
		this.stage.appendChild(this.renderer.domElement);
	}

	protected createScene() {
		this.scene = new Scene();
	}

	protected createCamera() {
		this.camera = new PerspectiveCamera(
			Setup.CAMERA_PARAM.fov,
			this.width / this.height,
			Setup.CAMERA_PARAM.near,
			Setup.CAMERA_PARAM.far
		);
		this.camera.position.z = 2.0;
	}

    private addLight(){
        const light1 = new AmbientLight(0xffffff, 0.5);
        this.scene.add(light1);

        const light2 = new DirectionalLight(0xffffff, 0.5);
        light2.position.set(0.5, 0.0, 0.866)
        this.scene.add(light2);
    }

    private start() {
		this.requestId = requestAnimationFrame(this.render.bind(this));
	}

	private stop() {
		if (this.requestId) cancelAnimationFrame(this.requestId);
	}

    public mount(){
        this.createRenderer();
		this.createScene();
		this.createCamera();
		this.createControls();
		this.addLight();

        this.example = new Example(this.width, this.height);
        this.scene.add(this.example.mesh);

        this.ro = new ResizeObserver(() => {
			this.resize();
		});
		this.ro.observe(this.root);

        this.io = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				this.start();
			} else {
				this.stop();
			}
		});
		this.io.observe(this.root);
    }

    private resize() {
		this.width = this.stage.offsetWidth;
		this.height = this.stage.offsetHeight;

		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
		this.renderer.setSize(this.width, this.height);

		// @ts-ignore
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	}

    private render() {
		this.renderer.render(this.scene, this.camera);
		if (this.requestId) cancelAnimationFrame(this.requestId);
		this.requestId = requestAnimationFrame(this.render.bind(this));
	}
}
