var RunAjax = function() {

    this.runajax = function(url, data, datatype, httptype) {

        if (typeof datatype === "undefined" )
            datatype = "json";
        if (typeof httptype === "undefined")
            httptype = "POST";

        return $.ajax({
            'type': httptype,
            'global': false,
            'dataType': datatype,
            'url': url,
            'data': data
        });
    }
}
