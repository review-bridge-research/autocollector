var autocollectorAPI = (function(){
    var postRequest = new Object();
    var urlRequest = null;
    var parameters = {
        'url': 'https://rs.deintest.com/api/order',
        'orderId': null,
        'buyerEmail': null,
        'deliveryDate': null,
        'token': null,
        'products': new Array()
    } ;

    /**
     *
     * @param options
     */
    var send = function(options, callback){
        setOptions(options);

        buildRequest();

        bridge.axios.post(urlRequest, postRequest)
            .then(function (response) {
                if(typeof callback === "function"){
                    callback('success', response.data);
                }
            })
            .catch(function (error) {
                if(typeof callback === "function"){
                    callback('error', {
                        status: error.response.status,
                        message: error.message,
                        data: error.response.data
                    });
                }
                // if(res instanceof Error) {
                //     console.log('********************************************');
                //     console.log(res.message);
                //     return false;
                // } else {
                //     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                //     console.log(res.data);
                //     return true;
                // }
            });
    };

    /**
     *
     */
    var buildRequest = function(){
        urlRequest = parameters.url + '?token=' + parameters.token ;
        postRequest = {
            "memberServiceRequest": {
                "merchant": {
                    "orderId": parameters.orderId ,
                    "serviceRequests": {
                        "autoCollection": {
                            "buyerEmail": parameters.buyerEmail ,
                            "deliveryDate": parameters.deliveryDate ,
                            "products": parameters.products
                        }
                    },
                    "channel": "autocollection"
                }
            }
        };
        return true;
    };

    /**
     *
     */
    var setOptions = function(options){

        if (typeof options !== "object") {
            throw new SyntaxError("Invalid data format");
        }

        for (key in parameters){

            if(key === 'url' && options.hasOwnProperty(key)){
                // valid url
                if(!_validUrl(options.url)) _invalidParameter(key);
                parameters[key] = options.url ;
                continue;
            } else if(key === 'url'){
                continue;
            }

            if(options.hasOwnProperty(key)){
                // valid email
                if(key === 'buyerEmail' && !_validEmail(options.buyerEmail)){
                    _invalidParameter(key);
                }

                // valid date
                if(key === 'deliveryDate' && !_validDate(options.deliveryDate)){
                    _invalidParameter(key);
                }


                if(key === 'products'){
                    setProducts(options.products);
                    continue;
                }


                parameters[key] = options[key] ;
            } else {
                throw new SyntaxError("Missing parameter: " + key);
            }
        }

        return true;
    };

    /**
     *
     */
    var _invalidParameter = function(nameOptions){
        throw new SyntaxError("Invalid parameter: " + nameOptions);
    };

    /**
     *
     */
    var _validUrl = function(url){
        var reg = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i ;
        return reg.test(url);
    };

    /**
     *
     */
    var _validDate = function(date){
        var _splitDate = date.split(" ");

        var arrD = _splitDate[0].split("-").map(function(i){ return parseInt(i, 10); });
        var arrT = _splitDate[1].split(":") ;

        if(arrD.length !== 3 || arrT.length !== 3) {
            return false;
        }

        var _date = new Date(arrD[0], arrD[1], arrD[2], arrT[0], arrT[1], arrT[2] );

        if ((_date.getFullYear() == arrD[0]) && (_date.getMonth() == arrD[1]) && (_date.getDate() == arrD[2])
            &&
            (_date.getHours() == arrT[0] && _date.getMinutes() == arrT[1] && _date.getSeconds() == arrT[2])
        ) {
            return true;
        }

        return false;
    };

    /**
     *
     */
    var _validEmail = function(email){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(email) ;
    };

    /**
     *
     * @param products
     */
    var setProducts = function(products){
        if (typeof products !== "object" || products.length === 0 ) {
            throw new SyntaxError("Invalid data format for products");
        }

        for (key in products){
            if( products[key].hasOwnProperty('ean')){
                parameters.products.push({ 'ean': products[key].ean });
            } else {
                throw new SyntaxError("Not found EAN for products " + key);
            }
        }

    };



    return {
        send: send
    }

})();

module.exports = autocollectorAPI;