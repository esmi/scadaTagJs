// user class must define flowing routines:
//
// this.createElement = function ( e ){
// this.displayElement = function ( selr, e ) {}
// this.beforeDisplayData = function (data) {}
// this.getData = function() {}

//  example:

// this.createElement = function ( e ){
//
// 	e['text-align'] = 'right';
// 	this.appendElement(this.div, e, "usage", 0, 0, 0) // call parent's appendElement()
// 	this.appendElement(this.div, e, "percent", 0, 40, 0)
// }
//
// this.displayElement = function ( selr, e ) {
// 	$(selr + "usage").val(
// 		e.maxvalue == null ? 0 :
// 		(Number(e.maxvalue) - Number(e.minvalue == null ? 0 :e.minvalue))
// 	);
// 	$(selr + "percent").val(this.totalInf.percent(e));
// }
// this.beforeDisplayData = function (data) {
// }
// this.getData = function() {
// 	var method = "get_scada_w2";
// 	var data = {
// 		'method': method,
// 		'data': {
// 			'startdate' : "dstart",
// 			'enddate': "dend"
// 		}
// 	};
//  	this.dataXHR =  this.runajax( this.defaultUrl,{
// 		method: method,
// 		data: data
// 	})
// }
class ScadaTags {


    constructor() {

        if ( new.target === ScadaTags) {
            throw new Error(
            '\nUsage: This is an abstract class, you must extend ScadaTags and implement:\n' +
            'createElement(): create element on this.div,\n' +
            'displayElement(): dispaly data on this.div,\n' +
            'getDataParams(): get param of call display data,\n' +
            '   {\n' +
            '     method: "your getdata method",\n' +
            '     data:  "params of this method"\n' +
            '   }\n' +
            'beforeDisplay(): routine is called by displayData(), this could be omitted\n' +
            'Start(): entry point to call this.run(yourParam).\n'
            )
        }
        else {
            if (this.createElement === undefined) {
              // or maybe test typeof this.method === "function"
              throw new TypeError("Must implement createElemet()");
            }
            if (this.displayElement === undefined) {
              // or maybe test typeof this.method === "function"
              throw new TypeError("Must implement displayElement()");
            }
            if (this.beforeDisplay === undefined) {
              throw new TypeError("Must implement beforeDisplay()");
            }

        }
        this.name = new.target.name
        this.params = null;   // user params
        this.div = null;
        this.defaultUrl = null;

        this.dataXHR = null;
        this.timerCreate = null;
        this.timerGetData = null;
        this.timerDisplayData = null;
        this.check = {
            getDataWithDisplay: false,
            getDataMultiple: 0,
            getData: 0,
            getDataTimeout: 0,
            display: 0,
            displayFail: 0,
            displayReturn: 0
        };

    }
    setDiv (yourdiv) {
        this.div = yourdiv;
    }
    createScadaEls (data, obj, a) {
        /*  data example:
        var data = [
            { 'id':"fanx", 'position':'absolute', 'top':'132', 'left':'1119', 'height':'27', 'width':'27'},

            { 'type':'img', 'src':"images/Fan-g.gif", 'id':"fan1", 'position':'absolute', 'top':'132', 'left':'1119', 'height':'27', 'width':'27'},
            { 'type':'img', 'src':"images/Fan-g.gif", 'id':"fan2", 'position':'absolute', 'top':'132', 'left':'1119', 'height':'27', 'width':'27'},
            { 'type':'img', 'src':"images/Fan-g.gif", 'id':"fan3", 'position':'absolute', 'top':'132', 'left':'1119', 'height':'27', 'width':'27'},
            { 'type':'img', 'src':"images/Fan-g.gif", 'id':"fan4", 'position':'absolute', 'top':'132', 'left':'1119', 'height':'27', 'width':'27'}
        ]; */
        if (typeof data == "undefined")
            return;
        console.log(data);
        if (typeof data.length !== "undefined") {
            for (var i = 0; i < data.length; i++) {
                var e = data[i];
                //console.log(e)
                if ( e.type == "img") {
                    this.createElement( e, "", 0, 0, 0);
                }
                else {
                    this.createElement(e);
                }
            }
        }
        else {
            console.log("backend return data is invalid!")
        }
    }
    appendEl (e, code,x,y,w) {
        this.appendElement(this.div, e, code, x, y, w)
    }
    appendElement ( appendTarget, e, code, x, y ,w){
        // code is for element's postcode, ex: idH, H is postcode for id.
        // example e:
        // 	{ 'type':'img', 'src':"images/Fan-g.gif", 'id':"fan1", 'position':'absolute', 'top':'132', 'left':'1119', 'height':'27', 'width':'27'}
        var selr = '#' + e.id + code;

        if ( e.type == undefined) {
            var elm = '<input type="text" id="' + e.id + code +
                                 '" name="' + e.id + code +  '"' +
                                 " style='display:inline;'/>";
        }
        else if ( e.type == "input") {
            var elm = '<input type="text" id="' + e.id + code +
                                 '" name="' + e.id + code +  '"' +
                                 " style='display:inline;'/>";
        }
        else if ( e.type == "virture_tag") {
            var elm = '<img id="' + e.id  + '"' + "/>";
        }
        else if ( e.type == "virture_light") {
            var elm = '<img src="' +  e.src + '" id="' + e.id  + '"' + "/>";
        }
        else if ( e.type == "img") {
            var elm = '<img src="' +  e.src + '" id="' + e.id  + '"' + "/>";
        }
        else {
            var elm = '<input type="text" id="' + e.id + code +
                                 '" name="' + e.id + code +  '"' +
                                 " style='display:inline;'/>";
        }

        //console.log(elm);
        $(appendTarget).append(elm);

        if ( e.position != undefined )	$(selr).css( "position", e.position);
        if ( e.top != undefined ) 		$(selr).css( "top", Number(y) + Number(e.top));
        if ( e.left != undefined ) 		$(selr).css( "left", Number(x) + Number(e.left));
        if ( e.height != undefined )	$(selr).css( "height",e.height);
        if ( e.width != undefined )		$(selr).css( "width", Number(w) + Number(e.width));
        if ( e.border != undefined )	$(selr).css( "border", e.border);
        if ( e.color != undefined) 		$(selr).css( "color", e.color);
        if ( e.background != undefined) $(selr).css( "background", e.background);
        if ( e.padding != undefined) 	$(selr).css( "padding", e.padding);
        if ( e['text-align'] != undefined)	$(selr).css( 'text-align', e['text-align']);

        //console.log($(selr).css())
        var __impletement_blinker = false;
        if ( __impletement_blinker) {

            if ( e.blink != undefined )
                if ( e.blink ) {
                    blink();

                }
            function blink() {
                $(selr).fadeOut(500).fadeIn(500, blink);
            }
        }
        //fadeOut(500).fadeIn(500, blink);
        //if ( e.text\-align != undefined) 	$(selr).css( "text-align", e.text\-align);
    }
    stopBlink (selr) {
        $(selr).stop().show().fadeTo(500,1);
        $(selr).stop().show().fadeTo(500,1);
    }
    displayData () {
        var data;
        if ( this.dataXHR == null) {
            this.check.displayReturn++;
            return;
        }
        else {
            var XHR = this.dataXHR;
            if (XHR.statusText == "OK" ) {
                this.check.display++;
                data = XHR.responseJSON
            }
            else {
                //console.log( 'displayData: not display! ' + new Date())
                this.check.displayFail++;
                return;
            }
        }

        if (typeof this.beforeDisplay == "function") {
            this.beforeDisplay(data)
        }

        if (typeof data.length !== "undefined") {
            for (var i = 0; i < data.length; i++) {
                var e = data[i];
                var selr = "#" + e.id ;
                if ( e.type != "virture_tag") {
                    if ( e.type == undefined || e.type != "img") {
                        this.displayElement(selr, e);
                    }
                    else {
                        if (e.type == "img") {
                            $(selr).attr("src", e.src);
                        }
                    }
                }
            }
        }
        else {
            console.log("backend return data is invalid!")
        }
    }

