// rem
function setRem(){
	if(document.documentElement.clientWidth > 1024){
		document.documentElement.style.width = 750 + "px";
		document.documentElement.style.margin = "0 auto";
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + "px";
	}else{
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	}
};
setRem();
window.onresize = function(){
	setRem();
}