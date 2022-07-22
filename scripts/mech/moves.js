const loaded = ()=> console.log("\"moves.js\" was loaded successfully")

let currentObj 
let targTiles = []

const updateTargTiles = ()=> targTiles = [] // função pra poder limpar esse array em outros arquivos

const yInverter = num => currentObj.color == 'black' ? (num - (num * 2)) : num // inverte o número passado de parametro baseado na cor da peça. função utilizada pra peões, uma vez que eles andam em direções opostas

const ivt = n => n - (n * 2) // inverte um número

const rtnDict = function(xC,yC){ // retorna um dicionário com uma tag e um valor boleano. as tags escolhidas são selecionadas com base na posição x e y da peça selecionada

	var tagReference = document.querySelector(`#x${currentObj.x + xC}y${currentObj.y + yC}`)

	// caso o id no seletor acima leve a alguma div
	if(tagReference){return {tag : tagReference , hasChild : tagReference.hasChildNodes() ? true : false}}

	// caso o id no seletor acima não for referente a nenhuma tag, retorna um array vazio no lugar de undefined.
	if(!tagReference){return []}

}

// a logica da movimentação é a mesma pra todas as peças, busca tags com base nas cordenadas da peça selecionada e com base em sua gama de movimentos e cria objetos com eventos que vão movimentar a peça

const pawn = function(dict) {

	currentObj = dict

	if(rtnDict(-1,yInverter(1)).hasChild == true){ targTiles.push( rtnDict(-1,yInverter(1)) )} // se a tag x tiver filhos, adicione ela na lista de tiles alvo. seleçao na diagonal superior em relação ao peão 
	if(rtnDict(1,yInverter(1)).hasChild == true){ targTiles.push( rtnDict(1,yInverter(1)) )} // seleção diagonal em relação ao peão

	if(rtnDict(0, yInverter(1)).tag){ // confere se existe uma tag no caminho do peão

		targTiles.push( rtnDict(0, yInverter(1)) )
		if(rtnDict(0, yInverter(1)).hasChild == true ){return} // se a tag imediatamente a frente tiver filhos, ou seja, ser uma peça, acabe o procedimento.

	}

	if(rtnDict(0, yInverter(2)).tag && dict.firstMove == true){ // configura o primeiro movimento do oeão

		targTiles.push( rtnDict(0, yInverter(2)) )
		dict.firstMove = false

	}

	renderMoves()

}

const rook = function(dict){

	if(dict.type != 'queen'){currentObj = dict} // a constante "rook" é usada na constante "queen", para evitar a duplicação de procedimentos foi feito um filtro a mais

	for(var n = 1; n <= (8 - dict.y); n++){ // mapeando tiles alvo pra cima. supondo que o y da torre selecionada seja 3: enquanto 1 for menor que 5, n++

		if( rtnDict(0,n).hasChild == true ){ targTiles.push(rtnDict(0,n)) ; break}
		if( rtnDict(0,n) ){targTiles.push(rtnDict(0,n))}

	}

	for(var n = -1; n > ivt(dict.y); n--){ // mapeando tiles alvos pra baixo. y = 4: enquanto -1 for maior que -4, n--

		if( rtnDict(0,n).hasChild == true ){ targTiles.push(rtnDict(0,n)) ; break}
		if( rtnDict(0,n) ){targTiles.push(rtnDict(0,n))}

	}

	for(var n = 1; n <= (8 - dict.x); n++){ // mapeando tiles alvos pra direita. x = 6: enquanto 1 for menor ou igual a 2, n++

		if( rtnDict(n,0).hasChild == true ){ targTiles.push(rtnDict(n,0)) ; break}
		if( rtnDict(n,0) ){targTiles.push(rtnDict(n,0))}

	}

	for(var n = -1; n > ivt(dict.x); n--){ // mapeando tiles alvo para a esquerda. x = 2: enquanto -1 for menos que -2, n--

		if( rtnDict(n,0).hasChild == true ){ targTiles.push(rtnDict(n,0)) ; break}
		if( rtnDict(n,0) ){targTiles.push(rtnDict(n,0))}

	}

	if(dict.type != 'queen'){renderMoves()} // a constante "rook" é usada na constante "queen", para evitar a duplicação de procedimentos foi feito um filtro a mais

}

