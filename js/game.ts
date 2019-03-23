// ENGINE FILE
namespace test{
	export class engine{
		private _canvas: HTMLCanvasElement;
		private _shader: shader;
		private _proj: mat4;

		private _sprite: Sprite;
		

		public constructor(){
			console.log("HELLO");
		}
		public init(): void{
			this._canvas = glUtil.init();
			AssetManager.init();

			mat4.identity();
			gl.clearColor(0, 0, 0, 1);
			this.loadShaders();
			this._shader.use();
			// this.createBuffer();
			this._proj = mat4.ortho(0, this._canvas.width, 0, this._canvas.height, -1.0, 100.0);
			// load sprite
			this._sprite = new Sprite("test", "../kurochanh.github.io/images/yeah.jpg");
			this._sprite.load();
			this._sprite.pos.setx(200);
			// resize once so the screen is rendering to the proper size
			this.resize();
			this.run();
		}
		public resize(): void{
			// resizes canvas to fit window
			if(this._canvas !== undefined){
				this._canvas.width = window.innerWidth;
				this._canvas.height = window.innerHeight;

				// gl.viewport(0, 0, this._canvas.width, this._canvas.height);
				gl.viewport(-1, 1, -1, 1);
			}
		}
		private run(): void{
			MessageBus.update(0);

			// clear the screen before the next image is rendered
			gl.clear(gl.COLOR_BUFFER_BIT);
			// draw triangle
			// gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);

			// set uniforms
			let colUni = this._shader.getUniLoc("tint");
			// gl.uniform4f(colUni, 1.0, 0.5, 0.0, 1.0);
			gl.uniform4f(colUni, 1.0, 1.0, 1.0, 1.0);

			// this._buffer.bind();
			// this._buffer.drawBuffer();
			// get attrib location
			// let posloc = this._shader.getAttribLoc("aPos");
			// gl.vertexAttribPointer(posloc, 3, gl.FLOAT, false, 0, 0);
			// gl.enableVertexAttribArray(0);
			// gl.drawArrays(gl.TRIANGLES, 0, 3);

			let proj = this._shader.getUniLoc("proj");
			gl.uniformMatrix4fv(proj, false, new Float32Array(this._proj.getData()));

			let model = this._shader.getUniLoc("model");
			gl.uniformMatrix4fv(model, false, new Float32Array(mat4.translate(this._sprite.pos).getData()));

			// render sprite
			this._sprite.render(this._shader);

			// we want to call this function of this part
			requestAnimationFrame(this.run.bind(this));
		}
		// private createBuffer(): void{
			
		// }
		private loadShaders(): void{
			let vertPath = `
			attribute vec3 aPos;
			attribute vec2 aTex;

			uniform mat4 proj;
			uniform mat4 model;

			varying vec2 texCoord;

			void main(){
				gl_Position = proj * model * vec4(aPos, 1.0);
				texCoord = aTex;
			}
			`;
			let fragPath = `
			precision mediump float;

			uniform vec4 tint;
			uniform sampler2D diffuse;

			varying vec2 texCoord;

			void main(){
				gl_FragColor = tint * texture2D(diffuse, texCoord);
			}
			`;
			this._shader = new shader("basic", vertPath, fragPath);
		}
	}
}
// WEBGL FILE
namespace test{
	// entry point into webgl, the rendering context
	export var gl: WebGLRenderingContext;
	// checks if there is a canvas and makes sure to return a canvas we can work with if we have one or not
	export class glUtil{
		// parameter is optional
		// can pass in the canvas id
		public static init( elementID?: string ): HTMLCanvasElement{
			// this is local to this function
			let canvas: HTMLCanvasElement;

			if(elementID !== undefined){
				// casting = convert a type to something else that is similar
				canvas = document.getElementById(elementID) as HTMLCanvasElement;
				if(canvas === undefined){
					// this will stop the execution
					throw new Error("CAN'T FIND THE CANVAS: " + elementID);
				}
			}
			else{
				canvas = document.createElement("canvas") as HTMLCanvasElement;
				document.getElementById("gameCanvas").appendChild(canvas);
			}

			gl = canvas.getContext("webgl");

			if(gl === undefined){
				throw new Error("CAN'T INIT GL CANVAS");
			}

			return canvas;
		}
	}
}

