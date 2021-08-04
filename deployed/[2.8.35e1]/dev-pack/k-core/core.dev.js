
const ui = (() => {


        /*
        //	[ kimera framework V 2.8.35e1 ]
        //	Credits: Alberto Marà & Shape group
        //	https://github.com/ShapeGroup/kimera-frontend-framework/wiki
        //	https://www.facebook.com/kimeraframework/
        */


        function debug(){ console.debug.apply(console,arguments); }

        debug(`:: [🛈 Version] V2.8.35e1 kimera`);
        // debug(`:: [🛈 Project] https://git.io/JIJEt`);
        debug(`:: [🛈 wikizone] https://git.io/fhSzk`);
        debug(`:: [🛈 licence] GNU V3 https://git.io/JJVw0`);


    //--------------------------------------------------//


        // micro-libs // touch check


        const is_touch_device = () =>
        {
            return 'ontouchstart' in window;
        }


        // micro-libs // if event done


        const eventDone = F =>
        {
            var timer; return (event) =>
            {
                if(timer) clearTimeout(timer); timer = setTimeout(F,100,event);
            }

        }


        // micro-libs // get real offeset top


        const getoffsetTop  = el =>
        {
            let top = 0; while(el) { top += el.offsetTop; el = el.offsetParent; } return top;
        }


        // micro-libs // get real offeset top


        const getoffsetLeft = el =>
        {
            let left = 0; while(el) { left += el.offsetLeft; el = el.offsetParent; } return left;
        }


        // micro-libs // get style


        const getElementCssRole = (element, pseudo, property) =>
        {
            const getviaview = (el,ps,pr) => { return document.defaultView.getComputedStyle(el,ps||null).getPropertyValue(pr); };
            const getviarole = (el,ps,pr) => { if(el.currentStyle) { return el.currentStyle[ pr.replace(/\-(\w)/g, (strMatch, p1) => { return p1.toUpperCase(); }) ]; } else { return 0 } };
            return (document.defaultView && document.defaultView.getComputedStyle) ? getviaview(element,pseudo,property) : getviarole(element,pseudo,property);
        }


        // micro-libs // Computed Translate X


        const getComputedTranslateX = (element) =>
        {

            if(!window.getComputedStyle) return false;

            let style = getComputedStyle(element),
                transform = style.transform || style.webkitTransform || style.mozTransform;

            let mat = transform.match(/^matrix3d\((.+)\)$/);

            //if(mat)return parseFloat(mat[1].split(', ')[13]);
            mat = transform.match(/^matrix\((.+)\)$/);
            if(mat)
            {
                mat = parseFloat(mat[1].split(', ')[4]);
                if(!isNaN(mat)) return mat;
            }
            //return mat ? parseFloat(mat[1].split(', ')[4]) : 0;

        }


        // micro-libs // Computed Translate Y


        const getComputedTranslateY = (element) =>
        {

            if(!window.getComputedStyle) return false;

            let style = getComputedStyle(element),
                transform = style.transform || style.webkitTransform || style.mozTransform;

            let mat = transform.match(/^matrix3d\((.+)\)$/);

            //if(mat)return parseFloat(mat[1].split(', ')[13]);
            mat = transform.match(/^matrix\((.+)\)$/);

            if(mat)
            {
                mat = parseFloat(mat[1].split(', ')[5])
                if(!isNaN(mat)) return mat;
            }

        }


        // micro-libs // define play for video

        Object.defineProperty( HTMLMediaElement.prototype,
        'playing', {
            get: function(){ return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2); }
        })


    //--------------------------------------------------//



        const checkLessJs = () =>
        {

            if( document.querySelector('script[src="//cdnjs.cloudflare.com/ajax/libs/less.js/4.1.1/less.min.js"]')||document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/less.js/4.1.1/less.min.js"]') )
            {

                debug(`:: [⚠ ui alert]: LessJs via simple script\n   ⮑ if you are using lessjs via script remember to put async='true' or something will not work!\n   -> Comment the Less script and load the compiled css parameters into a css file.\n\n::::  -> Remember that even if excellent, the script version is extremely slow!\n::::     We recommend using compilation via node js or php.\n::::     via php: https://git.io/J4hHn\n::::     via node: https://git.io/J4hHS\n\n`);

                let themecompiled = document.querySelector('style[id^="less:').innerHTML;
                alert("\n\n[⚠ ui alert]: LessJs Finished - you can copy the theme and deactivate less.js\n\n");
                prompt("Compiled code:", ""+themecompiled);

            }

        }



    //--------------------------------------------------//



        const lazyloader = () =>
        {

            let Loader = document.querySelectorAll('.loader')[0];

            Loader.style.transitionTime='0';
            Loader.classList.add('[status-active]');
            Loader.classList.remove('[status-off]');

            setlazy ( lazy_sets_is_end => {

                document.querySelectorAll('body[class*="mode-"]')[0].style.opacity='1';

                setTimeout(()=>{

                    Loader.classList.add('[status-off]');

	                setTimeout(()=>{

	                    Loader.classList.add('[status---]');
	                    Loader.classList.remove('[status-active]','[status-off]','gpuboost');

	                },650); // wait css exit out animation

				},150); // wait elements call

            });


            // collect all elements
            function setlazy( lazy_sets_is_end )
            {


                let lazyelements     = document.querySelectorAll('.lazy'),
                    lazyonstartlist  = [], // on load page, if in view (not unload)
                    lazywhenviewlist = [], // on scroll load when you view it (not unload)
                    lazyobserverlist = []; // on/off start on view (forever active if have an element)


                if(!lazyelements.length)
                {

					return lazy_sets_is_end();

                }

                else
                {

                    for (let element of lazyelements)
                    {


                        let elementname     = element.tagName.toLowerCase(),
                            validtype       = ['div','span','picture','figure'];


                        if( element.classList.contains('lazy') && validtype.indexOf(elementname)<0 )
                        {
                            debug(`:: [⚠ ui alert]: wrong lazy preload\n   ⮑ The tag "`+elementname+`" is not valid for a preload action!\n      Read more on: https://git.io/J4hQ7`);
                        }

                        else
                        {

                            // processing icon and content is the same?
                            if(element.firstElementChild==null || element.lastElementChild==null ){ debug(`:: [⚠ ui alert]: wrong preload\n   ⮑ contents not defined, probably it's not first child of lazy or same destination for class="lazy" and data-src="..."\n   ⮑ Error on element: `,element);}

                            // who is processing icon and who the content?
                            let elementcontent  = element.firstElementChild,
                                elementloader   = (element.lastElementChild.className.includes('processing'))
                                                    ? element.lastElementChild
                                                    : false ;

                            //check content type and...
                            let contenttype    = elementcontent.tagName.toLowerCase(),
                                contentclasses = elementcontent.classList.toString().toLowerCase();

                            if(contenttype == 'video' || contenttype == 'iframe' || contentclasses.includes('videobox') )
                            {

                                if((contenttype == 'video'|| contentclasses.includes('videobox')) && !contentclasses.match(/ratio/g))
                                {

                                    console.log(`:: [⚠ ui alert]: preload flaw\n   ⮑ ratio proportion not found on video or videobox: `, element);
                                    element.classList.add('[status-active] [status-error]');

                                }
                                else
                                {

                                    if( contentclasses.includes('settings') && contentclasses.includes('autostartstop') ){ lazyobserverlist.push(element); }

                                    (getoffsetTop(element)<=(window.scrollTop||document.body.scrollTop||document.documentElement.scrollTop)+screen.availHeight)
                                        ? lazyonstartlist.push(element)      // it's in view
                                        : lazywhenviewlist.push(element);    // on scrolling

                                }


                            }

                            else if(contenttype == 'div' || contenttype == 'span')
                            {
                                if(!elementcontent.dataset.src)
                                {
                                    debug(`:: [⚠ ui alert]: wrong preload\n   ⮑ data-src not found on element div/span\n      Read more on: https://git.io/J4hQ7`);
                                    element.classList.add('[status-error]');
                                }
                                else
                                {
                                    lazyonstartlist.push(element);
                                }
                            }

                            else if(contenttype=='img')
                            {

                                let classes    = [...element.classList].join(''),
                                    imgs       = element.querySelectorAll('*>img'),
                                    isvalid    = true;

                                //checks images...
                                for (let img of imgs)
                                {

                                    if(!elementcontent.dataset.src)
                                    {
                                        isvalid = `:: [⚠ ui alert]: wrong preload\n   ⮑ data-src not found on image\n      Read more on: https://git.io/J4hQ7`;
                                        element.classList.add('[status-error]');
                                    }
                                    else if(!classes.match(/ratio/g))
                                    {
                                        isvalid = `:: [⚠ ui alert]: preload flaw\n   ⮑ ratio proportion not found on an image: `+img.dataset.src.match(/.*\/(.*)$/)[1];
                                        img.src=img.dataset.src;
                                    }

                                }

                                if(isvalid===true)
                                {

                                    (getoffsetTop(element)<=(window.scrollTop||document.body.scrollTop||document.documentElement.scrollTop)+screen.availHeight)
                                        ? lazyonstartlist.push(element)     // it's in view
                                        : lazywhenviewlist.push(element);   // on scrolling

                                }

                                else
                                {
                                    debug(isvalid);
                                }

                            }

                            else
                            {
                                debug(`:: [⚠ ui alert]: wrong preload\n   ⮑ validation of content fail (div|span|img|iframe|videobox) \n      Read more on: https://git.io/J4hQ7`);
                            }

                        }

                    }


                    // list cleaner
                    for(let in_onviewlist of lazywhenviewlist)
                    {

                        for(let in_lazynow of lazyonstartlist) if(in_onviewlist == in_lazynow) lazywhenviewlist.splice(lazywhenviewlist.indexOf(in_onviewlist),1);

                        for(let in_observerlist of lazyobserverlist) if(in_onviewlist == in_observerlist) lazywhenviewlist.splice(lazywhenviewlist.indexOf(in_onviewlist),1);

                    }


					//load if in view now
                    lazynow(lazyonstartlist,null,true);

                    //load when in view or when is ready
                    lazyobserver(lazywhenviewlist,lazyobserverlist);


                }

                //return set is end
                return lazy_sets_is_end();

            }


            // on scroll observe.. what is in start, else stop
            function lazyobserver(lazywhenviewlist,lazyobserverlist)
            {

                if(lazyobserverlist[0]!=undefined||lazywhenviewlist[0]!=undefined)
                {


                    document.body.addEventListener('scroll', ev_observerscroller=>
					{

						ev_observerscroller.preventDefault();

						// let scrollpage = setInterval( ()=> {
						//
                        //     window.clearInterval( scrollpage );

                            let wintop      = window.scrollTop||document.body.scrollTop||document.documentElement.scrollTop,
                                winbottom   = wintop + (document.documentElement.clientHeight || window.innerHeight || 0);

                            //is it in or under screen view?

                            if(lazywhenviewlist[0]!=undefined)
                            {

                                let index=0;
                                for (let element of lazywhenviewlist)
                                {

                                    if(getoffsetTop(element)<winbottom )
                                    {
                                        if(!element.className.includes('status'))
                                        {
                                            lazynow(lazywhenviewlist,index,false);
                                        }
                                        else
                                        {
                                            lazywhenviewlist.splice(index,1);
                                        }
                                    }

                                    index++;

                                }

                            }


                            //is it in or out screen view? (players controllers)
                            if(lazyobserverlist[0]!=undefined)
                            {

                                for (let element of lazyobserverlist)
                                {

                                    let elementcontent =
										  element.getElementsByTagName('iframe')[0] ? element.getElementsByTagName('iframe')[0]
										: element.getElementsByTagName('video')[0]  ? element.getElementsByTagName('video')[0]
                                        : element.firstElementChild;


                                    let classelist      = element.firstElementChild.classList.toString().toLowerCase(),
                                        ePosition       = getoffsetTop(element),
                                        isInView        = (ePosition<winbottom&&(ePosition+element.offsetHeight)>wintop)


                                    //if not in view
                                    if(isInView)
                                    {

										if(!classelist.includes('[status-active]'))
										{

	                                        if(classelist.includes('social','autostartstop'))
	                                        {

	                                                 if( (classelist.includes('facebook') || classelist.includes('instagram')) && elementcontent.getAttribute('src')=='')
	                                                 {
	                                                     elementcontent.setAttribute("src",elementcontent.dataset.relink);
	                                                 }

	                                                 else if(classelist.includes('youtube'))       { elementcontent.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');}
	                                                 else if(classelist.includes('vimeo'))         { elementcontent.contentWindow.postMessage('{"method":"play"}','*');}

	                                        }

	                                        else if(classelist.includes('videobox'))
	                                        {
	                                            elementcontent.tagName.toLowerCase() == 'video'
	                                                ? elementcontent.play()
	                                                : elementcontent.getElementsByTagName('video')[0].play();
	                                        }

										}

                                        element.classList.remove('[status-active]')
										element.classList.add('[status-off]')

                                    }

                                    //if is in view
                                    else
                                    {

										if(!classelist.includes('[status-off]'))
										{

	                                        if(classelist.includes('social','autostartstop'))
	                                        {

	                                             if( (classelist.includes('facebook') || classelist.includes('instagram')) && elementcontent.getAttribute('src')!='' )
	                                             {
	                                                 elementcontent.setAttribute("src",'');
	                                             }

	                                             else if(classelist.includes('youtube'))     { elementcontent.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); }
	                                             else if(classelist.includes('vimeo'))       { elementcontent.contentWindow.postMessage('{"method":"pause"}', '*'); }

	                                        }

	                                        else if(classelist.includes('videobox'))
	                                        {
	                                            elementcontent.tagName.toLowerCase() == 'video'
	                                                ? elementcontent.pause()
	                                                : elementcontent.getElementsByTagName('video')[0].pause();

	                                        }

										}

										element.classList.remove('[status-off]');
										element.classList.add('[status-active]');

                                	}
                            	}


							}
                        // },200) // 333 = 3.x fps;

						ev_observerscroller = null;

					},false);

                }

            }


            // if in view load it
            function lazynow(list,target,remover)
            {

                let index=-1;
                for(let element of list)
                {

                    index++;

                    if( !(element.className.toLowerCase().includes('status')) )
                    {

                        if(index == target || target==null)
                        {

                            element.classList.add('[status-active]');

                            let contenttype     = element.firstElementChild.tagName.toLowerCase(),
                                contentclasses  = element.firstElementChild.classList.toString().toLowerCase(),
                                loadicon        = (element.lastElementChild.className.includes('processing')) ? element.lastElementChild : false;


                            if( contenttype=='video' || contenttype=='iframe' || contentclasses.includes('videobox'))
                            {


                                let videoframetypes  = ['watch','youtu','youtube','vimeo','instagram','facebook','fb','twitter','twitch'],
                                    contenturl       = element.firstElementChild.url || false;
                                    isvideoframed    = false;

                                if(contenturl) isvideoframed = videoframetypes.indexOf(contenturl.toLowerCase())>-1 ? true : false;


                                // is it a frame?
                                if(contenttype=='iframe' || isvideoframed )
                                {


                                    let doneframe = () =>
                                    {
                                        setTimeout(()=>{
                                            showelement(element,loadicon,remover);
                                        },200)
                                    }

                                    if(element.firstElementChild) { doneframe() } else { element.firstElementChild.onload = doneframe() }

                                }

                                // is it video?
                                else
                                {
                                    let videotag = element.getElementsByTagName('video')[0];

                                    if( videotag.readyState>=3 )
                                    {
                                        setTimeout(()=>{
                                            showelement(element,loadicon,remover);
                                        },200)
                                    }
                                    else
                                    {
                                        videotag.oncanplay = ev => {
                                            setTimeout(()=>{
                                                showelement(element,loadicon,remover);
                                            },200)
                                            ev=null;
                                        };
                                    }

                                }

                            }

                            else if(contenttype=='img')
                            {


                                let imglist = element.querySelectorAll('img'),
                                    imgqnt  = imglist.length,
                                    loaded  = [];


                                for (let i=0; i<imgqnt; i++)
                                {
                                    imglist[i].classList.add('hidden');
                                    loaded.push(false);
                                }

                                for (let i=0; i<imgqnt; i++)
                                {

                                    let tagimg = imglist[i];


                                    tagimg.onload = () =>
                                    {
                                        loaded[i] = true;
                                    }

                                    tagimg.onerror = () =>
                                    {

                                        if(loadicon) element.lastElementChild.insertAdjacentHTML('afterend', `<div class="[status-error]"><span class="absolute-center" style="color:white;min-height:unset;min-width:unset;" title="OPS! IMAGE NOT LOADED FOR ABORT OR 404 ERROR"">⚠️</span></div>`);

                                        loaded.splice(index,1);

                                        setTimeout(()=>{
                                            showelement(element,loadicon,remover);
                                        },200)

                                        i=imgqnt;

                                    }

									tagimg.src = tagimg.dataset.src;

                                }


                                let checkloads = setInterval(()=>{

                                    let isloadend = true;

                                    for(let status of loaded) { if(status==false) { isloadend=false; } }

                                    if(isloadend)
                                    {

                                        for (let imglooped of imglist) imglooped.classList.remove('hidden');

                                        setTimeout(()=>{
                                            showelement(element,loadicon,remover);
                                        },200)

                                        window.clearInterval(checkloads);
                                    }

                                },300)


                            }

                            else if(contenttype=='div' || contenttype=='span')
                            {


                                fetch(element.firstElementChild.dataset.src)
                                .then( file => {

                                    if (!file.ok)
                                    {
                                        element.innerHTML = `<div class="[status-error]"><span class="absolute-center" style="color:white;min-height:unset;min-width:unset;" title="OPS! FILE NOT LOADED FOR `+file.status+` ERROR">⚠️</span></div>`;
                                        element.style.minHeight = (element.firstElementChild.offsetHeight*1.5)+'px';
                                        showelement(element,loadicon,remover)
                                    }
                                    else
                                    {

                                        file.text().then( filecontent => {

                                            element.innerHTML = filecontent;
                                            setTimeout(()=>{
                                                showelement(element,loadicon,remover);
                                            },200)

                                        })

                                    }


                                });

                            }

                            else
                            {
                                debug(`:: [⚠ ui alert]: wrong preload\n   ⮑ not found a correct content (div|span|img|iframe|videobox) \n      Read more on: https://git.io/vldt456`);
                            }


                            function showelement(element,loadicon,remover)
                            {

                                element.classList.add('[status-off]');
                                element.classList.add('[status---]');

                                if(loadicon) loadicon.remove();
                                if(remover) list.splice(index,1);

                                setTimeout(()=>{
                                    element.classList.remove('[status-off]');
                                    element.classList.remove('[status-active]');
                                },1350) // animation off duration: 1s +.3s delay s+.05delay


                            }

                        }


                    }

                }

            }


        }


    //--------------------------------------------------//



        const unloader = () =>
        {

            let loader = document.querySelectorAll('.loader')[0];

            loader.classList.remove('[status---]');
            loader.classList.add('gpuboost','[status-active]');

            setTimeout( () => {

                loader.classList.remove('[status-off]');

                setTimeout( () => {
                    loader.classList.remove('gpuboost');
                    loader.classList.add('[status---]');
                }, 250);

            }, 50);

        }



    //--------------------------------------------------//



        const exitloader = () =>
        {


            let selflinkslist = [...document.querySelectorAll('[target*="_self"], [target*="_parent]"')];

            for (let link of selflinkslist)
            {

                link.onclick = ev_unload =>
                {

                    ev_unload.preventDefault()


                    let loader = document.querySelectorAll('.loader')[0],
                        destination = link.getAttribute('href');


                    if( !link.getAttribute('disabled') || link.getAttribute('disabled').value!=true || link.getAttribute('disabled').value=='' )
                    {

                        if(loader.querySelectorAll('.spinner').length>0)loader.querySelectorAll('.spinner')[0].classList.add('hide');

                        loader.classList.remove('[status---]');
                        loader.classList.add('[status-off]');

                        setTimeout( () => {
                            loader.classList.add('[status-active]');
                            loader.classList.remove('[status-off]');

                            setTimeout( () => {

                                (destination==='#') ? location.reload() : location.href=destination;

                            }, 250);
                        }, 1);

                    }

                }

            }


        }



    //--------------------------------------------------//



        const retagpre = () =>
        {

            let pretags = document.getElementsByTagName('pre');

            for (let tag of pretags)
            {

                let content = tag.innerText;
                tag.innerText = content.trimStart().trimEnd();

            }

        }



    //--------------------------------------------------//



        const tagcode = () =>
        {


            let codetags = document.querySelectorAll('CODE,SAMP');

            for (let tag of codetags)
            {
                let datasrc = tag.dataset.src;

                if(!datasrc)
                {

                    let content = String(tag.innerHTML || tag.textContent).replace( /[\r\n]+/gm, "" ).trimStart().trimEnd();
                    tag.innerHTML = '';
                    tag.innerText = content;

                }

                else
                {

                    fetch(datasrc).then( file => {

                        if(file.ok)
                        {
                            file.text().then( content => {

                                tag.removeAttribute('data-src');
                                tag.innerText = content.trimStart().trimEnd();

                            });
                        }
                        else
                        {
                            tag.removeAttribute('data-src');
                            tag.innerText = 'File not found or error';
                        }

                    });

                }

            }

        }




    //--------------------------------------------------//



        const modeapp = () =>
        {


            // options
            let lockScroll  = false,
                draglimit   = parseInt((document.body.clientWidth/2.5)), // drag
                sensibility = 50; // swipe


            // get body viewport

            if(document.querySelectorAll('.mode-app').length>0)
            {

                document.getElementsByTagName('HTML')[0].style.overflow ="hidden";

                let ViewPortModelApp = [...document.querySelectorAll('body.mode-app')][0];

                // set all controller elements

                let Controller    = [...ViewPortModelApp.querySelectorAll('.view-controller')][0],
                    ContentBox    = [...ViewPortModelApp.querySelectorAll('.view-group')][0],
                    Section       = [...ContentBox.querySelectorAll('.view')],
                    Pointers      = [...Controller.querySelectorAll('.pointer')],
                    PrevView      = [...ViewPortModelApp.querySelectorAll('.prev-view')],
                    NextView      = [...ViewPortModelApp.querySelectorAll('.next-view')],
                    Dots          = ViewPortModelApp.querySelector('.dots'),
                    Steps         = ViewPortModelApp.querySelector('.steps');


                if(Dots)
                {
                  if(Dots.closest('.snap-x')||Dots.closest('.snap-y')){ Dots = null;}
                }

                //check controller elements

                let isPointed, isDots, isSteps;
                if(Pointers<=0) { isPointed=false } else { isPointed=true };
                if(!Dots) { isDots=false } else { isDots=true };
                if(!Steps) { isSteps=false } else { isSteps=true };



                ////// swipe actions

                let sectionsize = Section.length;
                for (let i = 0; i < sectionsize; i++)
                {


                    ////// on first, find start viewbox by active

                    if(Section[i].className.includes('active'))
                    {

                        let start = i, StartPosition = Section[start].offsetLeft;

                        if(isPointed) Pointers[start].classList.add('active');

                        ContentBox.style.transform = 'translate('+StartPosition*-1+'px,0)';

                    }



                    /////// steps manager

                    if( isSteps )
                    {

                        let StepSpan  = document.createElement('span');

                        Steps.appendChild(StepSpan);

                        StepSpan.classList.add('step');

                        if(Section[i].className.includes('active'))
                        {

                            let sai = i, steps = [...Steps.querySelectorAll('.step')];
                            for (sai = 0; sai < steps.length; sai++) {steps[sai].classList.add("active");}

                        }

                    }



                    /////// dots manager

                    if( isDots )
                    {

                        let DotSpan  = document.createElement('span');

                        Dots.appendChild(DotSpan);

                        DotSpan.classList.add('dot');

                        if(Section[i].className.includes('active')) DotSpan.classList.add('active');

                    }



                    ////// controllers manager

                    if( isPointed )
                    {

                        if(i > sectionsize  || Pointers[i] == undefined || Pointers[i] == null)
                        { debug(`:: [⚠ ui alert]: wrong mode-app\n   ⮑ Pointers and views\n   ⮑ pointers don't match the amount of views, make sure there is one view for each pointer!`) }

                        Pointers[i].onclick = VievportEvent =>
                        {


                            //ContentBox.classList.remove('smooth'); //immidiatly! native app like.

                            VievportEvent.preventDefault(/*stop all return click.*/);

                            if(Section[i].className.includes('lock'))
                            {

                                Pointers[i].classList.add('border-error');

                                let Stopleft = document.createElement('DIV'),
                                    Stopright = document.createElement('DIV');

                                Stopleft.classList.add('stop-left');
                                Stopright.classList.add('stop-right');

                                ViewPortModelApp.appendChild(Stopleft);
                                ViewPortModelApp.appendChild(Stopright);
                                setTimeout(()=>{
                                  Pointers[i].classList.remove('active');
                                  Pointers[i].classList.remove('border-error');
                                  Pointers[i].blur();
                                  ViewPortModelApp.removeChild(Stopleft);
                                  ViewPortModelApp.removeChild(Stopright);
                                },1500)

                            }

                            else
                            {

                                resetActiveClasses();

                                Pointers[i].classList.add('active');
                                Section[i].classList.add(/*'visible',*/'active');

                                //define relative panel offset

                                let RelativePanel;


                                if( i >= Pointers.length-1 )
                                {

                                    let SWidth = parseInt( window.getComputedStyle(Section[i]).width ),
                                        WWidth = parseInt( window.innerWidth),
                                        Offset = Section[i].offsetLeft;

                                    RelativePanel = parseInt( (Offset)-(WWidth-SWidth) );

                                }

                                else
                                {
                                    RelativePanel = Section[i].offsetLeft;
                                }


                                updateSteps();
                                updateDots();
                                updateController();


                                //go on panel

                                // addSmooth();

                                ContentBox.style.transform = 'translateX('+RelativePanel*-1+'px)';

                                // removeSmooth();

                            }

                        }

                    }



                    ////// content manager

                    var EventTarget,
                        PanelTarget,

                        PrevPanel,
                        NextPanel,
                        PrevOffset,
                        NextOffset,

                        Zone,
                        DragPosition,
                        StartX, StartY,
                        DistX, DistY, DragX, DragY,

                        StartTouchPosition,
                        StandardPosition,
                        underScroll,

                        StartTime;



                    ContentBox.ontouchstart = VievportEvent =>
                    {

                        //ContentBox.classList.remove("smooth"); /*immidiatly! native app like.*/

                        //set target of actions

                        PanelTarget = VievportEvent.target.closest('.view');
                        EventTarget = VievportEvent.target;


                        //you can drag?

                        if(
                            VievportEvent.target.closest('.dragbox') || VievportEvent.target.closest('.snap-x') || VievportEvent.target.closest('.snap-y') ||
                            VievportEvent.target.closest('.scroll-x') || VievportEvent.target.closest('.scroll-y') ||
                            VievportEvent.target.closest('.button-number') || VievportEvent.target.closest('.button-range *') ||
                            VievportEvent.target.closest('a') || VievportEvent.target.tagName.toLowerCase() == 'a' ||
                            VievportEvent.target.className.includes("nofx")
                          )
                        {
                            PanelTarget.setAttribute('draggable','false');
                            PanelTarget.removeAttribute("draggable");
                        }
                        else
                        {
                            PanelTarget.setAttribute('draggable','true');
                        }


                        //set event starter variable

                        Zone        = VievportEvent.changedTouches[0],
                        StartX      = Zone.pageX,
                        StartY      = Zone.pageY,
                        StartTime   = new Date(),

                        StartTouchPosition =  parseInt( Zone.clientX ),
                        PrevPanel = PanelTarget.previousElementSibling,
                        NextPanel = PanelTarget.nextElementSibling,

                        underScroll = false;

                        //check who is the active

                        if(!PanelTarget.className.includes('active'))
                        {
                            resetActiveClasses();
                            PanelTarget.classList.add('active');
                            updateController();
                            updateSteps();
                            updateDots();
                        }


                        // set previous elements

                        if(PrevPanel)
                        {
                            PrevOffset = parseInt( PanelTarget.previousElementSibling.offsetLeft*-1 )
                        }
                        else
                        {
                            PrevOffset = PanelTarget.offsetLeft
                        }



                        // set next elements

                        if(NextPanel)
                        {
                            NextOffset  = parseInt( PanelTarget.nextElementSibling.offsetLeft*-1 )
                        }

                        else if(NextPanel === null)
                        {
                            NextOffset  = parseInt( PanelTarget.offsetLeft*-1 )
                        }

                        else if(NextPanel === null && (parseInt(NextPanel.nextElementSibling.offsetWidth) <  parseInt(ContentBox.offsetWidth)))
                        {  //note: else is last and have a small width... recalculate final scroll by pre-last
                            NextOffset  = parseInt( PanelTarget.offsetLeft*-1 );
                        }

                    }

                    ContentBox.ontouchmove = VievportEvent =>
                    {


                        //refresh starter variable on dragging

                        Zone                 = VievportEvent.changedTouches[0],
                        StandardPosition     = PanelTarget.offsetLeft,
                        DragPosition         = parseInt( ( (StandardPosition+StartTouchPosition) ) + (Zone.pageX*-1) ),
                        DragY                = Zone.pageY-StartY,
                        DragX                = StandardPosition-DragPosition;


                        PanelTarget.onscroll = VievportEvent =>
                        {
                            underScroll = true;
                            return false;
                        }

                        let X = Math.abs(DragX), Y = Math.abs(DragY);
                        if(PanelTarget.hasAttribute('draggable') && X>Y)
                        {

                            if( DragX < 0 && !NextPanel || DragX > 0 && !PrevPanel)
                            {
                                DragX = 0;

                                // addSmooth();

                                ContentBox.style.transform = 'translate('+StandardPosition*-1+'px,0)';
                                PanelTarget.removeAttribute('draggable');

                                // removeSmooth();
                            }
                            else if( DragX != 0 && !underScroll )
                            {
                                DragY = 0;
                                ContentBox.style.transform = 'translate('+DragPosition*-1+'px,0)';
                            }

                        }
                        else
                        {

                            DragX = 0;

                            // addSmooth();

                            ContentBox.style.transform = 'translate('+StandardPosition*-1+'px,0)';
                            PanelTarget.removeAttribute('draggable');

                            // removeSmooth();

                        }

                    }

                    ContentBox.ontouchend = VievportEvent =>
                    {


                        //refresh starter variable on dragging

                        Zone = VievportEvent.changedTouches[0],
                        StandardPosition = PanelTarget.offsetLeft,
                        DistX = parseInt(Zone.pageX - StartX),
                        DistY = parseInt(Zone.pageY - StartY)


                        //Drag Release
                        let X = Math.abs(DistX), Y = Math.abs(DistY);

                        let Sensibility
                        if(
                            VievportEvent.target.closest('.dragbox') || VievportEvent.target.closest('.snap-x') || VievportEvent.target.closest('.snap-y') ||
                            VievportEvent.target.closest('.scroll-x') || VievportEvent.target.closest('.scroll-y') ||
                            VievportEvent.target.closest('.button-number') || VievportEvent.target.closest('.button-range *') ||
                            VievportEvent.target.closest('a') || VievportEvent.target.tagName.toLowerCase() == 'a' ||
                            VievportEvent.target.className.includes("nofx")
                          )
                        {
                            Sensibility = 0;
                            DistX = 0;
                        }
                        else
                        {
                            Sensibility = sensibility;
                        }


                        // let SwipeRangeY = DistY <= (Sensibility*2) && DistY >= -(Sensibility*2),
                        //     stoptime = new Date() - StartTime;
                        //     swipemin = parseInt( Sensibility*12/(Sensibility/4) );
                        //     swipemax = parseInt( Sensibility*82/(Sensibility/4)  ),
                        //     timerange = stoptime >= swipemin && stoptime <= swipemax;

                        if(PanelTarget.hasAttribute('draggable'))
                        {

                            DistY = 0;
                            DistX = DistX*-1;

                            if( DistX > (draglimit) )
                            // if( (DistX >= (draglimit/2) && timerange) || (DistX > draglimit))
                            {

                                goNext();

                            }
                            else if( DistX <= (-draglimit))
                            // else if( (DistX <= -(draglimit/2)&& timerange) ||  (DistX < (-draglimit)))
                            {

                                goPrev();

                            }
                            else
                            {
                                // addSmooth();

                                ContentBox.style.transform = 'translate('+StandardPosition*-1+'px,0)';
                                PanelTarget.removeAttribute('draggable');

                                // removeSmooth();
                            }

                        }


                        //stop all and fuckoff.
                        PanelTarget.blur();
                        underScroll = false;


                    }


                    ////// Next\Prev manager

                    if( NextView )
                    {

                        let nvl = NextView.length;
                        for (let n = 0; n < nvl; n++)
                        {

                            NextView[n].onclick = VievportEvent =>
                            {

                                VievportEvent.preventDefault();
                                VievportEvent.stopPropagation();


                                let sl = Section.length;
                                for (let i = 0; i < sl; i++)
                                {

                                    let nextindex;
                                    if(Section[i].className.includes('active'))
                                    {

                                        if(Section[i+1].className.includes('lock'))
                                        {

                                            let Stopright = document.createElement('DIV');

                                            Stopright.classList.add('stop-right');

                                            ViewPortModelApp.appendChild(Stopright);
                                            setTimeout(()=>{
                                                ViewPortModelApp.removeChild(Stopright);
                                            },1500)

                                        }
                                        else
                                        {
                                            nextindex = parseInt(i+1);
                                            __next(nextindex);
                                            return false;
                                        }

                                    }

                                    function __next(nextindex)
                                    {

                                        if(Section[nextindex] === undefined) {  return false; }
                                        else(nextindex>=0 && nextindex<=Section.length)
                                        {

                                            let offset = Section[nextindex].offsetLeft;

                                            resetActiveClasses();

                                            // addSmooth();

                                            ContentBox.style.transform = 'translate('+offset*-1+'px,0)';
                                            Section[nextindex].classList.add("active");

                                            // removeSmooth();

                                            updateController();
                                            updateSteps();
                                            updateDots();

                                        }

                                    }

                                }

                            }

                        }

                    }
                    else{ NextView = null; }

                    if( PrevView )
                    {

                        let pvl = PrevView.length;
                        for (let p = 0; p < pvl; p++)
                        {

                            PrevView[p].onclick = VievportEvent =>
                            {

                                VievportEvent.preventDefault();
                                VievportEvent.stopPropagation();


                                let sl = Section.length;
                                for (let i = 0; i < sl; i++)
                                {


                                    let previndex;
                                    if(Section[i].className.includes('active'))
                                    {
                                        if(Section[i-1].className.includes('lock'))
                                        {

                                            let Stopleft = document.createElement('DIV');

                                            Stopleft.classList.add('stop-left');

                                            ViewPortModelApp.appendChild(Stopleft);
                                            setTimeout(()=>{
                                                ViewPortModelApp.removeChild(Stopleft);
                                            },1500)

                                        }
                                        else
                                        {
                                            previndex = parseInt(i-1);
                                            __prev(previndex);
                                            return false;
                                        }
                                    }

                                    function __prev(previndex)
                                    {

                                        if(Section[previndex] === undefined) {  return false; }
                                        else(previndex>=0 && previndex<=Section.length)
                                        {

                                            let offset = Section[previndex].offsetLeft;

                                            resetActiveClasses();

                                            // addSmooth();

                                            ContentBox.style.transform = 'translate('+offset*-1+'px,0)';
                                            Section[previndex].classList.add('active');

                                            // removeSmooth();



                                            updateController();
                                            updateSteps();
                                            updateDots();

                                        }
                                    }


                                }

                            }

                        }
                    }
                    else{ PrevView = null; }



                    ////// methods...


                    let addSmooth = () =>
                    {
                        ContentBox.classList.add('smooth');
                    }

                    let removeSmooth = () =>
                    {
                        setTimeout(()=>{
                            ContentBox.classList.remove('smooth');
                        },600)
                    }

                    let resetActiveClasses = () =>
                    {

                        for (let p = 0; p < Pointers.length; p++)
                            Pointers[p].classList.remove('active');

                        for (let s = 0; s < Section.length; s++)
                            Section[s].classList.remove('active'/*,'hidden'*/);

                    }


                    let updateDots = () =>
                    {
                        if( Dots )
                        {

                            let dot = [...Dots.querySelectorAll('.dot')];

                            for (let i = 0; i < Section.length; i++)
                            {
                                (Section[i].className.includes('active')) ? dot[i].classList.add('active') : dot[i].classList.remove('active');
                            }

                        }

                    }


                    let updateSteps = () =>
                    {

                        if( Steps )
                        {

                            let step = [...Steps.querySelectorAll('.step')];

                            for (let i = 0; i < step.length; i++)
                            {
                                step[i].classList.remove("active");
                            }

                            for (let i = 0; i < Section.length; i++)
                            {

                                if(Section[i].className.includes('active'))
                                {
                                    let filled = step.fill(0,1+i);
                                    for (let f = 0; f < 1+i; f++) filled[f].classList.add('active');
                                }
                            }

                        }

                    }


                    let updateController = () =>
                    {

                        for (let i = 0; i < Section.length; i++)
                        {

                            if(Section[i].className.includes('active'))
                            {

                                if( isPointed )
                                {

                                    Pointers[i].classList.add('active');
                                    //Section[i].classList.replace('hidden','visible');

                                    if(Controller.className.includes('autostep'))
                                    {

                                        let Last = Pointers[Section.length-1],

                                            pPos = parseInt(Pointers[i].offsetLeft),
                                            lPos = parseInt(Pointers[Section.length-1].offsetLeft),
                                            lWidh = parseInt( window.getComputedStyle(Last, null).getPropertyValue('width') ),
                                            cWidth = parseInt( window.getComputedStyle(Controller, null).getPropertyValue('width') ),
                                            maxPos = lPos-cWidth,

                                            cPos = parseInt(getComputedTranslateX(Controller))*-1;

                                        if(pPos<maxPos || !pPos)
                                        {
                                            Controller.style.transform = 'translate('+pPos*-1+'px,0)';
                                        }
                                        else if(pPos>=maxPos)
                                        {
                                            Controller.style.transform = 'translate('+(maxPos+lWidh)*-1+'px,0)';
                                        }

                                    }

                                }

                            }

                            else
                            {
                                if( isPointed ) { Pointers[i].classList.remove('active'); }
                            }

                        }


                    }

                    let goNext = () =>
                    {

                        if(NextPanel.className.includes('lock'))
                        {

                            ContentBox.style.transform = 'translate('+StandardPosition*-1+'px,0)';
                            PanelTarget.removeAttribute('draggable');

                            let Stopright = document.createElement('DIV');

                            Stopright.classList.add('stop-right');

                            ViewPortModelApp.appendChild(Stopright);
                            setTimeout(()=>{
                                ViewPortModelApp.removeChild(Stopright);
                            },1500)

                        }

                        else
                        {

                            //addSmooth();

                            PanelTarget.removeAttribute('draggable');
                            PanelTarget.classList.remove('active');
                            NextPanel.classList.add('active');


                            // if(!NextPanel.nextElementSibling && (window.getComputedStyle(ContentBox).width > window.getComputedStyle(NextPanel).width))
                            // {
                            //   let   NEW = parseInt( window.getComputedStyle(NextPanel).width ),
                            //         VCW = parseInt( window.innerWidth),
                            //         NCO = NextPanel.offsetLeft,
                            //
                            //   LastPosition = parseInt( (NCO)-(VCW-NEW) );
                            //
                            //   //it's last and small!
                            //   ContentBox.style.transform = 'translate('+(LastPosition*-1)+'px,0)';
                            // }
                            // else
                            // {
                                    ContentBox.style.transform = 'translateX('+NextOffset+'px)';
                            // }


                            // removeSmooth();

                            updateController();
                            updateSteps();
                            updateDots();

                        }

                    }

                    let goPrev = () =>
                    {

                        if(PrevPanel.className.includes('lock'))
                        {

                            ContentBox.style.transform = 'translate('+StandardPosition*-1+'px,0)';
                            PanelTarget.removeAttribute('draggable');

                            let Stopleft = document.createElement('DIV');

                            Stopleft.classList.add('stop-left');

                            ViewPortModelApp.appendChild(Stopleft);
                            setTimeout(()=>{
                                ViewPortModelApp.removeChild(Stopleft);
                            },1500)

                        }
                        else
                        {

                            //addSmooth();

                            PanelTarget.removeAttribute('draggable');

                            PanelTarget.classList.remove('active');
                            PrevPanel.classList.add('active');


                            ContentBox.style.transform = 'translateX('+PrevOffset+'px)';

                            // removeSmooth();

                            updateController();
                            updateSteps();
                            updateDots();

                        }

                    }



                }

            }

        }



    //--------------------------------------------------//



        const grid_y = () =>
        {

            setTimeout(()=>{

                for(let grid of [...document.querySelectorAll('.grid-y')])
                {

                    if(grid.className.split('col-')[0]) //alse is split in grid-x
                    {

                        for(gridbox of [...grid.querySelectorAll('.grid-y>*')])
                        {

                            let rowHeight = parseInt( window.getComputedStyle(grid).getPropertyValue('grid-auto-rows') ),
                                rowGap = parseInt( window.getComputedStyle(grid).getPropertyValue('grid-row-gap') );

                            (rowHeight<=0 || !rowHeight )?rowHeight=0:null;
                            (rowGap<=0 || !rowGap)?rowGap=0:null;

                            let rowSpan = Math.ceil((gridbox.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

                            gridbox.style.gridRowEnd = "span "+rowSpan;

                        }

                    }
                }

            },250)


        }



    //--------------------------------------------------//


        const warning = (sets,back) =>
        {
            if(sets==null || sets=='' || !sets)
            {
                sets = {}; sets.type='alert'; sets.content=false; sets.accept=false; sets.decline=false; sets.input=false; sets.placeholder=false;
            }

            let body = document.getElementsByTagName('HTML')[0],
                id  = Math.floor(Math.random() * 99999);

            ( makeit = () => {


                sets.content      = (!sets.content)?'<p>...</p>':sets.content;
                sets.accept       = (!sets.accept)?'ACCEPT':sets.accept;
                sets.decline      = (!sets.decline)?'DECLINE':sets.decline;
                sets.input        = (!sets.input)?'text':sets.input;
                sets.placeholder  = (!sets.placeholder)?'write a text here':sets.placeholder;

                if(sets.type=='alert')
                {

                    let html =
                        `
                        <div class="outbox warning gpuboost [status-active]" id="warningbox-`+id+`">
                            <div class="overlay">
                                <div class="side-center">
                                    <div>
                                        <div>
                                        `+sets.content+`
                                        </div>
                                        <div class="pad-[10]"></div>
                                        <div style="display:block">
                                            <div class="button accept">`+sets.accept+`</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

                    body.classList.add('gpuboost','vfxtransition-in','vfx-center');
                    body.insertAdjacentHTML('beforeEnd',html);

                }

                if(sets.type=='confirm')
                {

                    let html =
                        `
                        <div class="outbox warning gpuboost [status-active]" id="warningbox-`+id+`">
                            <div class="overlay">
                                <div class="side-center">
                                    <div>
                                        <div>
                                        `+sets.content+`
                                        </div>
                                        <div class="pad-[10]"></div>
                                        <div style="display:block">
                                            <div class="grid-x gap-20">
                                                <div class="box-[50-50-100]">
                                                    <div>
                                                        <div class="button accept">`+sets.accept+`</div>
                                                    </div>
                                                </div>
                                                <div class="box-[50-50-100]">
                                                    <div>
                                                        <div class="button decline">`+sets.decline+`</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

                    body.classList.add('gpuboost','vfxtransition-in','vfx-center');
                    body.insertAdjacentHTML('beforeEnd',html);

                }

                if(sets.type=='prompt')
                {

                    let html =
                        `
                        <div class="outbox warning gpuboost [status-active]" id="warningbox-`+id+`">
                            <div class="overlay">
                                <div class="side-center">
                                    <div>
                                        <div>
                                        `+sets.content+`
                                        </div>
                                        <div class="pad-[10]"></div>
                                        <div style="display:block">
                                            <div class="grid-x gap-20">
                                                <div class="box-[100-100-100]">
                                                    <div>
                                                        <div class="button"><input type="`+sets.input+`" value="" placeholder="`+sets.placeholder+`"></div>
                                                    </div>
                                                </div>
                                                <div class="box-[50-50-100]">
                                                    <div>
                                                        <div class="button accept">`+sets.accept+`</div>
                                                    </div>
                                                </div>
                                                <div class="box-[50-50-100]">
                                                    <div>
                                                        <div class="button decline">`+sets.decline+`</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

                    body.classList.add('gpuboost','vfxtransition-in','vfx-center');
                    body.insertAdjacentHTML('beforeEnd',html);

                }

            })();


            var box = document.getElementById('warningbox-'+id);


            ( clickit = () => {

                let links = box.getElementsByClassName('button');
                for (let link of links)
                {
                    link.addEventListener('click', event => {


                        if(event.target.classList.contains('accept') )
                        {

                            let res = true;
                            if(box.getElementsByTagName('INPUT').length>0)
                            {
                                let btn = box.getElementsByTagName('INPUT')[0]
                                btn.setAttribute('value',btn.value);
                                res = btn.getAttribute('value');
                            }

                            closeit();
                            if(typeof back === "function") return back(res);

                        }
                        else if(event.target.classList.contains('decline') )
                        {
                            closeit();
                            if(typeof back === "function")  return back(false);
                        }

                        function closeit()
                        {
                            clearInterval(boxexistcheck); boxexistcheck=null;

                            box.classList.add('off');

                            setTimeout( () => {
                                body.classList.remove('gpuboost','vfxtransition-in','vfx-center')
                                box.remove();
                            },300)
                        }

                    },false);
                }

            })();

            //If the user deletes it (anti sly)
            var boxexistcheck = setInterval( ()=>{
                if(document.getElementById('warningbox-'+id)==null) { makeit(); box = document.getElementById('warningbox-'+id); clickit(); }
            },1500);

        }


    //--------------------------------------------------//



        const outbox = () =>
        {


            let Viewport     = document.querySelector('*[class*="mode-"]'),
             	RelOutbox    = document.querySelectorAll('*[target^="outbox#"]'),
                OnLoadActive = Array.from( document.querySelectorAll('.outbox') );


			for (let i = 0; i < OnLoadActive.length; i++) if(!OnLoadActive[i].className.includes('status-active')) OnLoadActive.splice(i,i)

            let l = RelOutbox.length;
            for (let i = 0; i < l; i++)
            {


                let checktarget = RelOutbox[i].getAttribute('target').split('#')[1], undefinedtarget;

                if(checktarget=='' || checktarget==null || checktarget==undefined )
                {
                    debug(`:: [⚠ ui alert]: wrong outbox\n   ⮑ outbox target# anchor not defined!`),undefinedtarget=true;
                    RelOutbox[i].classList.add('debug-error');
                }

                else if(!document.getElementById(checktarget))
                {

                    if(undefinedtarget) debug(`:: [⚠ ui alert]: wrong outbox\n   ⮑  an outbox not finded!`);
                    else debug(`:: [⚠ ui alert]: wrong outbox\n   ⮑  outbox `+checktarget+` not exist!`);
                    RelOutbox[i].classList.add('debug-error');

                }

                else
                {

                    //open outbox
                    RelOutbox[i].onclick = event =>
                    {

                        //event.preventDefault();

                        let target = RelOutbox[i].getAttribute('target').split('#')[1],
                            OutBox = document.querySelectorAll('#'+target)[0],
                            OutBoxType = OutBox.querySelectorAll('.overlay>div[class^="side-"]')[0].className,
                            Overlay = OutBox.querySelectorAll('.overlay')[0];


                        // do open...

                        OutBox.classList.add('gpuboost','[status-active]');

                        if( OutBoxType.match('center') )
                        { addViewTransition('center'); }

                        else if( OutBoxType.match('top') )
                        { addViewTransition('top'); }

                        else if( OutBoxType.match('left') )
                        { addViewTransition('left'); }

                        else if( OutBoxType.match('right') )
                        { addViewTransition('right'); }

                        else if( OutBoxType.match('bottom') )
                        { addViewTransition('bottom'); }


                        //close outbox
                        OutBox.onclick = event =>
                        {

                            if( !OutBox.classList.contains('warning'))
                            {

                                if(event.target.className.includes('overlay') || event.target.className.includes('close') || event.target.className.includes('accept') )
                                {

                                    OutBox.classList.add('[status-off]');
                                    OutBox.classList.remove('[status-active]');

                                    setTimeout( () => {
                                        OutBox.classList.remove('[status-off]','[status-active]','gpuboost');
                                    },300)

                                    removedViewTransition(OutBox);

                                }
                            }

                        }


                    }


                    //auto open

					let ola = OnLoadActive.length;
                    for (let i = 0; i < ola; i++)
                    {

                        let OutboxOpen = OnLoadActive[i];
                        OutboxOpen.onclick = event =>
                        {

                            if(!OutboxOpen.classList.contains('warning') && (event.target.className.includes('close') || event.target.className.includes('accept') || event.target.classList.contains('overlay')))
                            {

                                OutboxOpen.classList.add('[status-off]');
                                OutboxOpen.classList.remove('[status-active]');

                                setTimeout( () => {
                                    OutboxOpen.classList.remove('[status-off]','[status-active]','gpuboost');
                                },300)

                                removedViewTransition(OutboxOpen);

                            }

                        }
                    }


                    let addViewTransition  = (side) =>
                    {

                        //Viewport.classList.add('gpuboost','vfxtransition-in','vfx'+side);
                        Viewport.classList.add('gpuboost','vfxtransition-in','vfx'+side);

                    }

                    let removedViewTransition  = (OutBox, side) =>
                    {

                        Viewport.classList.add('vfxtransition-out'),
                        Viewport.classList.remove('vfxtransition-in','vfxtop','vfxleft','vfxbottom','vfxright','vfxcenter');

                        setTimeout( () => {
                            OutBox.classList.remove('[status-off]','[status-active]','gpuboost'),
                            Viewport.classList.remove('vfxtransition-out','gpuboost');
                        },500)

                    }

                }


            }

        }



    //--------------------------------------------------//



        const absolute = () =>
        {


            let boxeslist = [...document.querySelectorAll('[class*="absolute-"]')];

            for (let box of boxeslist)
            {

                if( !box.parentNode.className.includes('outbox') &&
                    !box.parentNode.className.includes('side-') &&
                    !box.parentNode.className.includes('view') )
                    {
                      box.parentNode.style.position = 'relative';
                    }
            }


        }



    //--------------------------------------------------//



        const standardscroll = () =>
        {

            // :: IMPORTANT NOTE:
            // :: scroll-y is already managed by the browser.
            // :: Just cycle scroll-x to distinguish when the wheel will be transversal.
            // :: Conversely, if you tried to override the native y
            // :: event, you would go into constant errors!


            let scrollers = document.querySelectorAll('.scroll-x');

            for (scroller of scrollers)
            {

                scroller.onmouseover = ev =>
                {


                        let sensibility = ( typeof InstallTrigger !== 'undefined' /*is firefox? */) ? 4 : 2.5,
                            dir         = ( scroller.className.toLowerCase().includes('scroll-x') && !ev.target.className.toLowerCase().includes('scroll-y') ) ? 'X' : 'Y',
                            wheeldrift  = -1;

                        window.onwheel = ev_wheel =>
                        {

                            scroller.focus();
                            ev.preventDefault();
                            ev.stopPropagation();

                            wheeldrift++;
                            if(wheeldrift >= 1)
                            {


                                let traction =    (wheeldrift<5) ? (wheeldrift/3)
                                                : (wheeldrift>5 && wheeldrift<8) ? (wheeldrift/3.5)
                                                : (wheeldrift/4.5);

                                if(dir=='X')
                                {

                                    if(scroller==document.body)
                                    {
                                        if(ev_wheel.deltaY>0)          document.documentElement.scrollLeft += traction*(sensibility*ev_wheel.deltaY);
                                        else if(ev_wheel.deltaY<0)     document.documentElement.scrollLeft -= (traction*(sensibility*ev_wheel.deltaY))*-1;
                                    }
                                    else
                                    {
                                        if(ev_wheel.deltaY>0)          scroller.scrollLeft += traction*(sensibility*ev_wheel.deltaY);
                                        else if(ev_wheel.deltaY<0)     scroller.scrollLeft -= (traction*(sensibility*ev_wheel.deltaY))*-1;

                                    }

                                }

                                // else
                                // {
                                //     if(scroller!=document.body)
                                //     {
                                //         if(ev_wheel.deltaY>0)          scroller.scrollTop += traction*(sensibility*ev_wheel.deltaY);
                                //         else if(ev_wheel.deltaY<0)     scroller.scrollTop -= (traction*(sensibility*ev_wheel.deltaY))*-1;
                                //     }
                                // }

                                setTimeout(()=>{
                                    return wheeldrift = 0;
                                },150)

                            }

                        }

                }


            }


        }



    //--------------------------------------------------//



        const checkscrollersize = () =>
        {


            //'.checksize',
            let oversizes = [...document.querySelectorAll('.checksize, TABLE, CODE, PRE, OUTPUT')];

            for (let sizedbox of oversizes)
            {

                let targetwidth = parseInt(sizedbox.offsetWidth),
                    parentwidth = parseInt(sizedbox.parentNode.offsetWidth),
                    scrollwrap;

                if( !(sizedbox.parentNode.className.includes('scroll-x')) )
                {

                    let t = sizedbox.tagName;
                    if(t=='TABLE'||t=='CODE'||t=='PRE'||t=='OUTPUT')
                    {

                        let minw = parseInt(sizedbox.style.minWidth);

                        if(targetwidth > parentwidth)
                        {

                            let ScrollableWrap = document.createElement('div');

                            sizedbox.parentNode.insertBefore(ScrollableWrap, sizedbox);
                            ScrollableWrap.appendChild(sizedbox);
                            sizedbox.parentNode.classList.add('scroll-x');

                        }

                        else if( targetwidth <= parentwidth && sizedbox.parentNode.className.includes('checksize') )
                        {
                            sizedbox.parentNode.outerHTML = sizedbox.parentNode.innerHTML;
                        }

                    }

                    else
                    {

                        if( targetwidth > parentwidth )
                        {

                            //wrap it
                            let ScrollableWrap = document.createElement('div');

                            sizedbox.parentNode.insertBefore(ScrollableWrap, SizedBox);
                            ScrollableWrap.appendChild(SizedBox);
                            sizedbox.parentNode.classList.add('scroll-x','checksize');

                        }
                        else if(targetwidth <= parentwidth && sizedbox.parentNode.className.includes('checksize') )
                        {
                            sizedbox.parentNode.outerHTML = sizedbox.parentNode.innerHTML;
                        }


                    }

                }

            }


        }



    //--------------------------------------------------//



        const snapscroll = () =>
        {


            let allsnapsliders = document.querySelectorAll('.snap-x , .snap-y');


            //
            // 1 prepare for start
            //


            for (let slider of allsnapsliders)
            {


                let dragbox         = slider.querySelectorAll('.snaps')[0],
                    allboxes        = dragbox.querySelectorAll('.snaps>*'),
                    dotcontainer    = slider.querySelectorAll('.dots')[0],
                    active          = null,
					starerpos		= null;


                // if not active exist, make it

                if(!dragbox.getElementsByClassName('active')[0])
                    dragbox.firstElementChild.classList.add('active');

                active = dragbox.getElementsByClassName('active')[0];


                // start point position


				if(!slider.querySelectorAll('.snaptype-blocks').length)
				{
					starerpos = (slider.className.includes('snap-x'))
						? 'translateX(-'+active.offsetLeft+'px)'
						: 'translateY(-'+active.offsetTop+'px)'
				}
				else
				{
					if(slider.className.includes('snap-x'))
					{
						starerpos =  'translateX('+(active.offsetLeft-(slider.offsetWidth/2))+'px)'
					}
					else
					{
						starerpos = (active.offsetTop<=slider.offsetHeight/2)
										? 'translateY('+active.offsetTop+'px)'
										: 'translateY('+( (active.offsetTop-(active.offsetHeight/2))+(slider.offsetHeight/2) )+'px)'
					}
				}

				dragbox.style.transform = starerpos;

                //set dot

                if(dotcontainer)
                {

                    for ( let box of allboxes )
                    {

                        let dot,firstdot;

                        dot = document.createElement('span');
                        dotcontainer.appendChild(dot);
                        dot.classList.add('dot');

                        firstdot = dotcontainer.querySelectorAll('.dot')[0];
                        firstdot.classList.add("active");

                    }

                }


            }


            //
            // 2 make dynamic
            //


            for (let slider of allsnapsliders)
            {


                let isHorizontal    = slider.className.includes('snap-x') ? true : false,
                    autosnapping    = true,

                    snapsmainwrap   = slider.querySelectorAll('[class*="snaptype-"]')[0],
                    isblocks        = (snapsmainwrap.className.includes('-blocks')) ? true : false,
                    dragbox         = slider.querySelectorAll('.snaps')[0],
                    start           = null,
                    dir             = null,
                    allboxes        = dragbox.querySelectorAll('.snaps>*'),
                    active          = findActive(isHorizontal,isblocks,dragbox,null),

                    haveLabels      = slider.querySelectorAll('.snaplabels')[0] != null ? true : false,
                    labels          = null,

                    haveDots        = slider.querySelectorAll('.dot')[0] != null ? true : false,
                    dotcontainer    = null,
                    dot             = null,

                    next            = null,
                    prev            = null;


                // if initial active not exist... error!

                if (!active||active==undefined||active==null)
                    debug(`:: [⚠ ui alert]: wrong snap slider\n   ⮑ active class not found!\n   ⮑ element:`,dragbox);


                // if is wide or blocks

                if( dragbox.closest('.snaptype-wide') ) false
                else if( dragbox.closest('.snaptype-blocks') ) true
                else debug(`:: [⚠ ui alert]: wrong snap-x\n   ⮑ deprecated api or snapstype-xxx not found!`);


                // find labels

                if(haveLabels)
                    labels = slider.querySelectorAll('.snaplabels>*');


                // find dots

                if(haveDots)
                    dotcontainer = slider.querySelectorAll('.dot');

                // find arrow

                if(slider.querySelectorAll('.next'))
                    next = slider.querySelectorAll('.next')[0];

                if(slider.querySelectorAll('.prev'))
                    prev = slider.querySelectorAll('.prev')[0];


                // calculate total width

                let allboxdims = 0;
                // let rowboxeswidth = 0;

                if(isHorizontal)
                    for (let box of allboxes) allboxdims += box.offsetWidth;
                    // rowboxeswidth = allboxdims-slider.offsetWidth;
                else
                    for (let box of allboxes) allboxdims += box.offsetHeight;
                    // rowboxeswidth = allboxdims-slider.offsetHeight;



                // start to initial position
                if(isHorizontal && active.offsetLeft!=0)
                {
                    dragbox.style.transform = (isblocks)
                        ? 'translateX(-'+(snapsmainwrap.offsetLeft+active.offsetWidth/2)+'px)'
                        : 'translateX(-'+(snapsmainwrap.offsetLeft)+'px)';
                }

                else if(!isHorizontal && active.offsetTop!=0)
                {
                    dragbox.style.transform = (isblocks)
                        ? 'translateY(-'+(snapsmainwrap.offsetTop+active.offsetHeight/2)+'px)'
                        : 'translateY(-'+(snapsmainwrap.offsetTop)+'px)';
                }


                ////
                //// manual snap
                ////


                // get device type
                if(is_touch_device())
                {
                    dragbox.ontouchstart = snap_dragStart;
                    dragbox.ontouchmove = snap_dragMove;
                }
                else
                {
                    dragbox.onmousedown  = snap_dragStart;
                    dragbox.onmousedrag = snap_dragMove;
                }


                // on start drag
                function snap_dragStart (ev_snapslider)
                {

                    if( ev_snapslider.target.tagName.toLowerCase() != "a" && !ev_snapslider.target.closest('a')  )
                    {

                        ev_snapslider.preventDefault();
                        ev_snapslider.stopPropagation();

                        dir = null;

                        if(is_touch_device())
                        {
                            start = (isHorizontal) ? ev_snapslider.touches[0].clientX : ev_snapslider.touches[0].clientY;
                            document.ontouchmove = snap_dragMove;
                        }
                        else
                        {
                            start = (isHorizontal) ? ev_snapslider.clientX : ev_snapslider.clientY;
                            document.onmousemove = snap_dragMove;
                        }

                        active = findActive(isHorizontal,isblocks,dragbox,active,slider);

                    }

                }


                // on dragging
                function snap_dragMove (ev_snapslider)
                {


                    ev_snapslider.preventDefault();
                    ev_snapslider.stopPropagation();
                    autosnapping=false;


                    // check device type

                    if(is_touch_device())
                    {
                        dir =  (isHorizontal)
                            ? ev_snapslider.touches[0].clientX-start
                            : ev_snapslider.touches[0].clientY-start;
                    }
                    else
                    {
                        dir =  (isHorizontal)
                            ? ev_snapslider.clientX-start
                            : ev_snapslider.clientY-start;
                    }


                    // Update active class in runtime dragging (actual)

                    let index=0,
                        boxqnt = allboxes.length,
                        actual = active;

                    for (let box of allboxes)
                    {

                        // calc the distance of center

                        let boxmin,boxmax,centerdist;

                        if(isHorizontal)
                        {
                            boxmin     = box.offsetLeft,
                            boxmax     = box.offsetLeft+box.offsetWidth,
                            centerdist = (active.offsetLeft+active.offsetWidth/2) - dir;
                        }
                        else
                        {
                            boxmin     = box.offsetTop,
                            boxmax     = box.offsetTop+snapsmainwrap.offsetHeight,
                            centerdist = (active.offsetTop+active.offsetHeight/2) - dir ;
                        }


                        // if it' s first | proximity of start

                        if( index==0 && centerdist<boxmax )
                        {
                            allboxes[0].classList.add('active');
                            actual = allboxes[0];
                        }

                        // if it's last | proximity of end

                        else if( index==boxqnt-1 && centerdist>=boxmin )
                        {
                            allboxes[boxqnt-1].classList.add('active');
                            actual = allboxes[boxqnt-1];
                        }

                        // if it's in all range

                        else if( (index>=1 && index<boxqnt-1) && (centerdist>=boxmin && centerdist<=boxmax) )
                        {

                            for (let b of allboxes) b.classList.remove('active');

                            allboxes[index].classList.add('active');
                            actual = allboxes[index];

                        }

                        // if is !active, stopped, over or lost

                        else
                        {

                            if(dragbox.querySelectorAll('.snaps>.active').length>-1)
                            {
                                actual = active;
                                allboxes[index].classList.remove('active');
                            }
                            else
                            {
                                actual = allboxes[index];
                                actual.classList.add('active');
                            }

                        }


                        index++;

                        if(haveDots)
                            updateDots(slider,allboxes)

                    }


                    // check dragging position respect the cage limitss

                    let positon,actualposition,minimum,maximum;

                    if(isHorizontal)
                    {

                        actualposition = (isblocks)
                           ? parseInt( (actual.offsetLeft+(actual.offsetWidth/2)) - dir )
                           : parseInt(  actual.offsetLeft - dir );


                        minimum = (isblocks) ? snapsmainwrap.offsetLeft : snapsmainwrap.offsetWidth/2,
                        maximum = allboxdims-minimum;


                    }
                    else
                    {
                        actualposition = (isblocks)
                           ? parseInt( (actual.offsetTop+actual.offsetHeight/2-snapsmainwrap.offsetHeight/2) - dir )
                           : parseInt( actual.offsetTop - dir );

                        minimum = 0,
                        maximum = allboxdims-snapsmainwrap.offsetHeight;

                    }

                    if(actualposition<=minimum)
                    {
                        dragbox.classList.add('smooth');
                        position = minimum;
                    }

                    else if(actualposition>=maximum)
                    {
                        dragbox.classList.add('smooth');
                        position = maximum;
                    }

                    else
                    {
                        dragbox.classList.remove('smooth');
                        position = actualposition;
                    }

                    dragbox.style.transform = ( isHorizontal )
                        ? 'translateX(-'+(position)+'px)'
                        : 'translateY(-'+(position)+'px)';

                    document.ontouchend = snap_dragEnd;
                    document.onmouseup = snap_dragEnd;


                }


                // on drag end
                function snap_dragEnd (ev_snapslider)
                {

                    ev_snapslider.preventDefault();
                    ev_snapslider.stopPropagation();

                    document.onmousedown = true;
                    document.ontouchstart = true;
                    document.onmousemove = null;
                    document.ontouchmove = null;
                    document.onmouseup = true;
                    document.ontouchend = true;

                    //find active... if return the last empty, that is the active
                    active = findActive(isHorizontal,isblocks,dragbox,active);
                    active.classList.add('active');

                    let positon,activeposition,minimum,maximum;

                    if(isHorizontal)
                    {

                        activeposition = active.offsetLeft,
                        minimum = snapsmainwrap.offsetWidth/2 || snapsmainwrap.offsetLeft, //snapblock is width 0, snapwide is offset 0
                        maximum = allboxdims-minimum;
                    }
                    else
                    {
                        activeposition =  active.offsetTop,
                        minimum = 0,
                        maximum = allboxdims-snapsmainwrap.offsetHeight;
                    }


                    if(isHorizontal)
                    {

                        if(isblocks)
                        {
                            position =     (activeposition<=minimum) ? minimum
                                        :  (activeposition>=maximum) ? maximum
                                        :   (isblocks) ? activeposition+active.offsetWidth/2 : activeposition ;
                        }
                        else
                        {
                            position = active.offsetLeft;
                        }

                    }
                    else
                    {

                        if(isblocks)
                        {

                            position =     (activeposition<=minimum) ? minimum
                                         : (activeposition>=maximum) ? maximum
                                         :  active.offsetTop+active.offsetHeight/2-snapsmainwrap.offsetHeight/2;

                        }
                        else
                        {
                            position = active.offsetTop;
                        }

                    }



                    dragbox.classList.add('smooth');

                    dragbox.style.transform = (isHorizontal)
                            ? 'translateX(-'+position+'px)'
                            : 'translateY(-'+position+'px)';


                    if(haveLabels)
                        updateLabels(isHorizontal,allboxes,labels);


                    setTimeout(()=>{
                        dragbox.classList.remove('smooth');
                    },200);


                    setTimeout(()=>{
                        autosnapping=true;
                    },1000);

                }


                ////
                //// auto snap
                ////


                if(slider.className.includes('autosnap') )
                {

                    slider.onmouseover  = (ev_snapslider_autosnap) => { autosnapping=false; (ev_snapslider_autosnap) = null; }
                    slider.onmouseleave = (ev_snapslider_autosnap) => { autosnapping=true; (ev_snapslider_autosnap) = null; }
                    slider.ontouchstart = (ev_snapslider_autosnap) => { autosnapping=false; (ev_snapslider_autosnap) = null; }
                    slider.ontouchend   = (ev_snapslider_autosnap) => { autosnapping=true; (ev_snapslider_autosnap) = null; }

                    // timer start/pause/clear
                    let timer = parseInt(slider.className.split('autosnap-[')[1].split(']')[0]);
                    let sliding = setInterval(
                    ()=>{

                        let active = findActive(isHorizontal,isblocks,dragbox,null);

                        if(autosnapping)
                        {

                            if( !active.nextElementSibling )
                            {

                                dragbox.classList.add('smooth');
                                active.classList.remove('active');
                                allboxes[0].classList.add('active');

                                dragbox.style.transform = (isHorizontal)
                                        ? 'translateX(-'+snapsmainwrap.offsetLeft+'px)'
                                        : 'translateY(-'+snapsmainwrap.offsetTop+'px)';

                                if(haveDots)
                                    updateDots(slider,allboxes);

                                if(haveLabels)
                                    updateLabels(isHorizontal,allboxes,labels);


                            }

                            else
                            {

                                active.classList.remove('active');
                                active.nextElementSibling.classList.add('active');
                                active = findActive(isHorizontal,isblocks,dragbox,null);

                                let positon,activeposition,minimum,maximum;

                                minimum = 0,
                                maximum = allboxdims;

                                if(isHorizontal)
                                {

                                    activeposition = (isblocks)
                                        ? parseInt( active.offsetLeft+(active.offsetWidth/2) )
                                        : parseInt( active.offsetLeft );

                                    position = (activeposition<=minimum)
                                        ? minimum
                                        : (activeposition>=maximum) ? allboxdims
                                        :  activeposition;

                                }
                                else
                                {

                                    activeposition = (isblocks)
                                        ? parseInt( active.offsetTop-(snapsmainwrap.offsetHeight/2-active.offsetHeight/2) )
                                        : parseInt( active.offsetTop );

                                    position = (activeposition+snapsmainwrap.offsetHeight/4<=minimum)
                                        ? minimum
                                        : (activeposition+snapsmainwrap.offsetHeight/4>=maximum) ? allboxdims-snapsmainwrap.offsetHeight
                                        :  activeposition;

                                }

                                dragbox.classList.add('smooth');

                                dragbox.style.transform = (isHorizontal) ? 'translateX(-'+position+'px)': 'translateY(-'+position+'px)';

                                if(haveDots)
                                    updateDots(slider,allboxes);

                                if(haveLabels)
                                    updateLabels(isHorizontal,allboxes,labels);

                                setTimeout(()=>{
                                    dragbox.classList.remove('smooth');
                                },250)

                            }

                        }

                    },timer);

                }


                ////
                //// prev/next
                ////

                if(next)
                {

                    next.onclick = ev_snapslider_nextclick =>
                    {

                        active = findActive(isHorizontal,isblocks,dragbox,active);

                        let nextbox = active.nextElementSibling;

                        if(nextbox && !nextbox.className.includes('lock'))
                        {

                            dragbox.classList.add('smooth');

                            let minimum, maximum, position;

                            let activeposition =    (isHorizontal && isblocks) ? nextbox.offsetLeft+nextbox.offsetWidth/2
                                                  : (isHorizontal && !isblocks) ? nextbox.offsetLeft
                                                  : (!isHorizontal && isblocks) ? nextbox.offsetTop-nextbox.offsetHeight/2
                                                  : nextbox.offsetTop;

                            if(isHorizontal)
                            {

                                minimum = (isblocks) ? snapsmainwrap.offsetLeft : snapsmainwrap.offsetWidth/2,
                                maximum = allboxdims-minimum;

                                position =    (activeposition<=minimum) ? minimum
                                            : (activeposition>=maximum) ? maximum
                                            :  activeposition;

                            }
                            else
                            {
                                minimum = 0,
                                maximum = allboxdims-snapsmainwrap.offsetHeight;

                                position =    (activeposition+snapsmainwrap.offsetHeight/4<=minimum) ? minimum
                                            : (activeposition+snapsmainwrap.offsetHeight/4>=maximum) ? allboxdims-snapsmainwrap.offsetHeight
                                            :  activeposition;
                            }


                            dragbox.style.transform = (isHorizontal) ? 'translateX(-'+(position)+'px)' : 'translateY(-'+(position)+'px)';

                            active.classList.remove('active');
                            nextbox.classList.add('active');


                            let allboxesqnt = allboxes.length;
                            for (let i=0; i<allboxesqnt; i++)
                            {

                                if(allboxes[i].className.includes('active'))
                                {
                                    if(haveLabels)
                                    {
                                        labels[i].classList.add('active');
                                        labels[i].parentNode.style.transform = (isHorizontal)
                                                ? 'translateX(-'+labels[i].offsetLeft+'px)'
                                                : 'translateY(-'+labels[i].offsetTop+'px)';
                                    }

                                    if(haveDots)
                                        updateDots(slider,allboxes);

                                }

                                else
                                {

                                    if(haveLabels)
                                        labels[i].classList.remove('active');

                                }

                            }

                            setTimeout(()=>{
                                dragbox.classList.remove('smooth');
                            },300)

                        }

                        ev_snapslider_nextclick = null;

                    }

                }


                if(prev)
                {

                    prev.onclick = ev_snapslider_prevclick =>
                    {


                        active = findActive(isHorizontal,isblocks,dragbox,active);

                        let prevbox = active.previousElementSibling;

                        if(prevbox && !prevbox.className.includes('lock'))
                        {

                            dragbox.classList.add('smooth');

                            let minimum, maximum, position;

                            let activeposition =    (isHorizontal && isblocks) ? prevbox.offsetLeft+prevbox.offsetWidth/2
                                                  : (isHorizontal && !isblocks) ? prevbox.offsetLeft
                                                  : (!isHorizontal && isblocks) ? prevbox.offsetTop-prevbox.offsetHeight/2
                                                  : prevbox.offsetTop;

                            if(isHorizontal)
                            {
                                minimum = (isblocks) ? snapsmainwrap.offsetLeft : snapsmainwrap.offsetWidth/2,
                                maximum = allboxdims-minimum;

                                position =    (activeposition<=minimum) ? minimum
                                            : (activeposition>=maximum) ? maximum
                                            :  activeposition;

                            }
                            else
                            {
                                minimum = 0,
                                maximum = allboxdims-snapsmainwrap.offsetHeight;

                                position =    (activeposition+snapsmainwrap.offsetHeight/4<=minimum) ? minimum
                                            : (activeposition+snapsmainwrap.offsetHeight/4>=maximum) ? allboxdims-snapsmainwrap.offsetHeight
                                            :  activeposition;
                            }


                            dragbox.style.transform = (isHorizontal) ? 'translateX(-'+(position)+'px)' : 'translateY(-'+(position)+'px)';

                            active.classList.remove('active');
                            prevbox.classList.add('active');

                            let ll = allboxes.length;
                            for (let i=0; i<ll; i++)
                            {

                                if(allboxes[i].className.includes('active'))
                                {

                                    if(haveLabels)
                                    {
                                        labels[i].classList.add('active');
                                        labels[i].parentNode.style.transform = (isHorizontal)
                                                ? 'translateX(-'+labels[i].offsetLeft+'px)'
                                                : 'translateY(-'+labels[i].offsetTop+'px)';
                                    }

                                    if(haveDots)
                                        updateDots(slider,allboxes)

                                }

                                else
                                {

                                    if(haveLabels)
                                        labels[i].classList.remove('active');

                                }

                            }


                            setTimeout(()=>{
                                dragbox.classList.remove('smooth');
                            },300)

                        }

                        ev_snapslider_prevclick = null;

                    }

                }

            }


            function findActive(isHorizontal,isblocks,dragbox,active)
            {


                let index        = 0,
                    boxes        = dragbox.querySelectorAll('.snaps>*'),
                    haveActive   = !active ? false : true;

                //check if active exist or is lost

                for (let box of boxes)
                {

                    //if exist, update or remark it

                    if(box.classList.contains('active'))
                    {

                        //reset all dublicated

                        for (let b of boxes) b.classList.remove('active');

                        //make this the active

                        haveActive = true;

                        box.classList.remove("active");

                        active = (box.classList.contains("lock")) ? boxes[index-1] : box;

                        active.classList.add("active");


                    }

                    index++;

                }

                // if not exist, is last saved
                if(!haveActive) active = boxes[0];

                return active ;

            }

            function updateDots(slider,allboxes)
            {

                let bl = allboxes.length;
                for (let i=0; i<bl; i++)
                {

                    let dot = slider.querySelectorAll(".dots>.dot")[i];
                    if(dot) { (allboxes[i].className.includes('active')) ? dot.classList.add('active') : dot.classList.remove('active'); }

                }

            }

            function updateLabels(isHorizontal,allboxes,labels)
            {

                let bl = allboxes.length;
                for (let i=0; i<bl; i++)
                {

                    if(allboxes[i].className.includes('active'))
                    {

                        labels[i].classList.add('active');

                        if(isHorizontal) labels[i].parentNode.style.transform = 'translateX(-'+labels[i].offsetLeft+'px)';
                        else             labels[i].parentNode.style.transform = 'translateY(-'+labels[i].offsetTop+'px)';

                    }

                    else
                    {
                        labels[i].classList.remove('active');
                    }

                }

            }

        }


    //--------------------------------------------------//



        const autocrop = () =>
        {


            let croppeds = [...document.querySelectorAll('*[class*="autocrop"]')]

            for (let cropped of croppeds)
            {

                if(cropped.style.height == undefined || !cropped.style.height)
                {
                    let ph = String(cropped.parentNode.style.height)+"px";
                    cropped.style.height = ph;
                }

            }


        }



    //--------------------------------------------------//



        const flange = () =>
        {


            let Flanges = [...document.querySelectorAll('*[class*="flange"]')]


            let l = Flanges.length;
            for (let i = 0; i < l; i++)
            {

                setTimeout(()=>{

                    let Flange = Flanges[i],
                        Nav = Flange.closest('NAV'),
                        Trigger = Flange.parentNode,

                        flangeoffs,navoffs,position,
                        flangeheight,parentheight,
                        flangewidth,parentWidth,
                        isopen=false;


                    Flange.parentElement.style.position = 'relative';

                    setTimeout(()=>{

                        if(Flange.className.includes('flange-left') || Flange.className.includes('flange-right'))
                        {


                            if(Flange.tagName == 'DIV') //equalize height
                            {

                                Flange.style.height = Nav.offsetHeight+'px';

                                flangeoffs = (Flange.parentNode.offsetTop),
                                navoffs = (Nav.offsetTop),
                                positon = (navoffs-flangeoffs);

                                Flange.style.top = positon+'px';

                            }
                            else //center it (by height)
                            {

                                Flange.style.top = 0;

                                flangeheight = (Flange.offsetHeight)/2,
                                parentheight = (Flange.parentNode.offsetHeight)/2,
                                position = (flangeheight-parentheight)*-1;

                                Flange.style.marginTop = position+'px';

                            }

                            if(Flange.className.includes('flange-left'))
                            {
                                flangewidth = Flange.offsetWidth;
                                Flange.style.marginLeft = (flangewidth*-1)+'px';
                            }

                        }

                        if(Flange.className.includes('flange-top') || Flange.className.includes('flange-bottom'))
                        {

                            if(Flange.tagName == 'DIV') //equalize width
                            {

                                flangeoffs = parseInt(Flange.parentNode.offsetLeft),
                                navoffs = parseInt(Nav.offsetLeft),
                                position = navoffs-flangeoffs;

                                Flange.style.left = position+'px';
                                Flange.style.width = Nav.offsetWidth+'px';

                            }
                            else //center it (by width)
                            {

                                let flangewidth = parseInt(Flange.offsetWidth)/2,
                                    parentWidth = parseInt(Flange.parentNode.offsetWidth)/2,
                                    position = (flangewidth-parentWidth)*-1;

                                Flange.style.left = position+'px';

                            }


                            if(Flange.className.includes('flange-top'))
                            {
                                Flange.style.top = 0;
                                flangeheight = (Flange.offsetHeight)*-1;
                                Flange.style.marginTop = flangeheight+'px';
                            }


                            if(Flange.className.includes('flange-bottom'))
                            {
                                Flange.style.top = 0;
                                parentheight = (Flange.parentNode.offsetHeight);
                                Flange.style.marginTop = (parentheight)+'px';
                            }
                        }

                        //if not have animation motor... create a basic.
                        if ( !Trigger.className.includes('fx-') && !Flange.className.includes('fx-') )
                        {

                            Trigger.addEventListener('click', event => {toggleFlange(event); }, true);
                            Flange.addEventListener('mouseleave', event => {closeFlange(event); }, false);
                            document.body.addEventListener('click', event => {

                                if(!event.target.closest('NAV'))
                                {
                                    closeFlange(event);
                                }

                                document.body.onclick = null;

                            }, true);

                        }

                    },150)


                    let toggleFlange = (event) =>
                    {

                        if( event.target.closest('li') && (event.target.tagName.toLowerCase() == 'a'  || event.target.closest('a')) )
                        {
                            if(!isopen)
                            {

                                for (let i = 0; i < Flanges.length; i++)
                                {
                                    Flanges[i].classList.remove('[status-active]');
                                    Flanges[i].classList.remove('[status-off]');
                                    Flanges[i].classList.add('[status-off]');
                                }

                                Flange.classList.add('[status-active]');
                                Flange.classList.remove('[status-off]');
                                Trigger.classList.add('[status-active]');
                                Trigger.classList.remove('[status-off]');

                                isopen = true;

                            }

                            else if (isopen)
                            {

                                Flange.classList.add('[status-off]');
                                Flange.classList.remove('[status-active]');

                                Trigger.classList.add('[status-off]');
                                Trigger.classList.remove('[status-active]');

                                isopen = false;
                            }
                        }

                    }


                    let closeFlange = (event) =>
                    {

                        Flange.classList.add('[status-off]');
                        Flange.classList.remove('[status-active]');
                        Trigger.classList.add('[status-off]');
                        Trigger.classList.remove('[status-active]');

                        setTimeout(()=>{
                            Flange.classList.remove('[status-off]');
                            Flange.classList.remove('[status-active]');
                            Flange.previousElementSibling.classList.remove('[status-off]');
                            Flange.previousElementSibling.classList.remove('[status-active]');
                        },250)

                        return isopen = false;

                    }

                },200);

            }

        };



    //--------------------------------------------------//


        const draganddrop = { 'layers':[]};

        const grabs = () =>
        {


            ///// SET GRAB INACTIVE
            // :: when you start to drag, it's true.

            var grabbing = false;


            ///// SET RUNTIME DATA BINDER
            // :: it's a clone of ui object but this storicize
            // :: the html node elements (node collections), not
            // :: the ui output (so... string contens).

            var data = {
                'layers':[
                    // 'name': layername,
                    // 'elements'
                    // :[
                    //    {
                    //      'slot' : [slot_element_id, slot_element],
                    //      'box'  :[contente_lement_id, content_element]
                    //    },
                    // ]
                ]};


            // layers census to univoque

            let layerlist=[], census = [];
            for ( let box of document.querySelectorAll('.grabbox') ) { let names = String(box.parentNode.classList).split(' '); for (let name of names){ if(name.startsWith('grabslot')){ census.push(name);}}}
            layerlist = census.filter( (i, n) => { return census.indexOf(i) == n; })


            // save univoque layers in data binder

            let ln= 0; for ( let layername of layerlist )
            {
                data.layers.push({
                    'name': layername,
                    'elements': []
                });
            }

            // save start slots and contents in data binder layers

            for ( let layer of data.layers )
            {

                let slotfinded = [...document.querySelectorAll("[class*='"+layer.name+"']")]
                for ( let slot of slotfinded )
                {

                    layer.elements.push({
                        'slot': slot,
                        'slotid': slot.id,
                        'box': slot.firstElementChild,
                        'boxid':slot.firstElementChild.id
                    });

                }
            }


            ///// MAKE GRAB SYSTEM

            // (method) collider

            function detectcollision(X,Y,T)
            {

                let xpos,ypos,parentX,parentY,TLeft,TTop;

                parentY = (T.closest('.scroll-y')) ? T.closest('.scroll-y').scrollTop : 0;
                parentX = (T.closest('.scroll-x')) ? T.closest('.scroll-x').scrollLeft : 0;

                xpos =  (document.body.scrollLeft || window.pageXOffset)  + parentX + X,
                ypos =  (document.body.scrollTop  || window.pageYOffset ) + parentY + Y;

                TTop    = getoffsetTop(T),  TBottom = (TTop+T.offsetHeight),
                TLeft   = getoffsetLeft(T), TRight  = (TLeft+T.offsetWidth);

                if ( ( ypos>TTop && ypos<TBottom ) && ( xpos>TLeft && xpos<TRight )  ) { return true; };

            }

            // loop the matrix of elements

            for (let layer of data.layers)
            {   for (let element of layer.elements)
                {

                    // (method) active/deactive drag on element

                    function makedragable(el)   { el.draggable = true;  }
                    function removedragable(el) { el.draggable = false; }

                    // on cross start

                    if( is_touch_device() ) element.box.addEventListener('touchstart', startgrab ,false);
                    else                    element.box.addEventListener('mousedown',  startgrab ,false);

                    function startgrab(event)
                    {
                        ev_grabs_start = event || window.event;

                        let tagTarget = ev_grabs_start.target.tagName.toLowerCase();

                        if( tagTarget.draggable!=false && tagTarget != 'input' && tagTarget != 'a' )
                        {
                            // save start slot & box

                            let startslot = element.slot,
                                startbox  = element.box;

                            // lock box size
                            let swidth       = startbox.offsetWidth,
                                sheight      = startbox.offsetHeight,
                                starsize     = 'width:'+swidth+'px; height:'+sheight+'px;';

                            startbox.style='width:'+swidth+'px; height:'+sheight+'px;';
                            startslot.style='width:'+startslot.offsetWidth+'px; height:'+startslot.offsetHeight+'px;';

                            ev_grabs_start.preventDefault();

                            makedragable(element.box);

                            if(!grabbing)
                            {

                                // (longtap emulation)
                                var starttap = new Date().getTime(),
                                    taptime = setInterval(()=>{
                                        let timeDiff = (new Date().getTime()-starttap);
                                        if(timeDiff>=750) { dragboxnow(); }
                                        else
                                        {
                                            if( is_touch_device() ) document.ontouchend = () => { clearInterval(taptime); };
                                            else                    document.onmouseup  = () => { clearInterval(taptime); };
                                        }
                                    },10);


                                function dragboxnow ()
                                {

                                    grabbing = true;

                                    clearInterval(taptime);


                                    // save start stratum (active layer) & make evident

                                    let stratum = document.querySelectorAll('[class*="'+layer.name+'"]');
                                    for(let slot of stratum) slot.classList.add('stratum');




                                    // get box position

                                    let xScroll = (document.documentElement.scrollLeft || window.pageXOffset)+document.body.scrollLeft,
                                        yScroll = (document.documentElement.scrollTop || window.pageYOffset)+document.body.scrollTop,
                                        xBoxPos = getoffsetLeft(startbox),
                                        yBoxPos = getoffsetTop(startbox);

                                    if(startbox.closest('.scroll-x')) xScroll =  xScroll+startbox.closest('.scroll-x').scrollTop;
                                    if(startbox.closest('.scroll-y')) yScroll =  yScroll+startbox.closest('.scroll-y').scrollTop;


                                    if ( is_touch_device() )
                                    {
                                        xPointerStart  =ev_grabs_start.touches[0].clientX  + xScroll;
                                        yPointerStart =ev_grabs_start.touches[0].clientY + yScroll;
                                    }
                                    else
                                    {
                                        xPointerStart  =ev_grabs_start.clientX  + xScroll;
                                        yPointerStart =ev_grabs_start.clientY + yScroll;
                                    }

                                    // storicize edge wrapper limit
                                    // if you're in proximity of it, scroll container.

                                    var isntScroller, scroller, edgetop, edgeleft, edgeright, edgebottom;

                                    if( startbox.closest('.scroll-y') )       { isntScroller=false; scroller = startbox.closest('.scroll-y').parentNode }
                                    else if(startbox.closest('.scroll-x'))    { isntScroller=false; scroller = startbox.closest('.scroll-x').parentNode }
                                    else                                      { isntScroller=true;  scroller = document.documentElement || window; }

                                    if(scroller)
                                    {
                                        if(isntScroller)
                                        {
                                            edgetop    = parseInt(document.body.scrollTop  || window.pageYOffset)+33,
                                            edgeleft   = parseInt(document.body.scrollLeft || window.pageXOffset)+33,
                                            edgeright  = edgeleft+scroller.offsetWidth-33,
                                            edgebottom = edgetop+scroller.offsetHeight-33;
                                        }
                                        else
                                        {
                                            edgetop    = getoffsetTop(scroller)+33,
                                            edgeleft   = getoffsetLeft(scroller)+33,
                                            edgeright  = getoffsetLeft(scroller)+scroller.offsetWidth-33,
                                            edgebottom = getoffsetTop(scroller)+scroller.offsetHeight-33;
                                        }
                                    }



                                    // now box is fixed and active
                                    startbox.classList.add('active');
                                    startbox.classList.remove('off');

                                    // now box is relative and active
                                    startslot.classList.add('active');
                                    startslot.classList.remove('off');


                                    // move box in position

                                    startbox.style.left = parseInt(xBoxPos-xScroll) + "px";
                                    startbox.style.top  = parseInt(yBoxPos-yScroll) + "px";



                                    ////// on dragging

                                    if(is_touch_device())   document.ontouchmove = ev_grabs_move => movegrab(ev_grabs_move);
                                    else                    document.onmousemove = ev_grabs_move => movegrab(ev_grabs_move);

                                    function movegrab (ev_grabs_move)
                                    {

                                        ev_grabs_move.preventDefault();
                                        ev_grabs_move.stopPropagation();


                                        // calc pointer position

                                        let mX,mY;

                                        if ( is_touch_device() )
                                        {
                                            mX   = ev_grabs_move.touches[0].clientX;
                                            mY   = ev_grabs_move.touches[0].clientY;
                                        }
                                        else
                                        {
                                            mX   = ev_grabs_move.clientX;
                                            mY   = ev_grabs_move.clientY;
                                        }


                                        // move box in position

                                        startbox.style.left = parseInt( ((mX-xPointerStart)+xBoxPos) ) + "px";
                                        startbox.style.top  = parseInt( ((mY-yPointerStart)+yBoxPos) ) + "px";

                                        // scroll container with box

                                        let YCoord = parseInt( (document.body.scrollTop  || window.pageYOffset) + mY ),
                                            XCoord = parseInt( (document.body.scrollLeft || window.pageXOffset) + mX );

                                        let scrolltarget = (isntScroller)?scroller:scroller.firstElementChild;

                                        if( YCoord <= edgetop) { scrolltarget.scrollTop -= 50;  }
                                        else if( YCoord >= edgebottom) { scrolltarget.scrollTop += 50;  }

                                        if( XCoord < edgeleft) { scrolltarget.scrollLeft -= 50;  }
                                        else if( XCoord > edgeright) { scrolltarget.scrollLeft += 50;  }


                                        // is it in layer?

                                        let endslot=null;

                                        for(let slot of stratum)
                                        {

                                            slot.classList.remove('active');

                                            if(slot!=startslot)
                                            {
                                                slot.removeAttribute('style');
                                                slot.firstElementChild.removeAttribute('style');
                                            }

                                            if( detectcollision(mX,mY,slot) )
                                            {

                                                endslot = slot;

                                                if(endslot!=startslot)
                                                    endslot.classList.add('active');

                                            }
                                            else
                                            {
                                                slot.classList.remove('active');
                                            }


                                        }


                                        ////// on drag end
                                        // :: startbox!=null exist in that palce beacouse the end of
                                        // :: the element is linked to the document, not the object.
                                        // :: so it start from this point... and not when we get startbox.

                                        if(is_touch_device()) document.ontouchend  = ev_grabs_end => { if(startbox!=null){ endgrab(ev_grabs_end,startslot,endslot,taptime); }}
                                        else                  document.onmouseup   = ev_grabs_end => { if(startbox!=null){ endgrab(ev_grabs_end,startslot,endslot,taptime); }}


                                        function endgrab(ev_grabs_end,startslot,endslot,taptime)
                                        {


                                            if(!endslot || endslot==null || endslot==startslot) //!endslot || endslot==null ||
                                            {

                                                removedragable(startslot.firstElementChild);

                                                // release grag
                                                startbox.classList.add('off');
                                                startslot.classList.add('off');

                                                // reset box
                                                setTimeout(()=>{

                                                    startbox.classList.remove('active','off');
                                                    startslot.classList.remove('active','off');
                                                    // startbox.firstElementChild.classList.remove('active','off');
                                                    startbox.removeAttribute('style');

                                                    hardreset();

                                                },500)


                                            }

                                            else
                                            {

                                                removedragable(startslot.firstElementChild);
                                                removedragable(endslot.firstElementChild);

                                                let primaryslot = startslot,
                                                    primarybox  = startbox;

                                                let secondaryslot = endslot,
                                                    secondarybox  = endslot.firstElementChild;

                                                primaryslot.appendChild(secondarybox);
                                                secondaryslot.appendChild(primarybox);

                                                primaryslot.classList.remove('active','off');
                                                primaryslot.firstElementChild.classList.remove('active','off');

                                                secondaryslot.classList.remove('active','off');
                                                secondaryslot.firstElementChild.classList.remove('active','off');

                                                primaryslot.style = '';
                                                primarybox.style = '';
                                                secondaryslot.style = '';
                                                secondarybox.style = '';

                                                hardreset();

                                            }

                                            function hardreset()
                                            {
                                                startbox=null;
                                                startslot=null;

                                                // element.removeEventListener("mousedown", handleMouseDown, true)

                                                // reset calls
                                                document.ontouchstart = null;
                                                document.onmousedown = null;
                                                document.ontouchmove = null;
                                                document.onmousemove = null;

                                                ///// end of game... reset all.
                                                for(let slot of stratum) slot.classList.remove('stratum');

                                                movegrab=null;
                                                ev_grabs_start = null;
                                                ev_grabs_move = null;
                                                ev_grabs_end = null;

                                                grid_y();
                                                grabs(); // reload this whole function so, refresh lists, objects and ui returns

                                            }



                                        }


                                    }



                                }

                            }

                        }

                    }

                }
            }

            // Constructor
            // :: from data to ui object "draganddrop"
            // :: it's called on first launch and via
            // :: grabreset function when release dragging

            draganddrop.layers=[];

            for (let slotdata of data.layers)
            {

                draganddrop.layers.push({
                    'name': slotdata.name,
                    'elements':[]
                })

            }

            for (let layer of draganddrop.layers)
            {
                for (let slotdata of data.layers)
                {
                    if(slotdata.name == layer.name)
                    {
                        for (let dataelem of slotdata.elements)
                        {
                            layer.elements.push({
                                'slot-id' : dataelem.slotid,
                                'box-id': dataelem.boxid,
                                'box-raw': dataelem.box.innerHTML.replace(/\n|\t/g, ' ').replace(/\s{2,}/g, ' '),
                                // 'box-html': btoa(dataelem.box.innerHTML)
                            })

                        }
                    }
                }
            }

            return draganddrop;

        }



    //--------------------------------------------------//


        const passwords = () =>
        {

            let btnpasslist = document.querySelectorAll('*[class*="button-password"]');

            for (let btn of btnpasslist)
            {

                let iconText = btn.getElementsByTagName('img')[0],
                    iconPass = btn.getElementsByTagName('img')[1],
                    _Text = btn.getElementsByTagName('input')[0],
                    _Pass = btn.getElementsByTagName('input')[1];

                iconText.classList.add('active');
                iconPass.classList.add('off');
                _Text.classList.add('off');
                _Pass.classList.add('active');

                _Pass.value=_Text.value;

                iconText.onclick = () =>
                {
                    iconText.classList.replace('active','off');
                    iconPass.classList.replace('off','active');
                    _Text.classList.replace('off','active');
                    _Pass.classList.replace('active','off');
                }

                iconPass.onclick = () =>
                {
                    iconText.classList.replace('off','active');
                    iconPass.classList.replace('active','off');
                    _Text.classList.replace('active','off');
                    _Pass.classList.replace('off','active');
                }


                btn.addEventListener('focus',()=>{

                    let copy = setInterval(()=>{
                        btn.querySelectorAll('input.off')[0].value = btn.querySelectorAll('input.active')[0].value;
                    }, 200);

                    btn.addEventListener('blur',()=>{
                        window.clearInterval(copy);
                    },true)

                },true)

            }

        };


        const starts = () =>
        {

            let buttonstarsboxlist = document.querySelectorAll('.stars');

            for (let btn of buttonstarsboxlist)
            {

                let actual = btn.previousElementSibling.value,
                    emotion = ['very bad','not good','normal/good','very good','exellent'],
                    html_output,
                    allstarsbox,
                    alllabelbox;

                // set to start

                html_output = `<span class="all-stars"></span><span class="all-labels"></span>`
                btn.innerHTML = html_output;

                allstarsbox = btn.querySelectorAll('.all-stars')[0];

                for (let s = 0; s < 5; s++)
                {
                    html_output = `<svg class="off" data-rating="`+(s+1)+`"><path d="M12.6504 17.8019L18.8304 21.5319L17.1904 14.5019L22.6504 9.77186L15.4604 9.16186L12.6504 2.53186L9.84039 9.16186L2.65039 9.77186L8.11039 14.5019L6.47039 21.5319L12.6504 17.8019Z"/></svg>`;
                    allstarsbox.innerHTML += html_output;
                }

                alllabelbox = btn.querySelectorAll('.all-labels')[0];

                for (let l = 0; l < 5; l++)
                {
                    let visibility = (l==actual) ? "show" : "hide";
                    html_output = `<p class="`+visibility+`">`+emotion[l]+`</p>`;
                    alllabelbox.innerHTML += html_output;
                }


                let allstars = allstarsbox.getElementsByTagName('svg'),
                    alllabel = alllabelbox.getElementsByTagName('p');


                // reset active

                for (let s = 0; s < 5; s++)
                {
                    allstars[s].classList.remove('active');
                }


                for (let s = 0; s < 5; s++)
                {
                    let star = allstars[s];
                    if (actual == allstars[s].dataset.rating)
                    {
                        star.classList.add('active')
                        star.classList.remove('off');
                    }
                }

                for (let s = 0; s < 5; s++)
                {

                    let star = allstars[s];

                    // set to hover
                    star.addEventListener('mouseover',()=>{

                        for (let t = 0; t < 5; t++)
                        {
                            (t<=s)
                                ? allstars[t].classList.add('focus')
                                : allstars[t].classList.remove('focus');

                            (t==s)
                                ? alllabel[t].classList.replace('hide','show')
                                : alllabel[t].classList.replace('show','hide');
                        }

                    },true);


                    // reset on blur
                    star.addEventListener('mouseleave',()=>{
                        for (let t = 0; t < 5; t++){    allstars[t].classList.remove('focus');     alllabel[t].classList.replace('show','hide');}
                        for (let t = 0; t < 5; t++){ if(allstars[t].classList.contains('active')) {alllabel[t].classList.replace('hide','show');} }
                    },true);

                    // set to click
                    star.addEventListener('click',()=>{

                        // reset active
                        for (let t = 0; t < 5; t++){ allstars[t].classList.replace('active','off');  alllabel[t].classList.replace('show','hide');}

                        // make active
                        btn.setAttribute('data-stars', star.dataset.rating);
                        star.classList.replace('off','active');
                        alllabel[s].classList.replace('hide','show');


                        if(btn.previousElementSibling.tagName == 'INPUT')
                        {
                            btn.previousElementSibling.value = star.dataset.rating;
                            btn.previousElementSibling.setAttribute('value',star.dataset.rating)
                        }

                    },true);

                }

            }


        };


        const numbers = () =>
        {

            let buttonnumberslist = document.querySelectorAll('*[class*="button-number"]');

            for (let btn of buttonnumberslist)
            {


                // get input values

                let taginput = btn.querySelectorAll('input[type="number"]')[0],
                    val      = taginput.getAttribute('value'),
                    min      = taginput.getAttribute('min'),
                    max      = taginput.getAttribute('max');

                // build the numbers into cage

                btn.insertAdjacentHTML('beforeEnd','<div class="number-slider"></div>');
                let slide = btn.querySelectorAll('.number-slider')[0];

                for (let i = min; i <= max; i++) slide.insertAdjacentHTML('beforeEnd',`<span class="number-[`+i+`]"><small>`+i+`</small></span>`);


                //set active by input

                slide.querySelectorAll('[class*="number-['+val+']"]')[0].classList.add('active');

                //slide to start

                function refreshActivation()
                {
                    setTimeout(()=>{

                        let numberactive   = slide.querySelectorAll('.number-slider .active')[0],
                            activeposition = ((numberactive.offsetLeft+(numberactive.offsetWidth/2))-(btn.offsetWidth/2));
                            slide.style.transform = 'translateX('+( activeposition*-1 )+'px)';

                    },200);
                }

                refreshActivation();

                // on drag it

                slide.ontouchstart = dragStart;
                slide.onmousedown = dragStart;
                slide.ontouchmove = dragMove;
                slide.ontouchend = dragEnd;

                let startX, dirX;

                function dragStart(ev_drag_btn_numbers)
                {

                    let actualposition = slide.style.transform.replace(/[^\d.]/g, '')*-1;

                    slide.classList.add('[status-active]');
                    slide.classList.remove('[status-off]');

                    if (is_touch_device())
                    {
                        startX = ev_drag_btn_numbers.touches[0].clientX - actualposition;
                    }
                    else
                    {
                        ev_drag_btn_numbers.preventDefault();
                        startX = event.clientX - actualposition;
                        document.onmousemove = dragMove;
                        document.onmouseup = dragEnd;
                    }

                }

                function dragMove(ev_drag_btn_numbers)
                {

                    ev_drag_btn_numbers.preventDefault();

                    if (is_touch_device())
                    {
                        dirX = ev_drag_btn_numbers.touches[0].clientX - startX;
                    }
                    else
                    {
                        dirX = ev_drag_btn_numbers.clientX - startX;
                    }

                    slide.style.transform = "translateX("+dirX+"px)";

                    checkactive();

                }

                function dragEnd(ev_drag_btn_numbers)
                {

                    slide.classList.remove('[status-active]');
                    slide.classList.add('[status-off]');

                    startX = dirX*-1;
                    startvalueposition = startX*-1;
                    document.onmouseup = null;
                    document.onmousemove = null;

                    let actualposition = slide.style.transform.replace(/[^\d.]/g, '')*-1,
                        active = slide.querySelectorAll('.number-slider>.active')[0],
                        activepos = (active.offsetLeft+active.offsetWidth/2)-btn.offsetWidth/2;

                    slide.classList.add('smooth');
                    slide.style.transform = 'translateX('+( activepos*-1 )+'px)'; //activepos or correction

                    setTimeout(()=>{
                        slide.classList.remove('smooth');
                    },300);

                    taginput.setAttribute('value', active.getElementsByTagName('small')[0].innerText );

                    ev_drag_btn_numbers=null;

                }

                function checkactive()
                {

                    let actualposition = slide.style.transform.replace(/[^\d.]/g, '');

                    //aclual active position
                    let actualactive   = [...slide.querySelectorAll('.number-slider>.active')][0],
                        activeposition = (actualactive.offsetLeft+actualactive.offsetWidth/2)-btn.offsetWidth/2;

                    if( actualposition > activeposition+actualactive.offsetWidth/2 )
                    {

                        if(actualactive.nextElementSibling)
                        {
                            actualactive.nextElementSibling.classList.add('active');
                            actualactive.classList.remove('active');
                            actualactive = [...slide.querySelectorAll('.number-slider>.active')][0];
                        }

                    }

                    else if( actualposition < activeposition-actualactive.offsetWidth/2 )
                    {

                        if(actualactive.previousElementSibling)
                        {
                            actualactive.previousElementSibling.classList.add('active');
                            actualactive.classList.remove('active');
                            actualactive = [...slide.querySelectorAll('.number-slider>.active')][0];
                        }
                    }

                }


                // on click next/prev

                let minus = btn.getElementsByTagName('span')[0],
                    plus  = btn.getElementsByTagName('span')[1];

                minus.onclick = ()=>
                {
                    let exactive  = slide.querySelectorAll('.number-slider>.active')[0],
                        newactive = exactive.previousElementSibling;
                    movefromon(exactive,newactive);
                }
                plus.onclick = ()=>
                {
                    let exactive  = slide.querySelectorAll('.number-slider>.active')[0],
                        newactive = exactive.nextElementSibling;
                    movefromon(exactive,newactive);
                }

                function movefromon(exactive,newactive)
                {
                    newactive.classList.add('active');
                    exactive.classList.remove('active');

                    setTimeout(()=>{

                        taginput.setAttribute('value', newactive.getElementsByTagName('small')[0].innerText );

                        let reposition = (newactive.offsetLeft+newactive.offsetWidth/2)-btn.offsetWidth/2;
                        slide.classList.add('smooth');
                        slide.style.transform = 'translateX('+(reposition*-1)+'px)';

                        setTimeout(()=>{
                            slide.classList.remove('smooth');
                        },250);

                    },250);

                }

            }

        };


        const ranges = () =>
        {

            let buttonrangeslist = document.querySelectorAll('*[class*="button-range"]');

            for (let btn of buttonrangeslist)
            {


                let slider    = btn.querySelectorAll('.slider')[0],
                    monitor   = btn.querySelectorAll('.monitor')[0],
                    inputtags = btn.querySelectorAll('input'),
                    inputsqnt = inputtags.length;

                monitor.classList.add("[status-off]");

                for (let i = 0; i < inputsqnt; i++)
                {

                    setTimeout(()=>{

                        let range = inputtags[i];

                        // start inputs values
                        let min            = range.getAttribute('min'),
                            max            = range.getAttribute('max'),
                            val            = range.getAttribute('value'),
                            containerwidth = range.offsetWidth,
                            bullet         = range.nextElementSibling.nextElementSibling,
                            haveline;

                        // is it flaot?

                        let type = range.getAttribute('type'),
                            dot = (type.match('float')) ? 2 : 0 ;

                        //get steps (% and not)

                        let matchpercent = ""+range.step,
                            isPercent,
                            stepper;

                        if(matchpercent.match('%'))
                        {
                            isPercent = 1;
                            let stepstring = ""+range.step,
                            stepsplit = stepstring.split('%')[0];
                            stepper = parseFloat(stepsplit);
                        }
                        else
                        {
                            isPercent = 0;
                            stepper = parseFloat(range.step);
                        }

                        //Dot on start position

                        let presetdot = GetPercentage(min,max,val);

                        bullet.style.left = presetdot+"%";

                        setLine();


                        // on drag elements

                        bullet.ontouchstart = btnrange_dragStart;
                        bullet.onmousedown = btnrange_dragStart;


                        let startX, dirX;

                        function btnrange_dragStart(ev_drag_btn_range)
                        {

                            //update drag on click for outbox
                            containerwidth = range.offsetWidth

                            let actualposition = bullet.offsetLeft;
                            if (ev_drag_btn_range.type === "touchstart")
                            {

                                let touchX = (ev_drag_btn_range.touches[0].clientX);
                                    startX = (touchX - actualposition);

                                bullet.ontouchmove = btnrange_dragMove;
                                bullet.ontouchend = btnrange_dragEnd;

                            }
                            else
                            {

                                ev_drag_btn_range.preventDefault();

                                let mouseX = (event.clientX);
                                    startX =  (mouseX - actualposition);

                                document.onmousemove = btnrange_dragMove;
                                document.onmouseup = btnrange_dragEnd;

                            }

                            bullet.classList.add('[status-active]');
                            bullet.classList.remove('[status-off]');

                        }


                        function btnrange_dragMove(ev_drag_btn_range)
                        {


                            let prevBullet = range.closest('.sliders').querySelectorAll('b')[i-1], prevElemPosition, prevPercentage;
                            if(prevBullet)
                            {
                                prevElemPosition = parseInt(prevBullet.offsetLeft),
                                prevPercentage = parseInt(GetPercentage(0,containerwidth,prevElemPosition));
                            }
                            else { prevPercentage=-1 }


                            let nextBullet = range.closest('.sliders').querySelectorAll('b')[i+1],nextElemPosition,nextPercentage;
                            if(nextBullet)
                            {
                                nextElemPosition = parseInt(nextBullet.offsetLeft),
                                nextPercentage = parseInt(GetPercentage(0,containerwidth,nextElemPosition));
                            } else(nextPercentage=101)


                            ev_drag_btn_range.preventDefault();


                            dirX = ( is_touch_device() )
                                ? (ev_drag_btn_range.touches[0].clientX - startX)
                                : (ev_drag_btn_range.clientX - startX);



                            if (dirX > -1 && dirX < containerwidth+1)
                            {
                                console.log('draggg',dirX);

                                let bulletpercent, newval;

                                if(!range.step)
                                {

                                    bulletpercent  = GetPercentage(0,containerwidth,dirX);
                                    newval  = GetVal(min,max,bulletpercent);


                                    if(bulletpercent > prevPercentage && bulletpercent < nextPercentage)
                                    {
                                        setdot(bulletpercent,newval);
                                    }

                                }
                                else
                                {


                                    if(isPercent)
                                    {


                                        let stepcut = Number( (containerwidth*stepper)/100 ).toFixed(dot); //is a step in px of container

                                        let pass = -1;
                                        for (let i = min; i < max; i++)
                                        {

                                            pass++;

                                            let rangemid = (stepcut*pass);
                                                rangemin = (rangemid)-(stepcut/2),
                                                rangemax = (rangemid)+(stepcut/2)


                                            if(dirX > rangemin && dirX < rangemax)
                                            {

                                                let actualstep = rangemin+(stepcut/2),
                                                    bulletpercent = GetPercentage(0,containerwidth,actualstep),
                                                    newval  = GetVal(min,max,bulletpercent);

                                                if(bulletpercent > prevPercentage && bulletpercent < nextPercentage)
                                                {
                                                    setdot(bulletpercent,newval);
                                                }

                                            }

                                        }


                                    }
                                    else
                                    {


                                        bulletpercent  = GetPercentage(0,containerwidth,dirX);
                                        newval  = GetVal(min,max,bulletpercent);


                                        let pass = 0;
                                        for (let i = min; i < max; i++)
                                        {

                                            pass++;
                                            let valuepass = Number( ((min-stepper)+(stepper*pass)) );

                                            if(valuepass > max) { return false; }


                                            let rangemin = (valuepass-(stepper/2))
                                                rangemax = (valuepass+(stepper/2));

                                            if(newval > rangemin && newval < rangemax)
                                            {

                                                range.setAttribute('value', valuepass);
                                                val = range.value;

                                                let newmax = max,
                                                    newmin = min;

                                                bulletpercent = GetPercentage(min,max,val)

                                                if(bulletpercent > prevPercentage && bulletpercent < nextPercentage)
                                                {
                                                    setdot(bulletpercent,val);
                                                }

                                            }

                                        }


                                    }

                                }

                                function setdot(bulletpercent,newval,dot)
                                {

                                    bullet.style.left  = bulletpercent+"%";
                                    monitor.style.left = bulletpercent+"%";

                                    if(dot<=0)
                                    {
                                        let roundval = Math.ceil(newval);
                                            monitor.innerHTML = '<small>'+roundval+'</small>';
                                            range.setAttribute('value', roundval);
                                            val = range.value;
                                    }

                                    else
                                    {
                                        monitor.innerHTML = '<small>'+String(newval)+'</small>';
                                        range.setAttribute('value', newval);
                                        val = range.value;
                                    }

                                    monitor.classList.add("[status-active]");
                                    monitor.classList.remove("[status-off]");

                                }

                                setLine();

                            }


                        }

                        function btnrange_dragEnd(ev_drag_btn_range)
                        {

                            bullet.classList.add('[status-off]');
                            bullet.classList.remove('[status-active]');

                            monitor.classList.add("[status-off]");

                            setTimeout(()=>{
                                monitor.classList.remove("[status-active]");
                            },500)

                            document.onmouseup = null;
                            document.onmousemove = null;

                        }


                        //sub functions...

                        function GetPercentage(min,max,position)
                        {
                            let percentval = Number( ((position-min)/(min-max)) * -100 ).toFixed(dot);
                            return percentval;
                        }

                        function GetVal(min,max,percent)
                        {
                            let fromPerToVal = Number( ((min-max)*percent/100-min)*-1 ).toFixed(dot);
                            return fromPerToVal;
                        }

                        function setLine()
                        {

                            let Lines = [...range.closest('.sliders').querySelectorAll('input+span')],
                                lineslength = Lines.length;

                            for (let i = 0; i < lineslength; i++)
                            {

                                let prev   = [...range.closest('.sliders').querySelectorAll('B')][i-1], from,
                                    actual = [...range.closest('.sliders').querySelectorAll('B')][i], to;

                                if(prev){ from = GetPercentage(0,containerwidth,prev.offsetLeft); }else { from = 0 }

                                to = GetPercentage(0,containerwidth,actual.offsetLeft);

                                let getStartPx = (GetVal(0,containerwidth,from)) ;
                                    getFinishPx = (GetVal(0,containerwidth,to)) ;
                                    widthDifference = getFinishPx-getStartPx;

                                Lines[i].style.width = widthDifference+"px";
                                Lines[i].style.left  = from+"%";

                            }

                        }

                    },500)

                }

            }


        };


        const selects = () =>
        {


            let btnselectslist = document.querySelectorAll('*[class*="button-select"]');


            for (let btn of btnselectslist)
            {


                let Select    = btn.getElementsByTagName('select')[0],
                    Searcher  = btn.querySelectorAll('[type=search]')[0],
                    Outlabel  = btn.getElementsByTagName('label')[0],
                    Outfield  = btn.querySelectorAll('input')[0],

                    exvalues   = Outfield.value.split(',') || select.value.split(','),
                    isMultiple = (Outfield.multiple)?1:0,

                    Outbox,
                    Accept,
                    selectorbox;


                // make and set outbox

                if(Select!=undefined)
                {


                    //for all, generate a random id from 0 to 1000
                    let SELECTID = Math.floor(Math.random() * 9999);


                    //set target of off canvas
                    btn.setAttribute('target','outbox#select-'+SELECTID);


                    //generate the empty output

                    let searchbar =  (Searcher)? `<div class=button></div>`:``;


                    let select_empty_outbox =
                    `
                        <div class="outbox" id="select-`+SELECTID+`">
                            <div class="overlay">
                                <div class="side-center">

                                    <div class="selectorbox">

                                        <div><a class="close"><p>Select your option</p> </a></div>

                                        <div>
                                            `+searchbar+`
                                        </div>

                                        <div>
                                            <div class="hide-bar-y">
                                                <div class="scroll-y">
                                                    <div class="optiongroup">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="button align-center">
                                                <a class="accept">Close</a>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    `;


                    //print empty output & get it
                    document.getElementsByTagName('BODY')[0].insertAdjacentHTML('beforeEnd',select_empty_outbox);

                    //get/update elements
                    Outbox = document.getElementById("select-"+SELECTID).querySelectorAll('.optiongroup')[0];
                    selectorbox = document.getElementById("select-"+SELECTID).querySelectorAll('.selectorbox')[0];
                    Accept = [...document.getElementById("select-"+SELECTID).querySelectorAll('.selectorbox .accept')][0];

                    //move searcher
                    if(Searcher)
                    {
                        selectorbox.querySelectorAll('.button')[0].appendChild(Searcher);
                        Searcher = [...selectorbox.querySelectorAll('[type=search]')][0];
                    }


                    //get options groups value...
                    let Groups = [...btn.querySelectorAll('OPTGROUP')];

                    let l = Groups.length;
                    for (let i = 0; i < l; i++)
                    {

                        let Group = Groups[i];

                        let Labels = Group.getAttribute('label'), //get all label
                            Options = [...Group.querySelectorAll('option')];  //get all options

                        if(Labels == null)
                        {
                            Labels = '<p></p>';
                        }
                        else
                        {
                            Labels = '<p>'+Group.getAttribute('label')+'</p>';
                        }



                        // create a options list
                        let optslist = [];
                        let l = Options.length;

                        for (let i = 0; i < l; i++)
                        {

                            if(isMultiple)
                            {
                                let included = exvalues.includes( String(Options[i].value) ),
                                    ischeck = (included) ? 'checked="true"' : '',
                                    istrue  = (included) ? 1 : 0;

                                let check_html =
                                `
                                    <div class="button-checkbox" data-option="`+Options[i].value+`">
                                        <input type="checkbox" value="`+istrue+`" `+ischeck+` />
                                        <label>`+Options[i].text+`</label>
                                    </div>
                                `;
                                optslist.push(check_html);

                            }

                            else
                            {
                                optslist.push('<a data-option="'+Options[i].value+'">'+Options[i].text+'</a>')
                            }

                        }


                        //from array list to list of strings
                        let optionslist = String(optslist.join(' '));


                        // print new output contents
                        let output;
                        if(Labels=="<p></p>")
                        {
                            output =
                            `
                                <div class="nolabel hide"></div>
                                <div class="options">
                                `+optionslist+`
                                </div>
                            `;
                        }
                        else
                        {
                            output =
                            `
                                <div class="label">
                                    `+Labels+`
                                </div>
                                <div class="options">
                                    `+optionslist+`
                                </div>
                            `;
                        }

                        Outbox.insertAdjacentHTML('beforeEnd',output);

                    }

                    Select.parentNode.removeChild(Select);

                }



                Accept.innerHTML = "wainting a choose";

                let AllVoice  = [...selectorbox.querySelectorAll('.options>*')],
                    vlength   = AllVoice.length,
                    valuelist = [],
                    textslist = [],
                    active    = null;

                for (let v = 0; v < vlength; v++)
                {

                    let voice = AllVoice[v];

                    if(isMultiple)
                    {

                        if( voice.firstElementChild.value==1 || voice.firstElementChild.checked==true )
                        {
                            valuelist.push(voice.getAttribute('data-option'));
                            textslist.push(voice.getElementsByTagName('label')[0].innerText);
                        }

                        else if(v>=vlength-1)
                        {
                            Outfield.value     = valuelist.join();
                            Outlabel.innerHTML = textslist.join();
                        }

                    }

                    else
                    {
                        if(voice.innerText == Outlabel.innerText) voice.classList.add('active');
                    }

                }


                for (let v = 0; v < vlength; v++)
                {
                    AllVoice[v].addEventListener('click', () =>{

                        (valuelist.length<=0) ? Accept.innerHTML = "Accept" :  "Close";
                        let clicked = AllVoice[v];
                        settingValues(AllVoice,clicked,valuelist,textslist,isMultiple);

                    },false);
                }


                function settingValues (AllVoice,clicked,valuelist,textslist,isMultiple)
                {

                    Accept.innerHTML = "OK - SAVE";


                    if(isMultiple)
                    {

                        let valuedata  = clicked.getAttribute('data-option'),
                            valuelabel = clicked.getElementsByTagName('label')[0].innerText,
                            indexdata  = valuelist.indexOf(valuedata),
                            indexlabel = textslist.indexOf(valuelabel);

                        if(clicked.classList.contains('active') || clicked.firstElementChild.value==0 || clicked.firstElementChild.checked==false)
                        {
                            clicked.classList.remove("active");
                            valuelist.push(valuedata);
                            textslist.push(valuelabel)
                        }
                        else if(!clicked.classList.contains('active') || clicked.firstElementChild.value==1 || clicked.firstElementChild.checked==true)
                        {
                            clicked.classList.add("active");
                            valuelist.splice(indexdata, 1);
                            textslist.splice(indexlabel, 1);
                        }

                    }

                    else
                    {

                        for (let t = 0; t < AllVoice.length; t++) AllVoice[t].classList.remove("active");

                        clicked.classList.add("active");
                        active = clicked;
                    }

                }


                Accept.onclick = () =>{ printValues(Outfield,Outlabel,valuelist,textslist,isMultiple,active) };

                function printValues (Outfield,Outlabel,valuelist,textslist,isMultiple,active)
                {

                    if(isMultiple)
                    {
                        Outfield.value     = valuelist.join();
                        Outlabel.innerHTML = textslist.join();
                    }
                    else
                    {
                        Outlabel.innerText = active.innerText;
                        Outfield.value     = active.value;
                    }

                    setTimeout(()=>{ Accept.innerHTML = "CLOSE" },300);

                }


                //if have a search

                if(Searcher)
                {

                    Searcher.addEventListener('input', () => {

                        let searched = Searcher.value.toLowerCase();

                        for (let v = 0; v < vlength; v++)
                        {
                            let voice = AllVoice[v]; (!voice.innerText.toLowerCase().startsWith(searched))?voice.classList.add('hide'):voice.classList.remove('hide');
                        }

                        for (let v = 0; v < vlength; v++)
                        {
                            let voice       = AllVoice[v],
                                voiceparent = voice.parentNode,
                                parentLabel = voiceparent.previousElementSibling;

                            if(parentLabel.classList.contains('label'))
                            {
                                (voiceparent.childElementCount == voiceparent.querySelectorAll(".hide").length )?parentLabel.classList.add('hide'):parentLabel.classList.remove('hide');
                            }

                        }

                    },false);

                }


            }


        };


        const dropsdown = () =>
        {

            let buttondropdownlist = [...document.querySelectorAll('*[class*="button-dropdown"]')];

            for (let Btn of buttondropdownlist)
            {

                let Outlabel   = [...Btn.querySelectorAll('label')][0],
                    Searcher   = [...Btn.querySelectorAll('[type=search]')][0],
                    Outfield   = [...Btn.querySelectorAll('input')][0],
                    exvalues   = Outfield.value.split(',') || select.value.split(','),
                    isMultiple = (Outfield.multiple)?1:0,
                    selectorbox;


                // make and set outbox

                if(Btn.getElementsByTagName('select'))
                {

                    let select = Outlabel.nextElementSibling;

                    //for all, generate a random id from 0 to 1000
                    let SELECTID = Math.floor(Math.random() * 9999);

                    //generate the empty output
                    let select_empty_outbox;

                    if(Searcher)
                    {
                      select_empty_outbox =`
                        <div class="selectorbox off">

                          <div>
                            <div class=button></div>
                          </div>

                          <div class="hide-bar-y">
                            <div class="scroll-y">
                              <div class="optiongroup">
                              </div>
                            </div>
                          </div>

                        </div>`;
                    }

                    else
                    {
                      select_empty_outbox =`
                        <div class="selectorbox off">
                          <div class="hide-bar-y">
                            <div class="scroll-y">
                              <div class="optiongroup">
                              </div>
                            </div>
                          </div>
                        </div>`;
                    }

                    //print empty output & get it
                    Btn.insertAdjacentHTML('beforeEnd',select_empty_outbox);

                    //get/update elements
                    selectorbox = [...Btn.querySelectorAll('.selectorbox')][0];

                    //move searcher
                    if(Searcher)
                    {
                      [...selectorbox.querySelectorAll('.button')][0].appendChild(Searcher);
                      Searcher = [...selectorbox.querySelectorAll('[type=search]')][0];
                    }


                    //get options groups value...
                    let Groups = [...Btn.querySelectorAll('OPTGROUP')];

                    let l = Groups.length;
                    for (let i = 0; i < l; i++)
                    {

                      let Group = Groups[i];

                      let Labels = Group.getAttribute('label'), //get all label
                          Options = [...Group.querySelectorAll('option')];  //get all options

                      if(Labels == null)
                      {
                        Labels = '<p></p>';
                      }
                      else {
                        Labels = '<p>'+Group.getAttribute('label')+'</p>';
                      }


                      // create a options list
                      let optslist = [],
                          l = Options.length;

                      for (let i = 0; i < l; i++)
                      {

                        if(isMultiple)
                        {
                          let included = exvalues.includes( String(Options[i].value) ),
                              ischeck = (included) ? 'checked="true"' : '',
                              istrue  = (included) ? 1 : 0;

                          let check_html =
                          `
                            <div class="button-checkbox" data-option="`+Options[i].value+`">
                                <input type="checkbox" value="`+istrue+`" `+ischeck+` />
                                <label>`+Options[i].text+`</label>
                            </div>
                          `;
                          optslist.push(check_html);
                        }
                        else {
                          optslist.push('<a data-option="'+Options[i].value+'">'+Options[i].text+'</a>')
                        }
                      }

                      //from array list to list of strings
                      let optionslist = String(optslist.join(' '));

                      // print new output contents
                      let output;
                      if(Labels=="<p></p>")
                      {
                        output =
                        `
                        <div class="nolabel hide"></div>
                        <div class="options">
                          `+optionslist+`
                        </div>`;
                      }
                      else
                      {
                        output =
                        `<div class="label">
                         `+Labels+`
                        </div>
                        <div class="options">
                          `+optionslist+`
                        </div>`;
                      }

                      selectorbox.querySelectorAll('.optiongroup')[0].insertAdjacentHTML('beforeEnd',output);

                    }

                    if(isMultiple)
                    {
                        selectorbox.classList.add('multiple');
                    }

                    select.remove();

                }


                setTimeout(()=>{
                    selectorbox.style.width = Btn.offsetWidth+'px';
                },500)


                let clickprevent = false;
                document.addEventListener('click', event_dropdownclick => {

                  if(!clickprevent)
                  {

                    clickprevent=true;

                    if (!Btn.contains(event_dropdownclick.target))
                    {
                      selectorbox.classList.add('off');
                      setTimeout(()=>{
                        selectorbox.classList.remove('active');
                        setTimeout(()=>{
                          selectorbox.classList.remove('off');
                        },350)
                      },200)
                    }
                    else if(!event_dropdownclick.target.closest('[type=search]') && !event_dropdownclick.target.closest('.button-checkbox'))
                    {

                      if(selectorbox.classList.contains('active'))
                      {
                        selectorbox.classList.add('off');
                        selectorbox.classList.remove('active');
                        setTimeout(()=>{
                          setTimeout(()=>{
                            selectorbox.classList.remove('off');
                          },350)
                        },200)

                      }
                      else
                      {
                        selectorbox.classList.add('active');
                        setTimeout(()=>{
                          selectorbox.classList.remove('off');
                        },200)
                      }
                    }

                    setTimeout(()=>{
                      clickprevent=false;
                    },600)

                  }

                });


                //on click into voice of relative select popup or searcher change


                let AllVoice  = [...selectorbox.querySelectorAll('.options>*')],
                    vlength   = AllVoice.length,
                    valuelist = [],
                    textslist = [];


                for (let v = 0; v < vlength; v++)
                {

                    let voice = AllVoice[v];

                    if(isMultiple)
                    {

                        if( voice.firstElementChild.value==1 || voice.firstElementChild.checked==true )
                        {
                            valuelist.push(voice.getAttribute('data-option'));
                            textslist.push(voice.getElementsByTagName('label')[0].innerText);
                        }

                        else if(v>=vlength-1)
                        {
                            Outfield.value     = valuelist.join();
                            Outlabel.innerHTML = textslist.join();
                        }

                    }

                    else
                    {
                        if(voice.innerText == Outlabel.innerText)
                        {
                            voice.classList.add('active');
                        }
                    }

                }


                for (let v = 0; v < vlength; v++)
                {

                    AllVoice[v].addEventListener('click', () =>{

                        let clicked = AllVoice[v];
                        printValues(AllVoice,clicked,valuelist,textslist,isMultiple);

                    },false);

                }


                function printValues (AllVoice,clicked,valuelist,textslist,isMultiple)
                {

                    if(isMultiple)
                    {

                        let valuedata  = clicked.getAttribute('data-option'),
                            valuelabel = clicked.getElementsByTagName('label')[0].innerText,
                            indexdata  = valuelist.indexOf(valuedata),
                            indexlabel = textslist.indexOf(valuelabel);

                        if(clicked.classList.contains('active') || clicked.firstElementChild.value==0 || clicked.firstElementChild.checked==false)
                        {
                            clicked.classList.remove("active");
                            valuelist.push(valuedata);
                            textslist.push(valuelabel)
                        }
                        else if(!clicked.classList.contains('active') || clicked.firstElementChild.value==1 || clicked.firstElementChild.checked==true)
                        {
                            clicked.classList.add("active");
                            valuelist.splice(indexdata, 1);
                            textslist.splice(indexlabel, 1);
                        }

                        Outfield.value     = valuelist.join();
                        Outlabel.innerHTML = textslist.join();

                    }

                    else
                    {

                        for (let t = 0; t < AllVoice.length; t++) AllVoice[t].classList.remove("active");

                        clicked.classList.add("active");
                        Outlabel.innerText = clicked.innerText;
                        Outfield.value = clicked.value;
                    }

                }


                //if have a search

                if(Searcher)
                {

                    Searcher.addEventListener('input', () => {

                        let searched = Searcher.value.toLowerCase();

                        for (let v = 0; v < vlength; v++)
                        {
                            let voice = AllVoice[v]; (!voice.innerText.toLowerCase().startsWith(searched))?voice.classList.add('hide'):voice.classList.remove('hide');
                        }

                        for (let v = 0; v < vlength; v++)
                        {
                            let voice       = AllVoice[v],
                                voiceparent = voice.parentNode,
                                parentLabel = voiceparent.previousElementSibling;

                            if(parentLabel.classList.contains('label'))
                            {
                                (voiceparent.childElementCount == voiceparent.querySelectorAll(".hide").length )?parentLabel.classList.add('hide'):parentLabel.classList.remove('hide');
                            }

                        }

                    },false);

                }

                //on resize...

                window.onresize = () =>{ selectorbox.style.width = Btn.offsetWidth+'px'; }

            }


        };


        const clocks = () =>
        {

            let buttonclocklist = document.querySelectorAll('*[class*="button-clock"]');

            for (let Btn of buttonclocklist)
            {


                //for all, generate a random id from 0 to 1000
                let TIMEPICKERID = Math.floor(Math.random() * 999);

                //set target of off canvas
                Btn.setAttribute('target','outbox#times-'+TIMEPICKERID);


                //generate the empty output
                let select_empty_outbox =
                `
                    <div class="outbox" id="times-`+TIMEPICKERID+`">
                        <div class="overlay">
                            <div class="side-center">

                                <div class="clockbox">

                                    <div>
                                        <a class="close">
                                            <p>Select a time</p>
                                        </a>
                                    </div>

                                    <div>

                                        <span class="clock">

                                            <div class="rayline-hours">
                                            </div>

                                            <div class="rayline-minutes">
                                            </div>

                                            <div class="pivot"></div>

                                        </span>

                                    </div>

                                    <div>

                                        <div class="display">
                                            <span>
                                                <span class="button hours"><input type="number" pattern="[0-9]{2}" value="12"/></span>
                                                <span class="doubledot"><small>:</small></span>
                                                <span class="button minutes"><input type="number" pattern="[0-9]{2}" value="20"/></span>
                                            </span>
                                            <span>
                                                <small class="am [status-active]">AM</small>
                                                <small class="pm [status-off]">PM</small>
                                            </span>
                                        </div>

                                    </div>

                                    <div>
                                        <p class="warning border-error hide"></p>
                                        <div class="button align-center">
                                            <a class="accept">OK - SAVE</a>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                `;


                //print empty output & get it

                document.getElementsByTagName('BODY')[0].insertAdjacentHTML('beforeEnd',select_empty_outbox);
                let Outbox = document.getElementById("times-"+TIMEPICKERID);


                let Am = Outbox.querySelectorAll('.am')[0],
                    Pm = Outbox.querySelectorAll('.pm')[0],

                    Hours = Outbox.querySelectorAll('.hours>input')[0],
                    Minutes = Outbox.querySelectorAll('.minutes>input')[0],

                    Clock = Outbox.querySelectorAll('.clock')[0],
      				RayHours = Outbox.querySelectorAll('.rayline-hours')[0],
      				RayMinutes = Outbox.querySelectorAll('.rayline-minutes')[0],
                    ClockPivot = Outbox.querySelectorAll('.pivot')[0],

                    Accept = Outbox.querySelectorAll('a.accept')[0];


                Hours.onmousedown = () =>{ selectfullstring(Hours)  }
                Hours.ontouchstart = () =>{  selectfullstring(Hours) }
                Minutes.onmousedown = () =>{  selectfullstring(Minutes) }
                Minutes.ontouchstart = () =>{  selectfullstring(Minutes) }
                function selectfullstring (I){ I.select() }


                //set to start
                if(Btn.getElementsByTagName('input')[0].value!='')
                {

                    let start = Btn.getElementsByTagName('input')[0].value,
                        startH = parseInt(start.split(':')[0]),
                        startM = parseInt(start.split(':')[1]);

                    setTimeout(()=>{
                      RayHours.style.transform   = 'rotate('+((360/12*startH)-90)+'deg)' ;
                      RayMinutes.style.transform = 'rotate('+((360/60*startM)-90)+'deg)' ;
                    },500)

                    if(startH>=1 && startH<=9) {startH='0'+startH}; Hours.value = startH;
                    if(startM>=1 && startM<=9) {startM='0'+startM}; Minutes.value = startM;

                }


                // set via buttons

                Hours.onkeyup = () => { if(String(Hours.value).length>=2){ checkhours();  } }
                Hours.onblur = () => { checkhours(); }


                function checkhours()
                {

                    let nH = parseInt(Hours.value);

                    if(Am.classList.contains('status-active'))
                    { if(nH>12) {nH='01'} else if(nH<1) {nH='12'} else if(nH>=1 && nH<=9) {nH='0'+nH }; }

                    else
                    { if(nH>23) {nH='00'} else if(nH<=-1) {nH='23'} else if(nH<=9) {nH='0'+nH }; }

                    if(nH.length>=3) nH='01';


                    RayHours.classList.add('smooth');
                    RayHours.style.transform = 'rotate('+((360/12*parseInt(nH))-90)+'deg)' ;
                    setTimeout(()=>{ RayHours.classList.remove('smooth'); },300)

                    Hours.value = nH;

                }

                Minutes.onkeyup = () => { if(String(Minutes.value).length>=2){ checkMinutes(); } }
                Minutes.onblur = () => { checkMinutes(); }

                function checkMinutes()
                {

                    let nM = Minutes.value;

                    if(nM>59) {nM='00'} else if(nM<0) {nM='59'} else { if(nM>=0 && nM<=9) {nM='0'+nM } };

                    if(nM.length>2) nM='01';

                    RayMinutes.classList.add('smooth');
                    RayMinutes.style.transform = 'rotate('+((360/60*parseInt(nM))-90)+'deg)' ;
                    setTimeout(()=>{ RayMinutes.classList.remove('smooth'); },300)

                    Minutes.value = nM;

                }

                // set Am or Pm

                Am.onclick = () =>
                {

                    if(!Am.className.includes('status-active'))
                    {

                        Am.classList.add('[status-active]'),
                        Am.classList.remove('[status-off]'),
                        Pm.classList.add('[status-off]'),
                        Pm.classList.remove('[status-active]');

                        let hours = parseInt(Hours.value);

                        if(hours == 00)       { hours = 12}
                        if(hours>12)
                        {
                            if(hours <= 22)     { hours = "0"+(hours-12)}
                            else if(hours > 22) { hours = (hours-12)}
                        }

                        Hours.value = hours;
                        checkvalue(Btn,Hours,Minutes,Outbox,Accept)
                    }

                }

                Pm.onclick = () =>
                {

                    if(!Pm.className.includes('status-active'))
                    {

                        Am.classList.add('[status-off]'),
                        Am.classList.remove('[status-active]'),
                        Pm.classList.add('[status-active]'),
                        Pm.classList.remove('[status-off]');

                        let hours = parseInt(Hours.value);

                        if(hours == 12) { hours = "00"}
                        else            { hours = hours+12; }

                        Hours.value = hours;
                        checkvalue(Btn,Hours,Minutes,Outbox,Accept)
                    }

                }


                // set start angle

                let startHoursangle = Math.atan2(-90,0) * 180 / Math.PI;
                RayHours.style.transform = 'rotate('+startHoursangle+'deg)' ;

                let startMinutesangle = Math.atan2(0,15) * 180 / Math.PI;
                RayMinutes.style.transform = 'rotate('+startMinutesangle+'deg)' ;


                //start moving

                if(is_touch_device())
                {
                    RayHours.ontouchstart = clockStart;
                    RayMinutes.ontouchstart = clockStart;
                }
                else
                {
                    RayHours.onmousedown = clockStart;
                    RayMinutes.onmousedown = clockStart;
                }


                let center,isHours,isMinutes;


                function clockStart(event_clockdrag)
                {


                    event_clockdrag.preventDefault();
                    event_clockdrag.stopPropagation();

                    let rect = ClockPivot.getBoundingClientRect();
                    center = {
                        x: window.scrollX + rect.left,
                        y: window.scrollY + rect.top
                    };

                    if(event.target == RayHours)
                    {
                        isHours = true;
                        isMinutes = false;
                    }
                    else if(event.target == RayMinutes)
                    {
                        isHours = false;
                        isMinutes = true;
                    }

                    (is_touch_device())
                        ? document.ontouchmove = clockMove
                        : document.onmousemove = clockMove;
                }

		        function clockMove(event)
                {

                    let deltaX, deltaY, angle;

                    if(is_touch_device())
                    {
                        deltaX = event.touches[0].clientX - center.x,
                        deltaY = event.touches[0].clientY - center.y,
                        angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI);
                    }
                    else
                    {
                        deltaX = event.pageX - center.x,
                        deltaY = event.pageY - center.y,
                        angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) ;
                    }

                    if(isHours)
                    {

                        //calc percent of angle

                        let min = -180, max = 180,
                            anglepercent = parseInt( ((angle-min)/(min-max)) * -100 );

                        //calc percent steps

                        let steppercent = [];
                        for (let i = 0; i < 14; i++)
                        {
                            let step = parseInt( (i*100)/12 );
                            steppercent.push(step)
                        }

                        //loop step on percent

                        let sl = steppercent.length;
                        for (let i = 0; i < sl; i++)
                        {

                            if(anglepercent > steppercent[i-1] && anglepercent < steppercent[i+1])
                            {

                                let fromPertoDeg = Math.round( (min-max)*steppercent[i]/100-min )*-1; //from % to degree

                                RayHours.style.transform = 'rotate('+fromPertoDeg+'deg)' ;

                                let hours = parseInt(i-3);

                                if(Am.className.includes('status-active'))
                                {
                                    if(hours == 0)              { hours = "12"}
                                    else if(hours<0 && hours<10){ hours = i+9; }
                                    else if(hours <= 9)         { hours = "0"+hours}
                                }
                                else
                                {
                                    if(hours == 0)              { hours = "00"}
                                    else if(hours<0 && hours<10){ hours = i+(9+12); }
                                    else if(hours <= 9)         { hours = (hours+12)}
                                }

                                Hours.value = hours;

                            }
                        }

                    }

                    else if(isMinutes)
                    {

                        //calc percent of angle

                        let min = -180,
                            max = 180,
                            anglepercent = parseInt( ((angle-min)/(min-max)) * -100 );


                        //calc percent steps

                        let steppercent = [];
                        for (let i = 0; i < 62; i++)
                        {
                            let step = parseInt( (i*100)/60 );
                            steppercent.push(step)
                        }

                        //loop step on percent
                        let sl = steppercent.length;
                        for (let i = 0; i < sl; i++)
                        {

                            if(anglepercent > steppercent[i-1] && anglepercent < steppercent[i+1])
                            {

                                let fromPertoDeg = Math.round( (min-max)*steppercent[i]/100-min )*-1 ; //from % to degree

                                RayMinutes.style.transform = 'rotate('+fromPertoDeg+'deg)';

                                let minuts = i-15;

                                if(minuts<0)        { minuts = i+45; }

                                if(minuts == 60)    { minuts = "00"}
                                else if(minuts <= 9){ minuts = "0"+minuts}

                                Minutes.value = minuts;

                            }

                        }

                    }

                    RayHours.ontouchend   = clockStop;
                    RayMinutes.ontouchend = clockStop;
                    document.onmouseup    = clockStop;
                }


  				function clockStop(event)
                {

                    event_clockdrag = null;
                    document.ontouchstart = null;
                    document.onmousedown = null;
                    document.ontouchmove = null;
                    document.onmousemove = null;
                    document.onmouseup = null;


                    checkvalue(Btn,Hours,Minutes,Outbox,Accept)

  				}


                function checkvalue(Btn,Hours,Minutes,Outbox,Accept)
                {

                    let selectedHours   = Hours.value,
                        selectedMinutes = Minutes.value;

                    let btnImp = Btn.getElementsByTagName('input')[0];


                    if(btnImp.min&&btnImp.max)
                    {

                        if(btnImp.min&&!btnImp.max || !btnImp.min&&btnImp.max)
                        {
                            debug(`:: [⚠ ui alert]: wrong clock, no min/max valid\n   ⮑ If you use one, it is mandatory to enter both values`);
                        }
                        else
                        {

                            let Warning     = [...Outbox.querySelectorAll('.warning')][0],
                                minHours    = btnImp.min.split(':')[0],
                                minMintes   = btnImp.min.split(':')[1],
                                maxHours    = btnImp.max.split(':')[0],
                                maxMinutes  = btnImp.max.split(':')[0];

                            if(selectedHours<minHours || selectedHours>maxHours)
                            {

                                Warning.innerHTML = 'This Time is not available';
                                Warning.classList.remove('hide');
                                Accept.classList.add('disabled');
                                Accept.innerText= 'OUT OF RANGE'

                            }
                            else
                            {

                                Warning.classList.replace('active','off');
                                Warning.classList.add('hide');
                                Accept.classList.remove('disabled');
                                Accept.innerText= 'OK - SAVE';

                                Accept.addEventListener('click', event_acceptClockTime => {
                                    Btn.querySelectorAll('.button-clock>label')[0].innerText = selectedHours+":"+selectedMinutes;
                                    Btn.querySelectorAll('.button-clock>input')[0].value = selectedHours+":"+selectedMinutes;
                                },false)

                            }

                        }

                    }
                    else
                    {
                        Accept.innerText= 'OK - SAVE';
                        Accept.addEventListener('click', event_acceptClockTime => {
                            Btn.querySelectorAll('.button-clock>label')[0].innerText = selectedHours+":"+selectedMinutes;
                            Btn.querySelectorAll('.button-clock>input')[0].value = selectedHours+":"+selectedMinutes;
                        },false)

                    }

                }

            }

        };


        const checks = () =>
        {

            let btncheckboxlist = document.querySelectorAll('*[class*="button-checkbox"]');

            for (let btn of btncheckboxlist)
            {

                let inputtag = btn.firstElementChild;

                //if is empty = uncheck
                if(!inputtag.checked || inputtag.value=='')
                {
                    inputtag.setAttribute("checked", false);
                    inputtag.checked = false;
                    inputtag.value = 0;
                }
                else
                {
                    inputtag.setAttribute("checked", true);
                    inputtag.checked = true;
                    inputtag.value = 1;
                }

                btn.onclick = ev_click_checkboxbutton =>
                {
					if(!inputtag.disabled)
					{

	                    if(!inputtag.checked)
	                    {
	                        inputtag.setAttribute('checked',true);
	                        inputtag.checked = true;
	                        inputtag.value = 1;
	                    }
	                    else
	                    {
	                        inputtag.setAttribute('checked',false);
	                        inputtag.checked = false;
	                        inputtag.value = 0;
	                    }

					}

                }

            }

        };


        const radios = () =>
        {

            let buttonradiolist = document.querySelectorAll('*[class*="button-radio"]');

            for (let btn of buttonradiolist)
            {

                let inputtag = btn.firstElementChild;

                //if is empty = uncheck
                if(!inputtag.checked || inputtag.value=='')
                {
                    inputtag.setAttribute("checked", false);
                    inputtag.checked = false;
                    inputtag.value = 0;
                }
                else
                {
                    inputtag.setAttribute("checked", true);
                    inputtag.checked = true;
                    inputtag.value = 1;
                }

                btn.onclick = ev_click_radiobutton =>
                {

                    let inpgroup = document.querySelectorAll('[name="'+inputtag.getAttribute('name')+'"]'),
                        btnsqnt  = inpgroup.length;

                        for (let i = 0; i < btnsqnt; i++)
                        {
                            inpgroup[i].setAttribute("checked", false);
                            inpgroup[i].checked = false;
                            inpgroup[i].value = 0;
                        }

                        inputtag.setAttribute("checked", true);
                        inputtag.checked = true;
                        inputtag.value = 1;

                }

            }


        };


        const datepikers = () =>
        {


            let buttondatepickerslist = [...document.querySelectorAll('*[class*=button-date]')];

            for (let Btn of buttondatepickerslist)
            {

                let Outlabel  = [...Btn.getElementsByTagName('label')][0],
                    OutFields = [...Btn.getElementsByTagName('input')],
                    FieldsQnt = OutFields.length,
                    onfocus   = 1,
                    datelist  = [];

                if(FieldsQnt>2)
                {
                    debug(`:: [🛈 viƨor info]: button-date oversized\n   ⮑ The maximum amount of inputs is two: "start date", "end date".`);
                    Btn.classList.add('debug-error');
                }
                else if(FieldsQnt<1)
                {
                    debug(`:: [🛈 viƨor info]: button-date subsized\n   ⮑ The minumum amount of inputs is one: are you kidding me?`);
                    Btn.classList.add('debug-error');
                }

                else
                {


                    //
                    //  1: get type and format of dates
                    //


                    let isUTC, isEUR, Yi,Mi,Di;


                    // is it UTC or EUR? // not EUR.. then UTC

                    (Btn.classList.contains("EUR")) ? (isUTC=!1,isEUR=!0) : (isUTC=!0,isEUR=!1) ;


                    // check date format

                    let dateformat,
                        datepickerclasses = [...String(Btn.className).split(' ')],
                        formatkey = ["DMY","DYM","MYD","MDY","YDM","YMD"],
                        fkl = formatkey.length;

                    for (let i=0;i<fkl;i++)
                        if(!(datepickerclasses.indexOf(formatkey[i]) === -1))
                            dateformat = String(formatkey[i]);

                    // get order of format
                    Yi =  dateformat.indexOf('Y');
                    Mi =  dateformat.indexOf('M');
                    Di =  dateformat.indexOf('D');


                    //
                    //  2: get basic params
                    //


                    // set unselected start / end

                    for (let i = 0; i < FieldsQnt; i++)
                      datelist.push({ 'year':null, 'month':null, 'day':null });


                    //
                    //  3: get actual/start selected date via input or UTC
                    //


                    if(OutFields[0].value=='')
                    {

                        let todaydate  = new Date(),
                            format     = todaydate.toUTCString(),
                            utc_year   = parseInt(todaydate.getUTCFullYear()),
                            utc_month  = parseInt(todaydate.getUTCMonth()),
                            utc_day    = parseInt(todaydate.getUTCDate());
                        // this_week = date.getUTCDay();

                        datelist[0].year  = utc_year;
                        datelist[0].month = utc_month;
                        datelist[0].day   = utc_day;

                        if(FieldsQnt==2)
                        {
                            datelist[1].year = utc_year;
                            datelist[1].month= utc_month;
                            datelist[1].day  = utc_day+1;
                        }

                    }

                    else
                    {

                        let datestart = OutFields[0].value,
                            format;

                        if(datestart.match('-'))
                        {
                            datelist[0].year  = parseInt(datestart.split('-')[Yi]);
                            datelist[0].month = parseInt(datestart.split('-')[Mi])-1;
                            datelist[0].day   = parseInt(datestart.split('-')[Di]);
                        }
                        else
                        {
                            datestart         = new Date(parseInt(datestart));
                            format            = datestart.toUTCString();
                            datelist[0].year  = parseInt(datestart.getUTCFullYear());
                            datelist[0].month = parseInt(datestart.getUTCMonth());
                            datelist[0].day   = parseInt(datestart.getUTCDate());
                        }


                        if(FieldsQnt==2)
                        {

                            let dateend   = OutFields[1].value;

                            if(dateend.match('-'))
                            {
                                datelist[1].year  = parseInt(dateend.split('-')[Yi]);
                                datelist[1].month = parseInt(dateend.split('-')[Mi])-1;
                                datelist[1].day   = parseInt(dateend.split('-')[Di]);
                            }
                            else
                            {
                                dateend           = new Date( parseInt(dateend) );
                                format            = dateend.toUTCString();
                                datelist[1].year  = parseInt(dateend.getUTCFullYear());
                                datelist[1].month = parseInt(dateend.getUTCMonth());
                                datelist[1].day   = parseInt(dateend.getUTCDate());
                            }

                        }

                    }


                    //
                    //  3: create, connect empty datepicker outbox / get from it
                    //

                    // for all, generate a random id from 0 to 1000

                    let DATEID = Math.floor(Math.random() * 999);

                    // set target of off canvas

                    Btn.setAttribute("target","outbox#datepicker-"+DATEID);

                    // generate the empty output

                    let fromto = (FieldsQnt==2) ? `<div class="grid-x fromto"><small class="box-[50-50-50] active"> FRIST DATE </small><small class="box-[50-50-50] off"> END DATE </small></div>` : `<!--singledate-->` ;

                    let empty_output_datepicker =
                    `
                    <div class="outbox gpuboost" id="datepicker-`+DATEID+`">
                        <div class="overlay">
                            <div class="side-center">

                                <div class="datepicker">

                                    <div>
                                        <a class="close"><p>Select a date</p></a>
                                    </div>

                                    <div>`+fromto+`</div>

                                    <div>

                                        <div>

                                            <span class="years">
                                                <span class="prev">&nbsp;</span>
                                                <span class="year_list"></span>
                                                <span class="next">&nbsp;</span>
                                            </span>

                                        </div>

                                        <div>

                                            <span class="months">
                                                <span class="prev">&nbsp;</span>
                                                <span class="month_list"></span>
                                                <span class="next">&nbsp;</span>
                                            </span>

                                        </div>

                                    </div>

                                    <div>

                                        <div class="weekday_list">
                                            <div class="grid-x align-center">
                                            </div>
                                        </div>

                                    </div>

                                    <div>

                                        <div class="day_list">
                                            <div class="grid-x">
                                            </div>
                                        </div>

                                    </div>

                                    <div>

                                        <div class="button align-center">
                                            <a class="accept">OK - SAVE</a>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    `;

                    // print output in page

                    document.getElementsByTagName('BODY')[0].insertAdjacentHTML('beforeEnd',empty_output_datepicker);

                    // get output in page

                    let Datepicker = document.querySelectorAll("#datepicker-"+DATEID)[0];

                    // get datepiker elements

                    let Accept        = Datepicker.querySelectorAll(".accept")[0],
                        year_list     = Datepicker.querySelectorAll(".year_list")[0],
                        month_list    = Datepicker.querySelectorAll(".month_list")[0],
                        weekday_list  = Datepicker.querySelectorAll(".weekday_list>div")[0],
                        day_list      = Datepicker.querySelectorAll(".day_list>div")[0];


                    //
                    // 4.1: populate years for a start
                    //

                    // create year list

                    let y_htmlcontents = [],
                        yearmin,
                        yearmax;

                    let ininputmin = parseInt(Btn.firstElementChild.min),
                        ininputmax = parseInt(Btn.firstElementChild.max);


                    if(!ininputmin || ininputmin=='' && !ininputmax || ininputmax=='')
                    {

                        yearmin = 1950;
                        yearmax = 2050;

                    }

                    else
                    {

                        if(!ininputmax || ininputmin>ininputmax)
                        {
                            debug(`:: [🛈 viƨor info]: button-date strange min/max\n   ⮑ The max value is undefined or min is over to max.\n      Will be applied standard max "2050"`);
                            yearmin = ininputmin;
                            yearmax = 2050;
                        }

                        else if(!ininputmin)
                        {
                            debug(`:: [🛈 viƨor info]: button-date strange min/max\n   ⮑ The min value is undefined.\n      Will be applied standard min "1950"`);
                            yearmin = 1950;
                            yearmax = ininputmax;
                        }

                        else
                        {
                            yearmin = ininputmin;
                            yearmax = ininputmax;
                        }

                    }

                    for (let i = yearmin; i <= yearmax; i++)
                        y_htmlcontents.push('<p class="off hide">'+ i +'</p>');


                    y_htmlcontents =  String( y_htmlcontents.join(' ') );
                    year_list.innerHTML =  y_htmlcontents;


                    // set for start

                    let Years    = [...year_list.querySelectorAll("p")],
                        yearsQnt = Years.length;

                    if(ininputmin == ininputmax)
                    {

                        for (let i = 0; i < yearsQnt; i++)
                        {
                            Years[i].classList.remove("off","hide");
                            Years[i].classList.add("active");
                        }

                    }

                    else
                    {
                        for (let i = 0; i < yearsQnt; i++)
                        {
                            if(parseInt(Years[i].textContent) == datelist[0].year )
                            {
                                Years[i].classList.remove("off","hide");
                                Years[i].classList.add("active");
                            }
                        }
                    }


                    //
                    // 4.2: populate months for a start
                    //


                    // create month list

                    let m_htmlcontents = [],
                        monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];

                    for (let i = 0; i <= 11; i++)
                        m_htmlcontents.push('<p class="off hide">'+ monthArray[i] +'</p>');

                    m_htmlcontents =  String( m_htmlcontents.join(' ') );
                    month_list.innerHTML =  m_htmlcontents;


                    // set for start

                    let Months = [...month_list.querySelectorAll("p")],
                        monthsQnt = Months.length;

                    for (let i = 0; i < monthsQnt; i++)
                    {
                        if(i == datelist[0].month)
                        {
                            Months[i].classList.remove("off","hide");
                            Months[i].classList.add("active");
                        }
                    }


                    //
                    // 4.3: populate weekdays
                    //

                    // create weekday list

                    let dw_htmlcontents = [], dayweeks;

                    if(isEUR) { dayweeks = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]; }
                    else      { dayweeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; }

                    // if(isEUR) { dayweeks = ["Lun","Mar","Mer","Gio","Ven","Sab","Dom"]; }
                    // else      { dayweeks = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"]; }


                    for (let i = 0; i < dayweeks.length; i++)
                        dw_htmlcontents.push( '<div class="box-[14-14-14]"><small>'+ dayweeks[i] +'</small></div>' );

                    //print dayweek
                    dw_htmlcontents = String( dw_htmlcontents.join(' ') );
                    weekday_list.innerHTML =  dw_htmlcontents;



                    //
                    // 4.4: populate days...
                    //


                    // ::: daylist not have a start print. It's auto created by utc data
                    // ::: after selected, or have in start, an year and month sys can "get days list of that date"
                    // ::: ex: get days quantity of "May" "2001" -> get the days qnt of that date
                    // ::: attention get days qnt start to 0 and need +1 (8+1 = sept) ...


                    let get_DaysQntOfMounth = (YY,MM) =>
                    {
                        // get day list of year/month
                        let getDate = new Date( Date.UTC(YY,MM+1,null) );
                        return parseInt(  getDate.getUTCDate() );
                    }

                    // ::: Since calendars start with different weeks
                    // ::: (for example in EU start from Monday, not Sunday),
                    // ::: it will be necessary to understand what day 1 is
                    // ::: compared to the first day of the week
                    // ::: attention get weekday start to 1 (8 is sept) and return 0 Sunday, 1 Monday, 2 Tuesday, ...


                    let get_FirstDayOfweek = (YY,MM) =>
                    {
                        // get first dayweek of year/month
                        let getDate = new Date( Date.UTC(YY,MM,1) );
                        return parseInt( getDate.getUTCDay() );
                    }


                    // ::: having the methods created above, we can
                    // ::: get a daylist of specific date (in this case, the start).

                    let make_days_table = (YY,MM,DD) =>
                    {


                        day_list.innerHTML = '';


                        let firstdayweek     = get_FirstDayOfweek(YY,MM),
                            dayinactualmonth = get_DaysQntOfMounth(YY,MM),
                            calendarcell     = 44, // remember: start to 0
                            d_htmlcontents   = [],
                            daytabulator     = parseInt(  (calendarcell-(firstdayweek+1)) );

                        for (let i = (isEUR)?(firstdayweek+5)*-1:(firstdayweek-1)*-1; i <= daytabulator; i++)
                        {

                            let day = i, status = "off", style="";

                            if(day>=1 && day<=9) { day="0"+i }
                            if(day<=0 || i>dayinactualmonth){ day = "░", style='style="opacity:0.5"', status = "off disabled" }
                            else if(day == DD) { status = "active", style='' }

                            d_htmlcontents.push('<div class="box-[14-14-14]" '+style+'><p class="day '+status+'">'+ day +'</p></div>'); //dayout

                        }


                        d_htmlcontents = String(d_htmlcontents.join(' '));
                        day_list.innerHTML =  d_htmlcontents;


                        // in case of line of day is empty (compact mode)

                        if(Btn.className.includes('-compact'))
                        {

                            (() =>{

                                let FirsLineDays = [...Datepicker.querySelectorAll('.day_list .day')].slice(0,7),
                                    firstline = 0;

                                for (let i = 0; i <= 6; i++)
                                    if(FirsLineDays[i].textContent === "░") { firstline++; };

                                if(firstline===7)
                                    for (let i = 0; i <= 6; i++)
                                        FirsLineDays[i].parentNode.innerHTML = "";

                            })();


                            (() =>{

                                //let LastLineDays = [...Datepicker.querySelectorAll('.day_list .day')].slice(35,42);
                                let LastLineDays = [...Datepicker.querySelectorAll('.day_list .day')].slice(-7),
                                    lastline = 0;

                                for (let i = 0; i <= 6; i++)
                                    if(LastLineDays[i].textContent === "░") { lastline++; };

                                if(lastline===7)
                                    for (let i = 0; i <= 6; i++)
                                        LastLineDays[i].parentNode.innerHTML = "";

                            })();

                        }


                        if(FieldsQnt==2){ printDate(); }

                    }


                    make_days_table(datelist[0].year,datelist[0].month,datelist[0].day); //<== create start


                    //
                    //  5: set contents via actions
                    //

                    // find actual static values on call

                    let getActualMonth = () =>
                    {

                        for (let i = 0; i < monthsQnt; i++)
                            if(Months[i].classList.contains("active"))
                                return i;

                    }

                    let getActualYear = () =>
                    {

                        for (let i = 0; i < yearsQnt; i++)
                            if(Years[i].classList.contains("active"))
                                return parseInt(Years[i].innerText);

                    }

                    let getActualDay = () =>
                    {

                        let days = [...Datepicker.querySelectorAll('.day_list .day')],
                            daysQnt = days.length;

                        for (let i = 0; i < daysQnt; i++)
                            if(days[i].classList.contains("active"))
                                return parseInt(days[i].innerText);

                    }

                    // A) switch years

                    let YearPrev = Datepicker.querySelector('.years>.prev'),
                        YearNext = Datepicker.querySelector('.years>.next');

                    YearPrev.onclick = () => { goToPrevYear() };
                    YearNext.onclick = () => { goToNextYear() };

                    if(is_touch_device())
                    {

                        year_list.ontouchstart = event_datepiking =>
                        {

                            let dir    = event_datepiking.touches[0].clientX;

                            year_list.ontouchmove = event_datepiking =>
                            {

                                if (event_datepiking.target != year_list){event_datepiking.preventDefault();}//prevent body scroll
                                if(dir > event_datepiking.changedTouches[0].clientX+75){dir = event_datepiking.touches[0].clientX; goToPrevYear()}
                                if(dir < event_datepiking.changedTouches[0].clientX-75){dir = event_datepiking.touches[0].clientX; goToNextYear()}

                            }

                            year_list.ontouchend = event_datepiking =>
                            {

                                dir = null;
                                event_datepiking = null;
                                window.ontouchmove = null;

                            }

                        }

                    }

                    else
                    {

                        year_list.onmousedown = event_datepiking =>
                        {

                            let dir = event_datepiking.clientX;

                            window.onmousemove = event_datepiking =>
                            {
                                if(dir > event_datepiking.clientX+5){dir = event_datepiking.clientX; goToPrevYear()}
                                if(dir < event_datepiking.clientX-5){dir = event_datepiking.clientX; goToNextYear()}
                            }

                            window.onmouseup = event_datepiking =>
                            {
                                dir = null;
                                event_datepiking = null;
                                window.onmousemove = null;
                            }

                        }

                    }

                    function goToPrevYear()
                    {

                        for (let i = 0; i < yearsQnt; i++)
                        {

                            if(Years[i].classList.contains("active") && Years[i-1])
                            {

                                Years[i].classList.add("off","hide");
                                Years[i].classList.remove("active");

                                Years[i-1].classList.add("active");
                                Years[i-1].classList.remove("off","hide");

                                let f = (onfocus==2 && onfocus==2)?1:0;

                                datelist[f].year = Years[i-1].innerText;
                                datelist[f].month = getActualMonth();
                                datelist[f].day = getActualDay();
                                make_days_table(datelist[f].year, datelist[f].month, datelist[f].day);

                                return false;
                            }

                        }

                    }

                    function goToNextYear()
                    {

                        for (let i = 0; i < yearsQnt; i++)
                        {

                            if(Years[i].classList.contains("active") && Years[i+1])
                            {
                                Years[i].classList.add("off","hide");
                                Years[i].classList.remove("active");

                                Years[i+1].classList.add("active");
                                Years[i+1].classList.remove("off","hide");

                                let f = (onfocus==2 && onfocus==2)?1:0;

                                datelist[f].year = Years[i+1].innerText;
                                datelist[f].month = getActualMonth();
                                datelist[f].day = getActualDay();
                                make_days_table(datelist[f].year, datelist[f].month, datelist[f].day);

                                return false;
                            }

                        }

                    }


                    // B) switch month

                    let MonthPrev = Datepicker.querySelector('.months>.prev'),
                        MonthNext = Datepicker.querySelector('.months>.next');

                    MonthPrev.onclick = () => { goToPrevMonth() };
                    MonthNext.onclick = () => { goToNextMonth() };


                    if(is_touch_device())
                    {
                        month_list.ontouchstart = event_datepiking =>
                        {

                            let dir = event_datepiking.touches[0].clientX;
                            month_list.ontouchmove = event_datepiking =>
                            {
                                if (event_datepiking.target != month_list){ event_datepiking.preventDefault(); }//prevent body scroll
                                if(dir > event_datepiking.changedTouches[0].clientX+175){dir = event_datepiking.touches[0].clientX; goToPrevMonth()}
                                if(dir < event_datepiking.changedTouches[0].clientX-175){dir = event_datepiking.touches[0].clientX; goToNextMonth()}
                            }

                            window.ontouchend = event_datepiking =>
                            {
                                dir = null;
                                event_datepiking = null;
                                window.ontouchmove = null;
                            }
                        }
                    }

                    else
                    {
                        month_list.onmousedown = event_datepiking =>
                        {
                            let dir = event_datepiking.clientX;
                            window.onmousemove = event_datepiking =>
                            {
                                if(dir > event_datepiking.clientX+35){dir = event_datepiking.clientX; goToPrevMonth()}
                                if(dir < event_datepiking.clientX-35){dir = event_datepiking.clientX; goToNextMonth()}
                            }
                            window.onmouseup = event_datepiking =>
                            {
                                dir = null;
                                event_datepiking = null;
                                window.onmousemove = null;
                            }
                        }
                    }

                    function goToPrevMonth()
                    {

                        for (let i = 0; i < monthsQnt; i++)
                        {

                            if(Months[i].classList.contains("active") && Months[i-1])
                            {

                                Months[i].classList.replace("active","off");
                                Months[i].classList.add("hide");

                                Months[i-1].classList.add("active");
                                Months[i-1].classList.remove("off","hide");

                                let f = (onfocus==2 && onfocus==2)?1:0;

                                datelist[f].year = getActualYear();
                                datelist[f].month = i-1;
                                datelist[f].day = getActualDay();
                                make_days_table(datelist[f].year, datelist[f].month, datelist[f].day);

                                return false;

                            }

                        }

                    }

                    function goToNextMonth()
                    {

                        for (let i = 0; i < monthsQnt; i++)
                        {

                            if(Months[i].classList.contains("active") && Months[i+1])
                            {

                                Months[i].classList.replace("active","off");
                                Months[i].classList.add("hide");

                                Months[i+1].classList.add("active");
                                Months[i+1].classList.remove("off","hide");

                                let f = (onfocus==2 && onfocus==2)?1:0;

                                datelist[f].year = getActualYear();
                                datelist[f].month = i+1;
                                datelist[f].day = getActualDay();
                                make_days_table(datelist[f].year, datelist[f].month, datelist[f].day);

                                return false;

                            }

                        }

                    }



                    // C) switch/make days

                    Datepicker.addEventListener('click', event_dayselection => //update date on every click
                    {

                        let dateselected ={},
                            Days = [...Datepicker.querySelectorAll('.day_list .day')],
                            daysQnt = Days.length;

                        for (let i = 0; i < daysQnt; i++)
                        {

                            Days[i].onclick = () => {

                                for (let i = 0; i < daysQnt; i++)
                                {
                                    Days[i].classList.remove("active");
                                    Days[i].classList.add("off");
                                }

                                event_dayselection.target.classList.remove("off","hide");
                                event_dayselection.target.classList.add("active");

                                let f = (onfocus==2 && onfocus==2)?1:0;

                                datelist[f].year = getActualYear();
                                datelist[f].month = getActualMonth();
                                datelist[f].day = parseInt(event_dayselection.target.innerText);

                                printDate();
                            }

                        }

                    },true);

                    // D) switch selector from-to

                    if(FieldsQnt==2)
                    {

                        let dateOne = [...Datepicker.querySelectorAll('.fromto>small')][0],
                            dateTwo = [...Datepicker.querySelectorAll('.fromto>small')][1];

                        dateOne.onclick = event_dateSelector =>
                        {

                            //update focus
                            onfocus  = 1; dateOne.classList.replace('off','active'), dateTwo.classList.replace('active','off');

                            //update yeara label
                            for (let i = 0; i < yearsQnt; i++)
                            {

                                if(datelist[0].year == Years[i].innerText){ Years[i].classList.remove('off','hide'), Years[i].classList.add('active') }
                                else { Years[i].classList.remove('active'), Years[i].classList.add('off','hide')}
                            }

                            //update month label
                            for (let i = 0; i < monthsQnt; i++)
                            {
                                if(datelist[0].month == i){ Months[i].classList.remove('off','hide'), Months[i].classList.add('active') }
                                else { Months[i].classList.remove('active'), Months[i].classList.add('off','hide')}
                            }

                            //update daytable
                            make_days_table(datelist[0].year, datelist[0].month, datelist[0].day);

                            event_dateSelector=null;

                        }

                        dateTwo.onclick = event_dateSelector =>
                        {

                            //update focus
                            onfocus  = 2; dateTwo.classList.replace('off','active'), dateOne.classList.replace('active','off');

                            //update yeara label
                            for (let i = 0; i < yearsQnt; i++)
                            {
                                if(datelist[1].year == Years[i].innerText){ Years[i].classList.remove('off','hide'), Years[i].classList.add('active') }
                                else { Years[i].classList.remove('active'), Years[i].classList.add('off','hide')}
                            }

                            //update month label
                            for (let i = 0; i < monthsQnt; i++)
                            {
                                if(datelist[1].month == i){ Months[i].classList.remove('off','hide'), Months[i].classList.add('active') }
                                else { Months[i].classList.remove('active'), Months[i].classList.add('off','hide')}
                            }

                            //update daytable
                            make_days_table(datelist[1].year, datelist[1].month, datelist[1].day);

                            event_dateSelector=null;

                        }

                    }


                    //
                    // 7: update the datepiker and input values
                    //

                    // check date switcher

                    function printDate()
                    {

                        if(FieldsQnt==2)
                        {

                            let datetime1 = new Date(datelist[0].year,datelist[0].month,datelist[0].day+1).getTime(),
                                datetime2 = new Date(datelist[1].year,datelist[1].month,datelist[1].day+1).getTime(); //sys subtract 1 to refresh D:

                            if(datetime1>=datetime2)
                            {
                                Accept.parentNode.classList.add('disabled');
                                Accept.innerText = 'NO VALID DATES!';
                            }

                            else
                            {

                                let days = [...Datepicker.querySelectorAll('.day_list .day')],
                                    daysQnt = days.length;

                                //reset
                                for (let i = 0; i < daysQnt; i++)
                                    days[i].classList.remove('off','date-range','date-range-first','date-range-last');

                                //setit

                                let daystart    = datelist[0].day,
                                    dayend      = datelist[1].day,

                                    actualMonth = (onfocus==2)?datelist[1].month:datelist[0].month,
                                    minMonth    = datelist[0].month,
                                    maxMonth    = datelist[1].month,

                                    actualYear  = (onfocus==2)?datelist[1].year:datelist[0].year,
                                    minYear     = datelist[0].year,
                                    maxYear     = datelist[1].year;

                                for (let i = 0; i < daysQnt; i++)
                                {

                                    let dayclass    = days[i].classList,
                                        daynumber   = parseInt(days[i].innerText);

                                    if(Number.isInteger(daynumber))
                                    {

                                        if( actualYear >= minYear && actualYear <= maxYear )
                                        {

                                            if(actualYear==minYear && actualMonth == minMonth && daynumber==daystart)
                                            {
                                                dayclass.remove('date-range');
                                                dayclass.add('date-range-first');
                                            }

                                            else if(actualYear==maxYear && actualMonth == maxMonth && daynumber==dayend)
                                            {
                                                dayclass.remove('date-range');
                                                dayclass.add('date-range-last');
                                            }

                                            else
                                            {

                                                if(actualMonth == minMonth && actualMonth == maxMonth && daynumber>daystart && daynumber<dayend)
                                                {
                                                    dayclass.add('date-range');
                                                }

                                                else if(actualMonth != minMonth || actualMonth != maxMonth)
                                                {

                                                    if(actualMonth == minMonth && daynumber>daystart)
                                                    {
                                                        dayclass.add('date-range');
                                                    }
                                                    else if(actualMonth == maxMonth && daynumber<dayend)
                                                    {
                                                        dayclass.add('date-range');
                                                    }
                                                    else if(actualMonth > minMonth && actualMonth < maxMonth)
                                                    {
                                                        dayclass.add('date-range');
                                                    }
                                                    else
                                                    {
                                                        dayclass.remove('date-range');
                                                        dayclass.add('off');
                                                    }

                                                }

                                                else
                                                {
                                                    dayclass.remove('date-range');
                                                    dayclass.add('off');
                                                }

                                            }

                                        }

                                        else
                                        {
                                            dayclass.remove('date-range');
                                            dayclass.add('off');
                                        }

                                    }


                                }

                                Accept.parentNode.classList.remove('disabled');
                                Accept.innerText = 'OK - SAVE';
                            }

                        }

                        else
                        {
                          OutFields[0].value = new Date(datelist[0].year,datelist[0].month,datelist[0].day).getTime();
                          Outlabel.innerText = datelist[0].day+'-'+(datelist[0].month+1)+'-'+datelist[0].year
                        }

                    }


                    Accept.onclick = () => {

                        if(FieldsQnt==2)
                        {
                            let datetime1 = new Date(datelist[0].year,datelist[0].month,datelist[0].day+1).getTime(); //sys subtract 1 to refresh D:
                            let datetime2 = new Date(datelist[1].year,datelist[1].month,datelist[1].day+1).getTime();

                            if(datetime1!=OutFields[0].value) OutFields[0].value = datetime1;
                            if(datetime2!=OutFields[1].value) OutFields[1].value = datetime2;
                            Outlabel.innerText = datelist[0].day+'-'+(datelist[0].month+1)+'-'+datelist[0].year+' // '+datelist[1].day+'-'+(datelist[1].month+1)+'-'+datelist[1].year

                        }
                        else
                        {
                          OutFields[0].value = new Date(datelist[0].year,datelist[0].month,datelist[0].day).getTime();
                          Outlabel.innerText = datelist[0].day+'-'+(datelist[0].month+1)+'-'+datelist[0].year
                        }

                    }

                    // //active/off week
                    // let weekinbox = [...weekday_list.querySelectorAll("p")];
                    // for (let i = 0; i < weekinbox.length; i++)
                    // {
                    //
                    //     weekinbox[i].classList.add("off","disabled");
                    //
                    //     if( i == this_week-1 )
                    //     {
                    //       weekinbox[i].classList.remove("off","disabled");
                    //       weekinbox[i].classList.add("active");
                    //     }
                    //
                    // }

                }

            }


        };


        const stopwatch = () =>
        {

            let buttonclocks = [...document.querySelectorAll('*[class*=button-chronos]')];

            for (let btn of buttonclocks)
            {

                //for all, generate a random id from 0 to 1000
                let CHRONOSRID = Math.floor(Math.random() * 999);

                //set target of off canvas
                btn.setAttribute('target','outbox#chronos-'+CHRONOSRID);

                //generate the empty output
                let chronos_html_outbox =
                `
                <div class="outbox" id="chronos-`+CHRONOSRID+`">
                    <div class="overlay">
                        <div class="side-center">

                            <div class="chronobox">

                                <div>
                                    <a class="close">
                                        <p>Select a time</p>
                                    </a>
                                </div>

                                <!--
                                <div>

                                    <span class="chrono">

                                        <div class="dash-hours">
                                        </div>

                                        <div class="dash-minutes">
                                        </div>

                                        <div class="dash-seconds">
                                        </div>

                                        <div class="dash-milliseconds">
                                        </div>

                                        <div class="pivot"></div>

                                    </span>

                                </div>
                                -->

                                <div>

                                    <div class="display">
                                        <div>
                                            <span class="button hours" title="hours"><input type="number" pattern="[0-9]{2}" value="00"/></span>
                                            <span class="doubledot"><small>:</small></span>
                                            <span class="button minutes" title="minutes"><input type="number" pattern="[0-9]{2}" value="00"/></span>
                                            <span class="doubledot"><small>:</small></span>
                                            <span class="button seconds" title="seconds"><input type="number" pattern="[0-9]{2}" value="00"/></span>
                                            <span class="doubledot"><small>.</small></span>
                                            <span class="button milliseconds"><input disabled type="number" value="000"/></span>
                                        </div>
                                        <div>
                                            <small class="start off">START</small>
                                            <small class="pause off">PAUSE</small>
                                            <small class="reset off">RESET</small>
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <div class="button align-center">
                                        <a class="accept">OK - SAVE</a>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                `;


                //print empty output & get it

                document.getElementsByTagName('BODY')[0].insertAdjacentHTML('beforeEnd',chronos_html_outbox);
                let Outbox = document.getElementById("chronos-"+CHRONOSRID);
                let accept = Outbox.querySelectorAll('.accept')[0];


                let reversed = (!btn.className.includes('-reversed')) ? false : true;


                let Hours = Outbox.querySelectorAll('.hours>input')[0],
                    Minutes = Outbox.querySelectorAll('.minutes>input')[0],
                    Seconds = Outbox.querySelectorAll('.seconds>input')[0],
                    Milliseconds = Outbox.querySelectorAll('.milliseconds>input')[0];

                Hours.onmousedown = () =>{ selectfullstring(Hours)  }
                Hours.ontouchstart = () =>{  selectfullstring(Hours) }
                Minutes.onmousedown = () =>{  selectfullstring(Minutes) }
                Minutes.ontouchstart = () =>{  selectfullstring(Minutes) }
                Seconds.onmousedown = () =>{  selectfullstring(Seconds) }
                Seconds.ontouchstart = () =>{  selectfullstring(Seconds) }
                function selectfullstring (I){ I.select() }


                let label     = btn.querySelectorAll('label')[0],
                    datainput = btn.getElementsByTagName('input')[0],
                    start     = Outbox.querySelectorAll('.display .start')[0],
                    pause     = Outbox.querySelectorAll('.display .pause')[0],
                    reset     = Outbox.querySelectorAll('.display .reset')[0];

                let startlabel = label.innerText,
                    start_hh = Hours.value,
                    start_mm = Minutes.value,
                    start_ss = Seconds.value,
                    start_ms = 0,

                    timeOnStart = null,
                    timeOnPause = null,
                    pauseDuration = 0,
                    started = null;


                let inputs = [Hours,Minutes,Seconds,Milliseconds];
                for (let i of inputs)
                {
                    i.oninput = ev_chronos =>
                    {

                        setTimeout(()=>{
                            let iv = parseInt(i.value);
                            i.value = (iv > 9 ? iv : "0"+iv);
                            i.setAttribute('value',(iv > 9 ? iv : "0"+iv));
                        },250)

                        start_hh = Hours.value;
                        start_mm = Minutes.value;
                        start_ss = Seconds.value;
                        start_ms = Milliseconds.value;

                    }
                }

                start.onclick = ev_chronos =>
                {

                    start.classList.add('active');
                    start.classList.remove('off');
                    pause.classList.remove('active');
                    pause.classList.add('off');
                    reset.classList.remove('active');
                    reset.classList.add('off');

                    if(timeOnStart == null)
                    {

                        timeOnStart = new Date(); // - ex date of actual time passed?

                        if(reversed)
                        {
                            timeOnStart.setHours( timeOnStart.getHours() + parseInt(start_hh) );
                            timeOnStart.setMinutes( timeOnStart.getMinutes() + parseInt(start_mm));
                            timeOnStart.setSeconds( timeOnStart.getSeconds() + parseInt(start_ss));
                            timeOnStart.setMilliseconds( timeOnStart.getMilliseconds() + parseInt(start_ms));
                        }

                    }
                    else
                    {
                        clearInterval(started);
                    }


                    if (timeOnPause != null)
                    {
                        pauseDuration += (new Date() - timeOnPause);
                    }

                    started = setInterval(()=>{

                        let hour,min,sec,ms,currentTime = new Date();

                        if(reversed)
                        {

                            let timediff = new Date( timeOnStart.getTime()+pauseDuration ) - currentTime ;


                            if(timediff>0)
                            {

                                let reverseTime =  new Date( Math.abs(timediff ) );

                                hour = reverseTime.getUTCHours();
                                min = reverseTime.getUTCMinutes();
                                sec = reverseTime.getUTCSeconds();
                                ms = reverseTime.getUTCMilliseconds();

                            }
                            else
                            {
                                hour= 0;
                                min= 0;
                                sec= 0;
                                ms= 0;
                                timeOnStart = null;
                                clearInterval(started);

                                start.classList.remove('active');
                                start.classList.add('off');
                            }

                        }
                        else
                        {
                            let timeElapsed = new Date(currentTime - timeOnStart - pauseDuration);

                            hour = timeElapsed.getUTCHours();
                            min  = timeElapsed.getUTCMinutes();
                            sec  = timeElapsed.getUTCSeconds();
                            ms   = timeElapsed.getUTCMilliseconds();

                        }

                        hour = (hour > 9 ? hour : "0" + hour);
                        min = (min > 9 ? min : "0" + min)
                        sec =(sec > 9 ? sec : "0" + sec)
                        ms = (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);

                        Hours.value = hour;
                        Hours.setAttribute('value',hour);

                        Minutes.value = min;
                        Minutes.setAttribute('value',min);

                        Seconds.value = sec;
                        Seconds.setAttribute('value',sec);

                        Milliseconds.value = ms;
                        Milliseconds.setAttribute('value',ms);

                    }, 50);


                }

                pause.onclick = ev_chronos => {

                    start.classList.add('off');
                    start.classList.remove('active');
                    pause.classList.remove('off');
                    pause.classList.add('active');
                    reset.classList.remove('active');
                    reset.classList.add('off');

                    paused();

                }

                function paused () {
                    if(timeOnStart != null)
                    {
                        timeOnPause = new Date();
                        clearInterval(started);
                    }
                }

                reset.onclick = ev_chronos =>
                {

                    start.classList.add('off');
                    start.classList.remove('active');
                    pause.classList.remove('active');
                    pause.classList.add('off');
                    reset.classList.remove('off');
                    reset.classList.add('active');

                    clearInterval(started);
                    pauseDuration = 0;
                    timeOnStart = null;
                    timeOnPause = null;

                    let hour = (parseInt(start_hh) > 9 ? start_hh : "0" + parseInt(start_hh)),
                        min = (parseInt(start_mm) > 9 ? start_mm : "0" + parseInt(start_mm))
                        sec =(parseInt(start_ss) > 9 ? start_ss : "0" + parseInt(start_ss))
                        ms = (parseInt(start_ms) > 99 ? start_ms : parseInt(start_ms) > 9 ? "0" + start_ms : "00" + parseInt(start_ms));

                    Hours.value = hour;
                    Hours.setAttribute('value',hour);

                    Minutes.value = min;
                    Minutes.setAttribute('value',min);

                    Seconds.value = sec;
                    Seconds.setAttribute('value',sec);

                    Milliseconds.value = ms;
                    Milliseconds.setAttribute('value',ms);

                    label.innerText = startlabel;

                    setTimeout(()=>{
                        reset.classList.remove('active');
                        reset.classList.add('off');
                    },1000)

                    ev_chronos = null;

                }

                accept.onclick = ev_chronos =>
                {
                    paused();

                    let hour = Hours.value,
                        min = Minutes.value,
                        sec = Seconds.value,
                        ms = Milliseconds.value;

                    datainput.value = hour+':'+min+':'+sec+'.'+ms;
                    datainput.setAttribute('value',hour+':'+min+':'+sec+'.'+ms);

                    label.innerText = hour+':'+min+':'+sec+'.'+ms;

                }

            }

        }


        const loaderslist = {'fileloader':[]};
        const filereaders = () =>
        {

            let btnfilelist = document.querySelectorAll('[class*="button-file"]'), loaderindex = 0;

            for (let btn of btnfilelist)
            {
                // make a datas record for all btn file
                loaderslist.fileloader.push(

                    ( !btn.closest('.fileloader') )
                        ? 'not fileloader detected'
                        : {
                            'running'             : false,
                            'firstlaunch'         : true,

                            'container'           : 'not defined',
                            'input'               : 'not defined',
                            'resetter'            : 'not defined',
                            'display'
                            :{
                                'element'         :'not defined',
                                'container'       :'not defined'
                            },

                            'settings'
                            :{
                                'type'            : 'not defined',
                                'autoconversion'  : 'not defined',
                                'preview'         : 'not defined',
                                'deleter'         : 'not defined',
                                'grabber'         : 'not defined',
                                'filters'         : 'not defined',
                                'minilabels'      : 'not defined'
                            },

                            'compressor'
                            :{
                                'imageMaxWidth'   : 'not defined',
                                'imageMaxHeight'  : 'not defined',
                                'imageQuality'    : 'not defined'
                            },

                            'datalist'
                            :[
                                /*databoxmodel added via file upload => search:"makeNewData"*/
                            ]

                        }

                );

            }

            for (let btn of btnfilelist)
            {

                //
                // button file
                //


                // get all main elements

                let inputfield       = btn.querySelectorAll('input[type="file"]')[0],
                    textfield        = btn.getElementsByTagName('label')[0],
                    startlabeltext   = textfield.innerText,
                    fileloader       = loaderslist.fileloader[loaderindex];


                // if not have actions.. make it.

                if ( !btn.querySelectorAll('.originslist').length )
                {

                    let html_output =
                    `
                        <span class="originslist hide">
                            <a class="viewlist">
                                list&nbsp;&#x2630
                            </a>
                            &nbsp;
                            <a class="clearlist">
                                &#10006
                            </a>
                        </span>
                    `;

                    btn.insertAdjacentHTML('beforeEnd',html_output);

                }


                // if btn field change of move contents...
                inputfield.oninput = ev_buttonfile_inputchange => { updatebuttonfile(btn,inputfield,textfield,startlabeltext,fileloader,true);ev_buttonfile_inputchange=null; }

                function updatebuttonfile(btn,inputfield,textfield,startlabeltext,fileloader,refreshfromstart)
                {


                    // (method) check all basic limits requested

                    function checkfilelimits (result)
                    {

                        let status      = false,
                            message     = '',
                            checking    = [],
                            minqnt      = parseInt(inputfield.getAttribute("minlength")) || 0,
                            maxqnt      = parseInt(inputfield.getAttribute("maxlength")),
                            filelimit   = inputfield.getAttribute("size"),
                            totallimit  = inputfield.getAttribute("maxsize"),
                            accepted    = inputfield.getAttribute("accept"),
                            fileslength = inputfield.files.length;


                        if(minqnt)
                        {

                            if(fileslength < minqnt)
                            {
                                textfield.closest("[class*='button-file']").classList.add('border-error');
                                checking.push(false); message = ('quantity wrong: '+fileslength+' of min: '+minqnt+'');
                            }

                        }

                        if(maxqnt)
                        {

                            if(fileslength > maxqnt)
                            {
                                textfield.closest("[class*='button-file']").classList.add('border-error');
                                checking.push(false); message = ('quantity wrong: '+fileslength+' of max: '+maxqnt+'');
                            }

                        }


                        if(totallimit)
                        {

                            let total=0;
                            for (let i = 0; i < fileslength; i++)
                            {
                                let filesize = parseFloat( (Math.floor((inputfield.files[i].size/1000))/1024).toFixed(2) );
                                total += filesize;
                            }

                            if(total>totallimit)
                            {
                                textfield.closest("[class*='button-file']").classList.add('border-error');
                                checking.push(false); message = ('out of space: '+total+'mb - max: '+totallimit+'mb');
                            }

                        }

                        if(!btn.closest('.fileloader'))
                        {

                            if(filelimit)
                            {

                                for (let i = 0; i < fileslength; i++)
                                {
                                    let megabyte = (Math.floor((inputfield.files[i].size/1000))/1024).toFixed(2);
                                    if(megabyte>filelimit)
                                    {
                                        textfield.closest("[class*='button-file']").classList.add('border-error');
                                        checking.push(false); message = ('file overload: '+megabyte+'mb - max: '+filelimit+'mb');
                                    }

                                }

                            }

                            if(fileslength!=0 && accepted)
                            {
                                for (let i = 0; i < fileslength; i++)
                                {

                                    let file_extension = String( inputfield.files[i].name.match(/\.([^\.]+)$/)[1] ).toLowerCase();

                                    let arrayofkeys = [...accepted.split(", ")].join(' '),
                                        keys = arrayofkeys.split(' ');

                                    for (let i = 0; i < file_extension.length; i++)
                                    {

                                        let key = String(keys[i]);

                                        if(keys.indexOf(file_extension) === -1)
                                        {
                                            textfield.closest("[class*='button-file']").classList.add('border-error');
                                            checking.push(false); message = ('error: <i>'+file_extension+'</i> files is not supported');
                                        }

                                    }

                                }
                            }
                        }

                        status = (checking.includes(false)) ? false : true;

                        result(status,message);

                    }

                    // if all limits is checked, let's start!

                    checkfilelimits( (status,message) => {


                        let originslist   = btn.querySelectorAll('.originslist')[0],
                            viewlist      = originslist.firstElementChild,
                            clearlist     = originslist.lastElementChild,
                            filesquantity = inputfield.files.length;


                        originslist.classList.add('hide');


                        if(!status)
                        {

                            //add error labels
                            btn.classList.add('border-error');
                            textfield.innerHTML = message;

                        }


                        else
                        {

                            //remove error labels
                            btn.classList.remove('border-error');
                            originslist.classList.add('hide');
                            viewlist.classList.add('hide');


                            /*------*/


                            // set origins list structure

                            // :: "refreshfromstart"
                            // :: When you drop or change files directly you need to reset all (reset true).
                            // :: updatebuttonfile is called from dropend and oninput with reset true and
                            // :: this function remake from zero the structures of main listed files


                            if(!refreshfromstart)
                            {

                                originslist.classList.remove('hide');

                                let selected = String( inputfield.value.split('\\')[inputfield.value.split('\\').length - 1] );

                                textfield.classList.add('active'),
                                textfield.innerHTML = '&#x2714 '+selected,

                                setTimeout( () =>{
                                  textfield.classList.remove('active');
                                },150);

                                let outboxid = viewlist.target.split('outbox#')[1];

                                listupadate(inputfield,textfield,viewlist,originslist,outboxid)

                            }

                            else
                            {

                                let id = `filelist-`+String( Math.floor(Math.random() * 999) );

                                let fileviewer_empty_outbox =
                                `
                                    <div class="outbox" id="`+id+`">
                                        <div class="overlay">
                                            <div class="side-center">

                                                <div class="filelistbox">

                                                    <div>
                                                        <a class="close">
                                                            <p>File selected</p>
                                                        </a>
                                                    </div>

                                                <div>

                                                <div class="hide-bar-y">
                                                    <div class="scroll-y">

                                                        <div class="filegroup grid-x">
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                `;

                                //print empty output & get it
                                document.getElementsByTagName('BODY')[0].insertAdjacentHTML('beforeEnd',fileviewer_empty_outbox);

                                listupadate(inputfield,textfield,viewlist,originslist,id)

                                // refresh fileloader (it exist)

                                if(btn.closest('.fileloader')) runfileloader(btn,fileloader)

                            }

                            function listupadate(inputfield,textfield,viewlist,originslist,target)
                            {

                                if(target!=null)
                                {

                                    let filegroup = (document.getElementById(target)) ? document.getElementById(target).querySelectorAll('.filegroup')[0] : null;

                                    let filenames = [];
                                    for (let i=0; i<inputfield.files.length; i++)
                                    {

                                        let fdt = inputfield.files[i],
                                            FIN = '',
                                            FXT = 'file',
                                            FSZ = (~~((fdt.size/1000))/1024).toFixed(3);

                                        if(fdt.name.split('.')[0]!=null)        FIN = fdt.name.split('.')[0];
                                        if(fdt.name.match(/\.([^\.]+)$/)!=null) FXT = fdt.name.match(/\.([^\.]+)$/)[1];
                                        if(FSZ=='0.000')                        FSZ = '≅.001';

                                        filenames.push(`

                                                <div class="box-[50-50-50] align-left">
                                                    <div>
                                                        <p class="ellipsis">
                                                            `+FIN+`
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="box-[20-20-20] align-center">
                                                    <div>
                                                        <p>`+FXT+`</p>
                                                    </div>
                                                </div>
                                                <div class="box-[30-30-30] align-right">
                                                    <div>
                                                        <p>`+FSZ+`mb</p>
                                                    </div>
                                                </div>

                                            `);

                                    }

                                    //from array list to list of strings
                                    let fileslist = String(filenames.join(' '));
                                    filegroup.innerHTML = fileslist;

                                    //update input & p & put inside
                                    textfield.innerHTML = ('&#x2714 '+inputfield.files.length+' files selected');

                                    viewlist.setAttribute('target','outbox#'+target);
                                    viewlist.classList.remove('hide');
                                    originslist.classList.remove('hide');

                                    // inputfield.setAttribute('value', inputfield.value);
                                    textfield.classList.add('active');

                                    ui.reload('outbox');
                                }

                            }


                            // reset buttonfile when press clear in ui

                            clearlist.addEventListener ('touchstart', ev_buttonfile_inputreset => {btnvaluereset(ev_buttonfile_inputreset)} ,true);
                            clearlist.addEventListener ('click', ev_buttonfile_inputreset => {btnvaluereset(ev_buttonfile_inputreset)} ,true);

                            function btnvaluereset (ev_buttonfile_inputreset)
                            {

                                inputfield.setAttribute('value','');
                                inputfield.value='';
                                textfield.innerText = startlabeltext;
                                originslist.classList.add('hide');

                                if(btn.closest('.fileloader')) runfileloader(btn,fileloader)

                                ev_buttonfile_inputreset=null;

                            }


                        }

                    })


                }
                // The uploader mechs (it's called from updatebuttonfile when button data change, so... also for the drops events)

                runfileloader(btn,fileloader)
                function runfileloader(btn,fileloader)
                {


                    //
                    // file loader drag n drop
                    //


                    if( btn.closest('.fileloader') )
                    {


                        // set basic fileloader params

                        fileloader.input              = inputfield;
                        fileloader.container          = btn.closest('.fileloader');
                        fileloader.resetter           = fileloader.container.querySelectorAll('.clearlist')[0] || null;
                        fileloader.btnsend            = fileloader.container.querySelectorAll('.button-sendnow')[0] || null;
                        fileloader.display.element    = fileloader.container.querySelectorAll('[class*=display]')[0];


                        // is it supported?
                        let onstarterrors = (window.File && window.FileReader && window.FileList && window.Blob) ? false : readersnotsupported();

                        // reader engine not supported? No? stop all.
                        function readersnotsupported()
                        {
                                fileloader.classList.add('disabled');
                                fileloader.input.classList.add('disabled');
                                fileloader.btnsend.classList.add('disabled');
                                fileloader.display.element.innerHTML= '<div class="absolute-center"><p>YOUR SYSTEM NOT SUPPORTED FILE READERS</p></div>';
                                debug(`:: [⚠ ui alert]: fileloader error\n   ⮑ No modern file reader are supported.\n   ⮑ reader message:`+loading.target.error+`\n   ⮑ element:`,Btn.closest('.fileloader'))
                                onstarterrors = true;
                        }

                        // display error exist? No? stop all.
                        if(!fileloader.display.element || fileloader.display.element=='not defined')
                        {
                            debug(`:: [⚠ ui alert]: fileloader error\n   ⮑ display not found.\n   ⮑ element:`,btn.closest('.fileloader'));
                            onstarterrors = true;
                            fileloader.container.classList.add('disabled');
                        }


                        if(!onstarterrors)
                        {


                            // (method) reprint the list
                            // :: after drag or display actions need to
                            // :: reorder/remake the file list with every data.
                            // :: work for geko and moz (webkit?)

                            function FromArrayToInputFileList(...items)
                            {
                                items = [].concat(...items);
                                let dataevent = new ClipboardEvent('').clipboardData || new DataTransfer();
                                for (let data of items) { dataevent.items.add(data) }  return dataevent.files;
                            }

                            // set file drops actions
                            // :: on drop over get list of data and on leave remove hover panel and...

                            fileloader.container.addEventListener('dragover', ev_buttonfile_filedropover => {

                                //ev_buttonfile_filedropover.dataTransfer.effectAllowed = "move"; ???

                                ev_buttonfile_filedropover.preventDefault();
                                ev_buttonfile_filedropover.stopPropagation();

                                let DT = ev_buttonfile_filedropover.dataTransfer || ev_buttonfile_filedropover.clipboardData;
                                if(DT.items[0]!=undefined)
                                {
                                    if (DT.items[0].kind.toLowerCase()=='file')
                                    {

                                        fileloader.container.classList.add('draghere');

                                        fileloader.container.ondragleave = ev_buttonfile_filedropover => {
                                            ev_buttonfile_filedropover.preventDefault();
                                            ev_buttonfile_filedropover.stopPropagation();
                                            setTimeout(()=>{
                                                fileloader.container.classList.remove('draghere');
                                            },300)
                                        }

                                    }
                                }

                            },false);

                            // :: ...on drop, remake data (with FromArrayToInputFileList)

                            fileloader.container.addEventListener('drop', ev_buttonfile_filedropped => {

                                ev_buttonfile_filedropped.preventDefault();
                                ev_buttonfile_filedropped.stopPropagation();

                                let DT = ev_buttonfile_filedropped.dataTransfer || ev_buttonfile_filedropped.clipboardData;
                                if (DT.items[0].kind.toLowerCase()=='file')
                                {

                                    let filelisted = [];
                                    for (let F=0; F < DT.files.length; F++)
                                    {
                                        let fileorigin  = DT.files[F];
                                        filelisted.push( new File( [fileorigin], fileorigin.name ) );
                                    }

                                    fileloader.container.classList.remove('draghere');

                                    inputfield.files = FromArrayToInputFileList(filelisted);

                                    inputfield       = btn.querySelectorAll('input[type="file"]')[0];
                                    textfield        = btn.getElementsByTagName('label')[0];

                                    setTimeout(()=>{
                                        updatebuttonfile(btn,inputfield,textfield,startlabeltext,fileloader,true);
                                    },300)
                                }

                            },true);


                        }




                        //  get or make id

                        let fileloaderid = (!fileloader.id) ? ~~(Math.random()*100) : fileloader.id;

                        //  is it sortable?

                        let iscustomdock= (fileloader.container.querySelectorAll('.customdock').length>0)?true:false;

                        // get fileloader settings

                        let uploderSets = String(fileloader.container.dataset.settings).replace(/\s/g,'').replace(/\[/g,'').replace(/\]/g,'');

                        // split settings anche change it in true/false ( for type, chunks, icons, ohers, and..

                        if(!uploderSets.includes('type'))
                        {
                            fileloader.settings.type = 'single';
                        }
                        else
                        {
                            fileloader.settings.type = uploderSets.split('type:')[1].split(',')[0]
                        };

                        if(!uploderSets.includes('chunksize'))
                        {
                            fileloader.settings.chunksize = parseInt( 64*1024 )
                        }
                        else
                        {
                            fileloader.settings.chunksize = parseInt(uploderSets.split('chunksize:')[1].split(',')[0])
                        }

                        if(!uploderSets.includes('converter'))
                        {
                            fileloader.settings.autoconversion = false;
                        }
                        else
                        {
                            fileloader.settings.autoconversion = (uploderSets.split('converter:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('preview'))
                        {
                            fileloader.settings.preview = false;
                        }
                        else
                        {
                            fileloader.settings.preview = (uploderSets.split('preview:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('linked'))
                        {
                            fileloader.settings.linked = false;
                        }
                        else
                        {
                            fileloader.settings.linked = (uploderSets.split('linked:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('icons'))
                        {
                            fileloader.settings.previewicons = false;
                        }
                        else
                        {
                            fileloader.settings.previewicons = (uploderSets.split('icons:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('deleter'))
                        {
                            fileloader.settings.deleter = false;
                        }
                        else
                        {
                            fileloader.settings.deleter = (uploderSets.split('deleter:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('sortable'))
                        {
                            fileloader.settings.sortable = false;
                        }
                        else
                        {
                            fileloader.settings.sortable = (uploderSets.split('sortable:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('grabber'))
                        {
                            fileloader.settings.grabber = false;
                        }
                        else
                        {
                            fileloader.settings.grabber = (uploderSets.split('grabber:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('filters'))
                        {
                            fileloader.settings.filters = false;
                        }
                        else
                        {
                            fileloader.settings.filters = (uploderSets.split('filters:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('metalabel'))
                        {
                            fileloader.settings.metalabel = false;
                        }
                        else
                        {
                            fileloader.settings.metalabel = (uploderSets.split('metalabel:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('titlelabel'))
                        {
                            fileloader.settings.filetitlelabel = false;
                        }
                        else
                        {
                            fileloader.settings.filetitlelabel = (uploderSets.split('titlelabel:')[1].split(',')[0]=='true') ? true : false;
                        }

                        if(!uploderSets.includes('customized'))
                        {
                            fileloader.settings.customized = false;
                        }
                        else
                        {
                            fileloader.settings.customized = (uploderSets.split('customized:')[1].split(',')[0]=='true') ? true : false;
                        }


                        //  ...sortable slots settings...

                        let grabboxstart  = (fileloader.settings.sortable==true) ? '<div class="grabslot-['+fileloaderid+']"><div class="grabbox">' : '',
                            grabboxend    = (fileloader.settings.sortable==true) ? '</div></div>' : '';


                        // ...compression settings)

                        let compressorSets = String(fileloader.container.dataset.compressor);

                        if(fileloader.container.dataset.compressor)
                        {
                            let resolution = (compressorSets.includes('resolution')) ? compressorSets.split('image-resolution:')[1].split(',')[0] : null;

                            if(!compressorSets.includes('resize-type')){ fileloader.compressor.resizingtype = 'proportional' ;}
                            else{ fileloader.compressor.resizingtype = (compressorSets.split('resize-type:')[1].split(',')[0]=='proportional')?'proportional':'linear'; }

                            fileloader.compressor.imageMaxWidth  = parseInt( resolution.split('x')[0] ) || 1920;
                            fileloader.compressor.imageMaxHeight = parseInt( resolution.split('x')[1] ) || 1920;
                            fileloader.compressor.imageQuality   = parseFloat( compressorSets.split('image-quality:')[1].split(',')[0]/100 ) || .75;
                        }
                        else
                        {
                            fileloader.settings.preview = false;
                            fileloader.settings.linked = false;
                            fileloader.compressor=false;
                        }

                        if(fileloader.settings.autoconversion==false)
                        {
                            fileloader.settings.preview = false;
                            fileloader.settings.linked = false;
                            fileloader.compressor=false;
                        }


                        /*----*/


                        // (method) set display type
                        // :: it's called by loopfiles.

                        function makedisplay(fileloader)
                        {

                            if(fileloader.settings.type == 'single')
                            {

                                if(fileloader.settings.sortable==true)
                                {
                                    fileloader.settings.sortable = false;
                                    debug(':: [⚠ ui alert]: Info on fileloader\n   ⮑ settings work, displaytype single connot have a sortable!\n\n');
                                }
                                if(fileloader.settings.title==true)
                                {
                                    fileloader.settings.title = false;
                                    debug(':: [⚠ ui alert]: Info on fileloader\n   ⮑ settings work, displaytype single connot have a titles!\n\n');
                                }
                                if(fileloader.settings.title==true)
                                {
                                    fileloader.settings.title = false;
                                    debug(':: [⚠ ui alert]: Info on fileloader\n   ⮑ settings work, displaytype single connot have a titles!\n\n');
                                }
                                if(fileloader.settings.metalabel==true)
                                {
                                    fileloader.settings.metalabel = false;
                                    debug(':: [⚠ ui alert]: Info on fileloader\n   ⮑ settings work, displaytype single connot have a labels!\n\n');
                                }
                                if( fileloader.settings.grabber==true )
                                {
                                    fileloader.settings.grabber = false;
                                    debug(`:: [⚠ ui alert]: fileloader data-settings error\n   ⮑ type-single not accept a grabber`);
                                }


                                fileloader.input.setAttribute('maxlength','1');
                                fileloader.display.element.classList.add('type-single');
                                fileloader.display.container = fileloader.display.element;

                            }
                            else if(fileloader.settings.type == 'listed')
                            {

                                fileloader.display.element.classList.add('type-list');
                                fileloader.display.element.innerHTML = (`<div class="hide-bar-y"><div class="scroll-y"><div></div></div></div>`);
                                fileloader.display.container = fileloader.display.element.querySelectorAll('.scroll-y')[0].firstElementChild;

                            }
                            else if(fileloader.settings.type == 'grid')
                            {

                                let gap = (!uploderSets.includes('boxgap')) ? '' : 'gap-'+uploderSets.split('boxgap:')[1].split(',')[0];

                                fileloader.display.element.classList.add('type-grid');
                                fileloader.display.element.innerHTML = (`<div class="hide-bar-y"><div class="scroll-y"><div class="grid-x `+gap+`"></div></div></div>`);
                                fileloader.display.container = fileloader.display.element.querySelectorAll('.scroll-y')[0].firstElementChild;

                            }
                            else if(fileloader.settings.type == 'wall')
                            {


                                let wallcols = (!uploderSets.includes('wallcols')) ? '04-03-01' : uploderSets.split('wallcols:')[1].split(',')[0];
                                let boxgap = (!uploderSets.includes('boxgap')) ? '' : 'gap-'+uploderSets.split('boxgap:')[1].split(',')[0];

                                fileloader.display.element.classList.add('type-wall');
                                fileloader.display.element.innerHTML = (`<div class="hide-bar-y"><div class="scroll-y"><div class="grid-y col-[`+wallcols+`] `+boxgap+` autoset"></div></div></div>`);
                                fileloader.display.container = fileloader.display.element.querySelectorAll('.scroll-y')[0].firstElementChild;

                            }
                            else
                            {
                                debug(`:: [⚠ ui alert]: Error on fileloader\n   ⮑ settings work, displaytype not finded!\n      see more: https://git.io/J4hdC\n\n`);
                            }

                        }


                        // autostart or... on change restart...

                        loopfiles(fileloader); fileloader.input.oninput = ()=>{


                            let uploader_run_from_other_buttonfile = checkreaderrunning();

                            function checkreaderrunning() {
                                for (let f of loaderslist.fileloader)
                                {
                                    if(f != fileloader)
                                    {
                                        if(f.running==true) return true;
                                    }
                                }
                            }

                            if(uploader_run_from_other_buttonfile)
                            {

                                ui.warning({
                                    type:'alert',
                                    content:'Warning! A file upload is already in progress on this page. I cannot continue in your request... wait the end of process.',
                                    accept:'OK - I UNDERSTAND'
                                }, result => {

                                    // hard reset:
                                    // fileloader.display.container.innerHTML = '';
                                    // fileloader.datalist = [];
                                    // makedisplay(fileloader)
                                    // updateButtonFileList(fileloader);
                                    // fileloader.input.style['pointer-events'] = null;
                                    // if(fileloader.btnsend) fileloader.btnsend.style['pointer-events'] = null;

                                })
                            }

                            else
                            {
                                loopfiles(fileloader)
                            }



                        }


                        // loop the files

                        function loopfiles(fileloader)
                        {

                            // set/reset fileloader

                            fileloader.display.container.innerHTML = '';
                            fileloader.datalist = [];

                            makedisplay(fileloader);


                            // stepperloop: analize file and get all data from all boxes

                            let step = 0; ( init_filesanalyzer = ( fileloader, step, () => {

                                // is the end? you can add one more.
                                if( step >= fileloader.input.files.length )
                                {

                                    // unlock input if end

                                    fileloader.input.style['pointer-events'] = null;
                                    if(fileloader.btnsend) fileloader.btnsend.style['pointer-events'] = null;


                                    //if !single addone button exist, set it.

                                    if(fileloader.settings.type != 'single' && fileloader.firstlaunch!=true)
                                    {

                                        // remove & recreate addone button

                                        if(fileloader.display.container.parentNode.querySelectorAll('.button-file-addone').length>0)
                                                fileloader.display.element.querySelectorAll('.button-file-addone')[0].parentNode.remove()

                                        fileloader.display.container.parentNode.insertAdjacentHTML('beforeEnd',`<div class="addone"><div class="button-file-addone"><label>ADD ONE MORE</label><input type="file"/></div></div>`);


                                        // add a file via addone button

                                        let inputaddone = fileloader.display.container.parentNode.querySelectorAll('.button-file-addone>input')[0];
                                        inputaddone.oninput = () =>
                                        {

                                            // lock main input if not end

                                            fileloader.input.style['pointer-events']='none';
                                            if(fileloader.btnsend) fileloader.btnsend.style['pointer-events']='none';


                                            // lock addone if not end

                                            inputaddone.parentNode.querySelectorAll('label')[0].innerHTML = 'wait a moment...';
                                            inputaddone.parentNode.disabled=true;;
                                            inputaddone.style.visibility='collapse';
                                            inputaddone.disabled=true;

                                            if(inputaddone.files.length==1)
                                            {

                                                let newfile = inputaddone.files[0],
                                                    newstep = fileloader.input.files.length;

                                                makeNewData(fileloader,newstep);

                                                analyzeStepData( fileloader, newstep, newfile, ()=>
                                                {

                                                    // unlock inputs

                                                    fileloader.input.style['pointer-events'] = null;
                                                    if(fileloader.btnsend) fileloader.btnsend.style['pointer-events'] = null;

                                                    inputaddone.parentNode.querySelectorAll('label')[0].innerHTML = 'ADD ONE MORE';
                                                    inputaddone.parentNode.removeAttribute('disabled');
                                                    inputaddone.removeAttribute('style');
                                                    inputaddone.removeAttribute('disabled');

                                                    // update the real file list

                                                    updateButtonFileList(fileloader);

                                                })

                                                eventfilesAddOne=null;

                                            }

                                        }


                                    }


                                    //update main input list

                                    // updateButtonFileList(fileloader);
                                    onclickresetter(fileloader);

                                    ui.reload('grabs');

                                    fileloader.running=false;

                                }

                                // if not end, run analyzer.
                                else
                                {

                                    // lock input if not end

                                    fileloader.input.style['pointer-events']='none';
                                    if(fileloader.btnsend){fileloader.btnsend.style['pointer-events']='none'};

                                    // add new step on object
                                    // :: preapare all type of data and make display
                                    // :: the data type is a model, It's empty.

                                    makeNewData(fileloader,step);

                                    // analysys of object steps
                                    // :: this read all type of file into input
                                    // :: ad put it into a data model

                                    analyzeStepData(
                                    fileloader, step, fileloader.input.files[step],
                                    ()=>{
                                        init_filesanalyzer(fileloader,step++);
                                    });

                                }


                                function makeNewData (fileloader,steptarget)
                                {

                                    // made new file data

                                    fileloader.datalist.push({

                                            'filedata'
                                            :{
                                                'name'     : 'not-defined' ,
                                                'blob'     : 'not-defined' ,
                                                'size'     : 'not-defined' ,
                                                'typed'    : 'not-defined' ,
                                                'mime'     : 'not-defined' ,
                                                'chunks'   : 'not-defined'
                                            },

                                            'container'    : 'not-defined' ,
                                            'origins'      : 'not-defined' ,
                                            'buttons'
                                            :{
                                                'title'     : 'not-defined' ,
                                                'deleter'   : 'not-defined' ,
                                                'grabber'   : 'not-defined' ,
                                                'view'      : 'not-defined' ,
                                                'filters'   : 'not-defined'
                                            }

                                    });


                                    // select a type for display the file

                                    let btn_option_panel    = (!fileloader.settings.filters) ?``: `<a class="action-filters" data-index="`+((steptarget>=0)?steptarget:fileloader.contents.length)+`" title="edit this file"></a>`;
                                    let btn_linked_icon     = (!fileloader.settings.linked)  ?``: `<a class="action-view" title="view this file"></a>`;
                                    let btn_delete_icon     = (!fileloader.settings.deleter) ?``: `<a class="action-delete" title="remove this file"></a>`;
                                    let btn_grab_icon       = (!fileloader.settings.grabber) ?``: `<span class="action-grab" title="move on other place"></span>`;

                                    let print_previewbox  = (!fileloader.settings.preview && !fileloader.settings.linked)
                                                                ?``:`
                                                                    <div class="preview">
                                                                        <img alt=" " src=" ">
                                                                    </div>
                                                                `;

                                    let print_actionsbox = (fileloader.settings.filters || fileloader.settings.linked || fileloader.settings.deleter || fileloader.settings.grabber)
                                                                ?`
                                                                    <span class="actions">
                                                                        `+btn_option_panel
                                                                         +btn_linked_icon
                                                                         +btn_delete_icon
                                                                         +btn_grab_icon+`
                                                                     </span>
                                                                 `:``;

                                    let print_textlabels = (!fileloader.settings.metalabel)
                                                                ?``:`
                                                                    <p class="filetype"></p>
                                                                    <p class="filesize"></p>
                                                                `;

                                    let print_nameinput  = (!fileloader.settings.filetitlelabel)
                                                                ?``:`
                                                                    <div class="action-rename">
                                                                        <input type="text" class="ellipsis" value="" />
                                                                    </div>
                                                                `;

                                    if(fileloader.settings.type == 'listed')
                                    {

                                        let html_output =
                                        `
                                            <div class="databox">
                                                `+grabboxstart+`

                                                    <div class="contents">

                                                        `+print_previewbox+`
                                                        `+print_nameinput+`
                                                        `+print_textlabels+`
                                                        `+print_actionsbox+`

                                                        <div class="lazy absolute-center maxheight [status-active]"></div>
                                                        <div class="progress-[00]"></div>

                                                    </div>

                                               `+grabboxend+`
                                            </div>
                                        `;

                                        fileloader.display.container.insertAdjacentHTML('beforeEnd',html_output);

                                    }

                                    else if(fileloader.settings.type == 'grid')
                                    {

                                        let gridcut =  (!uploderSets.includes('boxcut'))? `25-25-100`:uploderSets.split('boxcut:')[1].split(',')[0];


                                        let html_output =
                                        `
                                          <div class="box-[`+gridcut+`]">
                                              <div class="databox">
                                                `+grabboxstart+`

                                                    <div class="contents">

                                                        `+print_previewbox+`
                                                        `+print_actionsbox+`
                                                        `+print_nameinput+`
                                                        `+print_textlabels+`

                                                        <div class="lazy absolute-center maxheight [status-active]"></div>
                                                        <div class="progress-[00]"></div>

                                                    </div>

                                                `+grabboxend+`
                                                </div>
                                          </div>
                                        `;

                                        fileloader.display.container.insertAdjacentHTML('beforeEnd',html_output);

                                    }

                                    else if(fileloader.settings.type == 'wall')
                                    {


                                        let html_output =
                                        `
                                          <div class="box databox">
                                               `+grabboxstart+`

                                                      <div class="contents">

                                                            `+print_actionsbox+`
                                                            `+print_previewbox+`
                                                            `+print_nameinput+`
                                                            `+print_textlabels+`

                                                            <div class="lazy absolute-center maxheight [status-active]"></div>
                                                            <div class="progress-[00]"></div>

                                                      </div>

                                                   </div>

                                            `+grabboxend+`
                                          </div>
                                        `;

                                        fileloader.display.container.insertAdjacentHTML('beforeEnd',html_output);

                                        ui.reload('grid-y');

                                    }

                                    else
                                    {

                                        let print_displaysingle_html_output = ``;

                                        if ( fileloader.settings.filters || fileloader.settings.linked || fileloader.settings.deleter || fileloader.settings.grabber )
                                        {
                                            print_displaysingle_html_output = `
                                                                    <div class="preview">
                                                                        <img alt="" src="">
                                                                        `+print_actionsbox+`
                                                                    </div>`;
                                        }

                                        else
                                        {
                                            print_displaysingle_html_output = `
                                                                        <div class="preview">
                                                                            <img alt="" src="">
                                                                        </div>`
                                        }

                                        let html_output =
                                        `
                                            <div class="databox">
                                                <div class="contents">

                                                    `+print_displaysingle_html_output+`

                                                    <div class="lazy absolute-center maxheight [status-active]"></div>
                                                    <div class="progress-[00]"></div>

                                                </div>
                                            </div>
                                        `;

                                        fileloader.display.container.insertAdjacentHTML('beforeEnd',html_output);
                                    }


                                    // select and set a specific stepped data in the data list object

                                    let thestepdata = fileloader.datalist[steptarget];

                                    thestepdata.container = fileloader.display.container.querySelectorAll('.databox')[steptarget];


                                    if(fileloader.settings.filetitlelabel ) { thestepdata.buttons.title   = thestepdata.container.querySelectorAll('.action-rename')[0]; }
                                    if(fileloader.settings.deleter ) { thestepdata.buttons.deleter = thestepdata.container.querySelectorAll('.action-delete')[0]; }
                                    if(fileloader.settings.grabber ) { thestepdata.buttons.grabber = thestepdata.container.querySelectorAll('.action-grab')[0]; }
                                    if(fileloader.settings.linked )  { thestepdata.buttons.view    = thestepdata.container.querySelectorAll('.action-view')[0]; }
                                    if(fileloader.settings.filters ) { thestepdata.buttons.filters = thestepdata.container.querySelectorAll('.action-filters')[0]; }

                                }


                                function analyzeStepData(fileloader,steptarget,steppedfile,nextstep)
                                {

                                    // active data deleter
                                    if(fileloader.settings.deleter && steptarget>=fileloader.datalist.length-1) deleteAData(fileloader);


                                    let stepdata       = fileloader.datalist[steptarget];

                                    let lazy           = stepdata.container.querySelectorAll('.lazy')[0],
                                        bar            = stepdata.container.querySelectorAll('[class*=progress-]')[0];

                                    let browserurl     = window.URL || window.webkitURL;

                                    let readFiles      = new FileReader(),
                                        chunksize      = parseInt(fileloader.settings.chunksize),
                                        filechunks     = [],
                                        chunkstep      = 0;


                                    // save for update orginal file list
                                    stepdata.origins = steppedfile;

                                    // loop binary in chunks
                                    ( loadchunks = () => {


                                        // set a binary chunks readeder
                                        let nextcut    = chunksize+chunkstep,
                                            filecut    = steppedfile.slice(chunkstep, nextcut);

                                            if((readFiles.readyState==0 || readFiles.readyState==2) && nextcut)
                                            {

                                                fileloader.running=true;

                                                setTimeout( ()=>{

                                                    readFiles.readAsBinaryString(filecut);

                                                    // now read
                                                    readFiles.onload = fileloading =>
                                                    {


                                                        // get/write percent of readed
                                                        let percentLoaded = parseInt( ((chunkstep / steppedfile.size) * 100), 10 ),
                                                            percentString = String( (parseInt(percentLoaded)<10)? ('0'+percentLoaded) : percentLoaded );

                                                            bar.className = 'progress-['+percentString+']';


                                                        // if bit remained is 0
                                                        if (fileloading.target.result.length==0)
                                                        {

                                                            bar.className = 'progress-[100]';

                                                            // lounch final analysys
                                                            setReadedDatas();

                                                        }

                                                        else
                                                        {

                                                            if (fileloading.target.error == null)
                                                            {

                                                                // relounch loadchunks with new chunks
                                                                filechunks.push(fileloading.target.result)
                                                                chunkstep += fileloading.target.result.length;
                                                                loadchunks(chunkstep,chunksize,steppedfile);

                                                            }
                                                            else
                                                            {
                                                                // wtf is going wrong?
                                                                readFiles.oncrash(fileloading.target.error);

                                                            }

                                                        }


                                                        function setReadedDatas()
                                                        {

                                                            if(fileloader.display.element.querySelectorAll('.scroll-y').length>0)
                                                            {
                                                                stepdata.container.disabled = true;
                                                                let scroller = fileloader.display.element.querySelectorAll('.scroll-y')[0];
                                                                scroller.scrollTop = scroller.scrollHeight;
                                                            }

                                                            setTimeout(()=>{


                                                                let maxw                = fileloader.compressor.imageMaxWidth,
                                                                    maxh                = fileloader.compressor.imageMaxHeight;

                                                                let fileweightlimit     = inputfield.getAttribute("size");  // let substringlength = words.map(function(word) { return word + ' = ' + word.length; });

                                                                let typed               = 'not-defined',
                                                                    fileextension       = (steppedfile.name.includes('.')) ? (steppedfile.name.slice(steppedfile.name.lastIndexOf('.') + 1)).toLowerCase() : false;

                                                                let issvg               = ['svg'].includes(fileextension),
                                                                    isgif               = ['gif'].includes(fileextension),
                                                                    isimage             = ['mjpeg','bmp','jpg','jpeg','png','ico','webp','cur','jpe','jps','jfif'].includes(fileextension),
                                                                    issound             = ['amb','aac','flac','m4a','m4r','mp3','oga','ogg','opus','wav'].includes(fileextension),
                                                                    isvideo             = ['mp4','f4v','mpeg','m4v','mov','webm','ogv'].includes(fileextension),
                                                                    isunsound           = ['8svx','ac3','aiff','au','avr','caf','cdda','cvs','cvsd','cvu','dts','dvms','fap','fssd','gsrt','hcom','htk','ima','ircam','maud','mp2','nist','paf','prc','pvf','ra','sd2','sln','smp','snd','sndr','sndt','sou','sph','spx','tta','txw','vms','voc','vox','w64','wma','wv','wve'].includes(fileextension),
                                                                    isunimage           = ['ai','dds','eps','exr','fts','hdr','mng','pam','pbm','pcd','pcx','pfm','pgm','picon','pict','pnm','ppm','psd','ras','sfw','sgi','tga','tiff','tif','wbmp','wpg','x3f','xbm','xdf','xwd','xcf','xpm','cr2','dng','erf','heic','heif','jp2','nef','nrw','orf','pef','pes','raf','rw2'].includes(fileextension),
                                                                    isunvideo           = ['3gp','asf','avi','flv','hevc','m2ts','m2v','mkv','mpg','mts','mxf','swf','ts','vob','wmv','wtv'].includes(fileextension);


                                                                if(!fileextension)      { typed = 'binary-file';   mime = 'not-web-compatible'; }
                                                                else if (issvg)         { typed = 'web-xmlsvg';    mime = 'image/svg+xml'; }
                                                                else if (isgif)         { typed = 'web-gif';       mime = 'image/gif'; }
                                                                else if (isimage)       { typed = 'web-image';     mime = (fileextension=='image/ico') ? 'x-icon' : 'image/png'; }
                                                                else if (issound)       { typed = 'web-audio';     mime = 'audio/mpeg'; }
                                                                else if (isvideo)       { typed = 'web-video';     mime = 'video/mp4'; }
                                                                else if (isunimage)     { typed = 'not-web-image'; mime = 'not-web-compatible'; }
                                                                else if (isunsound)     { typed = 'not-web-audio'; mime = 'not-web-compatible'; }
                                                                else if (isunvideo)     { typed = 'not-web-video'; mime = 'not-web-compatible'; }
                                                                else  /*(isfiles)*/     { typed = 'binary-file';   mime = 'not-web-compatible'; }


                                                                // save all basic data...

                                                                stepdata.filedata.name   = steppedfile.name.split('.'+fileextension)[0]||steppedfile.name;
                                                                stepdata.filedata.blob   = browserurl.createObjectURL(steppedfile);
                                                                stepdata.filedata.size   = parseFloat( (Math.floor((steppedfile.size/1000))/1024).toFixed(2) );
                                                                stepdata.filedata.chunks = filechunks;
                                                                stepdata.filedata.mime   = mime;
                                                                stepdata.filedata.typed  = typed;

                                                                let idstring = String(stepdata.filedata.blob), idcontent = String(idstring.substr(idstring.length - 5));

                                                                stepdata.container.querySelectorAll('.contents')[0].setAttribute('id', idcontent );
                                                                stepdata.id = idcontent;


                                                                // types: binary big data / base64 optimized;
                                                                (!fileloader.settings.autoconversion) ? unmime() : convertion();

                                                                function convertion()
                                                                {

                                                                    // make a data previews

                                                                    if(isimage)
                                                                    {

                                                                        let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                        previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+fileextension );


                                                                        imagecompressor(
                                                                        filechunks,mime,maxw,maxh,
                                                                        optimized => {

                                                                            if(!optimized)                      { printerror('ERROR ON IMAGE COMPRESSION. THIS FILE CANNOT BE SENT.'); }
                                                                            else if(optimized=='unprintable')   { printerror('ERROR ON IMAGE PREVIEW CREATION. THIS FILE CANNOT BE SENT.'); }
                                                                            else if(optimized=='toosmall')      { printerror('THIS IMAGE IS TOO SMALL!! MIN PX IS '+maxw+' x '+maxh); }

                                                                            else
                                                                            {

                                                                                let newdata = optimized.replace(/=/g,"").replace('data:'+mime+';base64,',"");
                                                                                let newsize = ( ~~(newdata.length * 0.75/1000)/1024 ).toFixed(3);

                                                                                if(newsize>fileweightlimit)
                                                                                {
                                                                                    printerror('FILE IS TOO BIG!! USED '+newsize+' OF '+inputfield+' Mb');
                                                                                }

                                                                                else
                                                                                {

                                                                                    if(fileextension!='image/ico')
                                                                                    {

                                                                                        stepdata.filedata.size   = newsize;
                                                                                        stepdata.filedata.chunks = [ newdata ];

                                                                                        if(fileloader.settings.metalabel && fileloader.settings.type != 'single')
                                                                                        {
                                                                                            stepdata.container.querySelectorAll('.filesize')[0].innerText = (newsize=='0.000')? '≅ 001 Mb' : newsize +' Mb';
                                                                                            stepdata.container.querySelectorAll('.filetype')[0].innerText = fileextension;
                                                                                        }

                                                                                    }

                                                                                    if(fileloader.settings.filetitlelabel)
                                                                                    {
                                                                                        let startitle = stepdata.filedata.name;

                                                                                        stepdata.buttons.title.firstElementChild.setAttribute('value',startitle);
                                                                                        updatefiledataname(stepdata,startitle)
                                                                                    }


                                                                                    if(fileloader.settings.preview)
                                                                                    {

                                                                                        let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                                        previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+fileextension );

                                                                                        previewbox.firstElementChild.src = optimized;

                                                                                        if(!optimized || previewbox.firstElementChild.src == undefined)
                                                                                        {
                                                                                            previewbox.firstElementChild.classList.add('hide');
                                                                                        }

                                                                                        if(fileloader.settings.previewicons==true)
                                                                                        {
                                                                                            previewbox.insertAdjacentHTML('beforeEnd',`<span class="ico-`+stepdata.filedata.typed+` ico-`+fileextension+`"></span>`);
                                                                                        }

                                                                                    }


                                                                                    if(fileloader.settings.linked)
                                                                                    {

                                                                                        fileloader.datalist[steptarget].buttons.view.onclick = () =>
                                                                                        {

                                                                                            if(fileextension=='image/ico')
                                                                                            {
                                                                                                let blobber = new Blob(
                                                                                                [`
                                                                                                    <head>
                                                                                                      <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                                    </head>
                                                                                                    <body>
                                                                                                        <main>
                                                                                                            <div>
                                                                                                                <small>
                                                                                                                    WHAT YOU ARE SEEING IS THE REPRESENTATION OF ICON DATA (from .ico to web/png).<br>
                                                                                                                    THE DATA THAT WILL BE SENT WILL RELATE TO THE REAL ICON.
                                                                                                                </small>
                                                                                                            </div>
                                                                                                            <image src="`+optimized+`"/>
                                                                                                        </main>
                                                                                                    </body>
                                                                                                    <style>
                                                                                                        html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                        main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                        main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                        main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                                        image{position:relative;display:block;}
                                                                                                    </style>

                                                                                                `], {type: "text/html"});

                                                                                                window.open( browserurl.createObjectURL(blobber) , '_blank');
                                                                                            }
                                                                                            else
                                                                                            {

                                                                                                let mex = (!fileloader.compressor) ? `THIS IS THE IMAGE ROW DATA THAT WILL BE SENT` : `THIS IS THE OPTIMIZED IMAGE DATA THAT WILL BE SENT`;

                                                                                                let blobber = new Blob(
                                                                                                [`
                                                                                                    <head>
                                                                                                      <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                                    </head>
                                                                                                    <body>
                                                                                                        <main>
                                                                                                            <div>
                                                                                                                <small>
                                                                                                                    `+mex+`
                                                                                                                </small>
                                                                                                            </div>
                                                                                                            <image src="`+optimized+`"/>
                                                                                                        </main>
                                                                                                    </body>
                                                                                                    <style>
                                                                                                        html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                        main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                        main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                        main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                                        image{position:relative;display:block;}
                                                                                                    </style>

                                                                                                `], {type: "text/html"});

                                                                                                window.open( browserurl.createObjectURL(blobber) , '_blank');

                                                                                            }


                                                                                        }
                                                                                    }

                                                                                }

                                                                                clearmemory();
                                                                                endofstep(bar,lazy);

                                                                            }

                                                                        });

                                                                    }

                                                                    else if(issvg || isgif)
                                                                    {

                                                                        if(stepdata.filedata.size>fileweightlimit)
                                                                        {
                                                                            printerror('FILE IS TOO BIG!! USED '+stepdata.filedata.size+' OF '+fileweightlimit+' Mb');
                                                                        }
                                                                        else
                                                                        {

                                                                            if(fileloader.settings.filetitlelabel)
                                                                            {
                                                                                let startitle = stepdata.filedata.name;
                                                                                stepdata.buttons.title.firstElementChild.setAttribute('value',startitle);
                                                                                updatefiledataname(stepdata,startitle)
                                                                            }

                                                                            if(fileloader.settings.metalabel)
                                                                            {
                                                                                stepdata.container.querySelectorAll('.filetype')[0].innerText = fileextension;
                                                                                stepdata.container.querySelectorAll('.filesize')[0].innerText = (stepdata.filedata.size=='0.000')? '≅.001 mB' : stepdata.filedata.size +' Mb';
                                                                            }

                                                                            imagecompressor(
                                                                            filechunks,mime,maxw,maxh,
                                                                            optimized => {


                                                                                if(!optimized)                      { printerror('ERROR ON VECTOR READING. THIS FILE CANNOT BE SENT.'); }
                                                                                else if(optimized=='unprintable')   { printerror('ERROR ON VECTOR PREVIEW CREATION. THIS FILE CANNOT BE SENT.'); }
                                                                                else if(optimized=='toosmall')      { printerror('THIS IMAGE IS TOO SMALL!! MIN PX IS '+maxw+' x '+maxh); }
                                                                                else
                                                                                {


                                                                                    if(fileloader.settings.preview)
                                                                                    {

                                                                                        let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                                        previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+fileextension );

                                                                                        previewbox.firstElementChild.src = optimized;

                                                                                        if(!optimized || previewbox.firstElementChild.src == undefined)
                                                                                        {
                                                                                            previewbox.firstElementChild.classList.add('hide');
                                                                                        }

                                                                                        if(fileloader.settings.previewicons==true)
                                                                                        {
                                                                                            previewbox.insertAdjacentHTML('beforeEnd',`<span class="ico-`+stepdata.filedata.typed+` ico-`+fileextension+`"></span>`);
                                                                                        }

                                                                                    }

                                                                                    if(fileloader.settings.linked)
                                                                                    {

                                                                                        fileloader.datalist[steptarget].buttons.view.onclick = () =>
                                                                                        {

                                                                                            let blobber;
                                                                                            if(issvg)
                                                                                            {

                                                                                                blobber = new Blob(
                                                                                                [`
                                                                                                    <head>
                                                                                                      <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                                    </head>
                                                                                                    <body>
                                                                                                        <main>
                                                                                                            <div>
                                                                                                                <small>
                                                                                                                    WHAT YOU ARE SEEING IS THE IMAGE REPRESENTATION OF THE VECTOR SVG DATA.<br>ORIGINAL DATA ARE SAVED IN BINARY.
                                                                                                                </small>
                                                                                                            </div>
                                                                                                            <image src="`+optimized+`"/>
                                                                                                        </main>
                                                                                                    </body>
                                                                                                    <style>
                                                                                                        html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                        main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                        main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                        main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                                        image{position:relative;display:block;}
                                                                                                    </style>

                                                                                                `], {type: "text/html"});

                                                                                                window.open( browserurl.createObjectURL(blobber) , '_blank');

                                                                                            }
                                                                                            else if(isgif)
                                                                                            {

                                                                                                let margegifchunks;
                                                                                                try{ margegifchunks = 'data:'+mime+';base64,'+btoa(stepdata.filedata.chunks.join('')) }
                                                                                                catch
                                                                                                {
                                                                                                    blobber = new Blob(
                                                                                                    [`
                                                                                                        <head>
                                                                                                          <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                                        </head>
                                                                                                        <body>
                                                                                                            <main>
                                                                                                                <div>
                                                                                                                    <small>GIFs ARE NOT OPTIMIZABLE, WHAT YOU ARE SEEING IS THE DATA REPRESENTATION.<br>ORIGINAL DATA ARE SAVED IN BINARY OR B64.</small>
                                                                                                                </div>
                                                                                                                <image src="`+optimized+`"/>
                                                                                                            </main>
                                                                                                        </body>
                                                                                                        <style>
                                                                                                            html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                            main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                            main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                        </style>

                                                                                                    `], {type: "text/html"});

                                                                                                    window.open( browserurl.createObjectURL(blobber) , '_blank');

                                                                                                }
                                                                                                finally
                                                                                                {
                                                                                                    blobber = new Blob(
                                                                                                    [`
                                                                                                        <head>
                                                                                                          <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                                        </head>
                                                                                                        <body>
                                                                                                            <main>
                                                                                                                <div>
                                                                                                                    <small>GIFs ARE NOT OPTIMIZABLE, WHAT YOU ARE SEEING IS THE DATA REPRESENTATION.<br>ORIGINAL DATA ARE SAVED IN BINARY OR B64.</small>
                                                                                                                    <image src="`+margegifchunks+`"/>
                                                                                                                </div>
                                                                                                            </main>
                                                                                                        </body>
                                                                                                        <style>
                                                                                                            html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                            main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                            main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                                            main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                            image{position:relative;display:block;}
                                                                                                        </style>

                                                                                                    `], {type: "text/html"});

                                                                                                    window.open( browserurl.createObjectURL(blobber) , '_blank');

                                                                                                }

                                                                                            }

                                                                                        }

                                                                                    }

                                                                                    clearmemory();
                                                                                    endofstep(bar,lazy);
                                                                                }


                                                                            });

                                                                        }


                                                                    }

                                                                    else if(isvideo)
                                                                    {

                                                                        if(fileloader.settings.filetitlelabel)
                                                                        {
                                                                            let startitle = stepdata.filedata.name;
                                                                            stepdata.buttons.title.firstElementChild.setAttribute('value',startitle);
                                                                            updatefiledataname(stepdata,startitle)
                                                                        }

                                                                        if(fileloader.settings.metalabel)
                                                                        {
                                                                            stepdata.container.querySelectorAll('.filetype')[0].innerText = fileextension;
                                                                            stepdata.container.querySelectorAll('.filesize')[0].innerText = (stepdata.filedata.size=='0.000')? '≅.001 mB' : stepdata.filedata.size +' Mb';
                                                                        }

                                                                        let projector = document.createElement("VIDEO");
                                                                        projector.src = stepdata.filedata.blob;
                                                                        projector.load();
                                                                        projector.onloadeddata = event_encodedloaded =>
                                                                        {

                                                                            projector.currentTime = parseInt(projector.duration/2);

                                                                            if(projector.videoWidth<maxw || projector.videoHeight<maxh)
                                                                            {
                                                                                printerror('THIS VIDEO IS TOO SMALL!! MIN PX IS '+maxw+' x '+maxh);
                                                                            }
                                                                            else
                                                                            {

                                                                                if(fileloader.settings.preview)
                                                                                {

                                                                                    let canvas = document.createElement('canvas'),
                                                                                        cw = projector.videoWidth,
                                                                                        ch = projector.videoHeight;


                                                                                    if(fileloader.compressor.resizingtype=='proportional')
                                                                                    {
                                                                                        if (cw >= ch) { cw = ~~(cw *= maxh / ch); ch = maxh;  }
                                                                                        if (cw < ch) { ch = ~~(ch *= maxw / cw); cw = maxw;   }
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        if (cw >= ch) { ch = ~~(ch *= maxw / cw); cw = maxw; }
                                                                                        if (cw < ch) { cw = ~~(cw *= maxh / ch); ch = maxh; }
                                                                                    }

                                                                                    canvas.width = cw; canvas.height = ch;

                                                                                    try
                                                                                    {
                                                                                        canvas.getContext("2d").drawImage(projector, 0, 0, cw, ch);
                                                                                    }

                                                                                    catch (error)
                                                                                    {
                                                                                        printerror('Impossible to read file');

                                                                                        let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                                        previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+fileextension );

                                                                                        previewbox.firstElementChild.src = videobanner;

                                                                                        if(!videobanner || previewbox.firstElementChild.src == undefined)
                                                                                        {
                                                                                            previewbox.firstElementChild.classList.add('hide');
                                                                                        }

                                                                                        if(fileloader.settings.previewicons==true)
                                                                                        {
                                                                                            previewbox.insertAdjacentHTML('beforeEnd',`<span class="ico-`+stepdata.filedata.typed+` ico-`+fileextension+`"></span>`);
                                                                                        }

                                                                                    }

                                                                                    finally
                                                                                    {

                                                                                        let videobanner = canvas.toDataURL( mime, fileloader.compressor.imageQuality );

                                                                                        let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                                        previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+fileextension );

                                                                                        previewbox.firstElementChild.src = videobanner;

                                                                                        if(!videobanner || previewbox.firstElementChild.src == undefined)
                                                                                        {
                                                                                            previewbox.firstElementChild.classList.add('hide');
                                                                                        }

                                                                                        if(fileloader.settings.previewicons==true)
                                                                                        {
                                                                                            previewbox.insertAdjacentHTML('beforeEnd',`<span class="ico-`+stepdata.filedata.typed+` ico-`+fileextension+`"></span>`);
                                                                                        }

                                                                                    }


                                                                                }

                                                                                if(fileloader.settings.linked)
                                                                                {
                                                                                    fileloader.datalist[steptarget].buttons.view.onclick = () =>
                                                                                    {
                                                                                        let blobber = new Blob(
                                                                                        [`
                                                                                            <head>
                                                                                              <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                            </head>
                                                                                            <body>
                                                                                                <main>
                                                                                                    <div>
                                                                                                        <small>
                                                                                                            WHAT YOU ARE SEEING IS THE STREAMING REPRESENTATION OF THE VIDEO DATA.<br>ORIGINAL DATA ARE SAVED IN BINARY OR B64.
                                                                                                        </small>
                                                                                                    </div>
                                                                                                    <video controls src="`+stepdata.filedata.blob+`"></video>
                                                                                                </main>
                                                                                            </body>
                                                                                            <style>
                                                                                                html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                                image{position:relative;display:block;}
                                                                                            </style>

                                                                                        `], {type: "text/html"});

                                                                                        window.open( browserurl.createObjectURL(blobber) , '_blank');
                                                                                    }
                                                                                }

                                                                                clearmemory();
                                                                                endofstep(bar,lazy);

                                                                            }


                                                                        }

                                                                    }

                                                                    else if(issound)
                                                                    {

                                                                        if(fileloader.settings.filetitlelabel)
                                                                        {
                                                                            let startitle = stepdata.filedata.name;
                                                                            stepdata.buttons.title.firstElementChild.setAttribute('value',startitle);
                                                                            updatefiledataname(stepdata,startitle)
                                                                        }

                                                                        if(fileloader.settings.metalabel)
                                                                        {
                                                                            stepdata.container.querySelectorAll('.filetype')[0].innerText = fileextension;
                                                                            stepdata.container.querySelectorAll('.filesize')[0].innerText = (stepdata.filedata.size=='0.000')? '≅.001 mB' : stepdata.filedata.size +' Mb';
                                                                        }

                                                                        let sound = new Audio();
                                                                        sound.src = stepdata.filedata.blob;
                                                                        sound.load();
                                                                        sound.oncanplay = event_encodedloaded =>
                                                                        {

                                                                            if(stepdata.filedata.size>fileweightlimit)
                                                                            {
                                                                                printerror('SIZE OF THIS FILE IS TOO BIG!! MAX SIZE IS '+fileweightlimit+' Mb');
                                                                            }
                                                                            else
                                                                            {

                                                                                if(fileloader.settings.preview)
                                                                                {

                                                                                    let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                                    previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+fileextension );

                                                                                    if(previewbox.getElementsByTagName('img')[0].getAttribute('src').value == undefined)
                                                                                    {
                                                                                        previewbox.firstElementChild.classList.add('hide');
                                                                                    }

                                                                                    if(fileloader.settings.previewicons==true)
                                                                                    {
                                                                                        previewbox.insertAdjacentHTML('beforeEnd',`<span class="ico-`+stepdata.filedata.typed+` ico-`+fileextension+`"></span>`);
                                                                                    }

                                                                                }

                                                                                if(fileloader.settings.linked)
                                                                                {
                                                                                    fileloader.datalist[steptarget].buttons.view.onclick = () =>
                                                                                    {

                                                                                        blobber = new Blob(
                                                                                        [`
                                                                                            <head>
                                                                                              <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                            </head>
                                                                                            <body>
                                                                                                <main>
                                                                                                    <div>
                                                                                                        <small>AUDIO FILES ARE NOT OPTIMIZABLE, WHAT YOU ARE SEEING IS THE STREAMING REPRESENTATION.<br>ORIGINAL DATA ARE SAVED IN BINARY OR B64.</small>
                                                                                                        <audio controls="true" src="`+stepdata.filedata.blob+`"></audio>
                                                                                                    </div>
                                                                                                </main>
                                                                                            </body>
                                                                                            <style>
                                                                                                html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                                main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                                main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                                main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                                image{position:relative;display:block;}
                                                                                            </style>

                                                                                        `], {type: "text/html"});

                                                                                        window.open( browserurl.createObjectURL(blobber) , '_blank');

                                                                                    }
                                                                                }

                                                                                clearmemory();
                                                                                endofstep(bar,lazy);

                                                                            }

                                                                        }

                                                                    }

                                                                    else { unmime(); }

                                                                }

                                                                function unmime()
                                                                {


                                                                    if(fileloader.settings.filetitlelabel)
                                                                    {
                                                                        let startitle = stepdata.filedata.name;
                                                                        stepdata.buttons.title.firstElementChild.setAttribute('value',startitle);
                                                                        updatefiledataname(stepdata,startitle)
                                                                    }

                                                                    if(fileloader.settings.metalabel)
                                                                    {
                                                                        stepdata.container.querySelectorAll('.filetype')[0].innerText = (!fileextension) ? '' : fileextension;
                                                                        stepdata.container.querySelectorAll('.filesize')[0].innerText = (stepdata.filedata.size=='0.000')? '≅.001 mB' : stepdata.filedata.size +' Mb';
                                                                    }

                                                                    if(stepdata.filedata.size>fileweightlimit)
                                                                    {
                                                                        printerror('SIZE OF THIS FILE IS TOO BIG!! MAX SIZE IS '+fileweightlimit+' Mb');
                                                                    }
                                                                    else
                                                                    {

                                                                        if ( fileloader.settings.preview )
                                                                        {

                                                                            let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                                                            previewbox.classList.add( 'bkg-'+stepdata.filedata.typed, 'bkg-'+((!fileextension)?'binary':fileextension) );

                                                                            if(previewbox.getElementsByTagName('img')[0].getAttribute('src').value == undefined)//if user not change a src
                                                                            {
                                                                                previewbox.firstElementChild.classList.add('hide');
                                                                            }

                                                                            if(fileloader.settings.previewicons==true)
                                                                            {
                                                                                previewbox.insertAdjacentHTML('beforeEnd',`<span class="ico-`+stepdata.filedata.typed+` ico-`+fileextension+`"></span>`);
                                                                            }

                                                                        }


                                                                        if(fileloader.settings.linked)
                                                                        {
                                                                            fileloader.datalist[steptarget].buttons.view.onclick = () =>
                                                                            {
                                                                                blobber = new Blob(
                                                                                [`
                                                                                    <head>
                                                                                      <title>FILE PREVIEWS</title><meta http-equiv="Content-type" content="text/html; charset=UTF-8">
                                                                                    </head>
                                                                                    <body>
                                                                                        <main>
                                                                                            <div>
                                                                                                <small>"NON WEB FILES" ARE CONVERTED AND SAVED IN BINARY OR B64. IT IS NOT POSSIBLE TO READ THEM FROM HERE.</small>
                                                                                            </div>
                                                                                        </main>
                                                                                    </body>
                                                                                    <style>
                                                                                        html,body{background:#131313;display:flex;height:100%;width:100%;align-self:center;margin:0;padding:0;align-items:center;}
                                                                                        main{max-width:50%;margin: 0 auto;display:flex;flex-direction:column;align-items:center;}
                                                                                        main>div>small{text-align:center;color:white;font-style;font-family:verdana,helvetica;margin-bottom: 20px;font-size: 9px;padding:15px;max-width:100%;}
                                                                                        main>div{display: flex;flex-direction: column;align-items:center;}
                                                                                        image{position:relative;display:block;}
                                                                                    </style>

                                                                                `], {type: "text/html"});

                                                                                window.open( browserurl.createObjectURL(blobber) , '_blank');

                                                                            }
                                                                        }

                                                                        clearmemory();
                                                                        endofstep(bar,lazy); //browserurl.revokeObjectURL(steppedfile);

                                                                    }

                                                                }

                                                                function imagecompressor(imagechunks, mime, maxw, maxh, optimized)
                                                                {

                                                                    let b64data = 'no-base64-data';

                                                                    try
                                                                    {
                                                                        b64data = btoa( imagechunks.join('') );
                                                                    }
                                                                    catch (error)
                                                                    {
                                                                        printerror('File is oversized for make a preview');
                                                                        return optimized('unprintable');
                                                                    }
                                                                    finally
                                                                    {

                                                                        if(fileloader.compressor)
                                                                        {

                                                                            let image = new Image();
                                                                            image.src = 'data:'+mime+';base64,'+b64data;
                                                                            image.onload = event_encodedloaded =>
                                                                            {

                                                                                let canvas = document.createElement('canvas'),
                                                                                    cw = image.width,
                                                                                    ch = image.height;

                                                                                // if( cw < minresolution || ch < minresolution ) {  return optimized('toosmall'); }
                                                                                // else
                                                                                // {

                                                                                    if(fileloader.compressor.resizingtype=='proportional')
                                                                                    {
                                                                                        if (cw >= ch) { cw = ~~(cw *= maxh / ch); ch = maxh;  }
                                                                                        if (cw < ch) { ch = ~~(ch *= maxw / cw); cw = maxw;   }
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        if (cw >= ch) { ch = ~~(ch *= maxw / cw); cw = maxw; }
                                                                                        if (cw < ch) { cw = ~~(cw *= maxh / ch); ch = maxh; }
                                                                                    }

                                                                                    canvas.width = cw; canvas.height = ch;

                                                                                    canvas.getContext("2d").drawImage(image, 0, 0, cw, ch);

                                                                                    return optimized( canvas.toDataURL( mime, fileloader.compressor.imageQuality ) );

                                                                                // }
                                                                            }

                                                                        }

                                                                        else
                                                                        {
                                                                            return optimized( b64data );
                                                                        }
                                                                    }

                                                                }

                                                                function updatefiledataname(stepData,startitle)
                                                                {
                                                                   let btninput = stepData.buttons.title.querySelectorAll('input')[0];
                                                                    btninput.onfocus = () =>
                                                                    {

                                                                        let changename = setInterval( () =>{

                                                                            (!btninput.value)?btninput.value=startitle:null;

                                                                            btninput.setAttribute('value', btninput.value );

                                                                            (document.activeElement == btninput) ? stepData.filedata.name = btninput.value : window.clearInterval(changename);

                                                                        }, 250);

                                                                    };
                                                                }

                                                            },500)

                                                        }


                                                    }

                                                    // clear data mems if request

                                                    function clearmemory()
                                                    {
                                                        filechunks=[]; event_encodedloaded=null; reader=null; canvas=null; projector=null; sound=null; image = null; URL.revokeObjectURL(browserurl);
                                                    }


                                                },200)

                                                if(fileloader.firstlaunch) delete fileloader.firstlaunch;

                                            }

                                    })()


                                    // print all "oh fuck!"

                                    readFiles.onabort = (errors) => { debug(`:: [⚠ ui alert]: fileloader error\n   ⮑ critical error/abort: reader crash on loading.\n   ⮑ reader message:`+errors.error); printerror(errors); }
                                    readFiles.onerror = (errors) => { debug(`:: [⚠ ui alert]: fileloader error\n   ⮑ critical error/abort: reader crash on loading.\n   ⮑ reader message:`+errors.error); printerror(errors); }
                                    readFiles.oncrash = (errors) => { debug(`:: [⚠ ui alert]: fileloader error\n   ⮑ critical error/abort: reader crash on loading.\n   ⮑ reader message:`+errors.error); printerror(errors); }

                                    function printerror(errors)
                                    {

                                        let errorstring= (steppedfile.name.substr(steppedfile.name.length - 15)+'  :  '+errors.toUpperCase());

                                        let previewbox = stepdata.container.querySelectorAll('.preview')[0];
                                        if(previewbox)
                                        {
                                            previewbox.innerHTML = '';
                                            previewbox.classList.remove('autocrop');
                                            previewbox.insertAdjacentHTML('beforeEnd','<span class="debug-error-message" title="this file have an error. You cannot save/sent data if you not delete it.\n'+errorstring+'"><p>&#10060;</p></span>');
                                        }

                                        let btntitle = stepdata.container.querySelectorAll('.action-rename')[0];
                                        if(btntitle)
                                        {
                                            btntitle.title="this file have an error. You cannot save/sent data if you not delete it.\n"+errorstring;
                                            btntitle.firstElementChild.setAttribute('value', errorstring);
                                            btntitle.firstElementChild.setAttribute('readonly',true);
                                            btntitle.firstElementChild.setAttribute('disabled',true);
                                        }

                                        if(stepdata.container.querySelectorAll('.action-grab').length>0)
                                        {
                                            stepdata.container.querySelectorAll('.action-grab')[0].classList.add('disabled');
                                        }

                                        if( fileloader.settings.filters ) { [...stepdata.container.querySelectorAll('.action-options')][0].classList.add('disabled'); }

                                        endofstep(bar,lazy)

                                    }


                                    // show file in display if request
                                    function endofstep(bar,lazy)
                                    {

                                        bar.remove();

                                        lazy.classList.add('[status-off]');

                                        setTimeout(()=>{

                                            lazy.classList.add('[status---]');

                                            setTimeout(()=>{

                                                stepdata.container.removeAttribute('disabled');

                                                lazy.classList.remove('[status-active]');
                                                lazy.classList.remove('[status-off]');

                                                setTimeout(()=>{
                                                    lazy.remove();
                                                },500)

                                            },500)

                                        },500)

                                        return nextstep();

                                    }

                                }

                            }))()


                        }

                        function updateButtonFileList(fileloader)
                        {

                            let filestored = [];
                            setTimeout(()=>{

                                for (let filebox of fileloader.datalist)
                                {
                                    let filedata = filebox.origins,
                                        filename = String( filebox.origins.name );

                                    filestored.push( new File( [filedata], filename ) );
                                }

                                setTimeout(()=>{

                                    fileloader.input.files =  FromArrayToInputFileList(filestored);

                                    inputfield       = btn.querySelectorAll('input[type="file"]')[0];
                                    textfield        = btn.getElementsByTagName('label')[0];

                                    btn.style='';

                                    updatebuttonfile(btn,inputfield,textfield,startlabeltext,fileloader,false);

                                },200)

                            },200)

                        }


                        function onclickresetter(fileloader)
                        {
                            fileloader.resetter.onclick = () =>
                            {
                                // reset fileloader

                                fileloader.display.container.innerHTML = '';
                                fileloader.datalist = [];
                                makedisplay(fileloader)

                                updateButtonFileList(fileloader);
                            }
                        }


                        function deleteAData(fileloader)
                        {

                            if(fileloader.settings.deleter)
                            {

                                let e_fileloader_del = null;

                                for (let box of fileloader.datalist)
                                {
                                    box.buttons.deleter.onclick = e_fileloader_del =>
                                    {

                                        //get steptarget of box via click
                                        let steptarget = [...fileloader.container.querySelectorAll('.action-delete')].indexOf(e_fileloader_del.target);

                                        //prevent other click
                                        for (let contentbox of fileloader.datalist) contentbox.container.classList.add('disabled');

                                        setTimeout(()=>{

                                            //clean objects and structure
                                            fileloader.datalist[steptarget].container.remove();
                                            fileloader.datalist.splice(steptarget,1);

                                            //re active click
                                            for (let contentbox of fileloader.datalist) contentbox.container.classList.remove('disabled');

                                            updateButtonFileList(fileloader)

                                        },100)

                                    }

                                }

                            }

                        }


                        fileloader.display.container.ontouchend = ev =>{  ev=null; setTimeout(()=>{reorderdata(fileloader)},250) }
                        fileloader.display.container.onmouseup = ev =>{ ev=null; setTimeout(()=>{reorderdata(fileloader)},250) }

                        function reorderdata(fileloader)
                        {
                            let neworder = [];

                            let databoxes =  fileloader.display.element.querySelectorAll('.databox');

                            for (let box of databoxes)
                            {

                                let boxcontentsid = box.querySelectorAll('.contents')[0].id;

                                for (let datainmemory of fileloader.datalist)
                                {
                                    if(boxcontentsid === datainmemory.id)
                                    {
                                        datainmemory.container = box;
                                        neworder.push(datainmemory);
                                    }

                                }

                            }

                            fileloader.datalist = neworder;

                        }

                    }

                }


                loaderindex++;

           }



        }

        function buttons()
        {
            passwords();
            starts();
            numbers();
            ranges();
            selects();
            dropsdown();
            clocks();
            checks();
            radios();
            datepikers();
            stopwatch();
            filereaders();
        }



    //--------------------------------------------------//

        const paginations = () =>
        {


            let paginators = document.querySelectorAll('.paginator');

            for (let paginator of paginators)
            {

                // get all settings list

                let settings = paginator.dataset.settings.toLowerCase().split('[')[1].split(']')[0];

                // find display

                let displayid = (settings.includes('target:')) ? settings.split('target:')[1].split(',')[0] : false;
                let display = (displayid) ? document.querySelectorAll('#'+displayid)[0] : debug(`:: [⚠ ui alert]: wrong paginator\n   ⮑ not target display founded. Assign: "target:mydisplayid" on settins params.`);

                // get array items and qnt of it

                let items = [],
                    itemsquantity = -1;

                for (let c of display.children)
                {
                    if (c.parentNode==display)
                    {
                        items.push(c);
                        itemsquantity++;
                    }
                }

                // get or set "per page quantity"

                let itemsperpage = settings.includes('perpage:') ? parseInt(settings.split('perpage:')[1].split(',')[0]) : 6;

                // print buttons (one for a page)

                let paginatorlist = paginator.querySelectorAll('.list')[0],
                    totalofpages  = ~~(itemsquantity/itemsperpage);

                for (let i = 0; i < totalofpages+1; i++)
                {

                    let pagenumber = String( (i<=9) ? ('0'+i) : i );
                    paginatorlist.insertAdjacentHTML('beforeEnd','<a class="button" style="margin-right:3px" data-indexer='+itemsperpage*i+'>'+pagenumber+'</a>');

                }

                if(paginator.querySelectorAll(".total").length>0)
                    paginator.querySelectorAll(".total")[0].innerHTML='...'+totalofpages;

                // loop all buttons and make actions

                let btnlist = paginatorlist.querySelectorAll(".list>*");

                //if active not exist, make it

                if(paginatorlist.querySelectorAll(".list>.active").length<=0)
                {

                    for (let b of btnlist) b.classList.add('off');
                    btnlist[0].classList.add('active');

                    cutitems(btnlist,items,0,itemsperpage)

                }


                // loop all buttons of pages
                for (let btn of btnlist)
                {

                    btn.onclick = ev_paginator_click =>
                    {

                        let actual = paginatorlist.querySelectorAll(".list>.active")[0].dataset.indexer || 0;

                        // reset active status

                        resetbuttonsactive(btnlist);

                        // add active status of clicked

                        btn.classList.add('active');
                        btn.classList.remove('off');


                        // set start/end cut
                        let startItemIndex = parseInt(btn.dataset.indexer);
                        let endItemIndex =  (btn.nextElementSibling)
                                                ? parseInt(btn.nextElementSibling.dataset.indexer)
                                                : startItemIndex+itemsperpage;

                        // cut now
                        cutitems(btnlist,items,startItemIndex,endItemIndex)

                        ev_paginator_click = null;

                    }

                }

                // action for prev,next and other
                paginator.querySelectorAll('.first')[0].onclick = ev_paginator_click => { goTo(btnlist,itemsquantity,itemsperpage,'first'); ev_paginator_click = null; }
                paginator.querySelectorAll('.prev')[0].onclick = ev_paginator_click => { goTo(btnlist,itemsquantity,itemsperpage,'prev'); ev_paginator_click = null; }
                paginator.querySelectorAll('.next')[0].onclick = ev_paginator_click => { goTo(btnlist,itemsquantity,itemsperpage,'next'); ev_paginator_click = null; }
                paginator.querySelectorAll('.last')[0].onclick = ev_paginator_click => { goTo(btnlist,itemsquantity,itemsperpage,'last'); ev_paginator_click = null; }

                function goTo(btnlist,itemsquantity,itemsperpage,dir)
                {

                    let startItemIndex,
                        endItemIndex,
                        actualIndex,
                        actual;

                    if(dir == 'first')
                    {

                        startItemIndex=0;
                        endItemIndex=startItemIndex+itemsperpage;
                        actualIndex = 0;
                        actual=btnlist[actualIndex];

                    }
                    else if(dir == 'last')
                    {

                        startItemIndex=itemsquantity-itemsperpage;
                        endItemIndex=itemsquantity+1;
                        actualIndex = btnlist.length-1;
                        actual=btnlist[actualIndex];

                    }
                    else if(dir == 'prev')
                    {

                        actualIndex = getActiveIndex(btnlist)-1;
                        if(actualIndex<=0) actualIndex=0;
                        actual = btnlist[actualIndex];


                        let min = parseInt(actual.dataset.indexer) - itemsperpage,
                            max = parseInt(actual.dataset.indexer);

                        if(min<=0) min = 0;
                        if(max==0) max = itemsperpage

                        startItemIndex = min;
                        endItemIndex   = max;

                    }
                    else if(dir == 'next')
                    {

                        actualIndex = getActiveIndex(btnlist)+1;

                        if(actualIndex>=btnlist.length)
                            actualIndex=(btnlist.length-1);

                        actual=btnlist[actualIndex];

                        let min = parseInt(actual.dataset.indexer),
                            max = parseInt(actual.dataset.indexer)+ itemsperpage;

                        startItemIndex = min;
                        endItemIndex   = (max>=itemsquantity+1) ? itemsquantity+1 : max;

                    }

                    // reset active status
                    resetbuttonsactive(btnlist);

                    // add new active
                    madebuttonActive(actual);

                    // cut now
                    cutitems(btnlist,items,startItemIndex,endItemIndex)


                }


                // hide all buttons
                function resetbuttonsactive(btnlist)
                {
                    for (let b of btnlist)
                    {
                        b.classList.add('off');
                        b.classList.remove('active');
                    }
                }

                // show one button
                function madebuttonActive(btn)
                {
                    btn.classList.add('active');
                    btn.classList.remove('off');
                }

                // hide/show page and buttons
                function cutitems(btnlist,items,startItemIndex,endItemIndex)
                {

                    // hide/show pages
                    for (let i=0; i<items.length; i++)
                    {
                        let item = items[i];
                        if(i<startItemIndex || i>=endItemIndex)
                        {
                            item.classList.remove('show');
                            item.classList.add('hide');
                        }
                        else
                        {
                            item.classList.add('show');
                            item.classList.remove('hide');
                        }
                    }

                    // hide/show buttons
                    let minbutton,
                        maxbutton,
                        actualIndex = getActiveIndex(btnlist) || 0;


                    for (let i=0; i<btnlist.length; i++)
                    {
                        let btn = btnlist[i];

                        if(btn.classList.contains('active'))
                        {
                            minbutton = (i-3<=0) ? 0 : i-3,
                            maxbutton = (i+3>paginatorlist.length) ? paginatorlist.length : i+3;
                        }

                    }

                    for (let i=0; i<btnlist.length; i++)
                    {
                        let btn = btnlist[i];

                        if(i<minbutton || i>=maxbutton)
                        {
                            btn.classList.remove('show');
                            btn.classList.add('hide');
                        }
                        else
                        {
                            btn.classList.add('show');
                            btn.classList.remove('hide');
                        }
                    }

                }

                // find and return the index of .active
                function getActiveIndex(btnlist)
                {
                    let i = -1; for (let b of btnlist) { i++; if( b.classList.contains('active')) return i; }
                }



            }


        }


    //--------------------------------------------------//



        const anchors = () =>
        {


            let Anchors = [...document.querySelectorAll('a[href^="#"]')];

            let l = Anchors.length;
            for (let i = 0; i < l; i++)
            {

                let ALink = Anchors[i],
                    target = ALink.getAttribute('target');


                if(!target)
                {


                    ALink.addEventListener('click', event => {

                        let href = Link.getAttribute("href").split("#")[1];


                        if(href && !target)
                        {

                            event.preventDefault();
                            event.stopPropagation();

                            let targetAncorName = [document.querySelector('*[name="'+href+'"]')][0];

                            if(targetAncorName)
                            {

                                let htpt = targetAncorName.offsetTop,
                                    htpl = targetAncorName.offsetLeft;

                                if(htpt>htpl)
                                {

                                    setTimeout(()=>{
                                        targetAncorName.closest('HTML, BODY, .view, .scroll-y, .scroll-x').scrollTop = htpt;
                                    },100);
                                }
                                else
                                {

                                    setTimeout(()=>{
                                        targetAncorName.closest('HTML, BODY, .view, .scroll-y, .scroll-x').scrollLeft = htpl;
                                    },100);
                                }

                            }

                        }

                    },true);

                }

            }


        }



    //--------------------------------------------------//



        const expandercard = () =>
        {


            let cards = document.querySelectorAll('.card');

            for (let card of cards)
            {

                if(!card.firstElementChild.className.includes('expander'))
                {

                    card.addEventListener('click', ev_cardlinks => {

                        let loader = document.querySelectorAll('.loader')[0],
                            link = card.querySelectorAll('.card>a:last-child')[0],
                            linkhref = link.getAttribute('href'),
                            linktar  = link.getAttribute('target');

                        // if click on image and not a link: (is obsolete?)
                        // let ev = ev_cardlinks || window.event;
                        // if(ev.target instanceof HTMLImageElement || ev.target.parentElement instanceof HTMLImageElement) { return null; }
                        // else if( linktar=='_self'||linktar=='_top' )

                        if( linktar=='_self'||linktar=='_top' )
                        {

                            console.log(link,linkhref)

                            loader.classList.add('[status-off]');
                            loader.classList.remove('status---');

                            setTimeout( () => {
                                loader.classList.add('[status-active]');
                                loader.classList.remove('[status-off]');
                            }, 50);


                            setTimeout( () => {

                                if(linkhref==='#')  location.reload();
                                else            location.href = linkhref;

                            }, 300);

                        }

                        else
                        {
                              location.href = linkhref;
                              window.open(linkhref, '_blank');
                        }

                        ev_cardlinks=null;

                    },true);

                }

                else
                {

                        // get box and start values

                        let box = card.firstElementChild,
                            close = card.querySelectorAll('.close')[0];

                        if(!close) debug(`:: [⚠ ui alert]: wrong card\n   ⮑ Card can be expanse but not contract. Close element not faunded.\n      read more on: https://git.io/J4hdP`);


                        box.classList.add('[status-off]');


                        // storize the start values of box

                        let contentsbox = box.querySelectorAll('.expander>.card-content , .expander>.card-summary'),
                            start_offset_left= box.getBoundingClientRect().left+'px',
                            start_offset_top= ( box.getBoundingClientRect().top-document.body.getBoundingClientRect().top )+'px';

                        // set the start values on the box and container

                        box.parentNode.style.height= box.offsetHeight+'px';
                        box.parentNode.style.width = box.offsetWidth+'px';
                        box.style.height = box.offsetHeight+'px';
                        box.style.width = box.offsetWidth+'px';


                        card.addEventListener('click', ev_cardexpander => {

                            if(box.className.includes('status-off')) opencard (box, contentsbox)

                        },true);


                        close.addEventListener('click', ev_cardexpander => {

                            if(box.className.includes('status-active')) closecard(box, contentsbox)

                        },true);


                }

            }

            function opencard (box, contentsbox)
            {

                box.classList.add('transition');
                box.classList.remove('[status-off]');


                box.style.marginLeft = -box.getBoundingClientRect().left+'px';
                box.style.marginTop  = -box.getBoundingClientRect().top+'px';
                box.style.height = document.body.clientHeight+'px';
                box.style.width  = document.body.clientWidth+'px';

                setTimeout(()=> {
                    box.classList.add('[status-active]');
                    box.classList.remove('transition');
                    box.style = '';
                },425);

            }

            function closecard (box, contentsbox)
            {

                box.classList.add('transition');

                box.style.marginLeft = box.parentNode.offsetLeft-window.scrollX+'px';
                box.style.marginTop = box.parentNode.offsetTop-window.scrollY+'px';

                box.style.height = box.parentNode.offsetHeight+'px';
                box.style.width  = box.parentNode.offsetWidth+'px';

                setTimeout(()=> {

                    box.classList.remove('transition');
                    box.classList.add('[status-off]');
                    box.classList.remove('[status-active]');
                    box.style = '';

                },425);


            }


        }



    //--------------------------------------------------//



        const tabx = () =>
        {


            let alltabsx = document.querySelectorAll(".tabs-x");

            for (let tab of alltabsx)
            {


                let mainmask  = tab.getElementsByClassName('mask')[0],
                    tlist     = tab.querySelectorAll('.title>nav>a'),
                    wlist     = tab.querySelectorAll('.mask>.mask');


                // set elements to start
                for (let T of tlist) T.className = (name!='[status-off]' && name!='[status-active]') ? name='[status-off]' : T.className;
                for (let W of wlist) W.className = (name!='[status-off]' && name!='[status-active]') ? name='[status-off]' : W.className;


                let l = tlist.length;
                for (let i = 0; i < l; i++)
                {


                    let title = tlist[i], //tab title in list
                        wrap  = wlist[i]; //tab content wraps


                    //if in title active...
                    if(title.className.includes('status-active'))
                    {

                        for (let x = 0; x < l; x++)
                        {
                            if(x!=i)
                            {
                                tlist[x].classList.replace("[status-active]","[status-off]");
                                wlist[x].classList.replace("[status-active]","[status-off]");
                            }
                        }

                        //close is active
                        title.classList.replace("[status-off]","[status-active]");

                        //hide all
                        mainmask.style.height='0px';

                    }

                    // first tab is start
                    else
                    {

                        title.classList.add('[status-off]');
                        wrap.classList.add('[status-off]');

                        tlist[0].classList.replace('[status-off]','[status-active]');
                        wlist[0].classList.replace('[status-off]','[status-active]');

                        // set height
                        mainmask.style.height = wlist[0].scrollHeight+'px';

                    }


                    title.addEventListener( 'click', ev_tabtitleclick =>{


                        //if click on close...
                        if(title.className.includes('close'))
                        {

                            //reset all
                            for (let x = 0; x < l; x++)
                            {
                                tlist[x].classList.replace("[status-active]","[status-off]");
                                wlist[x].classList.replace("[status-active]","[status-off]");
                            }

                            wrap.classList.add("[status-off]");

                            //close is active
                            title.classList.replace("[status-off]","[status-active]");

                            //hide all
                            mainmask.style.height='0px';

                        }

                        else
                        {

                            if(!title.className.includes('status-active'))
                            {

                                for (let x = 0; x < l; x++)
                                {
                                    tlist[x].classList.replace("[status-active]","[status-off]");
                                    wlist[x].classList.replace("[status-active]","[status-off]");
                                }

                                title.classList.replace("[status-off]","[status-active]");
                                wrap.classList.replace("[status-off]","[status-active]");

                            }

                            // height adaption
                            setTimeout(()=>{
                                let active = mainmask.getElementsByClassName('[status-active]')[0];
                                if(active!=undefined) mainmask.style.height = active.scrollHeight+'px';
                            },100)
                        }



                    },true);


                }


            }


        }



    //--------------------------------------------------//



        const taby = () =>
        {


            let alltabsy = document.querySelectorAll(".tabs-y"), tabssize = alltabsy.length;

            for (let tab of alltabsy)
            {


                let titleslist = [...tab.querySelectorAll(".tabs-y>.title")], titlelength = titleslist.length;

                for (let title of titleslist)
                {


                    let closeicon = title.querySelectorAll('.close')[0],
                        content   = title.nextElementSibling;


                    title.classList.add('[status-off]');
                    content.classList.add('[status-off]');


                    if(title.className.includes('status-active'))
                    {
                        title.classList.remove('[status-off]');
                        content.classList.remove('[status-off]');
                        content.style.height = content.scrollHeight+"px";
                        content.classList.add('[status-active]');
                    }


                    // on title click, open tab ...
                    title.addEventListener('click', ev_titleclick_tab_y =>{

                        if(ev_titleclick_tab_y.target != closeicon)
                        {

                            for (let x = 0; x < titlelength; x++)
                            {
                                titleslist[x].classList.add('[status-off]');
                                titleslist[x].classList.remove('[status-active]');
                                titleslist[x].nextElementSibling.classList.add('[status-off]');
                                titleslist[x].nextElementSibling.classList.remove('[status-active]');
                                titleslist[x].nextElementSibling.style.height = "0";
                            }

                            content.style.height = content.firstElementChild.scrollHeight+"px";
                            content.classList.replace('[status-off]','[status-active]');
                            title.classList.replace('[status-off]','[status-active]');

                            return false;

                        }

                    },true);


                    // on close click, reset tabs ...
                    closeicon.addEventListener('click',
                    ()=>{

                        title.classList.replace('[status-active]','[status-off]');
                        title.nextElementSibling.classList.replace('[status-active]','[status-off]');
                        title.nextElementSibling.style.height = "0";

                    },true);


                }


            }


        }



    //--------------------------------------------------//



        const spoilers = () =>
        {

            let spoilerslist = document.querySelectorAll("[class^=spoiler]","details");

            // prepare for start
            for (let spoiler of spoilerslist)
            {
                if(!spoiler.getAttribute('open')  || (!spoiler.getAttribute('open') && !spoiler.querySelectorAll('.mask')[0].className.contains('[status-active]')) )
                {

                    spoiler.removeAttribute('open');
                    spoiler.querySelectorAll('.mask')[0].classList.add('[status-off]');

                }
            }


            for (let spoiler of spoilerslist) spoiler.querySelectorAll('.title')[0].addEventListener('click', ev_toggletree=>{ toggle(spoiler, spoiler.querySelectorAll('.mask')[0],ev_toggletree) },true)

            function toggle(spoiler,contents,ev_toggletree)
            {

                if(ev_toggletree.target.tagName.toLowerCase()!='a')
                {

                    if(!spoiler.getAttribute('open'))
                    {

                        contents.style.height = contents.scrollHeight+"px";
                        contents.classList.add('[status-active]');
                        contents.classList.remove('[status-off]');
                        spoiler.setAttribute('open',true);

                        setTimeout(()=>{
                            contents.style.height = "initial";
                        },155)

                    }

                    else
                    {

                        contents.style.height = contents.scrollHeight+"px";

                        setTimeout(()=>{

                            contents.classList.add('[status-off]');
                            contents.classList.remove('[status-active]');
                            spoiler.removeAttribute('open');
                            contents.style.height = "0px";

                        },200)

                    }

                }

            }


        }



    //--------------------------------------------------//




        const popover = () =>
        {


            let allpops = document.querySelectorAll("[class*=popover]");

            for (let pop of allpops)
            {

                pop.classList.remove('[status-off]');
                pop.classList.remove('[status-active]');

                if(pop.parentNode.tagName.toLowerCase()=='p')
                {
                    pop.addEventListener('mouseenter', ev_togglepopover => {

                        togglepopover(ev_togglepopover,allpops,pop);
                        pop.addEventListener('mouseleave', ev_closeallpops=>{ closeallpops(allpops) },true)

                    },false);
                }

                pop.addEventListener( 'click', ev_togglepopover => {

                    togglepopover(ev_togglepopover,allpops,pop);

                    document.addEventListener('click', ev_closeallpops=>{ closeallpops(allpops) },true)

                },false);

            }

            function togglepopover(eventtarget,allpops,pop)
            {
                let target = eventtarget.target.closest('[class*=popover]') || eventtarget.srcElement.closest('[class*=popover]');

                if(target && target.closest('[class*=popover]')===pop)
                {
                    if(target.closest('[class*=popover]')===pop && pop.classList.contains('[status-active]'))
                    {
                        setTimeout(()=>{ closeallpops(allpops); },200)
                    }
                    else
                    {
                        pop.classList.add('[status-active]');
                        pop.classList.remove('[status-off]');
                    }

                }

            }

            function closeallpops(allpops)
            {
                for (let p of allpops)
                {
                    if(p.classList.contains('[status-active]'))
                    {
                        p.classList.add('[status-off]');
                        p.classList.remove('[status-active]');
                        setTimeout(()=>{
                            p.classList.remove('[status-off]');
                        },500)
                    }
                }
            }
        }



    //--------------------------------------------------//



        const audiobox = () =>
        {


            let allaudiobox =  document.querySelectorAll('[class*="audiobox"]');

            // have a video tag insiede?
            for (let playerbox of allaudiobox)
            {


                let audio       = playerbox.getElementsByTagName('audio')[0],
                    play        = playerbox.querySelectorAll('.play')[0],
                    loop        = playerbox.querySelectorAll('.loop')[0],
                    timer       = playerbox.querySelectorAll('.duration>*')[0],
                    timeline    = playerbox.querySelectorAll('.timeline')[0],
                    progressor,
                    volume      = playerbox.querySelectorAll('.volume')[0],
                    volumeIcon,
                    power;

                audio.load();

                audio.onloadedmetadata  = ev_audiometa  => startAudiobox();

                function startAudiobox () {


                    //set for start

                    if(play)  { play.classList.add('[status-off]'); }
                    if(loop)  { loop.classList.add('[status-off]'); }
                    if(timer) { timer.innerText = '00:00:00/'+ fromNumberToHHMMSS(audio.duration);  }

                    if(timeline)
                    {
                        timeline.innerHTML = `<div class="progress-[00]"></div>`;
                        progressor = timeline.firstElementChild;
                        progressor.className='progress-[00]';
                    }


                    if(volume)
                    {
                        (audio.mute) ? volume.classList.add('[status-off]') : volume.classList.add('[status-active]') ;
                        let nn; if(audio.mute){ nn='00'} else if (volume.dataset['start-power']) { nn=volume.dataset['start-power']} else{nn='100'};
                        volume.innerHTML = `<div class="progress-[`+nn+`]"></div>`;
                        power = volume.firstElementChild;
                    }


                    /// converters

                    function fromWidthToPercent (e,x)
                    {
                        return ~~(x / e.offsetWidth * 100)
                    }

                    function fromTimeToPercent (a)
                    {
                        return ~~(a.currentTime / a.duration * 100)
                    }

                    function fromPercentToTime (a,p)
                    {
                        return ~~(p/100*a.duration)
                    }

                    function fromNumberToHHMMSS (n)
                    {

                        n=~~(n);

                        let h = ~~(n/3600),
                            m = ~~((n-(h*3600))/60),
                            s = n-(h*3600)-(m*60);

                        if(h<10){h="0"+h}
                        if(m<10){m="0"+m}
                        if(s<10){s="0"+s}

                        return h+':'+m+':'+s;

                    }

                    function updateRuntime()
                    {

                        let updateAudiobox = setInterval( () =>{


                            //progressbar
                            let percent = fromTimeToPercent(audio);
                            if(progressor) progressor.className = 'progress-['+((percent<10)?'0'+percent:percent)+']';

                            //timer
                            if(timer) timer.innerText = fromNumberToHHMMSS(audio.currentTime)+'/'+ fromNumberToHHMMSS(audio.duration);

                            if(audio.paused){ window.clearInterval(updateAudiobox); }

                        },333);

                    }


                    // play/pause audio
                    if(play)
                    {

                        play.addEventListener( 'click', ev_audio_playclick => {

                            updateRuntime();

                            if(audio.paused)
                            {

                                audio.play()
                                play.classList.add('[status-active]');
                                play.classList.remove('[status-off]');

                            }
                            else
                            {

                                audio.pause();
                                play.classList.add('[status-off]');
                                play.classList.remove('[status-active]');

                            }

                        }, false );
                    }

                    if(loop)
                    {

                        loop.addEventListener( 'click', ev_audio_loopclick => {

                            if(!audio.loop)
                            {

                                audio.loop = 'true'
                                loop.classList.add('[status-active]');
                                loop.classList.remove('[status-off]');

                            }

                            else
                            {

                                audio.removeAttribute('loop');
                                loop.classList.add('[status-off]');
                                loop.classList.remove('[status-active]');

                            }

                            ev_audio_loopclick = null;

                        }, false );

                    }

                    if(timeline)
                    {

                        progressor.addEventListener('click', ev_audio_progressclick => {

                            //progressbar
                            let percent = fromWidthToPercent(progressor, ( is_touch_device() ? ev_audio_progressclick.touches[0].pageX : ev_audio_progressclick.pageX )-getoffsetLeft(progressor) );
                            progressor.className = 'progress-['+((percent<10) ? '0'+percent:percent)+']';

                            //timer
                            audio.currentTime = fromPercentToTime(audio,percent);
                            timer.innerText = fromNumberToHHMMSS(audio.currentTime)+'/'+ fromNumberToHHMMSS(audio.duration);

                            ev_audio_progressclick = null;

                        }, false );

                    }

                    if(volume)
                    {

                        volume.addEventListener('click', ev_audio_powerclick => {

                            if(ev_audio_powerclick.target!=power)
                            {
                                if( !audio.muted )
                                {
                                    audio.muted = true;
                                    volume.classList.add('[status-off]');
                                    volume.classList.remove('[status-active]');
                                }
                                else
                                {
                                    audio.muted = false;
                                    volume.classList.add('[status-active]');
                                    volume.classList.remove('[status-off]');
                                }
                            }
                            else
                            {
                                let percent = fromWidthToPercent(power, ( is_touch_device() ? ev_audio_powerclick.touches[0].pageX : ev_audio_powerclick.pageX )-getoffsetLeft(power) );
                                power.className = 'progress-['+((percent<10) ? '0'+percent:percent)+']';

                                audio.volume = parseInt(percent)/100;

                                if( audio.volume<=0.10 )
                                {
                                    audio.muted = true;
                                    power.className = 'progress-[00]';
                                    volume.classList.add('[status-off]');
                                    volume.classList.remove('[status-active]');
                                }
                                else
                                {
                                    audio.muted = false;
                                    audio.removeAttribute('muted')
                                    volume.classList.add('[status-active]');
                                    volume.classList.remove('[status-off]');
                                }
                            }

                            ev_audio_mutedclick=null;

                        },false);
                    }

                    ev_audiometa = null;

                }

            }

        }



    //--------------------------------------------------//



        const videobox = () =>
        {


            function videotimeformat(s)
            {
                    s = ~~(s % 60);   s = (s<9)?'0'+s:s;
                let m = ~~(s / 60);   m = (m<9)?'0'+m:m;
                let h = ~~(s / 3600); h = (h<9)?'0'+h:h;
                return String(h+":"+m+":"+s);
            }


            //// get all videobox
            let allvideobox =  document.querySelectorAll('[class*="videobox"]');

            for (let videobox of allvideobox)
            {

                //// have a video tag insiede?
                if(['iframe','video'].indexOf(videobox.firstElementChild.tagName.toLowerCase())<0)
                {

                    videobox.classList.add('[status-error]');
                    debug(`:: [⚠ ui alert]: wrong video\n   ⮑ Framework support only html5 <video> for create a preset.\n      read more on: https://git.io/J4hdh`);

                }
                else
                {


                    let classes = videobox.classList.toString().toLowerCase(),
                        videotag = videobox.getElementsByTagName('video')[0];

                         if(classes.includes('backscreen'))  { videotag.muted=true; videotag.autoplay=true; videotag.loop=true;  }
                    else if(classes.includes('background'))  { videotag.muted=true; videotag.autoplay=true; videotag.loop=true; videobox.parentNode.style.position = "relative"; }
                    else if(classes.includes('social'))      { videobox_social (videobox,classes); }
                    else                                     { videobox_custom (videobox); }

                }

            }

            function videobox_custom (videobox)
            {


                let video           = videobox.getElementsByTagName('video')[0]     || false,
                    display         = videobox.querySelectorAll('.display')[0]      || false,
                    volume          = videobox.querySelectorAll('.volume')[0]       || false,
                    loop            = videobox.querySelectorAll('.loop')[0]         || false,
                    play            = videobox.querySelectorAll('.play')[0]         || false,
                    starter         = videobox.querySelectorAll('.starter')[0]      || false,
                    timelabel       = videobox.querySelectorAll('.duration>*')[0]   || false,
                    maximized       = videobox.querySelectorAll('.maximized')[0]    || false,
                    cinema          = videobox.querySelectorAll('.cinema')[0]       || false,
                    cinebox         = false,
                    streamprogress  = videobox.querySelectorAll('.timeline>*')[0]   || false,
                    playprogress    = videobox.querySelectorAll('.timeline>*')[1]   || false;

                let classes = videobox.classList.toString().toLowerCase();

                //in case of settings autostartstop start loading video to muted

                if(classes.includes('settings-')&&classes.includes('autostartstop')) video.muted = true;


                //// set for start


                if(video.autoplay)
                {
                    videobox.classList.remove('[display-active]');
                    videobox.classList.add('[display-off]');
                }
                else
                {
                    videobox.classList.add('[display-active]');
                    videobox.classList.remove('[display-off]');
                }


                if(loop)
                {

                    (video.loop) ? loop.classList.add('[status-active]') : loop.classList.add('[status-off]');

                }

                if(play)
                {

                    (video.autoplay) ? play.classList.add('[status-active]') : play.classList.add('[status-off]');

                }

                if(starter)
                {

                    (video.autoplay) ? bigplay.classList.add('[status-active]') : play.classList.add('[status-off]');

                }

                if(streamprogress)
                {

                    streamprogress.className='progress-[00]';

                }

                if(playprogress)
                {

                    playprogress.className='progress-[00]';

                }

                if(maximized)
                {

                    maximized.classList.add('[status-off]');

                }

                if(cinema)
                {

                    cinema.classList.add('[status-off]');
                    if(document.querySelectorAll('.cinebox')[0]==undefined) document.body.insertAdjacentHTML('beforeend', `<div class="cinebox"></div>`);
                    cinebox = document.querySelectorAll('.cinebox')[0];

                }

                if(volume)
                {

                    (video.muted) ? volume.classList.add('[status-off]') : volume.classList.add('[status-active]') ;
                    let nn; if(video.mute){ nn='00'} else if (volume.dataset['start-power']) { nn=volume.dataset['start-power']} else {nn='100'};
                    volume.innerHTML = `<div class="progress-[`+nn+`]"></div>`;
                    power = volume.firstElementChild;

                }


                video.onloadedmetadata = ev_videoready => {


                    // on buffering start...

                    if (video.buffered.length === 0)
                    {

                        console.log('no buffer for a video'); return;

                    }

                    else
                    {

                        //// Print load progress

                        if(streamprogress)
                        {

                            let bufferedSeconds = (video.buffered.end(0) - video.buffered.start(0)),
                                checkvideobuffer = setInterval( () =>{
                                    let loadpercent = ~~((bufferedSeconds / video.duration) * 100);
                                    if(loadpercent>=99 || bufferedSeconds==video.duration)
                                    {
                                        streamprogress.className = 'progress-[100]';
                                        window.clearInterval(checkvideobuffer);
                                    }
                                    else
                                    {
                                        streamprogress.className = 'progress-['+((loadpercent<10)?'0'+loadpercent:''+loadpercent)+']'
                                    }
                                },500);

                        }


                        //// when video end

                        video.onended = ev_endedvideo =>
                        {

                            if(play)
                            {
                                play.classList.add('[status-off]');
                                play.classList.remove('[status-active]');
                            }


                            if(loop)
                            {
                                if(!loop.className.includes('status-active'))
                                {
                                    videobox.classList.add('[display-active]');
                                    videobox.classList.remove('[display-off]');
                                }
                            }
                            else
                            {
                                videobox.classList.add('[display-active]');
                                videobox.classList.remove('[display-off]');
                            }

                        };


                        //// when time is readable

                        if(timelabel)
                        {
                            timelabel.innerText = '--:--:--'+'/'+videotimeformat(video.duration);
                        }


                        //// when touch volume

                        if(volume)
                        {

                            function fromWidthToPercent (e,x)
                            {
                                return ~~(x / e.offsetWidth * 100)
                            }

                            volume.addEventListener( 'click', ev_video_powerclick => {

                                if(ev_video_powerclick.target!=power)
                                {
                                    if( !video.muted )
                                    {
                                        video.muted = true;
                                        volume.classList.add('[status-off]');
                                        volume.classList.remove('[status-active]');
                                    }
                                    else
                                    {
                                        video.muted = false;
                                        volume.classList.add('[status-active]');
                                        volume.classList.remove('[status-off]');
                                    }
                                }
                                else
                                {
                                    let percent = fromWidthToPercent(power, ( is_touch_device() ? ev_video_powerclick.touches[0].pageX : ev_video_powerclick.pageX )-getoffsetLeft(power) );
                                    power.className = 'progress-['+((percent<10) ? '0'+percent:percent)+']';

                                    video.volume = parseInt(percent)/100;

                                    if( video.volume<=0.10 )
                                    {
                                        video.muted = true;
                                        power.className = 'progress-[00]';
                                        volume.classList.add('[status-off]');
                                        volume.classList.remove('[status-active]');
                                    }
                                    else
                                    {
                                        video.muted = false;
                                        video.removeAttribute('muted')
                                        volume.classList.add('[status-active]');
                                        volume.classList.remove('[status-off]');
                                    }
                                }

                                ev_audio_mutedclick=null;

                            }, true );

                        }


                        //// loop asset
                        if(loop)
                        {

                            loop.addEventListener( 'click', ev_loopvideo => {

                                if(!video.loop)
                                {

                                    video.loop=true;
                                    loop.classList.add('[status-active]');
                                    loop.classList.remove('[status-off]');

                                }

                                else
                                {

                                    video.loop=false;
                                    loop.classList.add('[status-off]');
                                    loop.classList.remove('[status-active]');

                                }

                            }, false );

                        }


                        //// play pause asset

                        let playpause = () =>
                        {

                            var checkvals;

                            function playvideo()
                            {

                                videobox.classList.remove('[display-active]');
                                videobox.classList.add('[display-off]');

                                checkvals = setInterval(()=>{
                                    timelabel.innerText = videotimeformat(video.currentTime)+'/'+videotimeformat(video.duration);
                                    let loadpercent = ~~((video.currentTime / video.duration) * 100);
                                    playprogress.className = 'progress-['+((loadpercent<10)?'0'+loadpercent:''+loadpercent)+']'
                                },100);

                                if(play)
                                {
                                    play.classList.add('[status-active]');
                                    play.classList.remove('[status-off]');
                                }

                                if(starter)
                                {
                                    starter.classList.add('[status-active]');
                                    starter.classList.remove('[status-off]');
                                }

                                video.play();

                            }
                            function pausevideo()
                            {

                                videobox.classList.add('[display-active]');
                                videobox.classList.remove('[display-off]');

                                if(play)
                                {
                                    play.classList.add('[status-off]');
                                    play.classList.remove('[status-active]');
                                }

                                if(starter)
                                {
                                    starter.classList.add('[status-off]');
                                    starter.classList.remove('[status-active]');
                                }

                                window.clearInterval(checkvals);

                                video.pause();

                            }

                            (video.paused || video.ended) ? playvideo() : pausevideo();

                        }

                        if(video.autoplay){ playpause(); };
                        if(starter) starter.addEventListener( 'click', ev_playvideo => { playpause(ev_playvideo) },false);
                        if(play) play.addEventListener( 'click', ev_playvideo => { playpause(ev_playvideo) },false);

                        display.addEventListener( 'click', ev_playvideo => {
                            if(ev_playvideo.target === display)
                            {

                                playpause(ev_playvideo)

                                if( display.className.includes('-active') )
                                {
                                    display.classList.add('[status-off]');
                                    display.classList.remove('[status-active]');
                                }
                                else
                                {
                                    display.classList.remove('[status-off]');
                                    display.classList.add('[status-active]');
                                }

                            }

                        },false);


                        //// change play time on click

                        if(playprogress)
                        {
                            playprogress.addEventListener( 'click', ev_clickvideoprogress => {

                                let pointX = (ev_clickvideoprogress.pageX - getoffsetLeft(playprogress)),
                                clickpercent = ~~((pointX/playprogress.offsetWidth) * 100 ),
                                timefrompercent = ((clickpercent * video.duration) / 100).toFixed(6);

                                playprogress.className = 'progress-['+((clickpercent<10)?'0'+clickpercent:''+clickpercent)+']'

                                timelabel.innerText = videotimeformat(timefrompercent)+'/'+videotimeformat(video.duration);
                                video.currentTime = timefrompercent;

                            },false);
                        }



                        //// change fullscreen
                        if(maximized)
                        {

                            maximized.addEventListener( 'click',  ev_maximizedvideo => {

                                ev_maximizedvideo.preventDefault();
                                setfullscreen()

                            },false);


                            function setfullscreen()
                            {
                                if( videobox.className.includes('[cinemode]') ) setcinemode_off();
                                setTimeout(()=>{
                                    (videobox.className.includes('[fullscreen]')) ? setfullscreen_off() : setfullscreen_on();
                                },300);
                            }
                            function setfullscreen_off()
                            {
                                document.exitFullscreen();
                                setTimeout(()=>{
                                    videobox.classList.remove('[fullscreen]');
                                },300);
                            }
                            function setfullscreen_on()
                            {
                                videobox.classList.add('[fullscreen]');
                                     if (videobox.requestFullscreen) { videobox.requestFullscreen(); }
                                else if (videobox.msRequestFullscreen) { videobox.msRequestFullscreen(); }
                                else if (videobox.webkitRequestFullScreen) { videobox.webkitRequestFullScreen(); }
                            }


                            videobox.addEventListener('fullscreenchange',
                            () => {

                                setTimeout(()=>{

                                    if( videobox.className.includes('[fullscreen]') )
                                    {
                                        maximized.classList.add('[status-active]');
                                        maximized.classList.remove('[status-off]');
                                    }
                                    else
                                    {
                                        maximized.classList.add('[status-off]')
                                        maximized.classList.remove('[status-active]')
                                    }

                                },500)

                            },true);


                        }



                        //// change cinemode
                        if(cinema)
                        {

                            cinema.addEventListener( 'click', ev_cinemavideo => {

                                ev_cinemavideo.preventDefault();
                                setcinemode();

                            },false);

                            function setcinemode()
                            {
                                if( videobox.className.includes('[fullscreen]') ) setfullscreen_off();
                                setTimeout(()=>{
                                    (videobox.className.includes('[cinemode]')) ?  setcinemode_off() : setcinemode_on();
                                },300);
                            }

                            function setcinemode_on()
                            {

                                videobox.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                    inline: "center"
                                });

                                setTimeout(()=>{
                                    videobox.style.width = video.offsetWidth+'px';
                                    videobox.style.height = video.offsetHeight+'px';
                                    videobox.style.padding = '0px';


                                    cinebox.classList.add('[status---]');

                                    cinema.classList.add('[status-active]');
                                    cinema.classList.remove('[status-off]');

                                    setTimeout(()=>{

                                        videobox.classList.add('[cinemode]');

                                        videobox.insertAdjacentHTML('afterend', `<div style="height:`+video.offsetHeight+`px;"></div>`);

                                        cinebox.classList.add('[status-active]');
                                        cinebox.classList.remove('[status-off]');

                                    },200);

                                },200);
                            }

                            function setcinemode_off()
                            {


                                cinema.classList.add('[status-off]');
                                cinema.classList.remove('[status-active]');

                                cinebox.classList.add('[status-off]');
                                cinebox.classList.remove('[status-active]');

                                setTimeout(()=>{

                                    videobox.classList.remove('[cinemode]');

                                    videobox.nextElementSibling.remove();
                                    videobox.style.width = '';
                                    videobox.style.height = '';
                                    videobox.style.padding = '';
                                    if(videobox.style==''){videobox.removeAttribute('style')}

                                    videobox.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                        inline: "center"
                                    });

                                },300)

                                setTimeout(()=>{
                                    cinebox.classList.remove('[status-active]');
                                    cinebox.classList.remove('[status-off]');
                                    cinebox.classList.remove('[status---]');
                                },500)

                            }

                        }


                    }


                }

            }

            function videobox_social (videobox,classes)
            {

                if(!classes.includes('[status-active]','[status-off]'))
                {

                    // all params
                    let error        = false,
                        video        = videobox.getElementsByTagName('video')[0],
                        ids          = video.getAttribute('id'),
                        srcstring    = video.src,
                        settings     = classes.includes('settings') || false,
                        optionslist  = (settings)?classes.toLowerCase().split('settings-[')[1].split(']')[0].split(','):'',
                        addoptions   = '',
                        addclasses   = '',
                        addids       = '',
                        addrelink    = '',
                        addlink      = '',
                        wrapper,
                        htmlcode;

                    //no lazy warning
                    if(settings)
                    {
                        if(optionslist.includes('autostartstop') && !videobox.parentElement.classList.toString().toLowerCase().includes('lazy'))
                        debug(`:: [⚠ ui alert]: wrong video\n   ⮑ video not support 'autostartstop' without lazy\n      read more on: https://git.io/J4hdh`)
                    }



                    // check video url
                    let strcheck    = srcstring.toLowerCase(),
                        isyt_be     = strcheck.includes('youtu.be/'),
                        isyt_watch 	= strcheck.includes('youtube.com/watch'),
                        isyt_embed 	= strcheck.includes('youtube.com/embed'),
                        isVimeo 	= strcheck.includes('vimeo.com/'),
                        isInstagram = strcheck.includes('instagram.com/'),
                        isFacebook  = strcheck.includes('facebook.com/'),
                        isFb        = strcheck.includes('fb.com/'),
                        isfbw       = strcheck.includes('fb.watch/'),
                        isTwitter   = strcheck.includes('twitter.com/'),
                        isTwitch    = strcheck.includes('twitch.tv/');


                    // set by types

                    if( isyt_be || isyt_watch || isyt_embed )
                    {

                        videobox.classList.add('[type-youtube]');

                        if(!ids){ addids=''; }else{ addids=' id="'+ids+'"'; }

                        if(settings)
                        {

                            if(optionslist.includes('clearui'))
                            {
                                addoptions  += '&rel=0&modestbranding=1&showinfo=0&showtitle=0&iv_load_policy=3';
                            }
                            else
                            {
                                addoptions += '&iv_load_policy=1';
                            }

                            if(optionslist.includes('controls'))
                            {
                                addoptions  += '&controls=1';
                            }
                            else
                            {
                                addoptions += '&controls=0';
                            }

                            if(optionslist.includes('loop'))
                            {
                                addoptions  += '&loop=1';
                            }

                            if(optionslist.includes('volume-'))
                            {
                                addoptions  += '&volume='+optionslist.split('volume-')[1].split(',')[0];
                            }

                            if(optionslist.includes('muted'))
                            {
                                addoptions  += '&mute=1';
                            }

                            if(optionslist.includes('autoplay')||optionslist.includes('autostartstop'))
                            {
                                (optionslist.includes('muted')) ? addoptions  += '&autoplay=1' : addoptions += '&autoplay=1&mute=1';
                            }

                            if(optionslist.includes('autopause')||optionslist.includes('autostartstop'))
                            {
                                addoptions  += '&autopause=1';
                            }

                            if(optionslist.includes('lang'))
                            {
                                addoptions  += '&hl='+optionslist.split('lang-')[1].split(',')[0]+'&cc_load_policy=1';
                            }

                            if(optionslist.includes('playlist'))
                            {
                                addoptions  += '&list='+optionslist.split('playlist-')[1].split(',')[0];
                            }


                        }
                        else
                        {
                            addoptions = '&iv_load_policy=1&controls=1';
                        }

                        //make new link

                        if(isyt_watch)      { videourl = 'https://www.youtube.com/embed/'+srcstring.split('watch?v=')[1].split('=')[0]+'?enablejsapi=1&version=3&playsinline=0'; }
                        else if(isyt_be)    { videourl = 'https://www.youtube.com/embed/'+srcstring.split('.be/')[1]+'?enablejsapi=1&version=3&playsinline=0'; }
                        else if(isyt_embed) { videourl = 'https://www.youtube.com/embed/'+srcstring.split('embed/')[1].split('=')[0]+'?enablejsapi=1&version=3&playsinline=0'; }
                        else                { error=true;  debug(`:: [⚠ ui alert]: wrong video\n   ⮑ Youtube video link unsupported\n      read more on: https://git.io/J4hdh`);}

                        if(error==false)
                        {
                            videobox.innerHTML = '<iframe src="'+videourl+addoptions+'" scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                        }

                    }

                    else if (isVimeo)
                    {

                            videobox.classList.add('[type-vimeo]');

                            //stripe opts

                            if(ids==null){ addids=''}else{addids=' id="'+ids+'"'}

                            if(settings)
                            {

                                if(optionslist.includes('clearui'))
                                {
                                    addoptions += '&byline=0&sidedock=0&title=0';
                                }

                                if(optionslist.includes('controls'))
                                {
                                    addoptions += '&controls=1';
                                }
                                else
                                {
                                    addoptions += '&controls=0';
                                }

                                if(optionslist.includes('autoplay')||optionslist.includes('autostartstop'))
                                {
                                    addoptions += '&background=1&muted=1&autoplay=1&';
                                }
                                else if(optionslist.includes('muted'))
                                {
                                    addoptions += '&background=1&muted=1';
                                }
                                else
                                {
                                    addoptions+='&background=1';
                                }

                                if(optionslist.includes('loop'))
                                {
                                    addoptions += '&loop=1';
                                }

                                if(optionslist.includes('lang'))
                                {
                                    addoptions += '&texttrack='+optionslist.split('lang-')[1].split(',')[0];
                                }
                                if(optionslist.includes('playlist'))
                                {
                                    addoptions += '&playlist=1';
                                }
                                if(optionslist.includes('volume-'))
                                {
                                    addoptions += '&volume='+optionslist.split('volume-')[1].split(',')[0];
                                }

                            }
                            else
                            {
                                addoptions = '&background=1&controls=1';
                            }

                            //make new link
                            addlink = 'https://player.vimeo.com/video/'+srcstring.split('.com/')[1]+'?dnt=1&autopause=1&playsinline=0&transparent=0';

                            //create new elem api=1& //'+addids+addclasses+'
                            videobox.innerHTML = '<iframe src="'+addlink+addoptions+'&portrait=0" scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

                    }

                    else if ( isFb || isfbw || isFacebook )
                    {

                        videobox.classList.add('[type-facebook]');

                        if(settings)
                        {

                            if(optionslist.includes('autoplay')||optionslist.includes('autostartstop'))
                            {
                                addoptions += '&autoplay=true';
                            }
                            else
                            {
                                addoptions+='&autoplay=false';
                            }

                            if(optionslist.includes('clearui'))
                            {
                                addoptions += '&show_text=false&hide_cover=true&autohide=true';
                            }

                            if(optionslist.includes('muted'))
                            {
                                addoptions += '&mute=true'; }else{ addoptions+='&mute=false';
                            }

                            //check error
                            if(optionslist.includes('playlist')||optionslist.includes('lang')||optionslist.includes('volume')||optionslist.includes('controls'))
                            {
                                debug(`:: [⚠ ui alert]: wrong video\n   ⮑ Facebook video not support 'controls','playlist','lang','loop','volume'\n      read more on: https://git.io/J4hdh`);
                            }

                        }

                        else
                        {
                            addoptions += "&show_text=false&hide_cover=true&autohide=true"; //&autoplay=false
                        }

                        //make new link
                        if(srcstring.match("extid"))
                        {
                            error=true; debug(`:: [⚠ ui alert]: wrong video\n   ⮑ Usupported Facebook video link\n      read more on: https://git.io/J4hdh\n      wrong link: `+srcstring);
                        }

                        else
                        {

                            if(srcstring.match("videos")) { addlink = 'https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(srcstring.replace('facebook','fb')); }
                            else if(srcstring.match("posts") || srcstring.match("story") || srcstring.match(/\?v=/g))    { addlink = 'https://www.facebook.com/plugins/post.php?href='+encodeURIComponent(srcstring.replace('facebook','fb')); }
                            else { error=true; debug(`:: [⚠ ui alert]: wrong video\n   ⮑ Facebook video link unsupported\n      read more on: https://git.io/J4hdh`); }

                        }


                        if(optionslist.includes('autostartstop'))
                        {
                            addrelink = 'data-relink="'+(addlink+addoptions).replace(/\s/gi,'').replace(/\/\//gi, '/')+'"';
                        }

                        //make iframe
                        if(!error)
                        {
                            videobox.innerHTML = '<iframe '+addrelink+' src="'+addlink+addoptions+'" scrolling="no" data-show-text="false" allow="encrypted-media" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                        }

                    }

                    else if (isInstagram)
                    {

                        videobox.classList.add('[type-instagram]');

                        let embedurl = ((srcstring.includes('embed')) ? srcstring : srcstring+'/embed/captioned').replace(/\s/gi,'').replace(/\/\//gi, '/');

                        if(settings)
                        {

                            if(optionslist.includes('autostartstop'))
                            {
                                addrelink = 'data-relink="'+embedurl+'"';
                            }

                            //check errors
                            if(optionslist.includes('autoplay')||optionslist.includes('loop')||optionslist.includes('playlist')||optionslist.includes('playlist')||optionslist.includes('lang')||optionslist.includes('volume')||optionslist.includes('controls'))
                            {
                                debug(`:: [⚠ ui alert]: wrong video\n   ⮑ Instagram video support only settings-[autostartstop]\n      read more on: https://git.io/J4hdh`);
                            }

                        }

                        //make iframe
                        if(!error)
                        {
                            videobox.innerHTML = '<iframe '+addrelink+' src="'+embedurl+'" allow="autoplay; encrypted-media"  frameborder="0" scrolling="no" allowtransparency="true"></iframe>';
                        }


                    }


                    else if (isTwitch)
                    {
                        videobox.classList.add('[type:twitch]');
                        videobox.classList.add('border-error');
                        videobox.innerHTML = '<div><span class="absolute-center pad-[15]"><p>TWITCH VIDEOS ARE NOT SUPPORTED</p></span><div>';
                    }

                    else if(isTwitter)
                    {
                        videobox.classList.add('[type:twitter]');
                        videobox.classList.add('border-error');
                        videobox.innerHTML = '<div><span class="absolute-center pad-[15]"><p>TWITTER VIDEOS ARE NOT SUPPORTED</p></span><div>';
                    }


                }


            }


        }



    //--------------------------------------------------//



        const fitup = () =>
        {

            setTimeout(()=>{

                let fits = [...document.querySelectorAll(".fit-up")];

                for (let fit of fits)
                {

                    fit.parentNode.style.position = "relative";

                    let H = fit.previousElementSibling.offsetHeight,
                        W = fit.previousElementSibling.offsetWidth;

                    fit.style.height = H+'px';
                    fit.style.width = W+'px';
                    fit.style.margin = ('-'+H+'px 0 -'+H+'px 0');

                }

            },10)

        }



    //--------------------------------------------------//



        const fitheight = () =>
        {

            let fits = [...document.querySelectorAll(".fit-height")];

            for (let fit of fits)
            {

                fit.parentNode.style.position = 'relative';

                let H = fit.parentNode.offsetHeight,
                    W = fit.parentNode.offsetWidth;

                fit.style.width = W+'px';
                fit.style.height = H+'px';

            }

        }



    //--------------------------------------------------//



        const parallax = () =>
        {


            document.body.addEventListener('touchmove', () => { checkparallax = setInterval( moveparallax() , 50); },true);
            document.body.addEventListener('scroll',    () => { moveparallax() },true);

            /*>>>>*/ moveparallax();
            function moveparallax()
            {

                setTimeout(()=>{


                    let parallaxList = document.querySelectorAll('*[class*="Parallax-["]');

                    for (let parallax of parallaxList)
                    {

                        let scale,sensibility;
                        if(parallax.className.includes("mask"))
                        {
                            scale       = parallax.className.split('lax-[')[1].split('-mask]')[0].split('-')[1],
                            sensibility = parallax.className.split('lax-[')[1].split('-mask]')[0].split('-')[0];
                        }
                        else
                        {
                            scale = parallax.className.split('lax-[')[1].split(']')[0].split('-')[1],
                            sensibility = parallax.className.split('lax-[')[1].split(']')[0].split('-')[0];
                        }


                        //get all box values
                        let height            = parallax.offsetHeight,
                            width             = parallax.offsetWidth,
                            reltop            = parallax.offsetTop, // positon of box into page
                            relleft           = parallax.offsetLeft,
                            distancetotop     = parallax.getBoundingClientRect().top+(height/2), // scroll positon respect the top of screen
                            distancetoleft    = parallax.getBoundingClientRect().left+(width/2),
                            screen_h          = document.body.clientHeight,
                            screen_w          = document.body.clientWidth;


                        //starter box positon
                        let y_start =  (distancetotop-(screen_h/2))*-1,
                            x_start =  (distancetoleft-(screen_w/2))*-1;


                        //for all child of box
                        let l = parallax.children.length,
								counterbox = 1;

                        for (let i = 0; i < l; i++)
                        {

                            counterbox++;

							let innerbox = parallax.children[i];

                            let Y =  ( y_start/screen_h )*(100-(counterbox*sensibility)),
                                X =  ( x_start/screen_w )*(100-(counterbox*sensibility));

                            innerbox.style.transformOrigin = "center";

                            if(parallax.className.includes('xParallax-'))
                            {
                                innerbox.style.transform = "scale("+(scale)+") translate("+X+"px,"+0+"px)";
                            }
                            else if (parallax.className.includes('yParallax-'))
                            {
                                innerbox.style.transform = "scale("+(scale)+") translate("+0+"px,"+Y+"px)";
                            }
                            else
                            {
                                innerbox.style.transform = "scale("+(scale)+") translate("+X+"px,"+Y+"px)";
                            }

                        }

                    }

                },50);

            };

        }



    //--------------------------------------------------//



        const effectors = () =>
        {

            let Efxs = [...document.querySelectorAll('[class*="fx-["]')];

            let efxssize = Efxs.length;
            for (let i = 0; i < efxssize; i++)
            {

                let params = Efxs[i].className.split('fx-[')[1].split(']')[0];

                let Target,
                    Trigger,
                    action,
                    cssin,
                    timerin,
                    delayin,
                    cssout,
                    timerout,
                    delayout,
                    toggle,
                    hide,
                    reset;

                if(params.match("on:"))
                {
                    action = ""+params.split("on:")[1].split(";")[0];
                }

                if(params.match("target:"))
                {
                    let targetstring = String(params.split("target:")[1].split(";")[0]);
                    Target = [...document.querySelectorAll('[class*="target-'+targetstring+'"]')];
                }
                else
                {
                    Target = [Efxs[i]];
                }

                if(params.match("trigger:"))
                {
                    let triggerstring = String(params.split("trigger:")[1].split(";")[0]);
                    Trigger = [...document.querySelectorAll('[class*="trigger-'+triggerstring+'"]')];
                }
                else
                {
                    Trigger = [Efxs[i]];
                }

                if(params.match("in:"))
                {

                    cssin = ""+params.split("in:")[1].split(";")[0].split(",")[0];
                    timerin = ""+params.split("in:")[1].split(";")[0].split(",")[1];
                    delayin = ""+params.split("in:")[1].split(";")[0].split(",")[2];

                    if(!timerin) { timerin = 1; }
                    if(!delayin) { delayin = 1; }

                } else { debug(`[⚠ ui alert]: wrong effector\n   ⮑ "in" parameter not found!`) };

                if(params.match("out:"))
                {
                    cssout = ""+params.split("out:")[1].split(";")[0].split(",")[0];
                    timerout = ""+params.split("out:")[1].split(";")[0].split(",")[1];
                    delayout = ""+params.split("out:")[1].split(";")[0].split(",")[2];

                    if(!timerout) { timerout = 1; }
                    if(!delayout) { delayout = 1; }

                } else { cssout = false; }

                if(params.match("toggle:"))
                {

                    toggle = ""+params.split("toggle:")[1].split(";")[0]; if(toggle == "true"){ toggle = true; } else {toggle= false;}

                } else { toggle = true; }

                if(params.match("hide:"))
                {
                    hide = ""+params.split("hide:")[1].split(";")[0];

                } else { hide = false; }

                if(params.match("reset:"))
                {
                    reset = ""+params.split("reset:")[1].split(";")[0]; if(reset == "true"){ reset = true; } else { reset = false; }

                } else { reset = false; }


                let triggersize =Trigger.length;
                for (let trs = 0; trs < triggersize; trs++)
                {


                    let targetsize =Target.length;
                    for (let i = 0; i < targetsize; i++)
                    {


                        if(hide && !Target[i].className.includes('fx-active'))
                        {
                            Target[i].style.opacity = 0;
                        }

                        switch (action)
                        {

                            case 'unloadDoc':

                                debug(`:: [⚠ ui alert]: wrong effector\n   ⮑ unload not can be used in this version of fx. Sorry.`);

                            break;

                            case 'loadDoc':

                                setTimeout(()=>{
                                    setTimeout(()=>{

                                        Target[i].classList.add('fx-active',cssin);
                                        Target[i].classList.remove('fx-off',cssout);

                                        setTimeout(()=>{

                                            if(reset)
                                            {
                                                Target[i].classList.remove(cssin);
                                            }

                                        },timerin)

                                    },delayin);
                                },100);

                            break;

                            case "scroll":

                                if( Target[i].offsetTop < screen.height && !Target[i].className.includes('cssin') )
                                {
                                    Target[i].classList.add('fx-active',cssin);
                                }

                                window.addEventListener("scroll", event => { makefx_scrolling(event); }, true);

                                let makefx_scrolling = (event) =>
                                {

                                    let	scrlDelPosIn = parseInt( document.documentElement.scrollTop + screen.height-(screen.height/10)),
                                        scrlDelPosOut = parseInt( document.documentElement.scrollTop + (screen.height/10)),
                                        scrlBodyPosIn = parseInt( document.body.scrollTop + screen.height-(screen.height/10)),
                                        scrlBodyPosOut = parseInt( document.body.scrollTop + (screen.height/10)),
                                        elPos = parseInt( Target[i].offsetTop );

                                    if(!Target[i].className.includes('fx-active'))
                                    {

                                        if(
                                            (elPos < scrlDelPosIn && elPos > scrlDelPosOut)
                                            || (elPos < scrlBodyPosIn && elPos > scrlBodyPosOut)
                                          )
                                        {

                                            setTimeout(()=>{

                                                Target[i].classList.add(cssin);
                                                Target[i].classList.remove(cssout);

                                                setTimeout(()=>{

                                                    if(reset)
                                                    {
                                                        Target[i].classList.remove(cssin);
                                                    }
                                                    else
                                                    {
                                                        Target[i].classList.add('fx-off');
                                                        Target[i].classList.remove('fx-active');
                                                    }

                                                },timerin)


                                            },delayin+timerout);

                                        }

                                    }

                                    else if(
                                        ( (elPos < scrlDelPosOut || elPos > scrlDelPosIn)
                                          || (elPos < scrlBodyPosOut || elPos > scrlBodyPosIn ) )
                                        && Target[i].className.includes('fx-off') && toggle
                                      )
                                    {

                                        Target[i].classList.add(cssout);
                                        Target[i].classList.remove(cssin);

                                        Target[i].classList.add('fx-active');
                                        Target[i].classList.remove('fx-off');

                                        if(reset)
                                        {
                                            setTimeout(()=>{
                                                Target[i].classList.remove(cssout);
                                            },timerout)
                                        }

                                    }

                                    return false;

                                }

                            break;

                            case "hover":

                                Trigger[trs].addEventListener("mouseover", event =>{ makefx_hoverin() },true);
                                Trigger[trs].addEventListener("mouseleave", event =>{ makefx_hoverout() },true);

                                let makefx_hoverin = () => {

                                    let l = Target.length;
                                    for (let i = 0; i < l; i++)
                                    {

                                        if(!Target[i].className.includes('fx-active') || Target[i].className.includes('fx-off'))
                                        {

                                            setTimeout(()=>{

                                                Target[i].classList.add('fx-active', cssin);
                                                Target[i].classList.remove(cssout, 'fx-off');

                                                setTimeout(()=>{

                                                    if(reset === true)
                                                    {
                                                        Target[i].classList.remove(cssin);
                                                        Target[i].classList.remove(cssin, 'fx-active');
                                                    }

                                                },timerin)

                                            },delayin);

                                        }

                                    }

                                }

                                let makefx_hoverout = () => {

                                    for (let i = 0; i < Target.length; i++)
                                    {

                                        if(Target[i].className.includes('fx-active') && toggle)
                                        {

                                            setTimeout(()=>{

                                                Target[i].classList.add(cssout,'fx-off');
                                                Target[i].classList.remove(cssin,'fx-active');

                                                if(reset)
                                                {
                                                    setTimeout(()=>{
                                                        Target[i].classList.remove(cssout);
                                                    },timerout)
                                                }

                                            },delayout);

                                        }

                                    }

                                }


                            break;

                            case "click":


                                Trigger[trs].addEventListener("click", event =>{ makefx_click() },true);

                                let makefx_click = () => {


                                    for (let i = 0; i < Target.length; i++)
                                    {

                                        if(!Target[i].className.includes('fx-active'))
                                        {

                                            setTimeout(()=>{

                                            Target[i].classList.add('fx-active',cssin);
                                            Target[i].classList.remove('fx-off',cssout);

                                            setTimeout(()=>{

                                                    if(reset)
                                                    {
                                                        Target[i].classList.remove('fx-active',cssin);
                                                    }

                                                },timerin)

                                            },delayin);

                                        }

                                        if(Target[i].className.includes('fx-active') && toggle === true)
                                        {

                                            setTimeout(()=>{

                                                Target[i].classList.add('fx-off',cssout);
                                                Target[i].classList.remove('fx-active',cssin);

                                                if(reset)
                                                {
                                                    setTimeout(()=>{
                                                        Target[i].classList.remove('fx-off',cssout);
                                                    },timerout)
                                                }

                                            },delayout);

                                        }

                                    }

                                }

                            break;

                        }

                    }

                }

            }

        }



    //--------------------------------------------------//


        window.onunload = () => { unloader();  null; };

        document.addEventListener('DOMContentLoaded',
        () => {

            tagcode();
            retagpre();
            lazyloader();
            //nomobar();
            modeapp();
            absolute();
            paginations();
            checkscrollersize();
            standardscroll();
            snapscroll();
            anchors();
            expandercard();
            tabx();
            taby();
            spoilers();
            videobox();
            audiobox();
            grid_y();
            grabs();

        },false);

        window.addEventListener('load',(
        eventDone( () => {

            checkLessJs();
            popover();
            buttons();
            autocrop();
            parallax();
            fitheight();
            fitup();
            flange();
            outbox();
            effectors();
            exitloader();

        })),false);


        window.addEventListener('resize',(
        eventDone( () => {

            fitheight();
            fitup();
            autocrop();
            expandercard();
            flange();
            parallax();
            checkscrollersize();
            ranges();

        })),false);

        window.onresize = () =>{ /*nomobar();*/ grid_y(); }



    //--------------------------------------------------//



        function reload(fn)
        {

            if     (fn == 'condingtag')     tagcode();
            else if(fn == 'absolute')       absolute();
            else if(fn == 'checksize')      checkscrollersize();
            else if(fn == 'scrollers')      standardscroll();
            else if(fn == 'snaps')          snapscroll();
            else if(fn == 'anchors')        anchors();
            else if(fn == 'buttons')        buttons();
            else if(fn == 'fileloader')     fileloader();
            else if(fn == 'cards')          expandercard();
            else if(fn == 'paginations')    paginations();
            else if(fn == 'tab-x')          tabx();
            else if(fn == 'tab-y')          taby();
            else if(fn == 'spoilers')       spoilers();
            else if(fn == 'audiobox')       audiobox();
            else if(fn == 'videobox')       videobox();
            else if(fn == 'grid-y')         grid_y();
            else if(fn == 'outbox')         outbox();
            else if(fn == 'warning')        warning();
            else if(fn == 'parallax')       parallax();
            else if(fn == 'autocrop')       autocrop();
            else if(fn == 'fitheight')      fitheight();
            else if(fn == 'fitup')          fitup();
            else if(fn == 'flanges')        flange();
            else if(fn == 'grabs')          grabs();
            else if(fn == 'effectors')      effectors();
            else debug(`:: [⚠ ui alert]: wrong reload\n   ⮑ The name "`+fn+`" is not valid!\n      Actual valid names: https://git.io/J4hh3`);
            //condingtag, absolute, checksize, scrollers, snaps, anchors, cards, paginations, tab-x, tab-y, spoilers, videobox, audiobox, grid-y, buttons, warning, outbox, parallax, autocrop, fitheight, fitup, flanges, grabs, effectors
        }

        return {
            warning,
            loaderslist,
            draganddrop,
            reload: reload
        };


})();
