export const loaded = ()=> console.log("\"getPieceMoves.js\" was loaded successfully")

import * as moves from "./moves.js"

export const getPieceMove = function(obj){

	switch(obj.type){

		case 'pawn': moves.pawn(obj)
		break

		case 'rook': moves.rook(obj)
		break

		case 'bishop': moves.bishop(obj)
		break

		case 'queen': moves.queen(obj)
		break

		case 'king': moves.king(obj)
		break

		case 'knight': moves.knight(obj)
		break


	}

}