// SHADER FILE
namespace test{
	export class shader{
		// helps identify the different shaders, private so it doesn't get changed accidentally
		private _name: string;
		private _program: WebGLProgram;
		// hash, key value pairs
		private _attrib: {[name: string]: number} = {};
		private _uniforms: {[name: string]: WebGLUniformLocation} = {};

		public constructor(name: string, vert: string, frag: string){
			this._name = name;
			let vertShader = this.loadShader(vert, gl.VERTEX_SHADER);
			let fragShader = this.loadShader(frag, gl.FRAGMENT_SHADER);
			this.createProgram(vertShader, fragShader);
			// extract program and get locations
			this.detectAttrib();
			this.detectUniforms();
		}
		public getname(): string{
			return this._name;
		}

		public use(): void{
			// use this shader to draw onto the screen
			gl.useProgram(this._program);
		}

		public getAttribLoc(name: string): number{
			if(this._attrib[name] === undefined){
				throw new Error('Unable to find attrib name ' + name + ' in shader ' + this._name);
			}
			return this._attrib[name];
		}

		public getUniLoc(name: string): WebGLUniformLocation{
			if(this._uniforms[name] === undefined){
				throw new Error('Unable to find uniform name ' + name + ' in shader ' + this._name);
			}
			return this._uniforms[name];
		}

		private loadShader(path: string, shaderType: number): WebGLShader{
			let shader: WebGLShader = gl.createShader(shaderType);
			// get the shader and compile
			gl.shaderSource(shader, path);
			gl.compileShader(shader);

			let error = gl.getShaderInfoLog(shader);
			if(error !== ""){
				throw new Error("Error Compiling Shader '" + this._name + "': " + error );
			}

			return shader;
		}
		private createProgram(vert: WebGLShader, frag: WebGLShader){
			this._program = gl.createProgram();
			gl.attachShader(this._program, vert);
			gl.attachShader(this._program, frag);
			gl.linkProgram(this._program);

			let error = gl.getProgramInfoLog(this._program);
			if(error !== ""){
				throw new Error("Error Linking Shader '" + this._name + "': " + error );
			}
		}

		private detectAttrib(): void{
			// returns attributes
			let attribCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
			for(let i = 0; i < attribCount; ++i){
				let attribData: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);
				// check if anything returns
				if(!attribData){
					break;
				}
				// goes into hash
				this._attrib[attribData.name] = gl.getAttribLocation(this._program, attribData.name);
			}
		}

		private detectUniforms(): void{
			// returns attributes
			let uniCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
			for(let i = 0; i < uniCount; ++i){
				let uniData: WebGLActiveInfo = gl.getActiveUniform(this._program, i);
				// check if anything returns
				if(!uniData){
					break;
				}
				// goes into hash
				this._uniforms[uniData.name] = gl.getUniformLocation(this._program, uniData.name);
			}
		}
	}
}

// BUFFER FILE
namespace test{
	export class attribData{
		// fancy struct
		public loc: number;
		public size: number;
		public offset: number;
	}

	export class glBuffer{
		private _hasAttribLoc: boolean= false;
		// size of each element in the entire buffer
		private _elementSize: number;
		private _stride: number;
		private _buffer: WebGLBuffer;

		private _targetBufferType: number;
		private _dataType: number;
		private _mode: number;
		private _typeSize: number;

		private _data: number[] = [];
		private _attrib: attribData[] = [];

