export const loaded = ()=> console.log("\"pieces.js\" was loaded successfully")

import * as rules from "../configs/readConfs.js"
import {targTiles, updateTargTiles} from './moves.js'
import {getPieceMove} from './getPieceMoves.js'
import {getCoords} from './tupleCoords.js'

const cl = t => console.log(t)

let currentPiece = null // armazena o objeto anteriormente selecionado
let turn = rules.colorStarter
let isGameOver = false

export const create = (t,c,x,y)=> new Piece(t,c,x,y)

class Piece{

	constructor(type,color,x,y){

		if(type == 'pawn'){ this.firstMove = true} // atributo especial para peões

		this.totalMoves = 0

		this.color = color
		this.type = type
		this.x = x
		this.y = y

		this.imgPath = `../../img/${this.type}${this.color == "white" ? 'W' : 'B'}.png` // a estrutura pra nome dos png é {peça}{inicial da cor em maiúsculo}.png

		// supondo que o tipo passada como argumento seja "bishop" e a cor seja "white" ==> bishopW.png

		this.createMyTag()

	}

	createMyTag(){ // cria uma tag de referência e a injeta na div referente as cordenadas x e y desse objeto 

		this.parentTag = document.querySelector("#x" + this.x + "y" + this.y)

		var tag = document.createElement('div')
		
		var img = document.createElement('img')

		tag.className = this.type + ' ' + this.color
		tag.addEventListener('click', () => this.stageMove() )

		img.src = this.imgPath

		tag.appendChild(img)

		this.tag = tag // supondo que o tipo seja "pawn" e a cor "black", a tag final seria ==>   <div class="pawn black">  <img src="../../img/pawnB.png">  </div>

		this.tag.addEventListener('mouseover', () => this.toggle('over') ) // efeito visuais
		this.tag.addEventListener('mouseout', () => this.toggle('out') )

		this.parentTag.appendChild(this.tag)

	}

	toggle(arg){

		if( isGameOver == false && this.myTurn() == true ){

			var rtnClass = ()=> this.parentTag.className.includes('whiteTile')
			var color = c => this.parentTag.style.background = c

			if(arg == "over"){ rtnClass() == false ? color("var(--verdeEscuro)") : color("var(--cinzaClaro)") }

			if(arg == "out"){ rtnClass() == false ? color("var(--verde)") : color("var(--branco)") }

		}

	}

	myTurn(){ // retorna true se for o turno da peça que estará sofrendo o toggle e false se não. retorna true se o jogo estiver configurado para ter turnos 

		if(rules.hasTurn == true){ return (this.color == turn) }

		if(rules.hasTurn == false){ return true }

	}	

	stageMove(){ // essa função preve três situações diferentes de click em um apeça

		if(isGameOver == false){

			if(currentPiece == this){ this.unstageMove() ; return} // 1°- se a nova peça selecionada for igual a peça anteriormente selecionada então o movimento é cancelado

			if(!currentPiece){ // 2°- se nenhuma peça foi selecionada anteriormente então os possíveis movimentos daquela peça vão ser mostrados

				if(this.myTurn() == true){

					currentPiece = this // anota o objeto selecionado

					getPieceMove(this) // função do arquivo "getPieceMoves.js"

					return

				}

				return

			}

			if(currentPiece != this & currentPiece.color != this.color){ this.captured() ; return }
			// 3°- se a nova peça selecionada for de uma cor diferente que a peça anteriormente selecionada, significa que ouve uma captura

		}

	}

	unstageMove(){

		currentPiece = null
		updateTargTiles() // limpa o array com objetos referentes as tags alvo do arquivo "getPieceMoves.js"

		document.querySelectorAll('.moves').forEach( t => t.remove())

		if(this.totalMoves == 0 && this.firstMove != undefined){this.firstMove = true} 
		// se o movimento cancelado foi o de um peão em seu primeiro movimento, ele não "perde" a propriedade firstMove. essa parte do código pode ser substituída por uma função que diz se o turno passou ou foi cancelado talvez

	}

	moveTo(targ){ // método usado pelo arquivo getPieceMoves.js

		turn == 'white' ? turn = 'black' : turn = 'white' // toggle no turno

		currentPiece = null // apaga a peça atual

		updateTargTiles() // limpa o array com objetos referentes as tags alvo do arquivo "getPieceMoves.js"
		document.querySelectorAll('.moves').forEach( t => t.remove()) // deleta todas as tags de movimento

		this.destroyMyTag() // destrói a tag armazenada em this.tag

		this.x = getCoords(targ.id)[0] // atualiza o x do objeto
		this.y = getCoords(targ.id)[1] // atualiza o y do objeto

		this.createMyTag() // (esse método também atualiza o valor do this.parentTag)

		this.totalMoves++

	}

	captured(){

		// targTiles é uma variável que veio do arquivo "moves.js"

		for(var x of targTiles){

			if(this.parentTag == x.tag ){ // confere se a peça alvo da captura está dentro dos possíveis movimentos da peça atualmente selecionada

				if(currentPiece.type == 'pawn' && currentPiece.x != this.x){ // o peão não captura na direção em que anda, então é necessário uma confirmação. se eles estiverem no mesmo eixo x significa que o peão não pode capturar aquela peça

					if(this.type == "king"){ gameOver(currentPiece.color) }
					
					this.destroyMyTag()

					currentPiece.moveTo(x.tag)

					return

				}

				if(currentPiece.type != 'pawn'){ // a captura de qualquer outra peça que não o peão

					if(this.type == "king"){ gameOver(currentPiece.color) }

					this.destroyMyTag()

					currentPiece.moveTo(x.tag)

				}

			}

		}

	}

	destroyMyTag(){

		this.tag.remove()

	}

}

const gameOver = function(arg){ //função ainda sem uma real utilidade

	isGameOver = true
	console.log(arg +' wins!')

}