papelera.gravityAction = async function(el) {
	if (!this.gravityActive) return;	
	if(typeof(el.entra) !== 'undefined') {
		el.entra = false;
		el.c.jqr.remove();
		el.c.jqrTxt.remove();
	}
	else 
		el.jqr.remove();
		el.jqrTxt.remove();
		for (var i = 0; i<el.soon.length; i++){
			el.soon[i].entra = false
			el.soon[i].c.goTo(this.cx, this.cy, 2000);
		}
		await sleep (2000)
		for (var i = 0; i<el.soon.length; i++){
			el.soon[i].c.jqr.remove();
			el.soon[i].c.jqrTxt.remove();
		}	
	log(this.jqr.attr('r'))
	this.jqr.attr('r', this.r)
	log(this.jqr.attr('r'))
}

open.gravityAction = async function(el) {
	/*
	*Esta función se encarga de enviar todos los nodos conectados
	*por parentesco directo (hermanos y padre) al nodo open
	*y "expulsa" los respectivos
	*/
	//Si no es un nodo u open no se debe de ejecutar	
	if (!this.gravityActive /*|| typeof(el.entra) == 'undefined'*/) return;
	if (typeof(el.entra) !== 'undefined'){
		if (!el.c.end){
		el.c.jqr.remove();
		el.c.jqrTxt.remove();
		for (var i = 0; i<el.parent.soon.length; i++){
			el.parent.soon[i].entra = false
			el.parent.soon[i].c.goTo(this.cx, this.cy, 2000);
		}
		el.parent.goTo(this.cx, this.cy, 2000);
		await sleep (2000)
		for (var i = 0; i<el.parent.soon.length; i++){
			el.parent.soon[i].c.jqr.remove();
			el.parent.soon[i].c.jqrTxt.remove();
		}
		el.parent.jqr.remove();
		el.parent.jqrTxt.remove();
		}
		var family = el.c.id + ".",
			node = el
		while (true){	
			if (typeof(node.parent) !== 'undefined'){
				family += node.parent.id + ".";
				node = node.parent; 
			}
			else break;
		}
		family = family.split('.');
		family = family.splice(0,family.length-1).reverse().join('.');
		if (!el.c.end){
			var parent = el.parent;
			eval(el.c.id + "= new CIRCULO(this.cx, this.cy, mainR, '#cfd3e5', '"+el.c.id+"', '"+ family.replaceMe(/[.]/, '/') +"')");
			eval(el.c.id + ".goTo(w/2, h/2, 1000)");
			eval(el.c.id + ".parent = parent");
			eval(el.c.id + ".canMove()");
			this.jqr.attr('r', this.r);
			await sleep (500);
			var next = generateSoon('circulo', true, el.c.id+'_soon', family);
			log('aloha')
		}
		this.jqr.attr('r', this.r);
		el.d1 = el.d1_init;
		generateFill(el.c.id)
	}
	else{
		eval("var parent = " + el.id + ".parent");
		family = el.txt.replaceMe('/', '.').toLowerCase().split('.');
		family.splice(family.length-1, family.length)
		eval(parent.id + "= new CIRCULO(this.cx, this.cy, mainR, '#cfd3e5', '"+parent.id+"', '"+parent.txt+"')");
		eval(parent.id + ".goTo(w/2, h/2, 1000);");
		el.jqr.remove();
		for (var i = 0; i< el.soon.length; i++){
			el.soon[i].entra = false
			el.soon[i].c.goTo(this.cx, this.cy, 500);
		}
		await sleep (500);
		for (var i = 0; i< el.soon.length; i++){
			el.soon[i].c.jqr.remove()
			el.soon[i].c.jqrTxt.remove()
		}
		//eval(el.id + ".parent = parent");
		this.jqr.attr('r', this.r);
		await sleep (500);
		if (family.length <=1){
			generateCirculos('circulo', true, parent.id+'_soon', family[0]);
		}
		else {
			family = family.join('.');
			generateSoon('circulo', true, el.id+'_soon', family);
		}
	}
	this.gravityActive = false;

}

//------------------------------------------------------------------minify action

minify.showAll = function() {
	/*
	*Esta función muestra todos los enlaces minificados
	*Para ello lo que se hace es guardar en un array todos ellos
	*y distribuirlos en la pantalla. Salta con un hover en minify
	*/
	if (minifyFlag){
		var cx = this.cx,
			r = this.r,
			cy = this.cy,
			secondPlane = this.secondPlane;
		var circle = svg.selectAll('circle.second')
				.data(secondPlane)
				.enter()
				.append('circle')
				.attr('cx', function(d, i){return (cx - r*6/4-r*(2*i+1))})
				.attr('cy', cy)
				.attr('r', r*3/4)
				.attr('fill', '#cfd3e5')
				.attr('id', function(d){return d.id+'Min'})
				.attr('class', 'second');
		/* Descomentar estas lineas si se quiere que aparezca el nombre del "programa" en los circulos
		var text = svg.selectAll('text.second')
				.data(secondPlane)
				.enter()
				.append('text', function(d){return d.id.replace('Fill', '')})
				.text(function(d){return d.id.replace('Fill', '')})
				.style('font-size', function(){
					return Math.min(2 * (r*3/4)*15, (2 * (r*3/4)*15 - 8) / this.getComputedTextLength())+'px';
				})
				.attr('x', function(d, i){return (cx - r*3/4-r*(2*i+1))-(r*6/4)})
				.attr('y', cy)
				.attr('class', 'second');*/
		minifyFlag = false
	}
	else {
		$('.second').remove()
		minifyFlag = true;
	}

}