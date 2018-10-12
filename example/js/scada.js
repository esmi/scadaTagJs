
class scada extends ScadaTags{

    constructor(params) {

        super();
        RunAjax.call(this); // call js/RunAjax.js

        this.opts = params;
        this.params = params;
    }

    createElement( e ){
        e['text-align'] = 'right';
        this.appendEl( e, "", 0, 0, 0) // call parent's appendElement()
    }

    displayElement( selr, e ) {
        $(selr).val(
            Number(e.value == null ?
                0 : (Number(e.value))).toFixed(1) + (typeof e.unit != "undefined" ? e.unit : "")
        );
    }
    //optional function.
    afterCreateElement() {
        //example of afterCreateElement():
        console.log("run afterCreateElement(), define this funtion is optional!")
        // var e = {id: "tableDiv", left: 932, top: 462, height: "420", width: "500", position: "absolute", color : "red", backgound : "black" }
        // var el = '<div id="' + e.id + " />";
        //
        // $(this.div).append(el)
        // var selr = "#tableDiv"
        //
        // if ( e.position != undefined )	$(selr).css( "position", e.position);
        // if ( e.top != undefined ) 		$(selr).css( "top",  Number(e.top));
        // if ( e.left != undefined ) 		$(selr).css( "left", Number(e.left));
        // if ( e.height != undefined )	$(selr).css( "height",e.height);
        // if ( e.width != undefined )		$(selr).css( "width", Number(e.width));
        // if ( e.border != undefined )	$(selr).css( "border", e.border);
        // if ( e.color != undefined) 		$(selr).css( "color", e.color);
        // if ( e.background != undefined) $(selr).css( "background", e.background);
        //
        // var el = '<table id="tableGrid" name="tableGrid"/>';
        // $("#tableDiv").append(el);
        //
        this.showTable()
        // this.timerShowTableCreate = setInterval(this.showTable.bind(this), this.params.time.showTable)  // this timer will stop on this.create()
    }
    showTable() {
        console.log("'showTable()' is call by afterCreateElement()")
    //     var selr = "#tableGrid"
    //     $(selr).datagrid({
    //         method: "get",
    //         url: "savePwrRun.php?method=get_realtime_alarm2",
    //         columns:[[
    //             {field:'starttime',title:'發生時間',width:'40%'},
    //             //{field:'equip_no',title:'設備編號',width:100},
    //             {field:'equip_name',title:'設備',width:'60%',align:'left'},
    //             //{field:'msg',title:'狀態',width:100,align:'right'}
    //         ]]
    //     });
    }

    beforeDisplay(data) {
    }
}
