export const loaded = ()=> console.log("\"conf.js\" was loaded successfully")

export let confs = { // esses dados configuram o jogo. por hora não existem muitas configurações

	tileCoords : true, // se true, adiciona um span do canto superior direito de cada tile com o a sua respectiva cordenada
	invertBoard : false,
	hasTurn : false,
	colorStarter : 'white',

}
