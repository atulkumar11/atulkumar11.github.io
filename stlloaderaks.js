function loadstlbatch(scene) {

    window.addEventListener("load", function () {
        "use strict";
//         var group;
        var fileElem, currentfilename;
        var meshes = [];
        var gui;
        gui = new dat.GUI();
        gui = new dat.GUI();
        var folders = [];
        var opacities = [];
        var variable = [];
        var hiders = [];
        var h, k = 0;
        //loading textures in a txt file
        var text_data = [];
        var color_data = [];
        var colors_to_apply = [];
        var Color = [];
        function readTextFile(file) {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        var allText = rawFile.responseText;
                        //we read and split for every blank space in the text file
                        text_data = allText.split('\n');
                        for (var j = 0; j < text_data.length; j++) {
                            color_data.push(text_data[j].split(" "));
                            //color_data contain the color information of each organes
                        }

                    }
                }
            }
            rawFile.send(null);
        }
        readTextFile("./examples/textures/ApplicationTextures/test3.txt");

        for (var z = 0; z < color_data.length; z++) {
            for (var y = 1; y < color_data[z].length; y++) {
                colors_to_apply.push(color_data[z][y]);
            }

        }


        var mat1 = new THREE.MeshPhongMaterial({
            color: 0x339900, ambient: 0x339900, specular: 0x030303,
        });
        var obj1 = new THREE.Mesh(new THREE.Geometry(), mat1);
        scene.add(obj1);

        var loop = function loop() {
            requestAnimationFrame(loop);
            //obj.rotation.z += 0.05;
            controls.update();
            //  renderer.clear();
            renderer.render(scene, camera);
        };
        loop();
        /////////////////////
        //				
//  //				reader.addEventListener( 'load', function ( event ) {
//
//					var contents = event.target.result;
//
//					var geometry = new THREE.STLLoader().parse( contents );
//					geometry.sourceType = "stl";
//					geometry.sourceFile = file.name;
//
//					var material = new THREE.MeshStandardMaterial();
//
//					var mesh = new THREE.Mesh( geometry, material );
//					mesh.name = filename;
//
//					editor.execute( new AddObjectCommand( mesh ) );
//
//				}, false );
//
//				if ( reader.readAsBinaryString !== undefined ) {
//
//					reader.readAsBinaryString( file );
//
//				} else {
//
//					reader.readAsArrayBuffer( file );
//
//				}
        //  
        //    /////////////////////////  
        // file load
        var v = 0;
        var openFile = function (file) {
//            currentfilename=file.name;
            var reader = new FileReader();
            reader.addEventListener("load", function (ev) {
                var buffer = ev.target.result;
                var geom = loadStl(buffer);
//                // scene.remove(obj); 
//               var coloration = new THREE.Color(colors_to_apply[v], colors_to_apply[v + 1], colors_to_apply[v + 2])
//               v += 3;
//                //we convert them in hexadecimal, rgbToHex is define further
//                var new_coloration = rgbToHex(coloration.r, coloration.g, coloration.b);
//                //we apply it to the material, the material is update at every call of the callback function
//                //mat = new THREE.MeshPhongMaterial({transparent: true, color: new_coloration}); //map: textures[i] }); this is for color from jpg
//                mat.depthWrite = false; // important, if set to right, when we change the opacity of an organe, everything behind will be hidden
                var mat = new THREE.MeshPhongMaterial({transparent: true,
                    color: 0x339900, ambient: 0x339900, specular: 0x030303,
                });
                 mat.depthWrite = false;
                var obj = new THREE.Mesh(geom, mat);
                hiders.push(obj);
                scene.add(obj);
                ///////////
                h = {
                    toggleObjects: true,
                    full_scene: true,
                    reset_scene: function () {
                        reset_scene();
                    },
                    color: "#ff0000",
                    camera_locked: false,
                    opacity: 1
                };
                //separate every organes in folders in the gui
                //add the 3 options
                folders[k] = gui.addFolder(file.name.split(".").reverse().pop());
                variable[k] = folders[k].add(h, 'toggleObjects').name('Visible').listen();
                Color[k] = folders[k].addColor(h, 'color').name('color').listen();
                opacities[k] = folders[k].add(h, 'opacity').min(0).max(1).step(0.01).name('Opacity').listen();
                variable[k].onChange(function (value) {

                    hiders[k].visible = value;
                });
                Color[k].onChange(function (value)
                {
                    obj.material.color.setHex(value.replace("#", "0x"));
                });
                opacities[k].onChange(function (value) {
                    obj.material.opacity = value;
                });
                //Hide the scene to go in traditionnal endoscopic view
                var hide_scene = gui.add(h, 'full_scene').name('Hide Scene').listen();
                hide_scene.onChange(function (value) {
                    scene.visible = value;
                });
                //Rest the positions
                gui.add(h, 'reset_scene').name('Reset');
                function reset_scene() {
                    controls.reset();
                    obj.visible = true;
                }
                //Disable controls button
                var lock_camera = gui.add(h, 'camera_locked').name('Lock Model').listen();
                lock_camera.onChange(function (value) {
                    controls.enableZoom = !value;
                    controls.enableRotate = !value;
                    controls.enablePan = !value;
                });
                k = k + 1;

                //////////

            }, false);
            reader.readAsArrayBuffer(file);
        };
        // file input button
        var input = document.getElementById("file");
        input.addEventListener("change", function (ev) {
            var file = ev.target.files;
            var length1 = ev.target.files.length;
            for (var i = 0; i < length1; i++) {

                openFile(file[i]);
            }

        }, false);

        // dnd
        view.addEventListener("dragover", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "copy";
        }, false);
        view.addEventListener("drop", function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            var file = ev.dataTransfer.files[0];
            openFile(file);
        }, false);
    }, false);
}
