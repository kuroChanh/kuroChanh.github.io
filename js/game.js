// ENGINE FILE
var test;
(function (test) {
    var engine = /** @class */ (function () {
        function engine() {
            console.log("HELLO");
        }
        engine.prototype.init = function () {
            this._canvas = test.glUtil.init();
            test.AssetManager.init();
            test.mat4.identity();
            test.gl.clearColor(0, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            // this.createBuffer();
            this._proj = test.mat4.ortho(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
            // load sprite
            this._sprite = new test.Sprite("test", "../kurochanh.github.io/images/yeah.jpg");
            this._sprite.load();
            this._sprite.pos.setx(200);
            // resize once so the screen is rendering to the proper size
            this.resize();
            this.run();
        };
        engine.prototype.resize = function () {
            // resizes canvas to fit window
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
                // gl.viewport(0, 0, this._canvas.width, this._canvas.height);
                test.gl.viewport(-1, 1, -1, 1);
            }
        };
        engine.prototype.run = function () {
            test.MessageBus.update(0);
            // clear the screen before the next image is rendered
            test.gl.clear(test.gl.COLOR_BUFFER_BIT);
            // draw triangle
            // gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            // set uniforms
            var colUni = this._shader.getUniLoc("tint");
            // gl.uniform4f(colUni, 1.0, 0.5, 0.0, 1.0);
            test.gl.uniform4f(colUni, 1.0, 1.0, 1.0, 1.0);
            // this._buffer.bind();
            // this._buffer.drawBuffer();
            // get attrib location
            // let posloc = this._shader.getAttribLoc("aPos");
            // gl.vertexAttribPointer(posloc, 3, gl.FLOAT, false, 0, 0);
            // gl.enableVertexAttribArray(0);
            // gl.drawArrays(gl.TRIANGLES, 0, 3);
            var proj = this._shader.getUniLoc("proj");
            test.gl.uniformMatrix4fv(proj, false, new Float32Array(this._proj.getData()));
            var model = this._shader.getUniLoc("model");
            test.gl.uniformMatrix4fv(model, false, new Float32Array(test.mat4.translate(this._sprite.pos).getData()));
            // render sprite
            this._sprite.render(this._shader);
            // we want to call this function of this part
            requestAnimationFrame(this.run.bind(this));
        };
        // private createBuffer(): void{
        // }
        engine.prototype.loadShaders = function () {
            var vertPath = "\n\t\t\tattribute vec3 aPos;\n\t\t\tattribute vec2 aTex;\n\n\t\t\tuniform mat4 proj;\n\t\t\tuniform mat4 model;\n\n\t\t\tvarying vec2 texCoord;\n\n\t\t\tvoid main(){\n\t\t\t\tgl_Position = proj * model * vec4(aPos, 1.0);\n\t\t\t\ttexCoord = aTex;\n\t\t\t}\n\t\t\t";
            var fragPath = "\n\t\t\tprecision mediump float;\n\n\t\t\tuniform vec4 tint;\n\t\t\tuniform sampler2D diffuse;\n\n\t\t\tvarying vec2 texCoord;\n\n\t\t\tvoid main(){\n\t\t\t\tgl_FragColor = tint * texture2D(diffuse, texCoord);\n\t\t\t}\n\t\t\t";
            this._shader = new test.shader("basic", vertPath, fragPath);
        };
        return engine;
    }());
    test.engine = engine;
})(test || (test = {}));
// WEBGL FILE
(function (test) {
    // checks if there is a canvas and makes sure to return a canvas we can work with if we have one or not
    var glUtil = /** @class */ (function () {
        function glUtil() {
        }
        // parameter is optional
        // can pass in the canvas id
        glUtil.init = function (elementID) {
            // this is local to this function
            var canvas;
            if (elementID !== undefined) {
                // casting = convert a type to something else that is similar
                canvas = document.getElementById(elementID);
                if (canvas === undefined) {
                    // this will stop the execution
                    throw new Error("CAN'T FIND THE CANVAS: " + elementID);
                }
            }
            else {
                canvas = document.createElement("canvas");
                document.getElementById("gameCanvas").appendChild(canvas);
            }
            test.gl = canvas.getContext("webgl");
            if (test.gl === undefined) {
                throw new Error("CAN'T INIT GL CANVAS");
            }
            return canvas;
        };
        return glUtil;
    }());
    test.glUtil = glUtil;
})(test || (test = {}));
// SHADER FILE
(function (test) {
    var shader = /** @class */ (function () {
        function shader(name, vert, frag) {
            // hash, key value pairs
            this._attrib = {};
            this._uniforms = {};
            this._name = name;
            var vertShader = this.loadShader(vert, test.gl.VERTEX_SHADER);
            var fragShader = this.loadShader(frag, test.gl.FRAGMENT_SHADER);
            this.createProgram(vertShader, fragShader);
            // extract program and get locations
            this.detectAttrib();
            this.detectUniforms();
        }
        shader.prototype.getname = function () {
            return this._name;
        };
        shader.prototype.use = function () {
            // use this shader to draw onto the screen
            test.gl.useProgram(this._program);
        };
        shader.prototype.getAttribLoc = function (name) {
            if (this._attrib[name] === undefined) {
                throw new Error('Unable to find attrib name ' + name + ' in shader ' + this._name);
            }
            return this._attrib[name];
        };
        shader.prototype.getUniLoc = function (name) {
            if (this._uniforms[name] === undefined) {
                throw new Error('Unable to find uniform name ' + name + ' in shader ' + this._name);
            }
            return this._uniforms[name];
        };
        shader.prototype.loadShader = function (path, shaderType) {
            var shader = test.gl.createShader(shaderType);
            // get the shader and compile
            test.gl.shaderSource(shader, path);
            test.gl.compileShader(shader);
            var error = test.gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error("Error Compiling Shader '" + this._name + "': " + error);
            }
            return shader;
        };
        shader.prototype.createProgram = function (vert, frag) {
            this._program = test.gl.createProgram();
            test.gl.attachShader(this._program, vert);
            test.gl.attachShader(this._program, frag);
            test.gl.linkProgram(this._program);
            var error = test.gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Error Linking Shader '" + this._name + "': " + error);
            }
        };
        shader.prototype.detectAttrib = function () {
            // returns attributes
            var attribCount = test.gl.getProgramParameter(this._program, test.gl.ACTIVE_ATTRIBUTES);
            for (var i = 0; i < attribCount; ++i) {
                var attribData_1 = test.gl.getActiveAttrib(this._program, i);
                // check if anything returns
                if (!attribData_1) {
                    break;
                }
                // goes into hash
                this._attrib[attribData_1.name] = test.gl.getAttribLocation(this._program, attribData_1.name);
            }
        };
        shader.prototype.detectUniforms = function () {
            // returns attributes
            var uniCount = test.gl.getProgramParameter(this._program, test.gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < uniCount; ++i) {
                var uniData = test.gl.getActiveUniform(this._program, i);
                // check if anything returns
                if (!uniData) {
                    break;
                }
                // goes into hash
                this._uniforms[uniData.name] = test.gl.getUniformLocation(this._program, uniData.name);
            }
        };
        return shader;
    }());
    test.shader = shader;
})(test || (test = {}));
// BUFFER FILE
(function (test) {
    var attribData = /** @class */ (function () {
        function attribData() {
        }
        return attribData;
    }());
    test.attribData = attribData;
    var glBuffer = /** @class */ (function () {
        function glBuffer(elementSize, dataType, targetBufferType, mode) {
            if (dataType === void 0) { dataType = test.gl.FLOAT; }
            if (targetBufferType === void 0) { targetBufferType = test.gl.ARRAY_BUFFER; }
            if (mode === void 0) { mode = test.gl.TRIANGLES; }
            this._hasAttribLoc = false;
            this._data = [];
            this._attrib = [];
            this._elementSize = elementSize;
            this._dataType = dataType;
            this._targetBufferType = targetBufferType;
            this._mode = mode;
            // determine byte size internally and not worry
            switch (this._dataType) {
                case test.gl.FLOAT:
                case test.gl.INT:
                case test.gl.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case test.gl.SHORT:
                case test.gl.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case test.gl.BYTE:
                case test.gl.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error("Unrecognized data type: " + dataType.toString());
            }
            this._stride = this._elementSize * this._typeSize;
            this._buffer = test.gl.createBuffer();
        }
        glBuffer.prototype.destroy = function () {
            test.gl.deleteBuffer(this._buffer);
        };
        glBuffer.prototype.bind = function (norm) {
            if (norm === void 0) { norm = false; }
            test.gl.bindBuffer(this._targetBufferType, this._buffer);
            if (this._hasAttribLoc) {
                // for each loop
                for (var _i = 0, _a = this._attrib; _i < _a.length; _i++) {
                    var a = _a[_i];
                    test.gl.vertexAttribPointer(a.loc, a.size, this._dataType, norm, this._stride, a.offset * this._typeSize);
                    test.gl.enableVertexAttribArray(a.loc);
                }
            }
        };
        glBuffer.prototype.unbind = function () {
            for (var _i = 0, _a = this._attrib; _i < _a.length; _i++) {
                var a = _a[_i];
                test.gl.disableVertexAttribArray(a.loc);
            }
            test.gl.bindBuffer(test.gl.ARRAY_BUFFER, this._buffer);
        };
        glBuffer.prototype.addAttribLoc = function (aData) {
            this._hasAttribLoc = true;
            this._attrib.push(aData);
        };
        // adds data to the buffer
        glBuffer.prototype.push = function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var a = data_1[_i];
                this._data.push(a);
            }
        };
        // sens buffer to GPU
        glBuffer.prototype.upload = function () {
            test.gl.bindBuffer(this._targetBufferType, this._buffer);
            var bufferData;
            switch (this._dataType) {
                case test.gl.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case test.gl.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case test.gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case test.gl.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case test.gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case test.gl.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case test.gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
            }
            test.gl.bufferData(this._targetBufferType, bufferData, test.gl.STATIC_DRAW);
        };
        glBuffer.prototype.drawBuffer = function () {
            if (this._targetBufferType == test.gl.ARRAY_BUFFER) {
                test.gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
            }
            else if (this._targetBufferType === test.gl.ELEMENT_ARRAY_BUFFER) {
                test.gl.drawElements(this._mode, this._data.length, this._dataType, 0);
            }
        };
        return glBuffer;
    }());
    test.glBuffer = glBuffer;
})(test || (test = {}));
// SPRITE FILE
(function (test) {
    var Sprite = /** @class */ (function () {
        // change the default settings
        function Sprite(name, texName, width, height) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            this.pos = new test.vec3();
            this._name = name;
            this._width = width;
            this._height = height;
            this._texName = texName;
            this._texture = test.texManager.getTex(texName);
        }
        Sprite.prototype.getName = function () {
            return this._name;
        };
        Sprite.prototype.destroy = function () {
            this._buffer.destroy();
            test.texManager.releaseTex(this._texName);
        };
        Sprite.prototype.load = function () {
            this._buffer = new test.glBuffer(5);
            // ;w; can optimize this into another function
            var posAttrib = new test.attribData();
            posAttrib.loc = 0;
            posAttrib.offset = 0;
            posAttrib.size = 3;
            this._buffer.addAttribLoc(posAttrib);
            var texAttrib = new test.attribData();
            texAttrib.loc = 1;
            texAttrib.offset = 3;
            texAttrib.size = 2;
            this._buffer.addAttribLoc(texAttrib);
            // triangle
            var verts = [
                // x y z u v
                0.0, 0.0, 0.0, 0.0, 0.0,
                0.0, this._height, 0.0, 0.0, 1.0,
                this._width, this._height, 0.0, 1.0, 1.0,
                this._width, this._height, 0.0, 1.0, 1.0,
                this._width, 0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 0.0, 0.0
            ];
            this._buffer.push(verts);
            this._buffer.upload();
            this._buffer.unbind();
        };
        Sprite.prototype.update = function (time) {
        };
        Sprite.prototype.render = function (shader) {
            this._texture.activate(0);
            var diffLoc = shader.getUniLoc("diffuse");
            test.gl.uniform1i(diffLoc, 0);
            this._buffer.bind();
            this._buffer.drawBuffer();
        };
        return Sprite;
    }());
    test.Sprite = Sprite;
})(test || (test = {}));
// MATRIX FILE
(function (test) {
    var mat4 = /** @class */ (function () {
        function mat4() {
            this._data = [];
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
        mat4.prototype.getData = function () {
            return this._data;
        };
        mat4.identity = function () {
            // default value of mat4
            return new mat4();
        };
        mat4.ortho = function (left, right, bottom, top, near, far) {
            var a = new mat4();
            var b = 1.0 / (left - right);
            var c = 1.0 / (bottom - top);
            var d = 1.0 / (near - far);
            a._data[0] = -2.0 * b;
            a._data[5] = -2.0 * c;
            a._data[10] = 2.0 * d;
            a._data[12] = (left + right) * b;
            a._data[13] = (top + bottom) * c;
            a._data[14] = (far + near) * d;
            return a;
        };
        mat4.translate = function (pos) {
            var a = new mat4();
            a._data[12] = pos.getx();
            a._data[13] = pos.gety();
            a._data[14] = pos.getz();
            return a;
        };
        return mat4;
    }());
    test.mat4 = mat4;
})(test || (test = {}));
// VECTOR3 FILE
(function (test) {
    var vec3 = /** @class */ (function () {
        function vec3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this._x = x;
            this._y = y;
            this._z = z;
        }
        vec3.prototype.getx = function () {
            return this._x;
        };
        vec3.prototype.setx = function (val) {
            this._x = val;
        };
        vec3.prototype.gety = function () {
            return this._y;
        };
        vec3.prototype.sety = function (val) {
            this._y = val;
        };
        vec3.prototype.getz = function () {
            return this._z;
        };
        vec3.prototype.setz = function (val) {
            this._z = val;
        };
        vec3.prototype.toArray = function () {
            return [this._x, this._y, this._z];
        };
        vec3.prototype.tofloat = function () {
            return new Float32Array(this.toArray());
        };
        return vec3;
    }());
    test.vec3 = vec3;
})(test || (test = {}));
// VECTOR2 FILE
(function (test) {
    var vec2 = /** @class */ (function () {
        function vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = x;
            this._y = y;
        }
        vec2.prototype.getx = function () {
            return this._x;
        };
        vec2.prototype.setx = function (val) {
            this._x = val;
        };
        vec2.prototype.gety = function () {
            return this._y;
        };
        vec2.prototype.sety = function (val) {
            this._y = val;
        };
        vec2.prototype.toArray = function () {
            return [this._x, this._y];
        };
        vec2.prototype.tofloat = function () {
            return new Float32Array(this.toArray());
        };
        return vec2;
    }());
    test.vec2 = vec2;
})(test || (test = {}));
// ASSET MANAGER
(function (test) {
    test.MESSAGE_ASSET_LOADER = "MESSAGE_ASSET_LOADER";
    var AssetManager = /** @class */ (function () {
        function AssetManager() {
        }
        AssetManager.init = function () {
            AssetManager._loaders.push(new test.ImageAssetLoader());
        };
        AssetManager.registerLoader = function (loader) {
            AssetManager._loaders.push(loader);
        };
        AssetManager.onAssetLoaded = function (asset) {
            AssetManager._loadAssets[asset.name] = asset;
            test.Message.send(test.MESSAGE_ASSET_LOADER + asset.name, this, asset);
        };
        AssetManager.loadAsset = function (assetName) {
            var ext = assetName.split('.').pop().toLowerCase();
            for (var _i = 0, _a = AssetManager._loaders; _i < _a.length; _i++) {
                var a = _a[_i];
                if (a.supportedExt.indexOf(ext) !== -1) {
                    a.loadAsset(assetName);
                    return;
                }
            }
            console.warn("Unable to load asset with ext " + ext + " because there is no loader");
        };
        AssetManager.isAssetLoad = function (assetName) {
            return AssetManager._loadAssets[assetName] !== undefined;
        };
        AssetManager.getAsset = function (assetName) {
            if (AssetManager._loadAssets[assetName] !== undefined) {
                return AssetManager._loadAssets[assetName];
            }
            else {
                AssetManager.loadAsset(assetName);
            }
            return undefined;
        };
        AssetManager._loaders = [];
        AssetManager._loadAssets = {};
        return AssetManager;
    }());
    test.AssetManager = AssetManager;
})(test || (test = {}));
// MESSAGE FILE
(function (test) {
    var MessageRank;
    (function (MessageRank) {
        MessageRank[MessageRank["NORMAL"] = 0] = "NORMAL";
        MessageRank[MessageRank["HIGH"] = 1] = "HIGH";
    })(MessageRank = test.MessageRank || (test.MessageRank = {}));
    var Message = /** @class */ (function () {
        function Message(code, sender, content, rank) {
            if (rank === void 0) { rank = MessageRank.NORMAL; }
            this.code = code;
            this.sender = sender;
            this.content = content;
            this.rank = rank;
        }
        Message.send = function (code, sender, content) {
            test.MessageBus.post(new Message(code, sender, content, MessageRank.NORMAL));
        };
        Message.sendRank = function (code, sender, content) {
            test.MessageBus.post(new Message(code, sender, content, MessageRank.HIGH));
        };
        Message.sub = function (code, handler) {
            test.MessageBus.addSub(code, handler);
        };
        Message.unsub = function (code, handler) {
            test.MessageBus.removeSub(code, handler);
        };
        return Message;
    }());
    test.Message = Message;
})(test || (test = {}));
// MESSAGE BUS FILE
(function (test) {
    var MessageBus = /** @class */ (function () {
        function MessageBus() {
        }
        MessageBus.addSub = function (code, handler) {
            if (MessageBus._sub[code] === undefined) {
                MessageBus._sub[code] = [];
            }
            if (MessageBus._sub[code].indexOf(handler) !== -1) {
                console.warn("Attempting to add duplicatehandler to code: " + code + ". Sub not added");
            }
            else {
                MessageBus._sub[code].push(handler);
            }
        };
        MessageBus.removeSub = function (code, handler) {
            if (MessageBus._sub[code] === undefined) {
                console.warn("Can't sub handler from: " + code + " because not subbed");
                return;
            }
            var nodeIndex = MessageBus._sub[code].indexOf(handler);
            if (nodeIndex !== -1) {
                MessageBus._sub[code].splice(nodeIndex, 1);
            }
        };
        MessageBus.post = function (message) {
            console.log("Message Posted: ", message);
            var handlers = MessageBus._sub[message.code];
            if (handlers === undefined) {
                return;
            }
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var a = handlers_1[_i];
                if (message.rank === test.MessageRank.HIGH) {
                    a.onMessage(message);
                }
                else {
                    MessageBus._normalMessageQueue.push(new test.MessageSubNode(message, a));
                }
            }
        };
        MessageBus.update = function (time) {
            if (MessageBus._normalMessageQueue.length === 0) {
                return;
            }
            var messageList = Math.min(MessageBus._normQueueMessageUpdate, MessageBus._normalMessageQueue.length);
            for (var i = 0; i < messageList; ++i) {
                var node = MessageBus._normalMessageQueue.pop();
                node.handler.onMessage(node.message);
            }
        };
        MessageBus._sub = {};
        MessageBus._normQueueMessageUpdate = 10;
        MessageBus._normalMessageQueue = [];
        return MessageBus;
    }());
    test.MessageBus = MessageBus;
})(test || (test = {}));
// MESSAGE SUB NODE
(function (test) {
    var MessageSubNode = /** @class */ (function () {
        function MessageSubNode(message, handler) {
            this.message = message;
            this.handler = handler;
        }
        return MessageSubNode;
    }());
    test.MessageSubNode = MessageSubNode;
})(test || (test = {}));
// IMAGE ASSET LOADER
(function (test) {
    var ImageAsset = /** @class */ (function () {
        function ImageAsset(name, data) {
            this.name = name;
            this.data = data;
        }
        ImageAsset.prototype.getWidth = function () {
            return this.data.width;
        };
        ImageAsset.prototype.getHeight = function () {
            return this.data.height;
        };
        return ImageAsset;
    }());
    test.ImageAsset = ImageAsset;
    var ImageAssetLoader = /** @class */ (function () {
        function ImageAssetLoader() {
        }
        Object.defineProperty(ImageAssetLoader.prototype, "supportedExt", {
            get: function () {
                return ["png", "gif", "jpg"];
            },
            enumerable: true,
            configurable: true
        });
        ImageAssetLoader.prototype.loadAsset = function (assetName) {
            var img = new Image();
            img.onload = this.onImageLoaded.bind(this, assetName, img);
            img.src = assetName;
        };
        ImageAssetLoader.prototype.onImageLoaded = function (assetName, image) {
            console.log("onImageLoaded: assetName/Image", assetName, image);
            var asset = new ImageAsset(assetName, image);
            test.AssetManager.onAssetLoaded(asset);
        };
        return ImageAssetLoader;
    }());
    test.ImageAssetLoader = ImageAssetLoader;
})(test || (test = {}));
// TEXTURE FILE
(function (test) {
    var LEVEL = 0;
    var BORDER = 0;
    var TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);
    var Texture = /** @class */ (function () {
        function Texture(name, width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            this._loaded = false;
            this._name = name;
            this._width = width;
            this._height = height;
            this._handle = test.gl.createTexture();
            test.Message.sub(test.MESSAGE_ASSET_LOADER + this._name, this);
            this.bind();
            test.gl.texImage2D(test.gl.TEXTURE_2D, LEVEL, test.gl.RGBA, 1, 1, BORDER, test.gl.RGBA, test.gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);
            var asset = test.AssetManager.getAsset(this._name);
            if (asset !== undefined) {
                this.loadTex(asset);
            }
        }
        Texture.prototype.getName = function () {
            return this._name;
        };
        Texture.prototype.getLoaded = function () {
            return this._loaded;
        };
        Texture.prototype.getWidth = function () {
            return this._width;
        };
        Texture.prototype.getHeight = function () {
            return this._height;
        };
        Texture.prototype.destroy = function () {
            test.gl.deleteTexture(this._handle);
        };
        Texture.prototype.activate = function (texUnit) {
            if (texUnit === void 0) { texUnit = 0; }
            test.gl.activeTexture(test.gl.TEXTURE0 + texUnit);
            this.bind();
        };
        Texture.prototype.bind = function () {
            test.gl.bindTexture(test.gl.TEXTURE_2D, this._handle);
        };
        Texture.prototype.unbind = function () {
            test.gl.bindTexture(test.gl.TEXTURE_2D, undefined);
        };
        Texture.prototype.onMessage = function (message) {
            if (message.code === test.MESSAGE_ASSET_LOADER + this._name) {
                this.loadTex(message.content);
            }
        };
        Texture.prototype.loadTex = function (asset) {
            this._width = asset.getWidth();
            this._height = asset.getHeight();
            this.bind();
            // THIS LINE IS THE BIGGEST ISSUE RIGHT NOW
            test.gl.texImage2D(test.gl.TEXTURE_2D, LEVEL, test.gl.RGBA, test.gl.RGBA, test.gl.UNSIGNED_BYTE, asset.data);
            if (this.pow2()) {
                test.gl.generateMipmap(test.gl.TEXTURE_2D);
            }
            else {
                test.gl.texParameteri(test.gl.TEXTURE_2D, test.gl.TEXTURE_WRAP_S, test.gl.CLAMP_TO_EDGE);
                test.gl.texParameteri(test.gl.TEXTURE_2D, test.gl.TEXTURE_WRAP_T, test.gl.CLAMP_TO_EDGE);
                test.gl.texParameteri(test.gl.TEXTURE_2D, test.gl.TEXTURE_MIN_FILTER, test.gl.LINEAR);
            }
            this._loaded = true;
        };
        Texture.prototype.pow2 = function () {
            return (this.ispow2(this._width) && this.ispow2(this._height));
        };
        Texture.prototype.ispow2 = function (val) {
            return (val & (val - 1)) == 0;
        };
        return Texture;
    }());
    test.Texture = Texture;
})(test || (test = {}));
// TEXTURE MANAGER FILE
(function (test) {
    var texRefNode = /** @class */ (function () {
        function texRefNode(tex) {
            this.refCount = 1;
            this.tex = tex;
        }
        return texRefNode;
    }());
    var texManager = /** @class */ (function () {
        function texManager() {
        }
        texManager.getTex = function (texName) {
            if (texManager._tex[texName] === undefined) {
                var texture = new test.Texture(texName);
                texManager._tex[texName] = new texRefNode(texture);
            }
            else {
                texManager._tex[texName].refCount;
            }
            return texManager._tex[texName].tex;
        };
        texManager.releaseTex = function (texName) {
            if (texManager._tex[texName] === undefined) {
                console.warn("Texture named " + texName + " does not exist");
            }
            else {
                texManager._tex[texName].refCount--;
                if (texManager._tex[texName].refCount < 1) {
                    texManager.getTex(texName).destroy();
                    texManager._tex[texName] = undefined;
                    delete texManager._tex[texName];
                }
            }
        };
        texManager._tex = {};
        return texManager;
    }());
    test.texManager = texManager;
})(test || (test = {}));
// MAIN FILE
var e;
window.onload = function () {
    e = new test.engine();
    e.init();
};
// TO BE MOVED
window.onresize = function () {
    e.resize();
};
