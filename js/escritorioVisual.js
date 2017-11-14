/*
*Inicia el escritorio
*/

var w = parseInt($('body').css('width')),
	h = innerHeight,
	$svg = $('#contenedor'),
	svg = d3.select("svg"),
	menu = $('#menu'),
	fill = $('.fill');

var mainR = w*10/100,
	lineColor = '#5E69BC',
	fillColor = 'black'
	/*trushIcon = { //Caracteristicas del icono de la papela
		"elem": [
			{'name': 'ellipse', 'cx': 39.1, 'cy': 11, 'rx': 37.1, 'ry': 9, 'fill': fillColor},
			{'name': 'line', 'x1': 76.3,'y1': 11, 'x2': 69.9, 'y2': 74.6},
			{'name': 'line', 'x1': 2,'y1': 11, 'x2': 8.4, 'y2': 73.6},
			{'name': 'path', 'd':'M69.9,74c0,4.1-13.8,7.5-30.8,7.5S8.4,78.1,8.4,74'}
		],
		"comon": {'fill':'none','stroke':lineColor,'stroke-width':4,'stroke-linecap': 'round','stroke-miterlimit':10, 'stroke-linejoin':'round'}
	},
	openIcon = { //caracteristicas del simbolo de open
		"elem": [
			{'name': 'rect', 'x': 2, 'y' : 2, 'width': 59.2, 'height': 59.2},
			{'name': 'rect', 'x': 16.6, 'y' : 30, 'width': 30, 'height': 30, "fill": fillColor}
		],
		"comon": {'fill':'none','stroke':lineColor,'stroke-width':4,'stroke-linecap': 'round','stroke-miterlimit':10, 'stroke-linejoin':'round'}

	},
	*/
	 trushIcon = {
        "elem": [
            {'name': "path", 'd': "M8,16.5c0,0,0.4,6,0.9,7.3c0,0-0.5,1.5,0.5,2.7c0,0-0.7,1,0,2.9l4.5,39c0,0-0.4,1.7,0.4,3.1 c0,0-0.1,3.7,0.5,4.8c0,0-0.6,1.2,0.3,3.2l0.7,7c0,0-2.1,3.6,4.1,6.8c6.3,3.2,17.5,5.1,25.7,4.9c8.1-0.2,28-2.4,28.3-10.4 c0,0,0-0.3-0.3-0.8l1-7c0,0,0.5-0.5,0.3-2c-0.2-1.5,5.8-47.8,5.8-47.8s0.5-0.8,0.2-1.8l0.2-1.6c0,0,0.3-0.2,0.1-1.2l1.4-10.2 L8,15.3L8,16.5z"},
            {'name': 'path', 'd': 'M82.5,16.3c0,0,3.1-0.2,5.7-1.5c0,0,3.8-1.2,0.3,2.8c0,0-2.6,3-7.1,4.7c0,0-1.6,0.3-4.2,3.4 c0,0-0.8-0.9-0.4-2.2c0,0,0.5-1.3,1.6-1.9c0,0,6.1-1.4,9.1-4.9c0,0-2,0.1-4.9,1.6L82.5,16.3z'},
            {'name': 'path', 'd': 'M7.9,16.3c0,0-3.1-0.2-5.7-1.5c0,0-3.8-1.2-0.3,2.8c0,0,2.6,3,7.1,4.7c0,0,1.6,0.3,4.2,3.4 c0,0,0.8-0.9,0.4-2.2c0,0-0.5-1.3-1.6-1.9c0,0-6.1-1.4-9.1-4.9c0,0,2,0.1,4.9,1.6L7.9,16.3z'},
            {'name': 'path', 'd': 'M5.1,11.8c0,0-2.3,1.9,1.1,4.2s16.9,6.6,49.7,5.6c0,0,35.1-1.8,29.2-9.4l-0.2-1.5c0,0,0-0.6-0.7-1.3             S79.2,5,56.9,3.8s-36.6,0.9-45.9,3c0,0-2.1,0.4-4.6,2.1c-0.6,0.4-1,1-1.2,1.7c0,0.1-0.1,0.3-0.1,0.4C5.1,11.8,5.1,11.8,5.1,11.8z'},
            {'name': 'path', 'd': 'M29.1,6.4c0,0-0.1,0.6,0.4,0.6c0.5,0,4,0.5,5.1,0c0.9-0.4,1.6-1.8,1.8-2.3c0.1-0.1,0.1-0.3,0.2-0.4 c0.5-0.7,2.5-2.7,7-2.6c0.1,0,0.3,0,0.4,0c0.8,0,4,0,8,3c0.2,0.1,0.4,0.4,0.4,0.6c0.3,0.8,1.1,2.6,2.4,2.9 c1.8,0.5,4.6,0.5,4.6,0.5s1.2-0.2,0.7-0.7c0,0-1.3-0.4-3.9-0.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.1-0.4-0.3-0.5-0.5 c0-0.1-0.1-0.2-0.2-0.2c-0.2-0.2-0.4-0.5-0.6-1.1c0-0.1-0.1-0.2-0.1-0.2c-0.3-0.6-1.7-2.8-5.6-4.2c-3-1.1-6.4-1.1-9.4,0 c-1.4,0.5-2.8,1.3-4,2.5c0,0-0.5,0.5-0.5,1.2c0,0.3-0.1,0.5-0.3,0.7c0,0-0.1,0.1-0.1,0.1c-0.2,0.1-0.3,0.3-0.4,0.4 C34,6,33.9,6.1,33.8,6.2C33.7,6.3,30.2,5.6,29.1,6.4z'},
            {'name': 'path', 'd': 'M5.1,11.8c0,0,9.3,8.2,39.7,7.6C75.2,18.6,85,12.2,85,12.2'}
        ],
        "comon": {'fill':'#F7F7F8','stroke':lineColor,'stroke-width':2}
    },

    openIcon = {
        "elem": [
        {"name": 'polygon', "points":"17,0.3 100.7,7.8 100.7,75.7 17,65.4 ", "fill": "#F7F7F8", "stroke": lineColor, "stroke-width":"", "stroke-miterlimit" :"10"},
       
        {"name": 'polygon', "fill":"#1f140f", "stroke-width": "1", "points": "82.8,22.9 100.2,17.3 100.2,71.1 82.8,77.7 ", "stroke": "#1F140F", "stroke-miterlimit":"10"},
               
        {"name": 'polygon', "stroke-width":"1", "points": "0.5,11.7 16.9,5.6 18,60 0.6,66.5 ", "fill": "#1F140F", "stroke": lineColor, "stroke-width": "0.6899", "stroke-miterlimit":"10"},
       
        {"name": 'polygon', "points": "0.3,8.9 84,16.4 84,84.2 0.3,73.9 ", "fill": "#F7F7F8", "stroke": lineColor, "stroke-width":" 1", "stroke-miterlimit" :"10"},
       
        {"name": "line", "stroke": lineColor, "stroke-width": "0.5", "x1": "86.8", "y1": "21.3", "x2": "86.8", "y2": "76.4", "stroke-miterlimit":"10"},
       
        {"name": "line", "stroke": lineColor, "stroke-width": "0.5", "x1":"90.9", "y1": "19.9", "x2": "90.9", "y2": "75", "stroke-miterlimit":"10"},
       
        {"name": "line", "stroke": lineColor, "stroke-width": "0.5", "x1": "94.8", "y1": "18.7", "x2": "94.8", "y2": "73.8", "stroke-miterlimit":"10"},
       
        {"name": "line", "stroke": lineColor, "stroke-width": "0.5", "x1" :"98.3", "y1": "17.6", "x2": "98.3", "y2": "72.7", "stroke-miterlimit":"10"},
       
        {"name": 'polygon', "stroke-width": "1", "points": "32,25.9 31.6,37.2 50.7,39.3 51.1,27.6", "fill":"#F7F7F8", "stroke": lineColor, "stroke-width": "0.6899", "stroke-miterlimit":"10"},
       
        {"name": 'path', "stroke-width": "1", "d": "M30.3,52.6c0,0-1.7,0.5,0.4,1.1c2.1,0.6,16.9,2.1,18.4,1.6c1.5-0.5,1.9-0.8,1.9-0.8s2-0.3,2.3,0.5    c0.1,0.2-0.1,2-0.3,4.1c0,0-1.1,1.8-5.7,1.2S27,59,26.6,58s-0.6-5.1,0-5.2l1.6-0.4L30.3,52.6z", "fill":"#F7F7F8", "stroke": lineColor, "stroke-width": "0.6899", "stroke-miterlimit":"10", "stroke-linejoin":"round"}
        ]   

    },
	minifyIcon = { //caracteristicas del simbolo de minify
		"elem": [
			{'name': 'rect', 'x': 2, 'y' : 2, 'width': 59.2, 'height': 59.2},
			{'name': 'rect', 'x': 30, 'y' : 30, 'width': 30, 'height': 30}
		],
		"comon": {'fill':'none','stroke':lineColor,'stroke-width':4,'stroke-linecap': 'round','stroke-miterlimit':10, 'stroke-linejoin':'round'}

	},
	instagramIcon = '<path stroke="#000000" fill="none" stroke-width="2px" d="M20 0 L80 0 Q100 00 100 20 L100 80 Q100 100 80 100 L20 100 Q0 100 0 80 L0 20 Q0 0 20 0 Z"/><path stroke="none" fill="#000" d="M20 0 L80 0 Q100 00 100 20 L100 50 L0 50 L0 20 Q0 0 20 0 Z"/><path stroke="none" fill="#fff" d="M20 15 L80 15 Q90 15 90 25 L90 50 L10 50 L10 25 Q10 15 20 15 Z"/><path stroke="none" fill="#000" d="M10 50 L10 80 Q10 90 20 90 L80 90 Q90 90 90 80 L90 50 L10 50"/><g stroke-width=2px><path stroke="#fff"d="M30,50 a20,20 0 1,0 40,0z"/><path stroke="#000" fill="none"d="M30,50 a-20,20 0 1,1 40,0z"/></g><circle cx="75" cy="27" r="5"/>'	
	 
