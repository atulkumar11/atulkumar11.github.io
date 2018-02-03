function videotexture() {
// creation of variable necessary for a three js application 
//creation of variables use for the display.
    var video, videoImage, videoImageContext, videoTexture, backgroundtexture, backgroundMesh, backgroundScene, backgroundCamera, mesh;
    //Variable for store elements, like the files to use or the variables to use in the gui
    var group;
    var fileElem;
    var meshes = [];
    var gui;
    var variable = [];
    var hiders = [];
    var h;
    //loading textures in a txt file
    var text_data = [];
    var color_data = [];
    var colors_to_apply = [];
    var Color = [];
    //var textures = [];

    //initialisation and looping the scene
    init();
    animate();
    function init() {

        //definition of the camera and creation of the scene

        camera.position.set(-20, 10, 50);
        camera.lookAt(new THREE.Vector3(0, 0, 0, ));
        // Video, we store in two variables our canvas and video objects
        video = document.getElementById('monitor');
        videoImage = document.getElementById('videoImage');
        //we get the context of the context in order to 'draw' inside
        videoImageContext = videoImage.getContext('2d');
        // Background color if no video present
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect(0, 0, videoImage.innerWidth, videoImage.innerHeight);
        videoTexture = new THREE.Texture(videoImage);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        var movieMaterial = new THREE.MeshBasicMaterial({map: videoTexture, overdraw: true, side: THREE.DoubleSide});
        //Load the background texture and use the video played in the canvas as a texture
        backgroundtexture = new THREE.Texture(videoImage);
        backgroundMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), new THREE.MeshBasicMaterial({map: videoTexture}));
        backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;
        // Create Background scene
        backgroundScene = new THREE.Scene();
        backgroundCamera = new THREE.Camera();
        backgroundScene.add(backgroundCamera);
        backgroundScene.add(backgroundMesh);
        // Renderer


        //We add an event listener when the window is resized by the user. This allowed the application to stay 'fit' with the window
        //onwindowresize is a function which is implemented at the animate function
        window.addEventListener('resize', onWindowResize, false);
        // Stats 
        stats = new Stats();
        container.appendChild(stats.dom);
