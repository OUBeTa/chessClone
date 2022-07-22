export const loaded = ()=> console.log("\"tupleCoords.js\" was loaded successfully")

export const getCoords = function(divId){

	var middle
	var coordX 
	var coordY 

	middle = divId.indexOf("y")

	coordX = divId.slice(0,middle)
	coordY = divId.slice(middle)

	coordX = coordX.slice(1)
	coordY = coordY.slice(1)

	coordX = parseInt(coordX)
	coordY = parseInt(coordY)

	return [coordX,coordY]

}