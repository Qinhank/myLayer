/**
 * 简易弹出层
 * BY Hank
 */
;!function($,window,document,undefined){
	function myLayer(element,options){
		var that = this;
		this._opt = {
			name:[],
			link:[],
			icon:[],
			iconName:'iconfont',
		}
		this._opts = $.extend({},this._opt,options);
		this.$ele = element;
		$(element).on('click',function(){
			if($(this).hasClass('showed')){
				that.clickElement();
				return
			}else{
				that.init();
			}
		})
		
	}
	myLayer.prototype = {
		init:function(){
			var that = this;
			this.$ele.addClass('showed');
			this.creatDocument();
		},
		creatDocument:function(){
			var that = this;
			//creat
			this.myLayerDiv = document.createElement('div');
			var $myLayerFull = document.createElement('div');
			var random = 'myLayer-'+Math.ceil(Math.random()*99+1);
			//className
			this.myLayerDiv.className = random;
			$myLayerFull.className = 'myLayer-full row';
			//append
			$('body').append(this.myLayerDiv);
			this.myLayerDiv.append($myLayerFull);
			//judge col
			var length = this._opts.name.length;
			var col = (12/length)<3?3:12/length;
			for(var i=0;i<length;i++){
				var div = document.createElement('div');
				div.className = 'myLayerBox col-md-'+col;
				var link = document.createElement('a');
				link.className +=that._opts.iconName+' '+that._opts.icon[i];
				div.append(link);
				link.append(that._opts.name[i])
				$myLayerFull.append(div);
				link.href = that._opts.link[i];
			}
			this.clickElement();
		},
		clickElement:function(){
			var that = this;
			this.myLayerDiv.style.zIndex = 999;
			this.myLayerDiv.style.position = 'absolute';
			this.myLayerDiv.style.width = '100%';
			this.myLayerDiv.style.top = 0;
			var layerClass = '.'+this.myLayerDiv.className;
			$(layerClass).find('.myLayer-full').animate({
				'height':'100vh',
				'opacity':'1',
			});
			that.hide();
		},
		hide:function(){
			$('.myLayer-full').on('click',function(){
				$(this).css({
					'height':'0',
					'opacity':'0',
				})
			})
		}
	}
	$.fn.myLayer = function(params){
		return this.each(function(){
			var $this = $(this);
			$this.data('myLayer',new myLayer($this,params));
		});
	}
}(window.jQuery||window.Zepto,window,document)