		public constructor(elementSize: number, dataType: number = gl.FLOAT, 
			targetBufferType: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES){
			this._elementSize = elementSize;
			this._dataType = dataType;
			this._targetBufferType = targetBufferType;
			this._mode = mode;

			// determine byte size internally and not worry
			switch(this._dataType){
				case gl.FLOAT:

				case gl.INT:

				case gl.UNSIGNED_INT:
					this._typeSize = 4;
					break;
				case gl.SHORT:
				case gl.UNSIGNED_SHORT:
					this._typeSize = 2;
					break;
				case gl.BYTE:
				case gl.UNSIGNED_BYTE:
					this._typeSize = 1;
					break;
				default:
				throw new Error("Unrecognized data type: " + dataType.toString());
			}

			this._stride = this._elementSize * this._typeSize;
			this._buffer = gl.createBuffer();
		}

		public destroy(): void{
			gl.deleteBuffer(this._buffer);
		}

		public bind(norm: boolean= false): void{
			gl.bindBuffer(this._targetBufferType, this._buffer);

			if(this._hasAttribLoc){
				// for each loop
				for(let a of this._attrib){
					gl.vertexAttribPointer(a.loc, a.size, this._dataType, norm, this._stride, a.offset * this._typeSize);					
					gl.enableVertexAttribArray(a.loc);
				}
			}
		}

		public unbind(): void{
			for(let a of this._attrib){
				gl.disableVertexAttribArray(a.loc);
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
		}
		public addAttribLoc(aData: attribData): void{
			this._hasAttribLoc = true;
			this._attrib.push(aData);
		}

		// adds data to the buffer
		public push(data: number[]): void{
			for(let a of data){
				this._data.push(a);
			}
		}

		// sens buffer to GPU
		public upload(): void{
			gl.bindBuffer(this._targetBufferType, this._buffer);

			let bufferData: ArrayBuffer;
			switch(this._dataType){
				case gl.FLOAT:
					bufferData = new Float32Array(this._data);
					break;
				case gl.INT:
					bufferData = new Int32Array(this._data);
					break;
				case gl.UNSIGNED_INT:
					bufferData = new Uint32Array(this._data);
					break;
				case gl.SHORT:
					bufferData = new Int16Array(this._data);
					break;
				case gl.UNSIGNED_SHORT:
					bufferData = new Uint16Array(this._data);
					break;
				case gl.BYTE:
					bufferData = new Int8Array(this._data);
					break;
				case gl.UNSIGNED_BYTE:
					bufferData = new Uint8Array(this._data);
					break;
			}
			gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
		}

		public drawBuffer(): void{
			if(this._targetBufferType == gl.ARRAY_BUFFER){
				gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
			}
			else if(this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER){
				gl.drawElements(this._mode, this._data.length, this._dataType, 0);
			}
		}
	}
}

// SPRITE FILE
namespace test{
	export class Sprite{
		private _name: string;
		private _width: number;
		private _height: number;

		private _buffer: glBuffer;

		private _texName: string;
		private _texture: Texture;

		public pos: vec3 = new vec3();

		// change the default settings
		public constructor(name: string, texName: string, width: number = 100, height: number = 100){
			this._name = name;
			this._width = width;
			this._height = height;
			this._texName = texName;
			this._texture = texManager.getTex(texName);
		}

		public getName(): string{
			return this._name;
		}

		public destroy(): void{
			this._buffer.destroy();
			texManager.releaseTex(this._texName);
		}

		public load(): void{
			this._buffer = new glBuffer(5);
			// ;w; can optimize this into another function
			let posAttrib = new attribData();
			posAttrib.loc = 0;
			posAttrib.offset = 0;
			posAttrib.size = 3;
			this._buffer.addAttribLoc(posAttrib);

			let texAttrib = new attribData();
			texAttrib.loc = 1;
			texAttrib.offset = 3;
			texAttrib.size = 2;
			this._buffer.addAttribLoc(texAttrib);

			// triangle
			let verts = [
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
		}

		public update(time: number): void{

		}
		public render(shader: shader): void{
			this._texture.activate(0);
			let diffLoc = shader.getUniLoc("diffuse");
			gl.uniform1i(diffLoc, 0);

			this._buffer.bind();
			this._buffer.drawBuffer();
		}
	}
}

// MATRIX FILE
namespace test{
	export class mat4{
		private _data: number[] = [];

