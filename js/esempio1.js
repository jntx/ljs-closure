var accessibile = 1;
let inaccessibile = "testo";

function chiamabile(a) {
	console.log(a);
}


let nonChiamabile = function(v) {
	console.log("non chiamabile", v);
};

window.myAPI = {
	print : nonChiamabile
}