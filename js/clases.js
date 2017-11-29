function CIRCULO(cx, cy, r, fill, id , txt = undefined, end = false,  icon = undefined){	/*
	*Esta clase dibuja un circulo siendo en una posicion concreta
	*A través de esta clase se puede acceder a los diferentes selectores, tanto
	*svg y jquery. Se le asigna un id en el dom y una clase de ser 
	*/

	this.cx = cx;
	this.cy = cy/(w/h);
	this.r = r;
	this.maxR = this.r*1.5
	this.fill = fill;
	this.id = id;
	this.jqrTxt = undefined;	
	this.gravityActive = false;
	this.soon = [];
	this.end = end;	
	this.class= function(name) {

		this.jqr.attr('class', 'name')
	}	

	this.draw = function() {		
		var circle = svg.append('circle')
				.attr('cx', this.cx)
				.attr('cy', this.cy)
				.attr('r', this.r)
				.attr('fill', this.fill)
				.attr('id', this.id);

		this.svg = svg.selectAll('#'+ this.id);
		this.jqr = $('#'+ this.id);
	}

	this.move = function(x, y) {
		this.cx = x;
		this.cy = y;
		this.jqr.attr({'cx': x, 'cy': y});
		if (typeof(this.jqrTxt) !== 'undefined')
			this.jqrTxt.attr({'x': x-this.r, 'y': y});

	}

	this.canMove = function() {
		this.jqr.attr('move', 'true');
		this.jqrTxt.attr('move', 'true');
	}

	this.goTo = async function(destX, destY, t){
		/*
		*Esta función genera una animación de movimiento. Se le
		*pasa por parametro el punto final,y el tiempo que tiene
		*que tardar en llegar. Para ello se calculan las distancias x e y
		*Se dividen en el tiempo y se multiplican por el tiempo de espera
		*de cada repetición para obtener el desplazamiento
		*/
		//Determinar la dirección del movimiento
		var dx = destX-this.cx,
			dy = destY-this.cy,
			v = 50,
			dstX = (dx/t)*v,
			dstY = (dy/t)*v,
			dcha = (dx<0) ? true : false,
			arrba = (cy<0) ? false : true,
			dcha_init = dcha,
			arrba_init = arrba, 
			moverX = true,
			moverY = true;			
		while (moverX && moverY){
			dx = destX-this.cx;
			dy = destY-this.cy;
			dcha = (dx<0) ? true : false;
			arrba = (cy<0) ? false : true;
			if (dcha !== dcha_init) moverX = false;
			if (arrba !== arrba_init) moverY = false;
			if (moverY){
				this.cy += (arrba) ? dstY :-dstY;
				this.jqr.attr('cy', this.cy);
				this.jqrTxt.attr('y', this.cy);
			}
			if (moverX){
				this.cx += (!dcha) ? Math.abs(dstX) :-Math.abs(dstX);
				this.jqr.attr('cx', this.cx);
				this.jqrTxt.attr('x', this.cx-this.r);
			}
			await sleep(v);
		}		
	}

	this.txtCreate = function(d, obj = this) {
		var	txt = svg.append('text')			
			.text(d.txt)
		 	.style("font-size", function() {
		 		d.r = (typeof(obj.parent)!== 'undefined') ? d.r*obj.parent.r/10 : obj.r;		 		
		 		return Math.min(2 * obj.r*16, (2 * obj.r*15) / this.getComputedTextLength())+'px';
		 	})
			.attr("dy", ".35em")
			.attr("id", this.id+'_txt')
			.attr('x', this.cx-this.r)
			.attr('y', this.cy);
		this.jqrTxt = $('#'+ this.id+'_txt');
		this.svgTxt = d3.select('#'+ this.id+'_txt');
		return d.txt
		
	}

	this.iconCreate = function(data) {
		/*
		*Incorpora un icono dentro del circulo. Se le pasa un objeto (data)
		*con los nombres comon y elem. Elem es un array con todos los elementos
		*y sus caracteristicas (array de objetos) y comon es un objeto con las
		*caracteristicas comunes
		*
		*ejemplo: -> data = {"comon": {}, "elem":[{},{}]}
		*/
		var g = svg.append('g'),
			e = '',
			ind = 0;
		if (typeof(data['comon']) !== 'undefined')
			for (var i in data['comon']){
				g.attr(i, data['comon'][i])
			}
		g.attr('id', 'g');
		for (i = 0; i<data['elem'].length; i++){			
			e = g.append(data['elem'][i]['name']);
			for (var n in data['elem'][i]){								 
				e.attr(n, data['elem'][i][n]);
			}
		}
		ind =this.r*(5/4)/$('#g')[0].getBBox().width;
		g.attr('transform', "translate("+(this.cx-this.r+(this.r*0.3))+", "+(this.cy-this.r+(this.r*0.3))+") scale("+ind+")")
		$('#g').attr('id', this.id+'Icon');
		this.iconJqr = $('#'+this.id+'Icon')

	}

	this.gravityForce =  async function(el){
		/*
		*Esta función se llama cada vez que un se esta
		*sugetando un nodo. Se repite cada 200 milisegundos y
		*permite determinar el radio de actiación de un nodo con
		*esta capacidad. Si se suelta el nodo dentro del radio
		*de actuación es cuando se llama a la función "real"
		*/		
		while (gravity){
			if (typeof(el.c) !== 'undefined')
				d = Math.pow(Math.pow((el.c.cx-this.cx),2)+Math.pow((el.c.cy-this.cy),2),0.5);
			else
				d = Math.pow(Math.pow((el.cx-this.cx),2)+Math.pow((el.cy-this.cy),2),0.5);
			if (d <= this.r*3){				
				this.jqr.attr('r', this.maxR);
				this.gravityActive = true;
				log('d menor que el triple del radio')
				return;
				log('d menor que el triple del radio despues del return')
			}
			else{				
				this.jqr.attr('r', this.r)				
				this.gravityActive = false;
			}		
		await sleep(200);
		}
	}	

	this.gravityAction = function(el) {
		//Las diferentes aciones están declaradas en: gravityAction.js
	}
	this.draw();
	this.txt = (typeof(txt) == 'undefined') ? false : this.txtCreate({'txt': txt, 'r': this.r}, this.c);
}


