import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default () => {
    let renderer, scene, camera, directionalLight, ambientLight, geometry, material, controls, group;

    const RENDERER_PARAM = {
        clearColor: 0x666666,
        width: window.innerWidth,
        height: window.innerHeight,
    }

    const CAMERA_PARM = {
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1100.0,
        position: {
            x: 0.0,
            y: 0.0,
            z: 400.0,
        }
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 1.0,
        position: {
            x: 1.0,
            y: 1.0,
            z: 1.0,
        }
    };

    const AMBIENT_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.2,
    };

    return {

        init(){
            console.log("Start WebGL");

            const root = this.$root;

            this.createWorld(root);
        },

        createWorld(root: HTMLElement){
            if(!root){
                return;
            }

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
            renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
            renderer.setAnimationLoop(this.render);
            root.appendChild(renderer.domElement);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
                CAMERA_PARM.fov,
                CAMERA_PARM.aspect,
                CAMERA_PARM.near,
                CAMERA_PARM.far
            );
            const FOV_RAD = (CAMERA_PARM.fov / 2) * (Math.PI / 180);
            camera.position.set(
                CAMERA_PARM.position.x,
                CAMERA_PARM.position.y,
                CAMERA_PARM.position.z ? CAMERA_PARM.position.z:RENDERER_PARAM.height / 2 / Math.tan(FOV_RAD)
            );

            directionalLight = new THREE.DirectionalLight(
                DIRECTIONAL_LIGHT_PARAM.color,
                DIRECTIONAL_LIGHT_PARAM.intensity
            );
            directionalLight.position.set(
                DIRECTIONAL_LIGHT_PARAM.position.x,
                DIRECTIONAL_LIGHT_PARAM.position.y,
                DIRECTIONAL_LIGHT_PARAM.position.z
            );
            scene.add(directionalLight);

            ambientLight = new THREE.AmbientLight(
                AMBIENT_LIGHT_PARAM.color,
                AMBIENT_LIGHT_PARAM.intensity
            );
            scene.add(ambientLight);

            this.createMesh();

            controls = new OrbitControls(camera, renderer.domElement);
        },

        createMesh(){
            group = new THREE.Group();

            for (let i = 0; i < 100; i++) {
                const BOX_SIZE = Math.min((i + 1.0) / 4, 25);
                geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
                material = new THREE.MeshPhongMaterial({ color: Math.max(i * 0xffffff, 0xffffff) });

                const mesh = new THREE.Mesh(geometry, material);

                // 10 * Math.PIは円を何周させるかを表す。（2 * Math.PI = 一周分）
                // / 100 をすることで上記で定義した周を100等分する
                // (i * 1.5)は園の半径の長さを表す
                mesh.position.x = Math.sin(i * (10 * Math.PI) / 100) * (i * 1.5);
                mesh.position.y = i * 2.5;
                mesh.position.z = Math.cos(i * (10 * Math.PI) / 100) * (i * 1.5);

                group.add(mesh);
            }

            group.position.y = ((100 * 2.5) / 2) * -1;

            scene.add(group);
        },

        render(){
            group.rotation.y -= 0.005;

            group.traverse((e)=>{
                if(!(e instanceof THREE.Mesh)){
                    return;
                }

                e.rotation.x += (e.id - 13) / 100 * 0.05;
                e.rotation.y -= (e.id - 13) / 100 * 0.05;
            })

            controls.update();
            renderer.render(scene, camera);
        },

        resize(){
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
    }
};
