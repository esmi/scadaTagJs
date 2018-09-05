
class Scada extends ScadaTags{

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

    beforeDisplay(data) {
    }
}
