import Setup from "../three/setup";

export default () => {
    let three = null;
    return {
        init(){
            if (process.env.NODE_ENV !== "production") {
				console.log("init webgl");
			}

            const root = this.$root;

            three = new Setup({
                stage: this.$refs.stage,
                root
            });

            three.mount();
        },
    }
};