function toRadian(degree) {return n =  degree *  Math.PI/180;}
function toDegree(radian) {return n =  radian *  180/Math.PI;}
/*
function getData(json, name, obj) {
	var uri = 'json/'+json + '.json'

	$.getJSON(uri, function(d){
		log(d);
		var d = d[name];
		obj.c.svg.attr('r', function(){return d.r*obj.parent.r/10})
					.attr('fill', function(){return d.color})
		obj.speed = d.speed;
		obj.c.r = d.r*obj.parent.r/10
		obj.c.txtCreate(d, obj);
	})	
	.fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + errorThrown); })
}
*/
function generateCirculos(json, cont=true, arrayName = '', family = undefined){
	//parent corresponde al nivel en el que está
	var array = [];
	$.getJSON('json/'+json+'.json', function(d){
		var parametros = '',
			clase = json.toUpperCase();
		//log("d = d."+family)
		eval("d = d."+family);
		for (var i in d){
			parametros = '';			
			for (var n in d[i]){
				if (typeof(d[i][n])== 'object')
					continue;				
				parametros += d[i][n] +', ';
			}
			parametros = parametros.substring(0, parametros.length-2);
			
			if (json == 'circulo')
				eval("window."+ i+" = new "+clase+"("+parametros+");");
			else{
				eval(i+" = new "+clase+"("+parametros+");");
				eval(i+".rotateNode()")
				eval("array.push("+i+"); window."+arrayName +"= array;")
			}
		}
	}).done(function(){
		if (!cont){
			separate(array)		
			return;
		}
		else 
			generateCirculos('node', false, arrayName, family)
	})
	.fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + errorThrown);});
}

