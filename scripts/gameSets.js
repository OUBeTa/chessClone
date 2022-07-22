export const loaded = ()=> console.log("\"gameSets.js\" was loaded successfully")

import {create} from "./mech/pieces.js"

export const sets = { // dicionário que contém os possíveis jogos iniciais

	ordinarySet : function(){ // formato padrão do jogo

	  	create("pawn","white",1,2)
	  	create("pawn","white",2,2)
	  	create("pawn","white",3,2)
	  	create("pawn","white",4,2)
	  	create("pawn","white",5,2)
	  	create("pawn","white",6,2)
	  	create("pawn","white",7,2)
	  	create("pawn","white",8,2)

	  	create("rook","white",1,1)
	  	create("rook","white",8,1)

	  	create("bishop","white",3,1)
	  	create("bishop","white",6,1)

	  	create("knight","white",2,1)
	  	create("knight","white",7,1)

	  	create("queen","white",4,1)

	  	create("king","white",5,1)


	  	create("pawn","black",1,7)
	  	create("pawn","black",2,7)
	  	create("pawn","black",3,7)
	  	create("pawn","black",4,7)
	  	create("pawn","black",5,7)
	  	create("pawn","black",6,7)
	  	create("pawn","black",7,7)
	  	create("pawn","black",8,7)

	  	create("rook","black",1,8)
	  	create("rook","black",8,8)

	  	create("bishop","black",3,8)
	  	create("bishop","black",6,8)

	  	create("knight","black",2,8)
	  	create("knight","black",7,8)

	  	create("queen","black",4,8)

	  	create("king","black",5,8)

		// let pieces = ["rook","knight","bishop","queen","king","bishop","knight","rook"];

        // for(let y = 0 ; y < 2 ; y++){

            // for(let x = 1 ; x < 9 ; x++){

                // var color = (y == 0) ? "black" : "white" ;
                // var yCoord = (y == 0) ? 7 : 1 ;

                // create( pieces[x+1] , color , x , yCoord+1 );
                // create( "pawn" , color , x , yCoord );

            // }

        // }
  	

	},

	testSet : function(){

		create("pawn","white",3,1)
		create("pawn","white",3,2)
		create("pawn","white",4,2)
		create("pawn","white",5,2)
		create("pawn","white",6,2)
		create("pawn","white",6,1)

		create("queen","white",4,1)
		create("king","white",5,1)

		create("pawn","black",3,8)
		create("pawn","black",3,7)
		create("pawn","black",4,7)
		create("pawn","black",5,7)
		create("pawn","black",6,7)
		create("pawn","black",6,8)

		create("queen","black",4,8)
		create("king","black",5,8)

	}

}