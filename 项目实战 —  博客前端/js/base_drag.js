
$().extend('drag',function(){
	var tags = arguments;
	for(var i = 0; i < this.elements.length; i++){
		//拖拽流程:
		//1.先点下去
		//2.在点下的物体被选中，进行move移动
		//3.抬起鼠标，停止移动
		//点击某个物体，用oDiv即可，move和up是全局区域，也就是整个文档通用，应该用document
		addEvent(this.elements[i],'mousedown',function(e){		//当鼠标点下去时
			//e.preventDefault();		//阻止浏览器默认行为
			if(trim(this.innerHTML).length == 0) e.preventDefault();
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft; //点击位置距离浏览器边缘的距离 - 弹出窗距离浏览器边缘的距离
			var diffY = e.clientY - _this.offsetTop;	//点击位置距离浏览器边缘的距离 - 弹出窗距离浏览器边缘的距离
			
			//自定义拖拽区域
			var flag = false;
			for(var i = 0; i < tags.length; i++){
				if(e.target == tags[i]){
					flag = true;		//只要有一个是true，就立刻返回
					break;			//跳出for循环
				};
			};
			
			if(flag){			//如果flag为真就能拖动，否则不能拖动
				addEvent(document,'mousemove',move);		//鼠标点下去移动时
				addEvent(document,'mouseup',up);	//鼠标抬起时
			}else{
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
			};	
			function move(e){
				var left = e.clientX - diffX;// 点击位置离浏览器边缘的距离 - 点击位置离浏览器边缘的距离减去弹窗左边框离浏览器边缘的距离
				var top = e.clientY - diffY;//  点击位置离浏览器边缘的距离 - 点击位置离浏览器边缘的距离减去弹窗上边框离浏览器边缘的距离
				//禁止弹出窗左右拉出当前界面
				if(left < 0){
					left = 0;
				} else if(left <= getScroll().left){
					left = getScroll().left;
				} else if(left > getInner().width + getScroll().left - _this.offsetWidth){	//当left > 浏览器总宽度 —— 弹出窗总宽度时
					left = getInner().width + getScroll().left - _this.offsetWidth;	//等于浏览器总宽度 —— 弹出窗总宽度
				}
				//禁止弹出窗上下拉出当前界面
				if(top < 0){
					top = 0;
				} else if(top <= getScroll().top){
					top = getScroll().top;
				} else if(top > getInner().height + getScroll().top - _this.offsetHeight){	//当top > 浏览器总高度 —— 弹出窗总高度时
					top = getInner().height + getScroll().top - _this.offsetHeight;		//等于浏览器总高度 —— 弹出窗总高度
				}
				_this.style.left = left + 'px';//弹出窗左边框离浏览器边缘的距离 = 点击位置离浏览器边缘的距离 - 点击位置离浏览器边缘的距离减去弹窗左边框离浏览器边缘的距离
				_this.style.top = top + 'px';//弹出窗上边框离浏览器边缘的距离 = 点击位置离浏览器边缘的距离 - 点击位置离浏览器边缘的距离减去弹窗上边框离浏览器边缘的距离
				
				if(typeof _this.setCapture != 'undefined'){	//兼容IE当鼠标拖动离开浏览器时出现白边问题
					_this.setCapture();		//当鼠标拖动出浏览器外部时还能继续获取鼠标事件
				};
			};
			function up(){
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
				if(typeof _this.releaseCapture != 'undefined'){		//兼容IE当鼠标拖动离开浏览器时出现白边问题
					_this.releaseCapture();	//当鼠标拖动出浏览器外部时还能继续获取鼠标事件
				}
			}
		});
	};
	return this;
});