		private constructor(){
			this._data = [
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			];
		}
		public getData(): number[]{
			return this._data;
		}
		public static identity(): mat4{
			// default value of mat4
			return new mat4();
		}
		public static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4{
			let a = new mat4();

			let b: number = 1.0 / (left - right);
			let c: number = 1.0 / (bottom - top);
			let d: number = 1.0 /(near - far);

			a._data[0] = -2.0 * b;
			a._data[5] = -2.0 * c;
			a._data[10] = 2.0 * d;
			a._data[12] = (left + right) * b;
			a._data[13] = (top + bottom) * c;
			a._data[14] = (far + near) * d;

			return a;
		}
		public static translate(pos: vec3): mat4{
			let a = new mat4();

			a._data[12] = pos.getx();
			a._data[13] = pos.gety();
			a._data[14] = pos.getz();

			return a;
		}
	}
}

// VECTOR3 FILE
namespace test{
	export class vec3{
		private _x: number;
		private _y: number;
		private _z: number;

		public constructor(x: number = 0, y: number = 0, z: number = 0){
			this._x = x;
			this._y = y;
			this._z = z;
		}
		public getx(): number{
			return this._x;
		}
		public setx(val: number){
			this._x = val;
		}
		public gety(): number{
			return this._y;
		}
		public sety(val: number){
			this._y = val;
		}
		public getz(): number{
			return this._z;
		}
		public setz(val: number){
			this._z = val;
		}
		public toArray(): number[]{
			return [this._x, this._y, this._z];
		}
		public tofloat(): Float32Array{
			return new Float32Array(this.toArray());
		}
	}
}

// VECTOR2 FILE
namespace test{
	export class vec2{
		private _x: number;
		private _y: number;

		public constructor(x: number = 0, y: number = 0){
			this._x = x;
			this._y = y;
		}
		public getx(): number{
			return this._x;
		}
		public setx(val: number){
			this._x = val;
		}
		public gety(): number{
			return this._y;
		}
		public sety(val: number){
			this._y = val;
		}
		public toArray(): number[]{
			return [this._x, this._y];
		}
		public tofloat(): Float32Array{
			return new Float32Array(this.toArray());
		}
	}
}

// ASSET MANAGER
namespace test{
	export const MESSAGE_ASSET_LOADER = "MESSAGE_ASSET_LOADER";

	export class AssetManager{
		private static _loaders: AssetLoader[] = [];
		private static _loadAssets: {[name: string]: iAsset} = {};

		private constructor(){

		}
		public static init(): void{
			AssetManager._loaders.push(new ImageAssetLoader());
		}
		public static registerLoader(loader: AssetLoader): void{
			AssetManager._loaders.push(loader);
		}
		public static onAssetLoaded(asset: iAsset): void{
			AssetManager._loadAssets[asset.name] = asset;
			Message.send(MESSAGE_ASSET_LOADER + asset.name, this, asset);
		}
		public static loadAsset(assetName: string): void{
			let ext = assetName.split('.').pop().toLowerCase();
			for(let a of AssetManager._loaders){
				if(a.supportedExt.indexOf(ext) !== -1){
					a.loadAsset(assetName);
					return;
				}
			}
			console.warn("Unable to load asset with ext " + ext + " because there is no loader");
		}
		public static isAssetLoad(assetName: string): boolean{
			return AssetManager._loadAssets[assetName] !== undefined;
		}
		public static getAsset(assetName: string): iAsset{
			if(AssetManager._loadAssets[assetName] !== undefined){
				return AssetManager._loadAssets[assetName];
			}
			else{
				AssetManager.loadAsset(assetName);
			}

			return undefined;
		}
	}
}

// INTERFACE ASSET
namespace test{
	export interface iAsset{
		readonly name: string;
		readonly data: any;
	}
}

// ASSET LOADER
namespace test{
	export interface AssetLoader{
		readonly supportedExt: string[];
		loadAsset(assetName: string): void;
	}
}

// MESSAGE FILE
namespace test{
	export enum MessageRank{
		NORMAL,
		HIGH
	}

