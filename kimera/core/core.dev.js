


/*
//
//	kimera framwork | V 2.0 | OFFICIAL RELEASE
//	www.https://github.com/shapegroup/KiMERA-FRAMEWORK/wiki
//	https://www.facebook.com/kimeraframework/
//
//	Credits:
//	Shape group - All right reserved - shapegroup.pro
//	Alberto Marà & Shape group - All right reserved - amara.pro
//
*/



/* Libs: WaitForImages jQuery Plugin 2017-02-20 | https://github.com/alexanderdickson/waitForImages */ !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){var b="waitForImages",c=function(a){return a.srcset&&a.sizes}(new Image);a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]},a.expr[":"]["has-src"]=function(b){return a(b).is('img[src][src!=""]')},a.expr[":"].uncached=function(b){return!!a(b).is(":has-src")&&!b.complete},a.fn.waitForImages=function(){var d,e,f,g=0,h=0,i=a.Deferred(),j=this,k=[],l=a.waitForImages.hasImageProperties||[],m=a.waitForImages.hasImageAttributes||[],n=/url\(\s*(['"]?)(.*?)\1\s*\)/g;if(a.isPlainObject(arguments[0])?(f=arguments[0].waitForAll,e=arguments[0].each,d=arguments[0].finished):1===arguments.length&&"boolean"===a.type(arguments[0])?f=arguments[0]:(d=arguments[0],e=arguments[1],f=arguments[2]),d=d||a.noop,e=e||a.noop,f=!!f,!a.isFunction(d)||!a.isFunction(e))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var b=a(this);f?b.find("*").addBack().each(function(){var b=a(this);b.is("img:has-src")&&!b.is("[srcset]")&&k.push({src:b.attr("src"),element:b[0]}),a.each(l,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=n.exec(e);)k.push({src:d[2],element:b[0]})}),a.each(m,function(a,c){var d=b.attr(c);return!d||void k.push({src:b.attr("src"),srcset:b.attr("srcset"),element:b[0]})})}):b.find("img:has-src").each(function(){k.push({src:this.src,element:this})})}),g=k.length,h=0,0===g&&(d.call(j),i.resolveWith(j)),a.each(k,function(f,k){var l=new Image,m="load."+b+" error."+b;a(l).one(m,function b(c){var f=[h,g,"load"==c.type];if(h++,e.apply(k.element,f),i.notifyWith(k.element,f),a(this).off(m,b),h==g)return d.call(j[0]),i.resolveWith(j[0]),!1}),c&&k.srcset&&(l.srcset=k.srcset,l.sizes=k.sizes),l.src=k.src}),i.promise()}});
/* Libs: ResizeDone Event v1.0.1 | Copyright (c) 2013 Giuseppe Gurgone | License http://git.io/iRQs3g */ !function($,e){var t={};t.eventName="resizeDone",t.delay=250,t.poll=function(){var n=$(this),a=n.data(t.eventName);a.timeoutId&&e.clearTimeout(a.timeoutId),a.timeoutId=e.setTimeout(function(){n.trigger(t.eventName)},t.delay)},$.event.special[t.eventName]={setup:function(){var e=$(this);e.data(t.eventName,{}),e.on("resize",t.poll)},teardown:function(){var n=$(this),a=n.data(t.eventName);a.timeoutId&&e.clearTimeout(a.timeoutId),n.removeData(t.eventName),n.off("resize",t.poll)}},$.fn[t.eventName]=function(e,n){return arguments.length>0?this.on(t.eventName,null,e,n):this.trigger(t.eventName)}}(jQuery,this);
/* Libs: Scrollstop - Kimera */ $.fn.scrollstop = function(callback) {var that = this, $this = $(that); $this.scroll(function(ev) { clearTimeout($this.data('scrollTimeout')); $this.data('scrollTimeout', setTimeout(callback.bind(that), 600, ev)); }); };
/* Libs: Mousestop - v3.0.1 - 2013-07-15 | https://github.com/websanova/mousestop */ !function(a){function b(){var b=this,c=a(this).data("mousestop");this.movement=!0,c.timeToStop&&(this.timeToStopTimer=window.setTimeout(function(){b.movement=!1,window.clearTimeout(b.timer)},c.timeToStop))}function c(){window.clearTimeout(this.timer),window.clearTimeout(this.timeToStopTimer)}function d(){var b=a(this),c=b.data("mousestop");this.movement&&(window.clearTimeout(this.timer),this.timer=window.setTimeout(function(){b.trigger("mousestop")},c.delay))}function e(b){return a.isNumeric(b)?b={delay:b}:"object"!=typeof b&&(b={}),a.extend({},a.fn.mousestop.defaults,b)}a.event.special.mousestop={setup:function(f){a(this).data("mousestop",e(f)).bind("mouseenter.mousestop",b).bind("mouseleave.mousestop",c).bind("mousemove.mousestop",d)},teardown:function(){a(this).removeData("mousestop").unbind(".mousestop")}},a.fn.mousestop=function(a,b){return"function"==typeof a&&(b=a),arguments.length>0?this.bind("mousestop",a,b):this.trigger("mousestop")},a.fn.mousestop.defaults={delay:300,timeToStop:null}}(jQuery);



/* Libs: Kimera framework */
var kimera = (function kimera() {



	$(document).ready( function()
	{ 

		if(parseInt($(window).width()) <= 900)
		{
			$(".main-canvas").wrap("<mobile-viewport/>"),
			$("html, body").css("height", window.height() );
		};

	});



	/*
	//	loader
	*/
	


	$(document).ready( function() { $("body").fadeTo(0,0); loader(); });
	window.onunload = function() { null; loader(); };

	function loader(){

		var 	el = $("this"),
				allScripts = document.getElementsByTagName("script"),
				url_ = "",
				spinner = "",
				sContainer = ".box-spinner",
				sContent = ".box-spinner-content";


		// find the path
		for( var i=0;i<=allScripts.length-1;i++)
		{

			var items=allScripts.item(i);

			if( items.src.indexOf("core.min.js")>0 || items.src.indexOf("core.dev.js")>0 )
			{

				var urlScript=items.src,
				url_=( urlScript=urlScript.split("kimera/") )[0] + "kimera/";
				spinner=url_+"theme/spinner/spinner.html",
				i=allScripts.length

			}

		};


		// create the structure
		$("<div class='box-spinner'><span class='box-spinner-content'></span></div>").appendTo("body");


		// load spinner
		$(sContent).load(spinner).css({opacity:"0"});

		// fade In elements
		$(sContainer).css("zIndex","5000").fadeTo(0,1);
		$(sContent).fadeTo(600,1);


		// hide the spinner and show the page
		$("body").waitForImages().done(function()
		{

			if($(window).on("load"))
			{

				$("body").fadeTo(300,1,function()
				{

					$(sContent).fadeTo(500,0,function()
					{

						// active the load fx
						fx_onload();

						$(sContainer).fadeTo(700,0,function(){

							// hide the spinner
							$(sContainer).css({zIndex:"-1"});

						});

					});
				});

			}

			else
			{
				alert("[ !! ] Kimera debug:\n\nError on loader system!");
			};


		});

		// on click show
		$('a[target="_inside"],a[target="_Inside"],a[target="_top"],a[target="_Top"]').on("click",function(event){
			

			var 	gotopage = $(this).attr('href'),
					geturl  = String(gotopage),
					theurl = String( geturl.substring(geturl.lastIndexOf('/')) );

			//prevent click
			event.preventDefault(),event.stopPropagation(),event.stopImmediatePropagation();

			// does the link have any errors?
			if("undefined"==theurl||null==theurl)
			{
				alert("[ !! ] Kimera debug:\n\nUrl link broken or target lost!")
			}

			else if("#"==theurl)
			{
				$(".box-spinner").css({zIndex:"5000"}).fadeTo(300,1,function() {
					$("body").fadeTo(0,400);
					setTimeout( function(){ location.reload() }, 500);
				});
			}

			else
			{
				$(".box-spinner").css({zIndex:"5000"}).fadeTo(300,1,function() {
					$("body").fadeTo(0,400);
					setTimeout( function(){ location.href=gotopage }, 500);
				});
			}

		});

	};



	/*
	// off cavans & overlay
	*/
	



	$(document).ready( function() { over_and_off_canvas(); } );

	function over_and_off_canvas(){


		var page=".main-canvas",
			trigger = "a[data-target]";

		// on click activator
		$(trigger).on("click",function(click){


			// get target
			var id = $(this).data("target"),
				target = $("body").find("#"+id);


			// strip keys
			var Keys = keystripe(target,"off-canvas"),
				type = Keys[2];


			//what's the target type?
			if 		(!(type=="overlay")) { offcanvas(target,page); }
			else 	{ overlay(target,page); };

			//prevent click
			click.preventDefault(),click.stopPropagation(),click.stopImmediatePropagation();

		});

		// OFF-CANVAS CONTROLLER
		function offcanvas(target,page)
		{


			// recover the fx and side
			var overlapping = (".overlapping" ),
				wTop =  $(window).scrollTop(),
				side = target.attr("class").split(' ')[0].split("side")[1], 
				fxType = target.attr("class").split(' ')[1];


			// hide extra elements
			$(".peak").hide(150);


			// lock and push the site
			$(page).addClass("locked").stop(true,true).scrollTop(wTop);


			// create overlapping structure
			 $("<div class='overlapping'/>").insertAfter(page);

			// show overlapping
			$(overlapping).fadeOut(0).css("zIndex","3000").fadeIn(800);

			// open the off-canvas
			target.css("display","block").toggleClass(fxType+" "+fxType+"-opened");

			// animate maincavans
			"left"==side ? $(page).addClass("canvasfxleft") :
			"top"==side ? $(page).addClass("canvasfxtop") : 
			"right"==side ? $(page).addClass("canvasfxright") :
			"bottom"==side && $(page).addClass("canvasfxbottom");


			//close to click, lose to ESC
			$(overlapping).on("click",function(){offCanvasExit()}),
			$(document).keyup(function(e){27==e.keyCode&&offCanvasExit()});


			// close the off-canvas
			function offCanvasExit()
			{

				//close panel
				target.toggleClass(fxType+"-opened "+fxType+"-closed");
				$(page).removeClass("canvasfxleft canvasfxtop canvasfxright canvasfxbottom");

				//wait remove attr & scrolltop
				setTimeout(function(){ 

					$(overlapping).fadeTo(150, 0);
					$(page).toggleClass("locked unlocked");


					target.toggleClass(fxType+"-closed "+fxType).css("display","none");

					$(page).removeClass("locked unlocked");

					setTimeout(function(){ 
						$(overlapping).remove();
					}, 150 );

					$(window).scrollTop(wTop);

				}, 300 );

			};

		};


		// OVERLAY CONTROLLER
		function overlay(target,page)
		{


			var 	overlapping = (".overlapping" ),
					wTop = $(window).scrollTop(),
					fxType = target.attr("class").split(' ')[1];


			// hide extra elements
			$(".peak").hide(150);


			// lock and push the site
			$(page).addClass("locked").stop(true,true).scrollTop(wTop);


			// create overlapping structure
			 $("<div class='overlapping'/>").insertAfter(page);


			// show overlapping
			$(overlapping).fadeOut(0).css("zIndex","3000").fadeIn(800);


			// animate maincanvas
			$(page).addClass("canvasfxdown");
				

			// animate overlap
			target.css("display","block").toggleClass(fxType+" "+fxType+"-opened");


			//close to click, lose to ESC
			$(overlapping).on('click',function(){ overlayExit(target); });
			$(document).keyup(function(e){27==e.keyCode&&overlayExit(target)});


			//close function
			function overlayExit(target)
			{


				$(page).removeClass("canvasfxdown");
				target.toggleClass(fxType+"-opened "+fxType+"-closed");


				setTimeout(function(){ 

					$(overlapping).fadeTo(150, 0);
					$(page).toggleClass("locked unlocked");


					target.toggleClass(fxType+"-closed "+fxType).css("display","none");
					
					$(page).removeClass("locked unlocked");

					setTimeout(function(){ 
						$(overlapping).remove();
					}, 150 );

					$(window).scrollTop(wTop);


				},300);//time of: trnsition


			};

		};

	};



	/*
	// peack
	*/
	



	$(document).ready( function(){ pagepeak(); });

	function pagepeak() {


		var 	el = $('.peak'),
				nowshow = (($(window).outerHeight()*2)/3),
				smooth;

		el.hide().css({"display":"none !important"});

		// hide & show the peak
		$(window).scroll(function(){

			$(window).scrollTop() > nowshow ? el.fadeIn("slow") : el.fadeOut();

		});


		// on click go on top
		el.on("click", function(event) {

			// return to top of page
			$("window, html, body").stop().animate({scrollTop:0}, 2000);

			// prevent click
			click.preventDefault(),click.stopPropagation(),click.stopImmediatePropagation();

		});

	};




	/*
	// nav
	*/
	



	$(document).ready(function() { nav_wide() });
	$(window).resizeDone(function() { nav_wide(); });

	function nav_wide() {


		var 	nav = $('nav.wide'),
				relw = parseInt( $(window).outerWidth() ),
				barw = parseInt( $("body").find(".main-canvas:first").outerWidth() )  - parseInt( relw ),
				isntMobile = relw > 920 ;

		nav.each(function(){

			var el = $(this),
				mtop = el.find("li").css("padding-bottom"),
				isInlimiter;


			// is it mobile?
			if (isntMobile)
			{

				// then the him dyn content are...
				el.find(".box-fx").each(function(){


					var boxfx = $(this),
						LEFT = 0,
						TOP = 0;


					//if is block
					boxfx.is("span") ?
					(

						LEFT=parseInt((boxfx.outerWidth()/2)),
						TOP=parseInt(boxfx.parent("li").css("padding-bottom")),
						boxfx.attr("style","margin-left: -"+LEFT+"px !important; margin-top: "+TOP+"px !important; display: none;")

					):

					//if is full
					boxfx.is("div") &&
					(
						TOP=parseInt(boxfx.parent("li").css("padding-bottom")),
						boxfx.attr("style","width: 100% !important; left:0; margin-top: "+TOP+"px !important; display: none;")

					);


				});

			}

		});


	};



	$(document).ready(function() { nav_side();  });
	$(window).resizeDone(function() { nav_side(); });


	function nav_side() {

		setTimeout(function(){
			$('nav.side-left span.box-fx, nav.side-right span.box-fx').each( function()
			{


				var bxfx = $(this),

					T1 = parseInt(  $(this).parent("li").outerHeight() )/2,
					T2 = parseInt( bxfx.outerHeight() )/2,
					TX = T1+T2;

				bxfx.css({ "margin-top" : "-"+TX+"px" });


			});
		},200); //anti bug -> what fuck does it do in this 200ms ????
		

	};



	/*
	// ui > button
	*/
	



	$(document).ready( function(){ button(); });

	function button() {


			var el = $(this),
				isInText = (el.closest(".text").hasClass("text")),
				isInLayout = (el.parent().hasClass("box"));
				//isInLineTag = (el.parent().prop("tagName") == "div"); //box-wide


			$('[class*="button-"]').each(function(){

				var el = $(this),
					valy = el.children('input[type="text"]').val(),
					valueSelected = " ",
					boxFx = '<span class="box-fx"></span>',
					btnType =" ",
					isSelect = el.hasClass("button-select"),
					isOption = el.hasClass("button-option"),
					isNumber = el.hasClass("button-number"),
					isRange = el.hasClass("button-range"),
					isDate = el.hasClass("button-date"),
					isFile = el.hasClass("button-file"),
					isWrapped = el.children("input").next().hasClass() != "box-fx" ;



				//switch the button type
				if (isNumber)
				{

					var el = $(this),
						valy = parseInt( el.children("p").text() ),
						_min = el.find("input[type='number']").attr("min"),
						_max = el.find("input[type='number']").attr("max"),
						minus = el.children("a:first-child"),
						maxis = el.children("a:last-child");

					minus.click(function() {

						if( valy > _min )
						{ 
							valy--;
						}
						else{
							valy = _min
						}

						el.find('input[type="number"]').attr('value', ""+valy).text(valy);
						el.find('input[type="text"]').attr('value', ""+valy).text(valy);
						el.children("p").text(valy);

					});


					maxis.click(function() {

						if( valy < _max )
						{ 
							valy++;
						}
						else{
							valy = _max
						}

						el.find('input[type="number"]').attr('value', ""+valy).text(valy);
						el.find('input[type="text"]').attr('value', ""+valy).text(valy);
						el.children("p").text(valy);

					});


				}

				else if (isSelect || isOption)
				{



					// hide inner imput
					el.children("input").addClass("hide");


					// check and wrap for Fx
					if( !el.children("input").next().hasClass("box-fx") )
					{
						el.children("input").next().wrapAll(boxFx);
					}


					// on clicke set the vals
					el.find("li").click( function()
					{

						valueSelected = $(this).html();

						el.find('input').attr("value",valueSelected),
						el.find("p").text(""+valueSelected);

					});

					if(isSelect)
					{



						// reset position
						btnType = "select";
						el.click(function()
						{
							//fix the widh
							var bw = el.outerWidth(),
								tw = el.find(".box-fx").outerWidth(),
								xw =0;

							if(bw<tw) { xw = tw; } else { xw = bw; };

							el.attr("style","width:"+xw+"px !important;");
							el.find(".box-fx").attr("style","width:"+xw+"px !important;");
	
							offsetcontroller(el,btnType);
	
						});
					}
					else
					{

						// reset position
						btnType = "option";
						el.click(function(){

							//cemter it
							var btw = el.outerWidth(),
								chw = el.find(".box-fx>div").outerWidth(),
								difw =0;

							if(btw>chw) { difw = ((btw-chw)/2)*-1; } else { difw = ((chw-btw)/2)*-1; };

							el.find(".box-fx>div").css({"margin-left": difw+"px"});

							offsetcontroller(el,btnType);

						});

					}



				}

				else if (isDate)
				{


					var el = $(this),
						btnDate = ".button-date",
						inputText = el.find('input[type="text"]');


					// lock input
					inputText.attr("data-display","hidden").attr("readonly",true);


					// add html structure - wrap for Fx
					el.append('<div class="box-fx"><div class="calendar"><div class="calendarHead"><div><a class="cPrevMonth">&#10096;&#10096;</a><p class="cMonth">JANUARY</p><a class="cNextMonth">&#10097;&#10097;</a></div><div><a class="cPrevYear">&#10096;&#10096;</a><p class="cYear">2017</p><a class="cNextYear">&#10097;&#10097;</a></div></div><div class="calendarselector"><div class="calendarweek"><div class="grid-linear"><div class="box 14-14-14"><p>Lun</p></div><div class="box 14-14-14"><p>Mar</p></div><div class="box 14-14-14"><p>Mer</p></div><div class="box 14-14-14"><p>Gio</p></div><div class="box 14-14-14"><p>Ven</p></div><div class="box 14-14-14"><p>Sab</p></div><div class="box 14-14-14"><p>Dom</p></div></div></div><div class="calendarDay"><div class="grid-linear"><div class="box 14-14-14"><p>01</p></div><div class="box 14-14-14"><p>02</p></div><div class="box 14-14-14"><p>03</p></div><div class="box 14-14-14"><p>04</p></div><div class="box 14-14-14"><p>05</p></div><div class="box 14-14-14"><p>06</p></div><div class="box 14-14-14"><p>07</p></div><div class="box 14-14-14"><p>08</p></div><div class="box 14-14-14"><p>09</p></div><div class="box 14-14-14"><p>10</p></div><div class="box 14-14-14"><p>11</p></div><div class="box 14-14-14"><p>12</p></div><div class="box 14-14-14"><p>13</p></div><div class="box 14-14-14"><p>14</p></div><div class="box 14-14-14"><p>15</p></div><div class="box 14-14-14"><p>16</p></div><div class="box 14-14-14"><p>17</p></div><div class="box 14-14-14"><p>18</p></div><div class="box 14-14-14"><p>19</p></div><div class="box 14-14-14"><p>20</p></div><div class="box 14-14-14"><p>21</p></div><div class="box 14-14-14"><p>22</p></div><div class="box 14-14-14"><p>23</p></div><div class="box 14-14-14"><p>24</p></div><div class="box 14-14-14"><p>25</p></div><div class="box 14-14-14"><p>26</p></div><div class="box 14-14-14"><p>27</p></div><div class="box 14-14-14"><p>28</p></div><div class="box 14-14-14"><p>29</p></div><div class="box 14-14-14"><p>30</p></div><div class="box 14-14-14"><p>31</p></div></div></div></div></div></div>');

					btnType = "date";
					el.click(function(){
						offsetcontroller(el,btnType);
					});


					//  GET MOUTH

					var MounthArray = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
						Mi = 0,
						MN = "JANUARY";

					//get current mouth: var month = new Date(); $(this).find(".cMonth").html(MounthArray[month.getMonth()]);

					el.find(".cMonth").html("JANUARY"),

					el.find(".cNextMonth").click(function()
					{

						MN = String( MounthArray[(Mi++)] );

						Mi>=12 ? ( Mi=0,MN="JANUARY", el.closest(btnDate).find(".cMonth").html(MN) ) : el.closest(btnDate).find(".cMonth").html(MN);

						checkM(MN);

					});

					el.find(".cPrevMonth").click(function()
					{
						MN = String( MounthArray[(Mi--)] );

						Mi<=-1 ? ( Mi=11,MN="December",el.closest(btnDate).find(".cMonth").html(MN) ) : el.closest(btnDate).find(".cMonth").html(MN);

						checkM(MN);

					});

					function checkM(MN,calendar){

						"april"==MN||"JUNE"==MN||"SEPTEMBER"==MN||"NOVEMBER"==MN ? $(".calendarDay").children().children(":last").addClass("disabled") : 
						"FEBRUARY"==MN ? $(".calendarDay").children().children().slice(-3).addClass("disabled") : 
						$(".calendarDay").children().children().removeClass("disabled");

					};

					// GET YEARS

					var	_updatetheYear = parseInt( el.find('.cYear').html() );

					el.find('.cPrevYear').click(function()
					{
						_updatetheYear--;
						el.find('.cYear').html(_updatetheYear);

					});

					el.find('.cNextYear').click(function()
					{
						_updatetheYear++;
						el.find('.cYear').html(_updatetheYear);

					});


					// GET DAYS

					el.find(".calendarDay").children().children().click(function()
					{
						el.find('.deyselected').removeClass("deyselected");
						$(this).addClass("deyselected");
					});


					// COMPUND DATE

					el.find(".calendar").click( function()
					{

						var DAY = el.find('.deyselected').text(),
							MNT = el.find('.cMonth').text(),
							ANN = el.find('.cYear').text(),
							theFinalDate = String( (DAY+"/"+MNT+"/"+ANN) );

						inputText.attr("value",theFinalDate);
						el.children("p").text(theFinalDate);

					});


				}

				else if (isRange)
				{


					var el = $(this),
						_startval = el.find(".range_slider").attr("value"),
						_min = el.find(".range_slider").attr("min"),
						_max = el.find(".range_slider").attr("max"),
						_for = el.find(".range_slider").attr("name"),
						_target = el.find(".range_value").attr("name"),
						forJs = 'oninput="'+_target+'.value='+_for+'.value"',
						targetJs = 'oninput="'+_for+'.value='+_target+'.value"';


					//remove ori
					el.find(".range_slider, .range_value").remove(),

					//append new
					el.append('<input class="range_slider" for="'+_target+'" name="'+_for+'" type="range" min="'+_min+'" max="'+_max+'" value="'+_startval+'" '+forJs+' />\n<input class="range_value"  for="'+_for+'" name="'+_target+'" type="text" value="'+_startval+'" '+targetJs+' readonly />'),

					//update a value
					el.on("mousemove", function() { updatenumber(el); });
					el.on("click", function() { updatenumber(el); });
					function updatenumber(el){

						var _update = el.find(".range_slider").val();
						el.find(".range_slider").attr("value",_update).text(_update),
						el.find(".range_value").attr("value",_update).text(_update);

					};


				}

				else if(isFile)
				{


					var el = $(this),
						input = el.find('input[type="file"]'),
						output = el.find('input[type="file"]').next("p");


					// center the input
					input.attr( "style", 'width:'+parseInt( el.outerWidth() ) +'px; height: '+parseInt( el.outerHeight() ) +'px; left:0; top:0;' );


					// select the file
					el.children('input[type="file"]').change(function()
					{

						var selectedEl = String( $(this).val().split("\\").pop() );
						output.text("[✓] "+selectedEl);
						input.attr( "style", 'width:'+parseInt( el.outerWidth()) +'px; height: '+parseInt( el.outerHeight()) +'px; left:0; top:0;' );

					});

				};

			});

	};



	/*
	// ui > offset
	*/
	



	function offsetcontroller(el,btnType){

		var target = el.find(".box-fx"),

			v_offset = parseInt( el.offset().top ),
			v_limit = parseInt( ($(window).scrollTop()+$(window).height()) - ($(window).height()/4) ),

			l_offset = parseInt( el.offset().left ),
			r_offset = parseInt( l_offset + el.outerWidth() ),
			l_limit = target.outerWidth()/2;
			r_limit = parseInt( $(window).width() - target.outerWidth()/2 );



			if(btnType == "select" || btnType == "option")
			{


				/*out bottom*/ 	if(v_offset <= v_limit) { target.css({ "left":"0", "margin-top":"0", "top":(  el.outerHeight() )+"px"}) }
				/*near bottom*/ else 					{ target.css({ "left":"0", "margin-top":(  target.outerHeight()*-1 )+"px", "top":"0"}) }


			}

			else
			{

				/*near left*/	if( l_offset <= l_limit && r_offset < r_limit ) 		{ target.attr("style", "left:"+( parseInt(target.outerWidth()-el.outerWidth() )/2 ) +"px !important; top:0; margin-top:-"+( parseInt(target.height()/2) )+"px !important;");}
				/*near right*/	else if( r_offset >= r_limit && l_offset > l_limit )	{ target.attr("style", "width:"+target.outerWidth()+"px; left:-"+parseInt(target.outerWidth()) +"px !important; top:0; margin-top:-"+( parseInt(target.height()/2) )+"px !important;");}
				/*center*/		else if( r_offset >= r_limit && l_offset <= l_limit  )	{ target.attr("style", "width:"+target.outerWidth()+"px; left:-"+( parseInt(target.outerWidth()-el.outerWidth() )/2 ) +"px !important;; top:0; margin-top:-"+( parseInt(target.height()/2) )+"px !important;");}
				else
				{

				/*out bottom*/ 	if(v_offset <= v_limit ) 	{ target.attr("style", "left:0; margin-left:-"+( parseInt( target.outerWidth()-el.outerWidth() )/2 )+"px !important; top:0; margin-top:"+( parseInt(el.outerHeight()) )+"px !important;"); }
				/*near bottom*/ else if(v_offset > v_limit ){ target.attr("style", "left:0; margin-left:-"+( parseInt( target.outerWidth()-el.outerWidth() )/2 )+"px !important; top:0; margin-top:-"+( parseInt(target.outerHeight()) )+"px !important;"); }

				};

			};


	};




	/*
	// img autocrop
	*/




	$(window).on( "load", function() { cropimage(); });
	$(window).resizeDone( function() { var r = $(window).width(); if( parseInt(r) > 950){  cropimage(); }; });

	function cropimage() {

			setTimeout(function(){

				$('img.autocrop').each(function(){

					var 	el = $(this);

					// wrap it (or lost the real px)
					if( !( el.parent().hasClass("image-cropping") ) )
					{
						el.wrap('<div class="image-cropping"/>');
					}


					//subbox for dimension
					if( !el.prev().hasClass("crop-probe")  )
					{
						el.parent().prepend('<div class="crop-probe"/>');
					}


					//adapting...
					el.attr("style","width:100%; height:auto;");

					setTimeout(function(){

						var		pH = parseFloat( el.prev(".crop-probe").outerHeight() ),
								pW = parseFloat( el.prev(".crop-probe").outerWidth() ),
								iH = parseFloat( el.outerHeight()  ),
								iW = parseFloat( el.outerWidth() ),
								nm = 0;


						// if the image is square or have minus height
						if(iH<pH)
						{

							//adapting...
							el.attr("style","width: auto; height:100%; position:absolute;");

							//reCheck
							iW = parseInt( el.outerWidth() );

							//set it
							nm = parseInt( ((iW-pW)/2)*-1 ),
							el.css({"left": nm+"px"});

						}

						// if the image is long width
						else if(iH>=pH) 
						{

							//adapting...
							el.attr("style","width:100%; height:auto;");

							//reCheck
							iW = parseInt( el.outerWidth() );

							iH = el.height(),
							nm = parseInt( ((iH-pH)/2)*-1 ),
							el.css({"top": nm});

						}
						else if(iH==pH && iW==pW )
						{
							null;
						}

					},50);

				});

				$('img.autocrop').each(function(){

					if( ($(this).is(':visible') &&( $(this).parent().css("height") == "0px" || $(this).parent().height() == 0 )) && !$(this).parent().css("height") == "100%" )
					{
						$(this).addClass("debug_error MISSING HEIGHT");
						$(this).parent().addClass("debug_error");
						alert('OPS!\n\nError Detected!\non: auto-crop -> missing parent height!\n\n\nExemple:\n<div style="height:100px"><img data-sets="auto-crop" /></div>\n\nExemple:\n<div class="csswhitmyheight"><img data-sets="auto-crop" /></div>');
					};

				});

			},(1000/3)); //checl om framexsec

	};





	/*
	// cards
	*/
	


	$(document).ready( function() { boxcard(); });

	function boxcard() {

		$('.card').each(function(){

			var 	el = $(this),
					loader = $(".box-spinner");

			var		link = el.find("a:last").attr("href"),
					isntBlank = el.find("a:last").attr("target") == ("_top" ||"_Top" ||"_inside" || "_Inside" );


			//on click of box
			el.on("click", function(click) {

				//prevent click
				click.preventDefault(),click.stopPropagation(),click.stopImmediatePropagation();

				if(isntBlank)
				{

					loader.css({zIndex:"5000"}).fadeTo(250,1,function() {
						$("body").fadeTo(0,400);
						setTimeout( function(){ location.href=gotopage }, 1500);
					});

				}
				if(link=="#")
				{
					loader.css({zIndex:"5000"}).fadeTo(250,1,function() {
						$("body").fadeTo(0,400);
						setTimeout( function(){ location.reload() }, 1500);
					});
				}
				else
				{
					location.href = link;
				}



			}); 

		}); 

	};



	/*
	// tabs
	*/
	



	$(window).on("load", function() { accordion(); });

	function accordion(){

		$('.tabs-linear').each(function(){

			var 	el = $(this),
					navlink = el.find("nav").find("a"),
					tabs = el.find("nav").nextAll(),
					firstlink =  el.find("nav").find("a:first-of-type"),
					firsttab = el.find("div:first");


			// hide all tabs
			navlink.addClass("__"),
			tabs.addClass("hide"),


			//show the first for start
			firstlink.toggleClass("__ _ACTIVE_"),
			firsttab.toggleClass("hide","show");


			//on click of nav voice
			navlink.on("click", function() {

				// "this"... is now the link
				var link = $(this),
					nav = link.parent(),
					accordion = link.parent().parent();


				// delete the actual active and reposition it
				nav.children('a._ACTIVE_').toggleClass("_ACTIVE_ __"),
				link.toggleClass("__ _ACTIVE_");


				// hide all tabs
				tabs.removeClass("show").addClass("hide");


				// retrieves the index of the clicked item
				var i = nav.children("a").index(link);


				// hide ex tabs and show the correct tab
				nav.nextAll().eq(i).removeClass("hide").addClass("show");


			});

		});
		$('.tabs-vertical').each(function(){

			var el = $(this),
				tabTitle = el.children(":even");
				tabBox = el.children(":odd");

				//hide & tag all
				tabTitle.addClass("title __");
				tabBox.addClass("tab hide");


				//show the first
				tabTitle.first().toggleClass("__ _ACTIVE_");
				tabBox.first().toggleClass("hide show");


				el.children(".title").bind("click", function()
				{
					tabTitle.removeClass("_ACTIVE_").addClass("__");
					tabBox.removeClass("show").addClass("hide");

					$(this).toggleClass("__ _ACTIVE_").next(".tab").toggleClass("hide show");
				});

		});
	};



	/*
	// video > sets
	*/



	$(window).on("load", function() { video(); });
	$(window).resizeDone(function() { video(); });

	function video(){

		// is it backscreen?
		$('video.backscreen').each(function(){


			var el = $(this),
				attrAsset = el.attr('autoplay'),
				wHeight = $(window).outerHeight(),
				wWidth  = $(window).outerWidth(),
				vHeight = el.outerHeight(),
				vWidth  = el.outerWidth();


			// reposition for backscreen
			if(!el.parent().is("body"))
			{
				$("body").append(el);
			}


			// center video
			el.css({"top" : parseInt((wHeight-vHeight)/2)+"px", "left" : "0px", "maging-left" : parseInt((wWidth-vWidth)/2)+"px"});


			// add autoplay and loop
			if (!el.attr('autoplay') || !el.attr('loop')) {
				alert('OPS!\n\nSorry, you wrong!\non: video fullscreen -> missing attributes: "autoplay","loop"... "muted" is optional');
			}


			// safe background
			if(el.children().is("img"))
			{


				el.children("img").show();

				// recovers the src
				var bkg ='background-image: url('+el.children("img").attr('src')+'); height:"100%" width:"100%";';

				// hide image
				el.children("img").hide();

				// create a safe background image
				el.html("<span class='safeFullBackBox' style="+bkg+"><!--safe background for old browser version--></span>");


			};

		});

		// is it background?
		$('video.background').each(function(){


			var el = $(this),
				wHeight =	el.parent().outerHeight(),
				vHeight = 	el.height();


			// wrap inside the container
			el.parent().css({overflow:"hidden"});


			// center video
			el.css({"top" : parseInt((wHeight-vHeight)/2)+"px"});


			// add autoplay and loop
			if (!el.attr('autoplay') || !el.attr('loop')) {
				alert('OPS!\n\nSorry, you wrong!\non: video fullscreen -> missing attributes: "autoplay","loop"... "muted" is optional');
			}


			// safe background
			if(el.children().is("img"))
			{


				el.children("img").show();

				// recovers the src
				var bkg ='background-image: url('+el.children("img").attr('src')+'); height:"100%" width:100%;';

				// hide image
				el.children("img").hide();

				// create a safe background image
				el.html("<span class='safeFullBackBox' style="+bkg+"><!--safe background for old browser version--></span>");


			};



			//centering video
			el.attr("style","width:100%; height:auto;");

			var vid_H = parseInt( el.height() ),
				vid_W = parseInt( el.width() ),
				par_H = parseInt( el.parent().width() ),
				par_W = parseInt( el.parent().width() ),
				nm = 0;

			if(vid_H<par_H)
			{

				//adapting...
				el.attr("style","max-width:auto; width:auto; min-width:100%; height:auto;");

				//set it...
				vid_W = el.width(),
				nm = parseInt( ((vid_W-par_W)/2)*-1 ),
				el.css({left: nm});

			}

			else if(vid_W<=par_W)
			{
				//adapting...
				el.attr("style","max-height:auto; height:auto; min-height:100%; width:100%;");

				//set it...
				vid_H = el.height(),
				nm = parseInt( ((vid_H-par_H)/2)*-1 ),
				el.css({top: nm});
			}

			else
			{
				alert("[ !! ] Kimera debug:\n\nError on video background system!\nCentering failed or error");
			}



		});

		// is it player?
		$('video.player').each(function(){


			var el = $(this),
				src = el.attr("src"),
				classes = el.attr("class"),
				isYoutu_be 	 = src && src.match(/(?:youtu)(?:\.be)\/([\w\W]+)/i),
				isyoutube 	 = src && src.match(/(?:youtube)(?:\.com)\/([\w\W]+)/i),
				isVimeo 	 = src && src.match(/(?:vimeo)(?:\.com)\/([\w\W]+)/i);


			// youtu.be
			if (isYoutu_be && (!el.is("iframe")))
			{

				el.children("img").addClass("autocrop");

				var utvID = isYoutu_be[1];

				$('<iframe class="'+classes+'" src="https://www.youtube.com/embed/'+utvID+'?autoplay=0&showinfo=0&controls=1" frameborder="0" allowfullscreen"></iframe>').insertBefore(el), el.remove();

			}

			// youtube.com
			else if (isyoutube && (!el.is("iframe")))
			{

				el.children("img").addClass("autocrop");

				var ytvID = isyoutube[1].split("=")[1];

				$('<iframe class="'+classes+'" src="https://www.youtube.com/embed/'+ytvID+'?autoplay=0&showinfo=0&controls=1" frameborder="0" allowfullscreen"></iframe>').insertBefore(el), el.remove();

			}

			// videmo
			else if (isVimeo && (!el.is("iframe"))) {

				el.children("img").addClass("autocrop");

				var vvID = isVimeo[1];

				$('<iframe class="'+classes+'" src="https://player.vimeo.com/video/'+vvID+'?color=9c00f0&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').insertBefore(el), el.remove();

			}

			// html player
			else
			{

				el.children("img").addClass("autocrop");

				el.prop('controls','true').prop('preload','true');

			}


		});

	};


	/*
	// video > radio
	*/



	$(window).on("load", function() { ratio(); });
	$(window).resizeDone(function() { ratio(); });
	
	function ratio(){

		$('[class*="ratio"]').each(function(){


			// strip keys
			var el = $(this),
				Keys = keystripe(el,"ratio"),
				ratio = Keys[1];
			var elW, elH, pW;

			switch (ratio)
			{ 

				case "5:4":
					
					el.css({width: "5px", height: "4px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();          

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

					break;

				case "4:3":

					el.css({width: "4px", height: "3px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

					break;

				case "1.375:1":

					el.css({width: "1,375px", height: "1px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

					break;

				case "1.41:1":

					el.css({width: "1,41px", height: "1px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

					break;

				case "3:2":

					el.css({width: "3px", height: "2px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

					break;

				case "16:9":

					el.css({width: "16px", height: "9px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

					break;

				case "18:10":

					el.css({width: "18px", height: "10px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));
					
					break;

				case "1.85:1":

					el.css({width: "1,85px", height: "1px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));
					
					break;

				case "2.40:1":

					el.css({width: "2,40px", height: "1px"});

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));
					
					break;

				default:

					elW = el.outerWidth(),
					elH = el.outerHeight(),
					pW = el.parent().width();

					el.attr("height").length>0 && el.removeAttr("height"), 
					el.attr("width").length>0 && el.removeAttr("width");

					el.outerWidth(pW).outerHeight(parseInt(pW/(elW/elH)));

				break;

			};


		});


	};



	/*
	// fit
	*/



	$(window).on("load", function() { fitup(); });
	$(window).resizeDone(function() { fitup(); });
	
	function fitup(){

		$(".fit-up").each(function() {

				var 	el= $(this),
						H = el.prev().outerHeight(),
						W = el.prev().outerWidth(),
						lockH =  String( "height: "+H+"px !important;" ),
						newStyle = "position: absolute !important; display: block !important; margin-top: -"+H+"px !important; margin-bottom: -"+H+"px !important;";


				el.prev().attr('style', ""+lockH);
				el.attr('style', newStyle).outerHeight(H).outerWidth(W);


		});


	};


	$(window).on("load", function() { fitheight(); });
	$(window).resizeDone(function() { fitheight(); });
	
	function fitheight(){

		$(".fit-height").each(function() {

			var 	el= $(this),
					H = el.parent().height(),
					pH = 0;

			el.parent().children().not(".fit-height").each(function() {
				pH += (parseInt($(this).outerHeight()) + parseInt($(this).css("margin-top")) + parseInt($(this).css("margin-bottom")));
			});

			var styled = String( "height: "+(H)+"px !important; top: -"+(pH)+"px !important;" );
			el.attr('style', ""+styled);

		});


	};




	/*
	// effects
	*/




	$(window).on("load", function() { fx(); });
	$(window).resizeDone(function() { fx(); });

	function fx(){


		$('[class*="fx-"]').each(function(){


			// strip keys
			var el = $(this),
				Keys = keystripe(el,"fx"),
				action = Keys[1],
				animation = Keys[2],
				timing = Keys[3]; if(!timing) { timing = 20; };

			var scrolled = $(parent.window.document, window, document, "body","html","mobile-viewport","#scrolling");

				//el.css({opacity:"0"});

				// is it for SCROLL?
				if(action == "scroll")
				{

					el.css({opacity:"0"});


					// if it was already visible
					if( el.offset().top < scrolled.scrollTop()+( $(window).height()-($(window).height()/10) ) )
					{
						el.addClass("fx-"+animation+"-opened" );
					}

					setTimeout(function(){


						scrolled.scroll().on('touchmove wheel mousewheel DOMMouseScroll scroll',function() {


							setTimeout(function(){ 

								// calculate pos
								var	actpos = parseInt( scrolled.scrollTop()+($(window).height()-($(window).height()/10)) ),
									elpos = parseInt( el.offset().top );

								//if over the activator
								if( actpos > elpos )
								{
									el.addClass("fx-"+animation+"-opened" );
								};


							},(1000/3)); //frame per second check = 3;

						});

					},timing);

				}

				// is it for HOVER?
				else if(action == "hover")
				{

					el.find(".box-fx").hide();


					el.on("mouseover", function()
					{
						el.find(".box-fx").show().removeClass("fx-"+animation+"-closed").addClass("fx-"+animation+"-opened");
					});


					el.on("mouseleave", function()
					{

						el.find(".box-fx").addClass("fx-"+animation+"-closed").removeClass("fx-"+animation+"-opened");

						setTimeout(function(){ 
							el.find(".box-fx").hide();
						},200);

					});


				}

				// is it for CLICK?
				else if(action == "click")
				{


					el.find(".box-fx").hide();


					el.on("click", function()
					{
						el.find(".box-fx:first").show().removeClass("fx-"+animation+"-closed").addClass("fx-"+animation+"-opened");
					});


					el.on("mouseleave", function()
					{

						el.find(".box-fx:first").addClass("fx-"+animation+"-closed").removeClass("fx-"+animation+"-opened");

						setTimeout(function(){ 
							el.find(".box-fx").hide();
						},200);

					});


				};

		});

	};

	//after loader()
	function fx_onload()
	{

		$("[class*=fx-load]").each(function(){

			// strip keys
			var el = $(this),
				Keys = keystripe(el,"fx"),
				type = Keys[1],
				animation = Keys[2],
				timing = Keys[3];

			el.css({opacity:"0"});

			if(!timing)
			{
				el.removeClass("fx-"+type+"-"+animation);
				timing = 20;
			}
			else
			{
				el.removeClass("fx-"+type+"-"+animation+"-"+timing);
			};

			setTimeout(function()
			{
				el.addClass("fx-"+animation+"-opened" );
			}, timing );


		});

	};





	/*
	// anchor sliding
	*/


			

	$(document).ready(function(){

		$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {

			// On-page links
			if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')  &&  location.hostname == this.hostname )
			{
				// Figure out element to scroll to
				var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

					// Does a scroll target exist?
					if (target.length)
					{

						event.preventDefault();

						$("html, body").animate({
							scrollTop: target.offset().top
						}, 1800, function() {

							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(":focus"))
							{ 
								return false;
							}
							else
							{
								$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							};
					});
				}
			}
	
		});

	});


	/*
	// Metods > key strip
	*/



	function keystripe(x,y,key)
	{

		var allClass   = x.attr("class");
		var classList  = allClass.split(" ");

		$.each(classList, function( key, ofclass )
		{
			if ( ofclass.indexOf(y) > -1 )
			{
				Keys = ofclass.split("-");
			}
		});

		return Keys;

	}




	/*
	// call functions
	*/



	calling = function(called) {

		called == "nav_wide" 		? ( nav_wide() ):
		called == "nav_side" 		? ( nav_side() ):
		called == "accordion" 		? ( accordion() ):
		called == "button" 			? ( button() ):
		called == "pagepeak" 		? ( pagepeak() ):
		called == "video" 			? ( video() ):
		called == "ratio" 			? ( ratio() ):
		called == "fx" 				? ( fx() ):
		called == "cropimage" 		? ( cropimage() ):
		called == "boxcard" 		? ( boxcard() ):
		called == "fitup" 			? ( fitup() ):
		called == "fitheight" 		? ( fitheight() ):
		called == "all"				? ( nav_wide(), nav_side(), accordion(), pagepeak(), button(), video(), ratio(), fx(), cropimage(), fitup(), fitheight(), boxcard() ):
		called == "kimera" 			? ( kimera() ): ( alert("OPS!\n\nSorry, You called a wrong funtion!") )



	};



})();