    getDataParams0() {
        if (typeof this.params.getDataParams == "undefined") {
            if (this.getDataParams === undefined) {
                throw new TypeError(
`
You must implement "${this.name}.getDataParams()" on "${this.name}" class!
beause class: "${this.name}" constructor parameter not contain:
{
    ...
    getDataParams: {
        'method': "scada_u",
        'data': {
            ...
        }
    },
    ...
}
`);
            }
            else {
                return this.getDataParams()
            }
        }
        else {
            return this.params.getDataParams;
        }
    }

    getData () {
        this.dataXHR =  this.runajax( this.defaultUrl, this.getDataParams0())
        this.check.getData++
        if ( this.check.getData == Number.MAX_SAFE_INTEGER){
            this.check.getData = 0
            this.check.getDataMultiple++
        }
        if ( this.params.getDataWithDisplay == true ) {
            if (!this.timerCreate) {
                // if timerCreate is clear(ed), do displayData().
                setTimeout(function () {
                    this.displayData()
                }.bind(this), 2000);
            }
        }
    }
    create () {
        if (this.dataXHR != null) {
            var XHR = this.dataXHR;
            if (XHR.statusText == "OK" ) {

                this.check.getDataTimeout = this.params.time.getData
                this.check.getDataWithDisplay = this.params.getDataWithDisplay
                this.check.start = new Date()

                var data = XHR.responseJSON

                this.createScadaEls(data)
                this.displayData()

                clearInterval(this.timerCreate);  // clear create timer.
                this.timerCreate = 0;

                this.timerGetData = setInterval(this.getData.bind(this), this.params.time.getData)

                if ( this.params.getDataWithDisplay != true ) {
                    setTimeout(function () {
                        this.timerDisplayData = setInterval(this.displayData.bind(this), this.params.time.getData)
                    }.bind(this), 2000);
                }
            }
            // else {
            //     //console.log("XHR.statusText is not 'OK'!")
            // }
        }
    }
    time (t) {
        if (typeof t == "undefined") {
            // default time :
            return {
                create: 500,
                getData: 10000 //,
            }
        }
        else {
            return t;
        }
    }

