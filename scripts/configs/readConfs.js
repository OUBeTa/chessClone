export const loaded = ()=> console.log("\"readConfs.js\" was loaded successfully")

import {confs as c } from "./conf.js"
import {getCoords as gc } from "../mech/tupleCoords.js"

export const hasTurn = c.hasTurn
export const colorStarter = c.colorStarter

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const letters = [null,'a','b','c','d','e','f','g','h',] // array pra facilitar a citação de letrar usando cordenadas numéricas

if( c.invertBoard == true){ 

	$("#board").style.flexDirection = "column-reverse" 
	$$("div[id ^= row]").forEach(function(arg){

		arg.style.flexDirection = "row-reverse"

	})

}

if( c.tileCoords == true){

	$$(".tiles").forEach(function(tile){

		var coord = "" + letters[ gc(tile.id)[0] ] + gc(tile.id)[1] // a tile que possui o id "x6y2" receberia um span com o texto igual a => 'f2'

		var span = document.createElement("span")

		span.innerText = coord

		// tile.appendChild(span)

		// não consegui posicionar os spans onde eu queria, vou concertar depois

	})

}