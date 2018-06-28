var app = (function () {

    var axios = require('axios');
    var apicl = require('./apicl.js');

    return {
        axios : axios,
        APIac : apicl
    }

})();

module.exports = app;


/*axios.post('https://rs.deintest.com/api/order?token=NTZiMDZiZjQ1YjhjNGRlMTIxNDQwZDM5e31rM256ZXI0dHc1NjFkeDdjbGJhMmlnOHE=',
    {
        "memberServiceRequest": {
            "merchant": {
                "orderId": "12346666",
                "serviceRequests": {
                    "autoCollection": {
                        "buyerEmail": "andkorol@gmail.com",
                        "deliveryDate": "2018-01-23 13:23:03",
                        "products": [
                            {
                                "ean": "7311271539223"
                            },
                            {
                                "ean": "8806086676137"
                            }
                        ]
                    }
                },
                "channel": "autocollection"
            }
        }
    });*/


//
// class AutoCollectorAPI{
//
//     constructor(parametrs) {
//         this.setOptions(parametrs) ;
//     }
//
//     setOptions(parametrs){
//         let _default = [ 'url', 'orderId', 'buyerEmail', 'deliveryDate', 'token' ] ;
//         this.options = {
//             'url': '',
//             'orderId': '',
//             'buyerEmail': '',
//             'deliveryDate': '',
//             'token': '' };
//
//         // fo ( var [key, value] of _default ) {
//         //     // if(parametrs[item] !== undefined){
//         //     //     // this.options[item] = parametrs[item];
//         //     //     // console.log(this.options.url);
//         //     // }
//         //
//         // });
//     }
//
//     getOptions(){
//         console.log(this.options);
//     }
// }
//
//
//
// let APIac = new AutoCollectorAPI({
//     url: "test",
//     orderId : "12346666",
//     buyerEmail : "andkorol@gmail.com",
//     deliveryDate : "2018-01-23 13:23:03",
//     products : [
//         {
//             "ean": "7311271539223"
//         },
//         {
//             "ean": "8806086676137"
//         }
//     ],
//     token : "NTZiMDZiZjQ1YjhjNGRlMTIxNDQwZDM5e31rM256ZXI0dHc1NjFkeDdjbGJhMmlnOHE="
// }) ;
//
// APIac.getOptions();
//