function NODE(circle, parent, classSelector = '', move = true){
	/*
	* Esta clase hace referencia a todos los elementos que tengan
	*un comportamiento como nodos, es decir que se relacionen
	*con un nodo principal
	*c hace referencia a la clase circulo y a todas sus propiedades
	*parent hace referencia a la instancia del padre
	*d1 es la distancia entre el nodo padre y el nodo instanciado
	*move es la variable que determina que circulos se pueden mover y cuales no
	*speed es la velocidad con la que se desplazan. Cuanto maś bajo el numero, más
	*rápido
	*/
	this.c = circle;
	this.parent = (typeof(parent.c) == 'undefined') ? parent : parent.c;	
	this.cx = this.parent.cx;
	this.cy = this.parent.cy +this.parent.r*2;
	this.move = true;	
	//this.d1_init = Math.pow(Math.pow((this.cx-this.parent.cx),2)+Math.pow((this.cy-this.parent.cy),2),0.5);
	this.d1_init = 20;
	this.d1 = this.d1_init;
	this.nPos = 0;
	this.speed = 60;
	this.entra = true;
	this.extControl = true;
	this.r = this.c.r;

	if (classSelector !== '')
		this.c.jqr.attr('class', classSelector);
	else
		classSelector = undefined;

	this.c.r = this.c.r*this.parent.r/10;	
	this.c.jqr.attr('r', this.c.r);
	if (typeof(this.c.jqrTxt) !== 'undefined'){
		this.c.jqrTxt.remove()
		var her = this.c,
			d = {'txt': her.txt, 'r': her.r};
		$('text').remove('#'+her.id + '_txt')
		var	txt = svg.append('text')			
			.text(d.txt)
		 	.style("font-size", function() {
		 		d.r = (typeof(this.parent)!== 'undefined') ? her.r*her.r.parent.r/10 : her.r;		 		
		 		return Math.min(2 * her.r*15, (2 * her.r*15 - 8) / this.getComputedTextLength())+'px';
		 	})
			.attr("dy", ".35em")
			.attr("id", her.id+'_txt')
			.attr('x', her.cx-her.r)
			.attr('y', her.cy);
		her.jqrTxt = $('#'+ her.id+'_txt');
	}


	this.linkDraw = function() {
		/*
		*genera un link entre el nodo padre y el nodo hijo		
		*/
		svg.append('line')
			.attr('x1', this.cx)
			.attr('y1', this.cy)
			.attr('x2', this.parent.cx)
			.attr('y2', this.parent.cy)
			.attr('stroke', 'black')
			.attr('stroke-width', '2')
			.attr('id', this.c.id +'_line');			
		this.link = $('#'+this.c.id+'_line')


	}

	this.rotateNode = async function() {
		while (this.entra) {			
				this.nPos = (this.nPos !== 360)? this.nPos+1:0;				
				parent = this.parent.jqr;				
				parentX = parseInt(parent.attr('cx'));
				parentY = parseInt(parent.attr('cy'));
				this.d1 = (!this.extControl) ? Math.pow(Math.pow((this.c.cx-this.parent.cx),2)+Math.pow((this.c.cy-this.parent.cy),2),0.5) : this.d1;
				this.posArr = this.posiciones(this.parent.cx, this.parent.cy, this.d1);
				this.c.cx = this.posArr[this.nPos][0];
				this.c.cy = this.posArr[this.nPos][1];
				this.c.jqr.attr({'cx': this.c.cx, 'cy': this.c.cy});
				if (typeof(this.c.jqrTxt) !== 'undefined')
					this.c.jqrTxt.attr({'x': (this.posArr[this.nPos][0]-this.c.r),'y': this.c.cy})				
				if (typeof(this.link) !== 'undefined')
					this.link.attr({'x1': this.posArr[this.nPos][0], 'y1': this.posArr[this.nPos][1]});
			await sleep(this.speed)
		}
	}

	/*
	 * (array) this.posiciones
	 * 
	 * parentX -> Int -> Posición x del objeto sobre el que rota
	 *
	 * parentY -> Int -> Posición y del objeto sobre el que rota
	 *
	 *d1 -> int -> Distancia que le separa del padre, si no se asigna se mantiene la que tenga ya asignada
	*/

	this.posiciones = function(parentX, parentY, d1 = false) {
		/*
		*esta funcion se encarga de determiar la posición de un nodo en función de
		*la distancia que tenga con su padre y la posicion del mismo
		*devuelve un array con todas las posibles posiciones que pueda tener
		*con el radio de movimiento actual
		*
		*parentX es la posicion x del padre, parentY  la posicion y d1 la distancia que hay entre ambos
		*/
		if (!d1) d1 = this.d1		
		var arr = [];
		for (var i = 0; i<= 360; i++){
			alpha = i;
			beta = 180-alpha;
			ceta = 180 - beta -90;
			x = d1*Math.sin(toRadian(beta))/Math.sin(90);
			y = d1*Math.sin(toRadian(ceta))/Math.sin(90);
			arr.push([]);
			arr[i].push(parentX+x);
			arr[i].push(parentY-y);
		}
			return arr;
	}

	this.move = function(x, y) {
		this.c.cx = x;
		this.c.cy = y;
		this.entra = false;
		this.d1 = Math.pow(Math.pow((x-this.parent.cx),2)+Math.pow((y-this.parent.cy),2),0.5);		
		this.c.jqr.attr({'cx': x, 'cy': y});
		if (this.c.txt !== 'undefined'){
			this.c.jqrTxt.attr({'x': x-this.c.r, 'y': this.c.cy});			
		}
	}

	this.recalcularPos = function() {
		/*
		*Esta funcion calcula la posicion del array más proxima a donde el usuario
		*haya soltado el nodo.

		*Se guarda en un array todas las posiciones con esta d1
		*Con los valores actualizados previeamente
		*
		*Con estos valores se generan los vectores u y v
		*(siendo u con el valor 0 y v con la pos actual)
		*para obtener el ángulo que lo forman
		*
		*
		*/
		this.c.cx = this.c.jqr.attr('cx');
		this.c.cy = this.c.jqr.attr('cy');
		this.d1 = Math.pow(Math.pow((this.c.cx-this.parent.cx),2)+Math.pow((this.c.cy-this.parent.cy),2),0.5);

		/* 
		 * La primera variable devuelve un array con todas las posiciones posibles con la distancia que
		 * tiene el cuerpo desde el centro hasta el centro del padre
		 * los valor de la pos inicial a la pos que se la asignado para generar el angulo resultante,
		 * siendo las cordenadas u las iniciales del angulo y las cordenadas v las finales.
		 * Junto con el padre, y los vectores pU y pY se genera el ángulo que necesitamos.
		 * Siendo alpha dicho angulo en radianes
		*/
		var posi = this.posiciones(this.parent.cx, this.parent.cy, this.d1),
		 	uX = Math.abs(posi[0][0] - this.parent.cx), 
			uY = Math.abs(posi[0][1] - this.parent.cy),
			vX = Math.abs(this.c.cx - this.parent.cx),
			vY = Math.abs(this.c.cy - this.parent.cy),
			alpha = 0;			
		/*
		 *La formula para sacar el ángulo entre dos vectores es: 
		 *Primero sacamos el coseno:
		 * cos[alpha] = (v1*v2)/(|v1|*|v2|)
		 *El producto de dos vectoroes u y v es:
		 * ux*vx+ux*vy 
		 *
		*/

			var u_por_v = uX*vX+uY*vY;
			var distancia_u = Math.pow(Math.pow(uX,2)+Math.pow(uY,2),0.5); //|u| 
			var distancia_v = Math.pow(Math.pow(vX,2)+Math.pow(vY,2),0.5); //|v|
			var cos = u_por_v/(distancia_v*distancia_u); //El coseno
			alpha = Math.acos(cos);
			log(`alpha vale: ${alpha}`);
			log(`Los grados son: ${toDegree(alpha)}`);			
			//this.nPos = parseInt(toDegree(alpha));
			//log(this.nPos);
			this.posArr = posi;
			var cuadrante = 0;
			if (this.c.cx >= this.parent.cx){
				cuadrante = (this.c.cy >= this.parent.cy) ? 0 : 1;
			}
			else {
				cuadrante = (this.c.cy >= this.parent.cy) ? 3 : 2 
			}
			/*
			*Cuando el cuadrante es impar, los grados son al reves, es por esoq ue se multiplican por -1 y se le suma un cuadrante para cuadrar la diferencia
			*/
			this.nPos = (cuadrante%2==0) ? parseInt(toDegree(alpha)) + (90*cuadrante) : (-parseInt(toDegree(alpha))) + (90*(cuadrante+1));
	}
		
	if (move) this.c.canMove();
	//this.linkDraw();
	this.posArr = this.posiciones(this.parent.cx, this.parent.cy);
	if (typeof(this.parent.soon) !== 'undefined') 
		this.parent.soon.push(this);
	else{
		this.parent.soon = [];
		this.parent.soon.push(this);
	}
}



