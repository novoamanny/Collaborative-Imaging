;(function($){

   var Carousel=function(element,options){
      this.$element=$(element);
      this.options=options;
      this.carwidth=this.options.carsize.carwidth;
      this.carheight=this.options.carsize.carheight;
      this.type=this.options.type;
      this.initType=this.options.type;
      this.items=this.$element.children('.item');
      this.carNum=this.items.length;
      this.carIndex=1;
      this.carTimer;
   }
   
   Carousel.prototype.init=function(){
      this.$element.css({'width':this.carwidth,'height':this.carheight,'overflow':'hidden','position':'relative'});
      this.items.css({'position':'absolute','zIndex':1,'width':this.carwidth,'height':this.carheight,'cursor':'pointer'});
      this.items.eq(0).addClass('select');
      this.setInit();     //
      this.setCircle();   //
      this.autoCarousel();//
   };
   
   Carousel.prototype.setInit=function(){
     if(this.type.indexOf('opac')!=-1){
       this.items.css({'top':0,'left':0});
       this.items.hide();
       this.items.eq(0).show();
     }else if(this.type.indexOf('slidex')!=-1){
       for(var i=0;i<this.carNum;i++){
         this.items.eq(i).css({'top':0,'left':this.carwidth*i});
       }
     }else if(this.type.indexOf('slidey')!=-1){
       for(var i=0;i<this.carNum;i++){
         this.items.eq(i).css({'top':this.carheight*i,'left':0});
       }
     }
   };

   Carousel.prototype.setArrow=function(){
      if(this.options.arrow.isshow){
        this.$element.append('<div class="carArrow"></div>');
        var $carArrow=this.$element.children('.carArrow');
        $carArrow.css({'width':this.carwidth,'height':this.carheight,'position':'absolute','zIndex':3,'cursor':'pointer'});
        if(this.type.indexOf('slidex')!=-1 || this.type=='opacx'){
           $carArrow.append('<div class="arrow left">《</div>');
           $carArrow.append('<div class="arrow right">》</div>');
           $carArrow.find('.arrow').css({'width':35,'height':60,'line-height':'60px','fontSize':this.options.arrow.arrowsize,'color':'#999','background':'black','opacity':0.3,'position':'relative','top':(this.carheight-60)/2,'zIndex':4});
           this.$element.find('.left').css({'float':'left','text-align':'left'});
           this.$element.find('.right').css({'float':'right','text-align':'right'});
        }else if(this.type.indexOf('slidey')!=-1 || this.type=='opacy'){
           $carArrow.append('<div class="arrow left">︽</div>');
           $carArrow.append('<div class="arrow right">︾</div>');
           $carArrow.find('.arrow').css({'width':60,'height':35,'textAlign':'center','fontSize':this.options.arrow.arrowsize,'color':'#999','background':'black','opacity':0.3,'margin':'0 auto','position':'relative','zIndex':4});
           this.$element.find('.left').css({'line-height':'25px'});
           this.$element.find('.right').css({'line-height':'40px','top':this.carheight-35*2});
        }
      }
   };
   
   Carousel.prototype.setCircle=function(){
      if(this.options.circle.isshow){
        this.$element.append('<div class="carCircle"></div>');
        var $carCircle=this.$element.children('.carCircle');
        for(var i=0;i<this.carNum;i++){
          $carCircle.append('<div class="circle"></div>');
        }
        $carCircle.css({'position':'absolute','zIndex':4});
        $carCircle.find('.circle').css({'width': this.options.circle.cird,'height': this.options.circle.cird,'background':'#999','border-radius':'50%','cursor':'pointer'});
        if(this.type.indexOf('slidex')!=-1 || this.type=='opacx'){//圆点在底边
          $carCircle.find('.circle').css({'margin':'7px 3px','float':'left'});
          $carCircle.css({
            'top':this.carheight-(14+this.options.circle.cird),
            'left':(this.carwidth-this.carNum*(this.options.circle.cird+6))/2
          });
        }else if(this.type.indexOf('slidey')!=-1 || this.type=='opacy'){//圆点在右边
          $carCircle.find('.circle').css({'margin':'3px 7px'});
          $carCircle.css({
            'top':(this.carheight-this.carNum*(this.options.circle.cird+6))/2,
            'left':this.carwidth-(14+this.options.circle.cird)
          });
        }
        this.$element.find('.circle').eq(0).css('background','#333');
      }
   };

   Carousel.prototype.autoCarousel=function(){
      if(this.options.auto.isauto){
        this.carTimer=setInterval(this.setCarousel_auto.bind(this),this.options.auto.interval);
      }
   };
   Carousel.prototype.setCarousel_auto=function(){
      if(this.carIndex>=this.carNum){
         this.carIndex=0;
      }
      this.setCarousel(this.carIndex,this.carIndex==0?this.carNum-1:this.carIndex-1,0);
      this.carIndex++;
   };

   Carousel.prototype.setCarousel=function(current,prev,x){
      this.$element.find('.circle').css('background','#999');
      this.$element.find('.circle').eq(current).css('background','#333');
      this.items.removeClass('select');
      this.items.eq(current).addClass('select');
      if(this.type.indexOf('opac')!=-1){
         this.items.eq(prev).fadeOut(1000).css('zIndex',1);
         this.items.eq(current).fadeIn(1000).css('zIndex',2);
      }
   };

   $.fn.jCarousel=function(option){
      return this.each(function(){
        var options=$.extend({},$.fn.jCarousel.default,option);
        var c=new Carousel(this,options);
        c.init();
        c.options.onchanging();
      });
   };
   //Options
   $.fn.jCarousel.default={
      type: 'slidex-right',
      auto: {isauto:true,interval:5000},
      istouch:true,
      circle: {isshow:true,cird:0},
      arrow: {isshow:true,arrowsize:24},
      carsize: {carwidth:750,carheight:450},
      onchanging: function(){}
   };
})(jQuery);
jQuery(function($) {     
   $('.f').jCarousel({
      type:'opacy',
      carsize: {carwidth:480,carheight:650},
   });
}); 