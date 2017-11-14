Array.prototype.squidPushMe = function(n, m, val) {
//Esta función permite rellenar arrays multidimensionales con el mismo valor
    for (var x = 0; x < n; x ++){
        this.push([])
    }
    for (x = 0; x< n; x++){
        for(var y = 0; y< m; y++){
            this[x].push(val)
        }
    }
    return this
};
Array.prototype.pushMe = function(n, val) {
//Esta función permite rellenar arrays unidimensionales con el mismo valor    
    for (x = 0; x< n; x++){
            this.push(val)
        }
    
    return this
};
Array.prototype.replaceMe = function(val){
//Esta función permite remplazar los valores de un array o matriz por el valor deseado  
    if(this[0][0] !=null){
        for(var x=0; x<this.length; x++){
            for(var y =0;y< this[x].length; y++){
                this[x][y]= val;
            }
        }
    }
    else{
        for(var x=0; x<this.length; x++){
            this[x]=val 
        }
    }
    return this
};

Array.prototype.maxMe = function() {
//Esta función te devuelve el valor más alto de un array
  return Math.max.apply(null, this);
};
Array.prototype.minMe = function() {
//Esta función te devuelve el valor más bajo de un array
  return Math.min.apply(null, this);
};
Array.prototype.checkMe = function(val){
//Esta función te devuelve 'true' si todas las posiciones del array corresponden al valor del parametro
    for (var i=0; i<this.length;i++){
        if(this[i]!== val)
            return false
    }
    if (i===this.length)
        return true
};
Array.prototype.checkDifferentMe = function(val){
    for(var i= 0; i< this.length; i++){
        if(this[i] !== val)
            return i;            
    }
    return true
};
Array.prototype.compareMe = function(Other) {
//Esta función te devuelve 'true' si los 2 arrays son equivalentes
    if (this.length !== Other.length )
        return false
    if (!(Other instanceof Array))
        return false
    else
       for (var i=0; i<this.length;i++){
        if(this[i]!== Other[i])
            return false
        }
    if (i===this.length)
        return true
};
Array.prototype.popMe = function(val){
//Esta función elimina todos los valores del array, dejandolo vacio
    var array = [];
    log(this)
    for (var i = 0; i<this.length; i++){
        if (this[i] !== val)
            array.push(this[i]);
    }
    log(array.length)
    return array
};
Array.prototype.notRepeatMe = function(){
    for (var i = 0;i<this.length;i++){
        for (var x=0;x<this.length;x++){
            if(this[i]===this[x] && i!==x)
                return false
        }        
    }
    return true
}
/*--------------------------------------------------STRING-------------------------------------------------------------------------------*/
String.prototype.contentMe = function(arr){
    var str = this.toString()
    for (var i = 0; i< arr.length; i++){
        console.log(arr[i])
        console.log(str)
        console.log(this)
        if (arr[i] === str)
            return true
    }
    return false
}
//--------------------------------------------------Revisa-------------------------------------------------------------------------------
String.prototype.searchForMe = function(ar){
    //Te devuelve true si hay un substring dentro de un string
    for (var i=0;i<this.length;i++){
        for (var x=0;i<ar.length;x++){
            if(this[i] === ar[x])
                return true
        }
    }
    return false
}
//---------------------------------------------------------------------------------------------------------------------------------
String.prototype.replaceMe = function (val1, val2){
    var str = this
   while(str.search(val1)!== -1){
        str = str.replace(val1, val2)
    }
    return str
}
String.prototype.equalMe = function (ar){
    var str = ''
    for( var i=0; i<ar.length;i++){
        str = str + ar[i]
    }
    return str
}

String.prototype.title = function(){
	var str = this,
		reg = /(\s|^)[a-z]/
	while(str.search(reg) !== -1){
		str = str.replace(reg, reg.exec(str)[0].toUpperCase())		
	}
}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
function randomMe(min, max){
//Esta función te devuelve un numero aleatorio entre 2 numeros
  return Math.floor(Math.random() * (max - min) + min);
};

var log = console.log;

function select (query) {
    var selection;  
    if (/^\b/.test(query))
        return document.getElementsByTagName(query);
    else
    var diferencia = query[0];  
    query =  query.substring(1, query.lenght);  
    switch(diferencia) {
        case '.':
            return document.getElementsByClassName(query)
            break;
        case '#':           
            return document.getElementById(query)
            break;
        case ':':
            return document.querySelectorAll('input[type=' + query + ']')
            break;
        case diferencia.test(/\b/):
            
            break;
        default:
            return undefined;
    }
}
/*
*---------------------------------------------------------------------------------------------------------------
*/
function sleep(ms) {
	/*
	*Antes de declarar la función que lo vaya a usar es necesario escribir async
	*ex.:
	*async function ejemplo(){
	*	do something
	*	awaitsleep(100)
	*	do something else after 100 ms
	*}
	*/
	
  return new Promise(resolve => setTimeout(resolve, ms));
}






