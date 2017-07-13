var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
    var container;
    var camera, scene, renderer;
    var particles, particle, count = 0;
    var mouseX = 0, mouseY = -300;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    if (!getBrowser().isMobile) {
        init();
        animate();
    }
    function init() {
        container = document.createElement('div');
        container.style.position = "absolute";
        container.style.top = "0";
        container.style.left = "0";
        container.style.zIndex = "-1";
        $(".wrap").append(container);
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        particles = new Array();
        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial({
            color: 0x337ab7,
            program: function (context) {
                context.beginPath();
                context.arc(0,0,1,0,PI2,true);
                context.fill();
            }
        });
        var i = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
                particle = particles[i++] = new THREE.Particle(material);

                particle.position.x = Math.floor(Math.random()*4800+1)* Math.pow((-1),iy);

                console.log(particle.position.x);
                particle.position.z = Math.floor(Math.random()*2000+1)* Math.pow((-1),ix);
                scene.add(particle);
            }
        }
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }

    }
    function animate() {
        requestAnimationFrame(animate);
        temprender();
    }

    function render() {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);
        var i = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

                particle = particles[i++];
                particle.position.y =
                    (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                particle.scale.x =
                    particle.scale.y =
                        (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1)
                        * 2;
            }
        }
        renderer.render(scene, camera);
        count += 0.1;
    }

    function temprender() {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.lookAt(scene.position);
        var i = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

                particle = particles[i++];
                particle.position.y =
                     (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)-200;
                particle.scale.x =
                    particle.scale.y =5
            }
        }
        renderer.render(scene, camera);
        count += 0.1;
    }