    setImage( image ) {
        // getMeta(url){
        //     var img = new Image();
        //     img.onload = function(){
        //         alert( this.width+' '+ this.height );
        //     };
        //     img.src = url;
        // }
        var bg = document.getElementById(image.id )
        bg.onload = function(){
            //console.log( `width:${this.width},height:${this.height} `)
            bg.style.height = this.height;
            bg.style.width = this.width;
        };
        bg.src = image.src
    }
    run ( params ) {
        // params: {
        //     div: this.opts.div,
        //     image: this.opts.image,
        //     time: this.opts.time,
        //     getDataWithDisplay: true,
        //          if getDataWithDisplay is "true",  after "getData()", it will wait a "timeout time" to run displayData()
        //            if getDataWithDisplay is "false", displayData() is a "timer" routine to dispay data.
        //     defaultUrl:	this.opts.defaultUrl,
        //     none: false
        // }

        //this.params = params   // backup userParams
        this.defaultUrl = params.defaultUrl
        if (typeof params.div == "undefined") {
            alert( "param's div not setting.")
        }
        else {
            this.setDiv(params.div)
        }

        if (typeof params.image != "undefined") {
            this.setImage( params.image)
        }

        if (typeof params.time == "undefined"){
            this.params.time = this.time()
        }
        if ( typeof params.getDataWithDisplay == "undefined") {
            params.getDataWithDisplay = false
        }

        this.getData(); //call getdata for first time.

        this.timerCreate = setInterval(this.create.bind(this), this.params.time.create)  // this timer will stop on this.create()
    }

    Start () {
        this.run(this.params)
    }
}