function FILL(contentForm, content, id){
	this.contentForm = contentForm;
	this.content = content;
	this.cordX = open.cx*w/100;
	this.cordY = (open.cy*h/100)/(h/w);
	this.w = w*0.4;
	this.h = h*0.6;
	this.border = 20;
	this.id = id;
	this.id += 'Fill';
	this.jqr = '';
	var parent = this.id.replace('Fill', '');
	eval('this.parent = ' + parent);

	this.create = async function(){
		var init = "<div class=\"fill\" id= "+this.id+"><div class=\"header\">"+this.id.replace('Fill', '')+"<div class=\"buttom close\"></div><div class=\"buttom minify\"></div><div class=\"buttom maximizy\"></div></div><div class=\"main\"><div class=scroll></div>",
			end = "</div></div>",
			id = '#' + this.id
		switch (this.contentForm) {
			case 'word':
				var txt = init + '<iframe class="paper" src='+this.content+'>'+this.content +'</iframe>' + end;
				break;
			case 'nautilus':
				var txt = init + end;
				d3.json('json/img.json', appendFiles)
				break;
			case 'image':
				var txt = init + '<div class="myImg"><img src="'+this.content+'"></myImg>' + end;
				break;
		}
		$(txt).insertAfter($svg)
		var top = randomMe(0, h-this.h );
		var left = randomMe(0, w-w*0.4) 
		this.jqr = $(id);
		this.jqr
			.css({'left': this.cordX, 'top': this.cordY, 'width':0, 'height': 0})
			.animate({'left': left, 'top': top, 'width': this.w, 'height': this.h}, 1000);
		$(id + ' .paper').animate({'height': this.h*0.8});
		await sleep(1000)
		this.cordX = parseInt(this.jqr.offset().left);
		this.cordY = parseInt(this.jqr.offset().top);
		this.w = parseInt(this.jqr.css('width'));
		this.h = parseInt(this.jqr.css('height'));
		switch(this.contentForm){
			case 'image':
				resizeImg();
				break;
			case 'word':
				this.jqr.find('iframe').contents().find('body').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false).on('mousewheel DOMMouseScroll', function(e){onScroll(e, id)});
				break;
		}

	}
	this.close = async function() {
		this.jqr.animate({'left': open.cx*w/100, 'top': (open.cy*h/100)/(h/w), 'width': 0, 'height': 0}, 1000);
		await sleep(1000);
		this.jqr.remove();
		/*open.gravityActive = true;
		open.gravityAction(this.parent.parent);
		//open.gravityAction(this.parent);
		open.gravityActive = false;*/
	}

	this.minify = async function() {
		this.jqr.animate({'left': minify.cx*w/100, 'top': (minify.cy*h/100)/(h/w), 'width': 0, 'height': 0}, 1000);
		await sleep(1000);
		this.jqr.css('display', 'none');
		minify.secondPlane.push(this);
		if (minify.jqr.css('display')== 'none'){
			minify.jqr.css('display', 'block')
			minify.iconJqr.css('display', 'block')
		}
		
	}

	this.maximizy = function() {
		if (!this.big){
			this.cordX_init = this.cordX;
			this.cordY_init = this.cordY;
			this.w_init = this.w;
			this.h_init = this.h;
			this.cordX = 0;
			this.cordY = 0;
			this.w = window.w,
			this.h = window.h;
			this.big = true;

		}
		else {
			this.cordX = this.cordX_init;	
			this.cordY = this.cordY_init;	
			this.w= this.w_init;	
			this.h= this.h_init;
			this.big = false;	
		}
			this.jqr.animate({'left': this.cordX, 'top': this.cordY, 'width': this.w, 'height': this.h}, 1000);
			switch(this.contentForm){
				case 'word':
					$('#' + id + 'Fill .paper').animate({'height': this.h*0.8}, 1000);
					break;
				case 'image':
					resizeImg()
					break;
			}
	}

	this.reStyle = function(options){
		this.cordX = parseInt(this.jqr.offset().left);
		this.cordY = parseInt(this.jqr.offset().top);
		this.w = parseInt(this.jqr.css('width'));
		this.h = parseInt(this.jqr.css('height'));
		this.jqr.css(options);
		switch(this.contentForm){
			case 'word':
				$('#' + id + 'Fill .paper').css({'height': this.h*0.8}, 1000);
				break;
			case 'image':
				resizeImg();
				break;
		}
	}

	this.scroll = function(d){
		/*
		*Esta función realiza el scroll de la pagina.
		*d es el resultado registrado por el evento de mousewhell dentro del fill
		*Para saber cuanto ha de bajar, hay que saber cuanto mide de alto el html
		*Cuanto mide el fill y hacer una regla de 3 margin 0 del html es margin
		*(valor header) del scroll
		*/
		var html = this.jqr.find('iframe').contents().find('html'),
			scroll = this.jqr.find('.scroll')
			htmlMargin = parseInt(html.css('margin-top'))
			headerHeight = parseInt(this.jqr.find('.header').css('height')),
			scrollHeight = parseInt(this.jqr.find('.paper').css('height')),
			htmlHeight = parseInt(html.css('height'))-scrollHeight,
			scrollPosition = parseInt(scroll.offset().top);
		if (Math.abs(htmlMargin +d) >=htmlHeight ){
			html.css({'margin-top': -htmlHeight});
			scroll.css('top', -(htmlHeight*scrollHeight)/htmlHeight);
			return;
		}
		else if (htmlMargin +d >=0){
			html.css({'margin-top': 0});
			scroll.css('top', 25);
			return;
		}
		html.css({'margin-top': htmlMargin+d});
		scroll.css('top', -((htmlMargin+d)*scrollHeight)/htmlHeight);				
	}

	this.reSize = function(direction, cords) {
		switch (direction) {
			case 'rightTop':
				this.reStyle({'top': cords[1]});
				log(cords)
				break;
			case 'leftTop':
			case 'rightDown':
			case 'leftDown':
				this.reStyle(cords[0], cords[1])
				break;
			case 'right':
				break;
			case 'left':
				break;
			case 'down':
				break;
			case 'top':
				this.reStyle({'top': cords[0]})
				break;
			default:
				return;
				break;
		}

	}

	function appendFiles(error, graph) {
		eval('var obj = '+id+'Fill')
		var mult = 16;
		$('#'+id+'Fill .main').css('background-color', 'darkblue')
		var svg = d3.select('#'+id+'Fill .main').append('svg').attr('width', parseInt(w*0.4)-30).attr('height', obj.h-30);
		var paters = svg.selectAll('.'+id+'_pattern')
			.data(graph[id])
			.enter()
			.append('pattern').attr('id', function(d){return d.name.split('.')[0]})
			.attr('width', function(d){return d.r*4})
			.attr('height', function(d){return d.r*4})
			.attr('class', id+'_pattern')
			.append('image').attr('width', function(d){return d.r*4})
			.attr('height', function(d){return d.r*4})
			.attr('xlink\:href', function(d){return 'media/img/lucas/'+d.path});

		var circles = svg.selectAll('.'+id+'_file')
			.data(graph[id])
			.enter()
			.append('circle')
			.attr('class', id+'_file')
			.attr('r', function(d){return d.r*2})
			.style('fill',function(d) {return "url(#"+d.name.split('.')[0]+")"})
			.attr('cx', function(){return randomMe(0, parseInt(w*0.4))-30})
			.attr('cy', function(){return randomMe(0, obj.h-30)})
			.on("mouseover", function(d){
				$('#'+d.name.split('.')[0]).attr('width', d.r*mult*2).attr('height', d.r*mult*2);
				$('#'+d.name.split('.')[0]+ ' image').attr('width', d.r*mult*2).attr('height', d.r*mult*2);
				d3.select(this).transition().duration(500).attr('r', function(d){return d.r*mult});
			})
			.on("mouseout", function(d){
				$('#'+d.name.split('.')[0]).attr('width', d.r*4).attr('height', d.r*4);
				$('#'+d.name.split('.')[0]+ ' image').attr('width', d.r*4).attr('height', d.r*4);
				d3.select(this).transition().duration(500).attr('r', function(d){return d.r*2});
			})
			.on('click', function(d){
				try{
					eval('var obj =' +d.name.split('.')[0] + 'Fill')
				}
				catch(err){
					var error = err
					eval(d.name.split('.')[0] + 'Fill = new FILL("image", "media/img/lucas/'+d.path+'", "'+d.name.split('.')[0]+'")');
					zindex+=3;
					eval(d.name.split('.')[0] +'Fill.jqr.css(\'z-index\', zindex)');
				}
				if (!error){
					zindex+=3
					obj.jqr.css('z-index', zindex)
				}

			});
	}

	function resizeImg(){
		eval('var obj = '+id+'Fill')
		var w = parseInt($('#'+id +'Fill .myImg').css('width')),
			h = parseInt($('#'+id +'Fill .myImg').css('height'));
		if (w<h){
			$('#'+id +'Fill .myImg').css({'height': (obj.h-10), 'width': (obj.h-10)*w/h})
		}
	}	

	this.create()
}