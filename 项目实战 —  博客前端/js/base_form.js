
$().extend('serialize',function(){
	for(var i = 0; i < this.elements.length; i++){
		var form = this.elements[i];
		var parts = {};
		for(var i = 0; i < form.elements.length; i++){
			var filed = form.elements[i];
			switch(filed.type){		//如果是
				case undefined :
				case 'submit' :
				case 'reset' :
				case 'file' :
				case 'button' :
					break;		//不发送
				case 'radio' :
				case 'checkbox' :
					if(!filed.selected) break;	//如果是勾选框，没有被选择就不发送
					case 'select-one' :
					case 'select-multiple' :
						for(var j = 0; j < filed.options.length; j++){
							var option = filed.options[j];
							if(option.selected){
								var optValue = '';
								if(option.hasAttribute){
									optValue = (option.hasAttribute('value') ? option.value : option.text);
								}else{
									optValue = (option.attributes('value').specified ? option.value : option.text);
								}
								parts[filed.name] = optValue;
							}
						}
					break;
				default :
					parts[filed.name] = filed.value;
			}
		}
		return parts;
	};
	return this;
});