	export class Message{
		public code: string;
		public content: any;
		public sender: any;
		public rank: MessageRank;

		public constructor(code: string, sender: any, content?: any, rank: MessageRank = MessageRank.NORMAL){
			this.code = code;
			this.sender = sender;
			this.content = content;
			this.rank = rank;
		}
		public static send(code: string, sender: any, content: any): void{
			MessageBus.post(new Message(code, sender, content, MessageRank.NORMAL));
		}
		public static sendRank(code: string, sender: any, content: any): void{
			MessageBus.post(new Message(code, sender, content, MessageRank.HIGH));
		}
		public static sub(code: string, handler: MessageHandler): void{
			MessageBus.addSub(code, handler);
		}
		public static unsub(code: string, handler: MessageHandler): void{
			MessageBus.removeSub(code, handler);
		}
	}
}

// MESSAGE BUS FILE
namespace test{
	export class MessageBus{
		private static _sub: {[code: string]: MessageHandler[]} = {};
		private static _normQueueMessageUpdate: number = 10;
		private static _normalMessageQueue: MessageSubNode[] =  [];

		private constructor(){

		}

		public static addSub(code: string, handler: MessageHandler): void{
			if(MessageBus._sub[code] === undefined){
				MessageBus._sub[code] = [];
			}
			if(MessageBus._sub[code].indexOf(handler) !== -1){
				console.warn("Attempting to add duplicatehandler to code: " + code + ". Sub not added");
			}
			else{
				MessageBus._sub[code].push(handler);
			}
		}
		public static removeSub(code: string, handler: MessageHandler): void{
			if(MessageBus._sub[code] === undefined){
				console.warn("Can't sub handler from: " + code + " because not subbed");
				return;
			}

			let nodeIndex = MessageBus._sub[code].indexOf(handler);

			if(nodeIndex !== -1){
				MessageBus._sub[code].splice(nodeIndex, 1);
			}
		}
		public static post(message: Message): void{
			console.log("Message Posted: ", message);

			let handlers = MessageBus._sub[message.code];
			if(handlers === undefined){
				return;
			}

			for(let a of handlers){
				if(message.rank === MessageRank.HIGH){
					a.onMessage(message);
				}
				else{
					MessageBus._normalMessageQueue.push(new MessageSubNode(message, a));
				}
			}
		}
		public static update(time: number): void{
			if(MessageBus._normalMessageQueue.length === 0){
				return;
			}

			let messageList = Math.min(MessageBus._normQueueMessageUpdate, MessageBus._normalMessageQueue.length);
			for(let i = 0; i < messageList; ++i){
				let node = MessageBus._normalMessageQueue.pop();
				node.handler.onMessage(node.message);
			}
		}
	}
}

// MESSAGE HANDLER FILE
namespace test{
	export interface MessageHandler{
		onMessage(message: Message): void;
	}
}

// MESSAGE SUB NODE
namespace test{
	export class MessageSubNode{
		public message: Message;
		public handler: MessageHandler;

		public constructor(message: Message, handler: MessageHandler){
			this.message = message;
			this.handler = handler;
		}
	}
}

// IMAGE ASSET LOADER
namespace test{
	export class ImageAsset implements iAsset{
		public readonly name: string;
		public readonly data: HTMLImageElement;

		public constructor(name: string, data: HTMLImageElement){
			this.name = name;
			this.data = data;
		}
		public getWidth(): number{
			return this.data.width;
		}
		public getHeight(): number{
			return this.data.height;
		}
	}