const bishop = function(dict){

	if(dict.type != 'queen'){currentObj = dict} // a constante "bishop" é usada na constante "queen", para evitar a duplicação de procedimentos foi feito um filtro a mais

	// muito similar a torre, porèm sempre usa o eixo y como referência para calcular as tags alvo

	for(var n = 1; n <= (8 - dict.y); n++){

		if( rtnDict(n,n).hasChild == true ){ targTiles.push(rtnDict(n,n)) ; break}
		if( rtnDict(n,n) ){targTiles.push(rtnDict(n,n))}

	}

	for(var n = 1; n <= (8 - dict.y); n++){

		if( rtnDict(ivt(n),n).hasChild == true ){ targTiles.push(rtnDict(ivt(n),n)) ; break}
		if( rtnDict(ivt(n),n) ){targTiles.push(rtnDict(ivt(n),n))}

	}

	for(var n = -1; n > ivt(dict.y); n--){

		if( rtnDict(n,n).hasChild == true ){ targTiles.push(rtnDict(n,n)) ; break}
		if( rtnDict(n,n) ){targTiles.push(rtnDict(n,n))}

	}

	for(var n = -1; n > ivt(dict.y); n--){

		if( rtnDict(ivt(n),n).hasChild == true ){ targTiles.push(rtnDict(ivt(n),n)) ; break}
		if( rtnDict(ivt(n),n) ){targTiles.push(rtnDict(ivt(n),n))}

	}

	if(dict.type != 'queen'){renderMoves()} // a constante "bishop" é usada na constante "queen", para evitar a duplicação de procedimentos foi feito um filtro a mais

}

const king = function(dict){

	currentObj = dict

	if( rtnDict(1,1) ){targTiles.push(rtnDict(1,1))} // analisando tag superior direita
	if( rtnDict(-1,1) ){targTiles.push(rtnDict(-1,1))} // analisando tag superior esquerda
	if( rtnDict(1,-1) ){targTiles.push(rtnDict(1,-1))} // analisando tag inferior difeira
	if( rtnDict(-1,-1) ){targTiles.push(rtnDict(-1,-1))} // analisando tag inferior esquerda

	if( rtnDict(0,1) ){targTiles.push(rtnDict(0,1))} // analisando tags adjacentes
	if( rtnDict(1,0) ){targTiles.push(rtnDict(1,0))}
	if( rtnDict(-1,0) ){targTiles.push(rtnDict(-1,0))}
	if( rtnDict(0,-1) ){targTiles.push(rtnDict(0,-1))}

	renderMoves()

}

const knight = function(dict){

	currentObj = dict

	if( rtnDict(2,1) ){ targTiles.push(rtnDict(2,1))}
	if( rtnDict(-2,1) ){ targTiles.push(rtnDict(-2,1))}
	if( rtnDict(2,-1) ){ targTiles.push(rtnDict(2,-1))}
	if( rtnDict(-2,-1) ){ targTiles.push(rtnDict(-2,-1))}
	if( rtnDict(1,2) ){ targTiles.push(rtnDict(1,2))}
	if( rtnDict(-1,2) ){ targTiles.push(rtnDict(-1,2))}
	if( rtnDict(1,-2) ){ targTiles.push(rtnDict(1,-2))}
	if( rtnDict(-1,-2) ){ targTiles.push(rtnDict(-1,-2))}

	renderMoves()

}

const queen = function(dict){

	currentObj = dict

	rook(dict)
	bishop(dict)

	renderMoves()

}

const renderMoves = function(){ // função que le o array targTiles e cria uma tag para cada objeto com conteúdo nele

	for(var x of targTiles){

		if(x.hasChild == false){

			var genericObject = document.createElement('div')
			genericObject.className = 'moves'

			x.tag.appendChild(genericObject)

		}

	}

	document.querySelectorAll('.moves').forEach(function(arg){

		arg.addEventListener('click', () => currentObj.moveTo(arg.parentNode))

	})

}


export { loaded, targTiles, updateTargTiles, pawn ,rook, bishop, king, knight, queen }