function generateSoon(json, cont=true, arrayName = '', family){
	//parent corresponde al nivel en el que está
	var array = [];
	var final = true;
	$.getJSON('json/'+json+'.json', function(d){
		var parametros = '',
			clase = json.toUpperCase();
		//log("d = d."+family)
		eval("d = d."+family);
		for (var i in d){
			parametros = '';			
			if (typeof(d[i]) !== 'object') continue;
			final = false;
			for (var s in d[i]){
				if (typeof(d[i][s]) == 'object') continue;
				parametros += d[i][s] +', ';				
			}
			parametros = parametros.substring(0, parametros.length-2);
			
			if (json == 'circulo')
				eval("window."+ i+" = new "+clase+"("+parametros+");");
			else{
				eval("window."+ i+" = new "+clase+"("+parametros+");");
				eval("window."+ i+".rotateNode()")
				eval("array.push("+i+"); window."+arrayName +"= array;")
			}

		}
	}).done(function(){
		if (!cont){
			separate(array)		
			return;
		}
		else if (final)
			return false;
		else
			generateSoon('node', false, arrayName, family)
	})
	.fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + errorThrown);});
}


function generarContenedor(family){
	alert(family)
}

function separate(arr){
	/*
	*Recive un array con las instancias de los nodos a los que afecta
	* y calcula el angulo de separación que debe haber entre cada uno
	*Devuelve un array bidimensional de 360 posiciones.
	*En cada casilla hay un array, la posicion 0 es la X y 1 la Y
	*/
	var n = arr.length,
		degrees = 360/n;
	for (var i = 0; i<n; i++){
		arr[i].nPos = parseInt(degrees*i);
	}
}