//                // Load Files selected by the user
//                group = new THREE.Object3D(); //not necessary
//                //get the files selected by the user
//                fileElem = document.getElementById("File");
//                //read the txt file containing color information
//                        function readTextFile(file) {
//                        var rawFile = new XMLHttpRequest();
//                                rawFile.open("GET", file);
//                                rawFile.onreadystatechange = function () {
//                                if (rawFile.readyState === 4) {
//                                if (rawFile.status === 200 || rawFile.status == 0) {
//                                var allText = rawFile.responseText;
//                                        //we read and split for every blank space in the text file
//                                        text_data = allText.split('\n');
//                                        for (var j = 0; j < text_data.length; j++) {
//                                color_data.push(text_data[j].split(" "));
//                                        //color_data contain the color information of each organes
//                                }
//
//                                }
//                                }
//                                }
//                        rawFile.send(null);
//                        }
//                readTextFile("./examples/textures/ApplicationTextures/test3.txt");
//                        //try to find a way to figure out how to get a fix path and not depend on the local host
//
//
//
//                        //initialize loaders
//                        var loader = new THREE.STLLoader();
//                        //   var mamap = new THREE.TextureLoader(); this one is only used if we want to get color from jpg images
//
//
//                        // event fired when the user finished the selection of stl files
//                        fileElem.addEventListener('change', function (event) {
//
//                        var i,
//                                files = fileElem.files,
//                                len = files.length;
//                                //this loop is only here if we want to get colors from jpg images, 
//                                /* for (var j = 0; j < len; j++) {
//                                 var myMap = mamap.load('examples/textures/ApplicationTextures/' + files[j].name.split(".").reverse().pop() + '.jpg');
//                                 textures.push(myMap);
//                                 }*/
//
//                                // we fill a variable with the color of the txt file
//
//                                for (var z = 0; z < color_data.length; z++) {
//                        for (var y = 1; y < color_data[z].length; y++) {
//                        colors_to_apply.push(color_data[z][y]);
//                        }
//
//                        }
//
//
//                        //function for load every files 
//
//                        var callback = function (geometry) {
//
//
//                        // we get the rgb colors from the txt file
//                        var coloration = new THREE.Color(colors_to_apply[v], colors_to_apply[v + 1], colors_to_apply[v + 2])
//                                //we convert them in hexadecimal, rgbToHex is define further
//                                var new_coloration = rgbToHex(coloration.r, coloration.g, coloration.b);
//                                //we apply it to the material, the material is update at every call of the callback function
//                                var material = new THREE.MeshPhongMaterial({ transparent: true, color: new_coloration }); //map: textures[i] }); this is for color from jpg
//                                material.depthWrite = false; // important, if set to right, when we change the opacity of an organe, everything behind will be hidden
//
//
//
//                                //caracteristics of the mesh
//                                mesh = new THREE.Mesh(geometry, material);
//                                //position and size
//                                mesh.position.set(0, 0, 0);
//                                mesh.rotation.set(0, - Math.PI / 2, 0);
//                                mesh.scale.set(0.05, 0.05, 0.05);
//                                //shadows
//                                mesh.castShadow = true;
//                                mesh.receiveShadow = true;
//                                //we set the name of the mesh
//                                mesh.name = files[i].name;
//                                meshes[i] = mesh;
//                                //hiders is a variable which will be used to hide object in the gui
//                                hiders.push(mesh);
//                                group.add(mesh);
//                                //update iterators
//                                i++;
//                                v += 3;
//                                if (i < len)  // put the next load in the callback, while i < number of files, we havn't load the files so we load the next file
//                        {
//                        loader.load('examples/models/stl/ascii/' + files[i].name, callback);
//                        }
//                        };
//                                v = 0
//                                i = 0;
//                                //first call of the loader of stl file
//                                loader.load('examples/models/stl/ascii/' + files[i].name, callback);
//                                //GUI
//                                //initialisation of gui
//                                gui = new dat.GUI();
//                                var folders = [];
//                                var opacities = [];
//                                //creation of the parameters of the gui
//                                for (var k = 0; k < len; k++) {
//                        h = {
//                        toggleObjects: true,
//                                full_scene: true,
//                                reset_scene: function () { reset_scene(); },
//                                color: "#ff0000",
//                                camera_locked: false,
//                                opacity: 1
//                        };
//                                //separate every organes in folders in the gui
//                                //add the 3 options
//                                folders[k] = gui.addFolder(files[k].name.split(".").reverse().pop());
//                                variable[k] = folders[k].add(h, 'toggleObjects').name('Visible').listen();
//                                Color[k] = folders[k].addColor(h, 'color').name('color').listen();
//                                opacities[k] = folders[k].add(h, 'opacity').min(0).max(1).step(0.01).name('Opacity').listen();
//                        }
//
//                        //let is VERY important because if we use var, it doesn't work because var keep the last value of the loop and so only the last mesh is active. let avoid this problem
//                        for (let l = 0; l < len; l++) {
//
//                        variable[l].onChange(function (value) {
//
//                        hiders[l].visible = value;
//                        });
//                        }
//                        //Change Color of the object. The color will be based on the initial color, coming from the txt file, of the file loaded
//                        for (let m = 0; m < len; m++) {
//                        Color[m].onChange(function (value)
//                        { meshes[m].material.color.setHex(value.replace("#", "0x")); });
//                        }
//                        //Change opacities of every object 
//                        for (let n = 0; n < len; n++) {
//                        opacities[n].onChange(function (value) {
//                        meshes[n].material.opacity = value;
//                        });
//                        }
//
//                        //Hide the scene to go in traditionnal endoscopic view
//                        var hide_scene = gui.add(h, 'full_scene').name('Hide Scene').listen();
//                                hide_scene.onChange(function (value) { scene.visible = value; });
//                                //Rest the positions
//                                gui.add(h, 'reset_scene').name('Reset');
//                                function reset_scene() {
//                                controls.reset();
//                                        for (let n = 0; n < len; n++) {
//                                meshes[n].visible = true;
//                                }
//
//                                }
//                        //Disable controls button
//                        var lock_camera = gui.add(h, 'camera_locked').name('Lock Model').listen();
//                                lock_camera.onChange(function (value) {
//                                controls.enableZoom = !value;
//                                        controls.enableRotate = !value;
//                                        controls.enablePan = !value;
//                                });
//                        }, false);
//                        scene.add(group);
        // Controls, allowed to move the elements of the scene, care it is the camera which moves, not the objects of the scene

        controls.target.set(0, 1, 0);
        controls.update();
        // Start
        startTime = Date.now();
        time = 0;
    }

    //end init


    //convert color from rgb to hex
    function componentToHex(c) {
        var hex = parseFloat(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    //Allow the rendering

    function render() {

        renderer.render(scene, camera);
    }

    //Function call if the window is resized by the user
    function onWindowResize() {
        //We resize the canvas 
        videoImage.width = videoImage.clientWidth;
        videoImage.height = videoImage.clientHeight;
        //We resize the renderer at the new size of the canvas, the canvas can change size thx to the css options (16:9 values)
        renderer.setViewport(0, 0, videoImage.clientWidth, videoImage.clientHeight);
        renderer.setSize(videoImage.clientWidth, videoImage.clientHeight);
        //we update the aspect of the camera with the new canvas dimensions
        camera.aspect = videoImage.clientWidth / videoImage.clientHeight;
        camera.updateProjectionMatrix();
    }
    //Update the controls and the stats, which allowed us to move the objects in the scene
    function update() {
        controls.update();
        stats.update();
    }
    //animate is essential in order to have the webcam images on the background, it cames from three js documentation and Lee Stemkoski works on webcam textures 
    function animate() {
        requestAnimationFrame(animate);
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            videoImageContext.drawImage(video, 0, 0, videoImage.width, videoImage.height);
            if (videoTexture) {
                videoTexture.needsUpdate = true;
            }
        }

        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene, backgroundCamera);
        renderer.localClippingEnabled = false;
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        render();
        update();
    }
}