	export class ImageAssetLoader implements AssetLoader{
		public get supportedExt(): string[]{
			return ["png", "gif", "jpg"];
		}
		public loadAsset(assetName: string): void{
			let img: HTMLImageElement = new Image();
			img.onload = this.onImageLoaded.bind(this, assetName, img);
			img.src = assetName;
		}
		private onImageLoaded(assetName: string, image: HTMLImageElement): void{
			console.log("onImageLoaded: assetName/Image", assetName, image);

			let asset = new ImageAsset(assetName, image);
			AssetManager.onAssetLoaded(asset);
		}
	}
}

// TEXTURE FILE
namespace test{
	const LEVEL: number = 0;
	const BORDER: number = 0;
	const TEMP_IMAGE_DATA: Uint8Array = new Uint8Array([255, 255, 255, 255]);

	export class Texture implements MessageHandler{
		private _name:string;
		private _handle: WebGLTexture;
		private _loaded: boolean = false;
		private _width: number;
		private _height: number;

		public constructor(name: string, width: number = 1, height: number = 1){
			this._name = name;
			this._width = width;
			this._height = height;
			this._handle = gl.createTexture();

			Message.sub(MESSAGE_ASSET_LOADER + this._name, this);

			this.bind();

			gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, 1, 1, BORDER, gl.RGBA, gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);

			let asset = AssetManager.getAsset(this._name) as ImageAsset;
			if(asset !== undefined){
				this.loadTex(asset);
			}
		}
		public getName(): string{
			return this._name;
		}
		public getLoaded(): boolean{
			return this._loaded;
		}
		public getWidth(): number{
			return this._width;
		}
		public getHeight(): number{
			return this._height;
		}
		public destroy(): void{
			gl.deleteTexture(this._handle);
		}
		public activate(texUnit: number = 0): void{
			gl.activeTexture(gl.TEXTURE0 + texUnit);
			this.bind();
		}
		public bind(): void{
			gl.bindTexture(gl.TEXTURE_2D, this._handle);
		}
		public unbind(): void{
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		public onMessage(message: Message): void{
			if(message.code === MESSAGE_ASSET_LOADER + this._name){
				this.loadTex(message.content as ImageAsset);
			}
		}
		private loadTex(asset: ImageAsset): void{
			this._width = asset.getWidth();
			this._height = asset.getHeight();

			this.bind();

			// THIS LINE IS THE BIGGEST ISSUE RIGHT NOW
			gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset.data);

			if(this.pow2()){
				gl.generateMipmap(gl.TEXTURE_2D);
			}
			else{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}

			this._loaded = true;
		}
		private pow2(): boolean{
			return (this.ispow2(this._width) && this.ispow2(this._height));
		}
		private ispow2(val: number): boolean{
			return (val & (val - 1)) == 0;
		}
	}
}

// TEXTURE MANAGER FILE
namespace test{
	class texRefNode{
		public tex;
		public refCount: number = 1;

		public constructor(tex: Texture){
			this.tex = tex;
		}
	}

	export class texManager{
		private static _tex: {[name: string]: texRefNode} = {};

		private constructor(){

		}
		public static getTex(texName: string): Texture{
			if(texManager._tex[texName] === undefined){
				let texture = new Texture(texName);
				texManager._tex[texName] = new texRefNode(texture);
			}
			else{
				texManager._tex[texName].refCount;
			}
			return texManager._tex[texName].tex;
		}
		public static releaseTex(texName: string): void{
			if(texManager._tex[texName] === undefined){
				console.warn("Texture named "+ texName + " does not exist");
			}
			else{
				texManager._tex[texName].refCount--;
				if(texManager._tex[texName].refCount < 1){
					texManager.getTex(texName).destroy();
					texManager._tex[texName] = undefined;
					delete texManager._tex[texName];
				}
			}
		}
	}
}




// MAIN FILE
var e: test.engine;

window.onload = function(){
	e = new test.engine();
	e.init();
}

// TO BE MOVED
window.onresize = function(){
	e.resize();
}