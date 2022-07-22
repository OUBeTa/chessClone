import * as pieces from "./mech/pieces.js"
import * as getMoves from "./mech/getPieceMoves.js"
import * as moves from "./mech/moves.js"
import * as tuple from "./mech/tupleCoords.js"
import * as configs from "./configs/conf.js"
import * as rc from "./configs/readConfs.js"
import * as gmSets from "./gameSets.js"

//=======================// seção pra ver se todos os arquivos anexados foram carregados corretamente //=======================//

pieces.loaded()
getMoves.loaded()
moves.loaded()
tuple.loaded()
configs.loaded()
rc.loaded()
gmSets.loaded()

//=======================// game init  //=======================//

gmSets.sets.ordinarySet()