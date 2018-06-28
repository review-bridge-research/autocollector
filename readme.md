# Autocollector JS plugin
```html
<script src="apiac.min.js"></script>
<script type="text/javascript">
bridge.APIac.send({
    'url': 'https://rs.deintest.com/api/order',
    "token": "GURTYUWERTWERGSDFG#$%^WERGSDFDFHDFGH3456345DFGHDFGH3456DFGHDFGH=",
    "orderId": "12346666",
    "buyerEmail": "autocollector@example.test",
    "deliveryDate": "2018-02-23 13:23:03",
    "products": [
        {
            "ean": "7311271539223"
        },
        {
            "ean": "8806086676137"
        }
    ]
}, function (status, data) {
    console.log(status);
    console.log(data);
});
</script>
```

\* required parameter  

**url** (string) *URL format* - optionally, to which URL the request is sent, by default the URL specified in the plugin is taken  
**token*** (string) *BASE 64 Encode* - a token for your store  
**orderId*** (string) - Unique identifier in your store for ordering  
**buyerEmail*** (string) *email format* - buyer email  
**deliveryDate*** (date) *yyyy-mm-dd hh:ii:ss* - date of order  
**products*** (array, object) *[ { "ean": xxxxxxxxxxxxxxx }, ]* - list of products in the order. "ean" - product identifier  


The plugin makes the request asynchronously. You can process the query result in the callback.  
**status** - how did the request end. Returned values are "error", "success"  
**data** - contains the data that the query returns  
Before sending a request, validation is done. If the parameters are missing or in the wrong format, the plug-in gives an error and does not send the request.