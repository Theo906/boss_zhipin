/*
	简化的移动端适配
*/

;
(function(win){
	var doc = win.document;
	var docEl = doc.documentElement;
	// console.log(doc);//返回document对象
	// console.log(docEl);//返回整个网页
	var _t;
	
	function refreshRemFn(){
		var width = docEl.getBoundingClientRect().width;
		// console.log(width);
		
		if(width>640){
			width = 640
		}
		
		// 1rem = 100px
		var _rem = width / 6.4;
		docEl.style.fontSize = _rem + 'px' ;
		
	}
	
	//事件监听，当页面缩放的时候
	win.addEventListener('resize',function(){
		clearTimeout(_t);
		_t = setTimeout(refreshRemFn,300);
	},false)
	
	
	
	refreshRemFn();
})(window)