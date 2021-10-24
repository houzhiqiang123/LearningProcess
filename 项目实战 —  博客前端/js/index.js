


$(function(){
	//个人中心 ——— 下拉菜单
	$('#header .member').hover(function(){
		$(this).css('background','url(./img/arrow2.png) no-repeat 55px center');//当鼠标移入时切换三角图标
		$('#header .member_ul').show().animate({
			t : 30,
			step : 10,
			mul : {
				O : 100,
				H : 120
			}
		});	//当鼠标移入时显示下拉列表
	},function(){
		$(this).css('background','url(./img/arrow.png) no-repeat 55px center');//当鼠标移出时切换三角图标
		$('#header .member_ul').animate({
			t : 30,
			step : 10,
			mul : {
				O : 0,
				H : 0
			},
			 fn : function(){
				 $('#header .member_ul').hide();																																			
			 }
		});
			//当鼠标移出时隐藏下拉列表
	});
	
	//遮罩画布
	var screen = $('#screen');
	
	//登录框及锁屏
	var login = $('#login');
	login.center(350,250).resize(function(){	//使登录框在浏览器居中	//当浏览器大小发生改变时	
		if(login.css('display') == 'block'){	//如果登录框打开时，执行锁屏
			screen.lock();						//执行锁屏
		};
	});						
	$('#header .login').click(function(){		//当点击登录时，登录框弹出
		login.center(350,250).show();			//当点击登录时，显示画布
		screen.lock().animate({
			attr : 'O',
			start : 0,
			target : 30,
			t : 30,
			step : 10
		});							//执行锁屏
	})
	$('#login .close').click(function(){		//当点击关闭小图标时，登录框界面关闭
		login.hide();			//当关闭登录框时，画布关闭
		screen.animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10,
			fn : function(){
				screen.unlock();
			}
			
		});						//隐藏画布
	});
	
	//注册框
	var reg = $('#reg');
	reg.center(600,550).resize(function(){	//使登录框在浏览器居中	//当浏览器大小发生改变时	
		if(reg.css('display') == 'block'){	//如果登录框打开时，执行锁屏
			screen.lock();						//执行锁屏
		};
	});						
	$('#header .reg').click(function(){		//当点击登录时，登录框弹出
		reg.center(600,550).show();			//当点击登录时，显示画布
		screen.lock().animate({
			attr : 'O',
			start : 0,
			target : 30,
			t : 30,
			step : 10
		});							//执行锁屏
	})
	$('#reg .close').click(function(){		//当点击关闭小图标时，登录框界面关闭
		reg.hide();			//当关闭登录框时，画布关闭
		screen.animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10,
			fn : function(){
				screen.unlock();
			}
			
		});						//隐藏画布
	});
	
	//拖拽
	login.drag($('#login h2').last());
	reg.drag($('#reg h2').last());
	
	//百度分享初始化位置
	$('#share').css('top',getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2 + 'px');//百度分享图标在隐藏状态下小图标居中于滚动条
	
	/*
	//设置滚动条移动式百度分享小图标居中在屏幕上下中间
	addEvent(window,'scroll',function(){
		$('#share').animate({
			attr : 'Y',
			target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2
		})
	})
	*/
	$(window).bind('scroll',function(){
		setTimeout(function(){
			$('#share').animate({
				attr : 'Y',
				target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height'))) / 2
			})
		},100);
	});
	
	//百度分享收缩效果
	$('#share').hover(function(){
		$(this).animate({
			'attr' : 'X',
			'target' : 0
		});
	},function(){
		$(this).animate({
			'attr' : 'X',
			'target' : -211
		});
	});
	
	
	//滑动导航
	$('#nav .about li').hover(function(){
		var target = $(this).first().offsetLeft;		//offsetLeft获取鼠标的位置
		$('#nav .nav_bg').animate({
			attr : 'X',
			target : target + 20,
			fn : function(){
				$('#nav .white').animate({
					attr : 'X',
					target : -target
				})
			}
		})
	},function(){
		$('#nav .nav_bg').animate({
			attr : 'X',
			target : 20,
			fn : function(){
				$('#nav .white').animate({
					attr : 'X',
					target : 0
				})
			}
		})
	});
	
	
	//左侧菜单
	$('#sidebar h2').toggle(function(){
		//alert(this.nextSibling.innerHTML);
		$(this).next().animate({
			mul : {
				H : 0,
				O : 0
			}
		});
	},function(){
		$(this).next().animate({
			mul : {
				H : 150,
				O : 100
			}
		});
	});
	
	//表单验证
	
	//初始化表单操作
	$('form').eq(0).first().reset();
	
	//用户名
	$('form').eq(0).form('user').bind('focus',function(){		//当鼠标点入文本框时
		$('#reg .info_user').show();
		$('#reg .error_user').css('display','nobe');
		$('#reg .succ_user').hide();
	}).bind('blur',function(){		//当鼠标离开文本框时
		if(trim($(this).value()) == ''){	//如果文本框里面的值为空
			$('#reg .info_user').hide();
			$('#reg .error_user').css('display','nobe');
			$('#reg .succ_user').hide();
		}else if(!check_user()){	//\w代表a-zA-Z0-9_
			$('#reg .error_user').show();
			$('#reg .info_user').hide();
			$('#reg .succ_user').hide();
		}else{
			$('#reg .succ_user').show();
			$('#reg .error_user').hide();
			$('#reg .info_user').hide();
		}
	});
	//验证user
	function check_user(){
		var flag = true;
		if(!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))){
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		} else {
			$('#reg .loading').show();
			$('#reg .info_user').hide();
			ajax({
				method : 'post',	//以post方式提交(不带后缀)
				url : 'is_user.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
				data : $('form').eq(0).serialize(),
				success : function (text) {		//返回传递到服务器文件里的传递进去的信息
					if(text == 1){
						$('#reg .error_user').html('用户名已存在！');
						flag = false;
					} else {
						flag = true;
					}
					$('#reg .loading').hide();
				},
				async : false
			});
		}
		return flag;
	};
	
	//密码验证
	$('form').eq(0).form('pass').bind('focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').hide();
	}).bind('blur',function(){
		if(trim($(this).value()) == ''){	//如果文本框里面去掉两边空格以后为空
			$('#reg .info_pass').hide();
		}else{
			if(check_pass()){
				$('#reg .info_pass').hide();
				$('#reg .error_pass').css('display','nobe');
				$('#reg .succ_pass').show();
			}else{
				$('#reg .info_pass').hide();
				$('#reg .error_pass').show();
				$('#reg .succ_pass').hide();
			}
		}
		
	});
	
	//密码强度验证
	$('form').eq(0).form('pass').bind('keyup',function(){
		check_pass();
	});
	
	//密码验证函数
	function check_pass(){
		var value = trim($('form').eq(0).form('pass').value());
		var value_length = value.length;
		var code_length = 0;
		
		//第一个必须条件的验证，6~20位之间
		if(value_length >= 6 && value_length <= 20){
			$('reg .info_pass .q1').html('●').css('color','#5f0');
		}else{
			$('reg .info_pass .q1').html('○').css('color','#666');
		}
		
		//第二个必须条件的验证，字母或数字及非空字符，任意一个即可满足
		if(value_length > 0 && !/\s/.test(value)){
			$('reg .info_pass .q2').html('●').css('color','#5f0');
		}else{
			$('reg .info_pass .q2').html('○').css('color','#666');
		}
		
		//第三个必须条件的验证，大写字母、小写字母、数字、非空字符、任意两种混拼即可满足
		if(/[\d]/.test(value)){		//\d代表0-9
			code_length++;
		}
		
		if(/[a-z]/.test(value)){
			code_length++;
		}
		
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		
		if(/[^\w]/.test(value)){		//\w代表0-9a-zA-Z—_
			code_length++;
		}
		
		if(code_length >= 2){
			$('reg .info_pass .q3').html('●').css('color','#5f0');
		}else{
			$('reg .info_pass .q3').html('○').css('color','#666');
		}
		
		//安全级别
		if(value_length >= 10 && code_length >= 3){
			$('#reg .info_pass .s1').css('color','#5f0');
			$('#reg .info_pass .s2').css('color','#5f0');
			$('#reg .info_pass .s3').css('color','#5f0');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if(value_length >= 8 && code_length >= 2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if(value_length >= 1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('低').css('color','maroon');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}
		
		if(value_length >= 6 && value_length <= 20 &&  !/\s/.test(value) && code_length >= 2) {
			return true;	//如果3个条件都满足
		}else{
			return false;
		}
		
	};
	
	//密码确认
	$('form').eq(0).form('notpass').bind('focus',function(){
		$('#reg .info_notpass').show();
		$('#reg .error_notpass').hide();
		$('#reg .succ_notpass').hide();
	}).bind('blur',function(){
		if(trim($(this).value()) == ''){
			$('#reg .info_notpass').hide();
		}else if(check_notpass()){
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').hide();
			$('#reg .succ_notpass').show();
		}else{
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').show();
			$('#reg .succ_notpass').hide();
		}
	});
	//验证密码确认
	function check_notpass(){
		if(trim($('form').eq(0).form('notpass').value()) == trim($('form').eq(0).form('pass').value()))return true;
	}
	
	//提问
	$('form').eq(0).form('ques').bind('change',function(){		//触发改变事件
		if(check_ques()) $('#reg .error_ques').hide();
	});
	//验证提问
	function check_ques(){
		if($('form').eq(0).form('ques').value() != 0)return true;
	}
	
	//回答
	$('form').eq(0).form('ans').bind('focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').hide();
	}).bind('blur',function(){
		if(trim($(this).value()) == ''){
			$('#reg .info_ans').hide();
		}else if(check_ans()){
			$('#reg .info_ans').hide();
			$('#reg .error_ans').hide();
			$('#reg .succ_ans').show();
		}else{
			$('#reg .info_ans').hide();
			$('#reg .error_ans').show();
			$('#reg .succ_ans').hide();
		}
	});
	//验证回答
	function check_ans(){
		if(trim($('form').eq(0).form('ans').value()).length >= 2 && trim($('form').eq(0).form('ans').value()).length <= 32) return true;
	}
	
	//电子邮件
	$('form').eq(0).form('email').bind('focus',function(){	//获得鼠标焦点时
		
		//补全界面
		if($(this).value().indexOf('@') == -1){
			$('#reg .all_email').show();	//显示邮件提示
		};
		$('#reg .info_email').show();
		$('#reg .error_email').hide();
		$('#reg .succ_email').hide();
	}).bind('blur',function(){		//失去鼠标焦点时
		
		$('#reg .all_email').hide();	//关闭邮件提示
		
		if(trim($(this).value()) == ''){
			$('#reg .info_email').hide();
		}else if(check_email()){	
			$('#reg .info_email').hide();	//\w表示a-zA-Z0-9_ 	
			$('#reg .error_email').hide();	// ^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z]{2,4}){1,2}$/
			$('#reg .succ_email').show();
		}else{
			$('#reg .info_email').hide();
			$('#reg .error_email').show();
			$('#reg .succ_email').hide();
		}
	});
	//验证电子邮件
	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
	}
	
	//电子邮件补全系统键入
	$('form').eq(0).form('email').bind('keyup',function(event){
		if($(this).value().indexOf('@') == -1){
			$('#reg .all_email').show();
			$('#reg .all_email li span').html($(this).value());
		}else{
			$('#reg .all_email').hide();
		}
		
		
		$('#reg .all_email li').css('background','none');
		$('#reg .all_email li').css('color','#666');
		
		if(event.keyCode == 40){	//获取键盘对应的数字,40代表向下的键盘
			if(this.index == undefined || this.index >= $('#reg .all_email li').length() - 1 ){
				this.index = 0;
			}else{
				this.index++;
			}
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
			
		};
		
		if(event.keyCode == 38){	//获取键盘对应的数字,38代表向上的键盘
			if(this.index == undefined || this.index <= 0){
				this.index = $('#reg .all_email li').length() - 1 ;
			}else{
				this.index--;
			}
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
			
		};
		
		if(event.keyCode == 13){
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').hide();
			this.index = undefined;
		};
		
	});
	
	//电子邮件补全系统点击获取
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').eq(0).form('email').value($(this).text());
	})
	
	
	//电子邮件补全系统鼠标移入移出效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2').css('color','#369');
	},function(){
		$(this).css('background','none').css('color','#666');
	});
	
	//年月日
	var year = $('form').eq(0).form('year');
	var month = $('form').eq(0).form('month');
	var day = $('form').eq(0).form('day');
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];
	
	//注入年
	for(var i = 1950; i <= 2021; i++){
		year.first().add(new Option(i,i),undefined);	//创建下拉列表
	}
	
	//注入月
	for(var i = 1; i <= 12; i++){
		month.first().add(new Option(i,i),undefined);
	}
	
	
	year.bind('change',select_day);
	month.bind('change',select_day);
	day.bind('change',function(){	//当日期改变时
		if(check_birthday()){
			$('#reg .error_birthday').hide();
		}
	});
	
	//验证日期
	function check_birthday(){
		if(year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}
	
	function select_day(){
		if(year.value() != 0 && month.value() != 0){
			//清理之前的注入
			day.first().options.length = 1;
			
			//不确定的日
			var cur_day = 0;
			
			//注入日
			if(inArray(day31,parseInt(month.value()))){
				cur_day = 31;
			}else if(inArray(day30,parseInt(month.value()))){
				cur_day = 30;
			}else{
				//计算闰年用年份除以4，得到的数字是整数那就是闰年，如果年份后面有两个零就必须除以400
				if((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0){
					cur_day = 29;
				}else{
					cur_day = 28;
				}
			}
			for(var i = 1; i <= cur_day; i++){
				day.first().add(new Option(i,i),undefined);
			}
			
		}else{
			//清理之前的注入
			day.first().options.length = 1;
		}
	};
	
	//备注
	$('form').eq(0).form('ps').bind('keyup',check_ps).bind('paste',function(){		//键盘事件及鼠标粘贴事件
		//粘贴事件会在内容粘贴到文本框之前触发
		setTimeout(check_ps,50);	//设置延迟50毫秒再触发粘贴事件，让内容先粘贴到文本框再执行粘贴事件
	});
	
	//清尾
	$('reg .ps .clear').click(function(){
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));		// 清尾,截取多余的字符串
		check_ps();
	});
	
	function check_ps(){
		var num = 200 - $('form').eq(0).form('ps').value().length;
		if(num >= 0){
			$('reg .ps').eq(0).show();
			$('reg .ps .num').eq(0).html(num);
			$('reg .ps').eq(1).hide();
			return true;
		}else{
			$('reg .ps').eq(0).hide();
			$('reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');		//将负值转换为正值
			$('reg .ps').eq(1).show();
			return false;
		}
	};
	
	//提交
	$('form').eq(0).form('sub').click(function(){
		var flag = true;
		
		if(!check_user()){	//如果用户名不合法
			$('#reg .error_user').show();
			flag = false;
		}
		
		if(!check_pass()){	//如果密码不合法
			$('#reg .error_pass').show();
			flag = false;
		}
		
		if(!check_notpass()){	//如果密码确认不合法
			$('#reg .error_notpass').show();
			flag = false;
		}
		
		if(!check_ques()){	//如果提问不合法
			$('#reg .error_ques').show();
			flag = false;
		}
		
		if(!check_ans()){	//如果回答不合法
			$('#reg .error_ans').show();
			flag = false;
		}
		
		if(!check_email()){	//如果邮箱不合法
			$('#reg .error_email').show();
			flag = false;
		}
		
		if(!check_birthday()){	//如果日期不合法
			$('#reg .error_birthday').show();
			flag = false;
		}
		
		if(!check_ps()){	////如果备注不合法
			flag = false;
		}
		//提交数据
		if(flag){	//flag全部为true时才能提交
			var _this = this;
			$('#loading').show().center(200,40);
			$('#loading p').html('正在提交注册中...');
			_this.disabled = true;		//禁止重复提交
			$(_this).css('backgroundPosition','right');
			ajax({
				method : 'post',	//以post方式提交(不带后缀)
				url : 'add.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
				data : $('form').eq(0).serialize(),
				success : function (text) {		//返回传递到服务器文件里的传递进去的信息
					if(text == 1){
						$('#loading').hide();
						$('#success').show().center(200,40);
						$('#success p').html('注册成功，请登录...');
						setTimeout(function(){
							$('#success').hide();
							reg.hide();
							$('#reg .succ').hide();
							$('form').eq(0).first().reset();
							_this.disabled = false;		//关闭禁止重复提交
							$(_this).css('backgroundPosition','left');	//切换图标
							screen.animate({
								attr : 'O',
								target : 0,
								t : 30,
								step : 10,
								fn : function(){
									screen.unlock();
								}
								
							});			
						},1500);
					}
				},
				async : true
			});
		}
	});
	
	//登录
	$('form').eq(1).form('sub').click(function(){
		if(/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value())) && $('form').eq(1).form('pass').value().length >= 6){
			var _this = this;
			$('#loading').show().center(200,40);
			$('#loading p').html('正在尝试登录中...');
			_this.disabled = true;
			$(_this).css('backgroundPosition','right');
			ajax({
				method : 'post',	//以post方式提交(不带后缀)
				url : 'is_login.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
				data : $('form').eq(1).serialize(),
				success : function (text) {		//返回传递到服务器文件里的传递进去的信息
					$('#loading').hide();
					if(text == 1){		//用户名或密码错误
						$('#login .info').html('登录失败：用户名或密码错误！');
					} else {	//成功
						$('#login .info').html('');
						$('#success').show().center(200,40);
						$('#success p').html('登录成功,请稍后...');
						setCookie('user',trim($('form').eq(1).form('user').value()));
						setTimeout(function(){
							$('#success').hide();
							login.hide();
							$('form').eq(1).first().reset();
							screen.animate({
								attr : 'O',
								target : 0,
								t : 30,
								step : 10,
								fn : function(){
									screen.unlock();
								}
							});
							$('#header .reg').hide();
							$('#header .login').hide();
							$('#header .info').show().html(getCookie('user') + '，你好！');
						},1500);
					}
					_this.disabled = false;
					$(_this).css('backgroundPosition','left');	//切换图标
					
				},
				async : true
			});
		} else {
			$('#login .info').html('登录失败：用户名或密码输入错误！');
		}
	});
	
	
	
	//轮播器初始化
	//$('#banner img').hide();
	//$('#banner img').eq(0).show();
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	
	
	//轮播器计数器
	var banner_index = 1;
	
	//轮播器的种类
	var banner_type = 1;		//1表示透明度，2表示上下滚动
	
	//自动轮播器
	var banner_timer = setInterval(banner_fn,3000);		//定时器，实现无限轮播

	
	//手动轮播器
	$('#banner ul li').hover(function(){
		clearInterval(banner_timer);
		if($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333'){
			banner(this,banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		}
	},function(){
		banner_index = $(this).index() + 1;
		banner_timer = setInterval(banner_fn,3000);		//定时器，实现无限轮播
	});
	
	function banner(obj,prev){
		$('#banner ul li').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		
		if(banner_type == 1){
			$('#banner img').eq(prev).animate({
				attr : 'O',
				target : 0,
				t : 30,
				step : 10
			}).css('z-index',1);
			
			$('#banner img').eq($(obj).index()).animate({
				attr : 'O',
				target : 100,
				t : 30,
				step : 10
			}).css('z-index',2);
		}else if(banner_type == 2){
			$('#banner img').eq(prev).animate({
				attr : 'Y',
				target : 150,
				t : 30,
				step : 10
			}).css('z-index',1).opacity(100);
			
			$('#banner img').eq($(obj).index()).animate({
				attr : 'Y',
				target : 0,
				t : 30,
				step : 10
			}).css('top','-150px').css('z-index',2).opacity(100);
		}
	}
	
	function banner_fn(){
		if(banner_index >= $('#banner ul li').length())   banner_index = 0;
		banner($('#banner ul li').eq(banner_index).first(),banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		banner_index++;
	}
	
	
	//问题1，将xsrc
	//当图片进入到可见区域的时候，将图片的xsrc的地址转换成src即可
	
	//alert($('.wait_load').eq(0).attr('xsrc'));
	//$('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));
	
	
	//问题2，获取图片元素到最外层顶点元素的距离
	//alert(offsetTop($('.wait_load').first()));
	
	//alert(getInner().height + getScroll().top);
	
	var wait_load = $('.wait_load');
	wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);
	$(window).bind('resize',_wait_load);
	
	function _wait_load(){
		setTimeout(function(){
			
			for(var i = 0; i < wait_load.length(); i++){
				var _this = wait_load.ge(i);
				
				if(getInner().height + getScroll().top >= offsetTop(_this)){
					$(_this).attr('src',$(_this).attr('xsrc')).animate({
						attr : 'O',
						target : 100,
						t : 30,
						step : 10
					});
				}
			}
			
		},100);
	};
	
	
	//图片弹窗
	var photo_big = $('#photo_big');
	photo_big.center(620,511).resize(function(){		//当浏览器大小发生改变时	
		if(reg.css('display') == 'block'){	//如果登录框打开时，执行锁屏
			screen.lock();						//执行锁屏
		};
	});						
	$('#photo dl dt img').click(function(){		//当点击登录时，登录框弹出
		photo_big.center(620,511).show();			//当点击登录时，显示画布
		screen.lock().animate({
			attr : 'O',
			target : 30,
			t : 30,
			step : 10
		});	
		
		//创建一个临时的图片对象，用以保存图片
		var temp_img = new Image();		//创建一个临时区域的图片对象
		
		$(temp_img).bind('load',function(){
			//图片加载
			$('#photo_big .big img').attr('src',temp_img.src).animate({
				attr : 'O',
				target : 100,
				t : 30,
				step : 10
			}).css('width','600px').css('height','450px').css('top',0).opacity(0);
		});
		
		temp_img.src = $(this).attr('bigsrc');		//显示被点击图片的bigsrc图片
		
		var children = this.parentNode.parentNode;		//获取img的父节点DT的父节点DL
		
		prev_next_img(children);
	})
	$('#photo_big .close').click(function(){		
		photo_big.hide();			
		screen.animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10,
			fn : function(){
				screen.unlock();
			}
		});	
		
		$('#photo_big .big img').attr('src','img/loading.gif').css('width','32px').css('height','32px').css('top','190px');
	});
	
	//拖拽
	photo_big.drag($('#photo_big h2').last());
	
	
	// //图片加载
	// $('#photo_big .big img').attr('src','https://scpic.chinaz.net/files/pic/pic9/202107/apic33865.jpg').animate({
	// 	attr : 'O',
	// 	target : 100,
	// 	t : 30,
	// 	step : 10
	// }).css('width','600px').css('height','450px').css('top',0).opacity(0);
	
	// alert($('#photo_big .big img').first());
	/*
	//创建一个临时的图片对象，用以保存图片
	var temp_img = new Image();		//创建一个临时区域的图片对象
	
	$(temp_img).bind('load',function(){
		//图片加载
		$('#photo_big .big img').attr('src',temp_img.src).animate({
			attr : 'O',
			target : 100,
			t : 30,
			step : 10
		}).css('width','600px').css('height','450px').css('top',0).opacity(0);
	});
	//IE必须把src这个属性放在load事件的下面才有效
	temp_img.src = 'https://scpic.chinaz.net/files/pic/pic9/202107/apic33865.jpg';	//src属性可以在后台加载这张图片到本地缓存
	*/
	
	//图片鼠标滑过
	$('#photo_big .big .left').hover(function(){
		$('#photo_big .big .sl').animate({
			attr : 'O',
			target : 50,
			t : 30,
			step : 10
		})
	},function(){
		$('#photo_big .big .sl').animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10
		})
	})
	
	$('#photo_big .big .right').hover(function(){
		$('#photo_big .big .sr').animate({
			attr : 'O',
			target : 50,
			t : 30,
			step : 10
		})
	},function(){
		$('#photo_big .big .sr').animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10
		})
	})
	
	//图片上一张
	$('#photo_big .big .left').click(function(){
		
		$('#photo_big .big img').attr('src','img/loading.gif').css('width','32px').css('height','32px').css('top','190px');
		
		var current_img = new Image();
		
		$(current_img).bind('load',function(){		//当图片加载完毕再显示动画
			$('#photo_big .big img').attr('src',current_img.src).animate({
				attr : 'O',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width','600px').css('height','450px').css('top',0);		//css会被load图标的属性带掉，需要强制设置
		});
		
		
		current_img.src = $(this).attr('src');
		
		var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);
	});
	
	//图片下一张
	$('#photo_big .big .right').click(function(){
		
		$('#photo_big .big img').attr('src','img/loading.gif').css('width','32px').css('height','32px').css('top','190px');
		
		var current_img = new Image();
		
		$(current_img).bind('load',function(){		//当图片加载完毕在显示动画
			$('#photo_big .big img').attr('src',current_img.src).animate({
				attr : 'O',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width','600px').css('height','450px').css('top',0);		//css会被load图标的属性带掉，需要强制设置
		});
		
		current_img.src = $(this).attr('src');
		
		var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);
	});
	
	
	function prev_next_img(children){
		var prev = prevIndex($(children).index(),children.parentNode);		//当前的序列号，当前序列号的父节点div(总共有几个dl)
		var next = nextIndex($(children).index(),children.parentNode);	//当前节点序列号，当前节点父节点的dl总数
		
		var prev_img = new Image();
		var next_img = new Image();
		
		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');		//预加载上一张图片
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');		//预加载下一张图片
		$('#photo_big .big .left').attr('src',prev_img.src);	//获取上一张
		$('#photo_big .big .right').attr('src',next_img.src);		//获取下一张
		$('#photo_big .big img').attr('index',$(children).index());		//创建一个index=序列号属性
		$('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#photo dl dt img').length())
	}
	
	/*
	//调用ajax
	$(document).click(function(){
		ajax({
			method : 'post',	//以post方式提交(不带后缀)
			url : 'demo.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
			data : {			//传递数据
				'name' : 'Lee',
				'age' : 100
			},
			success : function (text) {		//返回传递到服务器文件里的传递进去的信息
				alert(text);
			},
			async : true
		});
	});
	*/
	
	//发表博文弹窗
	$('#blog').center(580,320).resize(function(){	//使登录框在浏览器居中	//当浏览器大小发生改变时	
		if($('#blog').css('display') == 'block'){	//如果登录框打开时，执行锁屏
			screen.lock();						//执行锁屏
		};
	});						
	$('#header .member a').eq(0).click(function(){		//当点击登录时，登录框弹出
		$('#blog').center(580,320).show();			//当点击登录时，显示画布
		screen.lock().animate({
			attr : 'O',
			start : 0,
			target : 30,
			t : 30,
			step : 10
		});							//执行锁屏
	})
	$('#blog .close').click(function(){		//当点击关闭小图标时，登录框界面关闭
		$('#blog').hide();			//当关闭登录框时，画布关闭
		screen.animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10,
			fn : function(){
				screen.unlock();
			}
			
		});						//隐藏画布
	});
	
	//发表博文弹窗拖拽
	$('#blog').drag($('#blog h2').last());
	
	//发表博文
	$('form').eq(2).form('sub').click(function(){
		if(trim($('form').eq(2).form('title').value()).length <= 0 || trim($('form').eq(2).form('content').value()).length <= 0 ){		//trim是清理空格
			$('#blog .info').html('发表失败：标题及内容不能为空！');
		} else {
			var _this = this;
			$('#loading').show().center(200,40);
			$('#loading p').html('正在发表博文...');
			_this.disabled = true;
			$(_this).css('backgroundPosition','right');
			ajax({
				method : 'post',	//以post方式提交(不带后缀)
				url : 'add_blog.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
				data : $('form').eq(2).serialize(),
				success : function (text) {		//返回传递到服务器文件里的传递进去的信息
					$('#loading').hide();
					if(text == 1){		
						$('#blog .info').html('');
						$('#success').show().center(200,40);
						$('#success p').html('发表成功,请稍后...');
						setTimeout(function(){
							$('#success').hide();
							$('#blog').hide();
							$('form').eq(2).first().reset();
							screen.animate({
								attr : 'O',
								target : 0,
								t : 30,
								step : 10,
								fn : function(){
									screen.unlock();
									$('#index').html('<span class="loading"></span>');
									$('#index .loading').show();
									
									ajax({
										method : 'post',	//以post方式提交(不带后缀)
										url : 'get_blog.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
										data : {},
										success : function (text) {		//返回传递到服务器文件里的传递进去的信息
											$('#index .loading').hide();
											var json = JSON.parse(text);
											var html = '';
											for(var i = 0; i < json.length; i++){
												html += '<div class="content"><h2><em>' + json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
											}
											$('#index ').html(html);
											for(var i = 0; i < json.length; i++){
												$('#index .content').eq(i).animate({
													attr : 'O',
													target : 100,
													t : 30,
													step : 10
												});
											}
										},
										async : true
									});
								}
						});
						_this.disabled = false;
						$(_this).css('backgroundPosition','left');	//切换图标
						},1500);
					}
				},
				async : true
			});
		}
	});
	
	
	/*
	//获取博文列表
	$('#index').html('<span class="loading"></span>');
	$('#index .loading').show();
	
	ajax({
		method : 'post',	//以post方式提交(不带后缀)
		url : 'get_blog.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
		data : {},
		success : function (text) {		//返回传递到服务器文件里的传递进去的信息
			$('#index .loading').hide();
			var json = JSON.parse(text);
			var html = '';
			for(var i = 0; i < json.length; i++){
				html += '<div class="content"><h2><em>' + json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
			}
			$('#index ').html(html);
			for(var i = 0; i < json.length; i++){
				$('#index .content').eq(i).animate({
					attr : 'O',
					target : 100,
					t : 30,
					step : 10
				});
			}
		},
		async : true
	});
	*/
	
	
	//更换皮肤弹窗
	$('#skin').center(650,360).resize(function(){	//使登录框在浏览器居中	//当浏览器大小发生改变时	
		if($('#skin').css('display') == 'block'){	//如果登录框打开时，执行锁屏
			screen.lock();						//执行锁屏
		};
	});						
	$('#header .member a').eq(1).click(function(){		//当点击登录时，登录框弹出
		$('#skin').center(650,360).show();			//当点击登录时，显示画布
		screen.lock().animate({
			attr : 'O',
			start : 0,
			target : 30,
			t : 30,
			step : 10
		});	
		
		$('#skin .skin_bg').html('<span class="loading"></span>')
		ajax({
			method : 'post',	//以post方式提交(不带后缀)
			url : 'get_skin.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
			data : {
				'type' : 'all'
			},
			success : function (text) {		//返回传递到服务器文件里的传递进去的信息
				var json = JSON.parse(text);
				var html = '';
				for(var i = 0; i < json.length; i++){
					html += '<dl><dt><img src="../img/' + json[i].small_bg + '" big_bg="' + json[i].big_bg + '" bg_color="' + json[i].bg_color + '" alt=""></dt><dd>' + json[i].bg_text + '</dd></dl>';
				}
				$('#skin .skin_bg').html(html).opacity(0).animate({
					attr : 'O',
					target : 100,
					t : 30,
					step : 10
				});
				$('#skin dl dt img').click(function(){
					$('body').css('background',$(this).attr('bg_color') + '' + 'url(../img/' + $(this).attr('big_bg') + ') no-repeat-x');
					ajax({
						method : 'post',	//以post方式提交(不带后缀)
						url : 'get_skin.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
						data : {			//传递数据
							'type' : 'set',
							'big_bg' : $(this).attr('big_bg')
						},
						success : function (text) {		//返回传递到服务器文件里的传递进去的信息
							$('#success').show().center(200,40);
							$('#success p').html('皮肤更换成功！');
							setTimeout(function(){
								$('#success').hide();
							},1500);
						},
						async : true
					});
				});
			},
			async : true
		});
		
	   
	})
	$('#skin .close').click(function(){		//当点击关闭小图标时，登录框界面关闭
		$('#skin').hide();			//当关闭登录框时，画布关闭
		screen.animate({
			attr : 'O',
			target : 0,
			t : 30,
			step : 10,
			fn : function(){
				screen.unlock();
			}
			
		});						//隐藏画布
	});
	
	//发表博文弹窗拖拽
	$('#skin').drag($('#skin h2').last());
	
	//默认显示背景样式
	ajax({
		method : 'post',	//以post方式提交(不带后缀)
		url : 'get_skin.php',	//服务器上的一个文件，可以写绝对地址，直接写服务器上的文件名就行
		data : {			//传递数据
			'type' : 'main'			//默认的显示main
		},
		success : function (text) {		//返回传递到服务器文件里的传递进去的信息
			var json = JSON.parse(text);
			$('body').css('background',json.bg_color + '' + 'url(../img/' + json.big_bg + ') no-repeat-x');
		},
		async : true
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});