function generateFill(id){
	var obj = '';
	$.getJSON('json/fills.json', function(d){
		obj = d[id]

	}).fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + errorThrown + '\n');})
	.done(function(){
		var name = id + 'Fill',
			parametros = '';

		for (var i in obj){
			parametros += obj[i]+ ', ';
		}
		parametros = parametros.substring(0, parametros.length-2);
		eval(name + ' = new FILL('+parametros+');');
	});	
}



//Presentar el entorno de forma visual
$svg.attr({'height': h})


/*Instanciar circulos*/
var minify = new CIRCULO(w-50, 50, w*3/200, "#f4f3d3", 'minify');
var papelera = new CIRCULO(50, 50, w*3/100, "#f4f3d3", 'papelera');
var open = new CIRCULO(50, h-100, w*3/100, "#f4f3d3", 'open');
var desktop = new CIRCULO(w/2, h/2, mainR, "#cfd3e5", 'desktop', 'Desktop' );
//desktop.txtCreate({'txt': 'Desktop', 'r':desktop.r});
papelera.iconCreate(trushIcon);
open.iconCreate(openIcon);
minify.iconCreate(minifyIcon)
gravityObject = [papelera, open];
minify.jqr.attr('class', 'minify');
minify.iconJqr.attr('class', 'minify');
//Cargar los Diferentes circulos
generateCirculos('circulo', true, 'enlacesDirectos', 'desktop');
//separate(enlacesDirectos);

//----------------------------Edicion de estilos html--------------------------------------

fill.css({'height': h*0.6, 'display': 'none'})
menu.css('display', 'none');
minify.jqr.css('display', 'none');
minify.iconJqr.css('display', 'none');
$('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);


/*
var trabajos = new CIRCULO(w/2, h/2+50, w*1/100, "#ffffff", 'trabajos');
var contacto = new CIRCULO(w/2, h/2+50, w*1/100, "#ffffff", 'contacto');
var aplicaciones = new CIRCULO(w/2, h/2+50, w*1/100, "#ffffff", 'aplicaciones');
var sobremi = new CIRCULO(w/2, h/2+50, w*1/100, "#ffffff", 'sobremi');

//Contenido de los circulos (no nodos)



//Intanciar nodos
trabajos = new NODE(trabajos, desktop, 'enlacesDirectos')
contacto = new NODE(contacto, desktop, 'enlacesDirectos')
aplicaciones = new NODE(aplicaciones, desktop, 'enlacesDirectos')
sobremi = new NODE(sobremi, desktop, 'enlacesDirectos')

//Conviene guardar cada lista de nodos en una lista para tener un acceso rapido a ellos
enlacesDirectos = [trabajos, contacto, aplicaciones, sobremi]



//Iniciar la rotacion

trabajos.rotateNode()
contacto.rotateNode()
aplicaciones.rotateNode()
sobremi.rotateNode()

//cambiar propiedades de los nodos
getData('enlacesDirectos', 'trabajos', trabajos)
getData('enlacesDirectos', 'contacto', contacto)
getData('enlacesDirectos', 'app', aplicaciones)
getData('enlacesDirectos', 'sobremi', sobremi)

//Establecer un angulo de diferencia

separate(enlacesDirectos);
*/
