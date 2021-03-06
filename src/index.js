// const request = require('request');
const rp = require('request-promise');
const fetch = require('node-fetch');
const showdown = require('showdown');

var pluFormel = {
    fetchRuleAbstract: function (ruleName) {
        console.log(ruleName);
        function checkStatus(res) {
            if (res.ok) { // res.status >= 200 && res.status < 300
                return res;
            } else {
                throw MyCustomError(res.statusText);
            }
        };
        const rulesEncode = {
            'B1_T_BANDE': '000', 'B1_BANDE': '000',
            'B1_ART_71': '002', 'B1_ART_6': '001',
            'B1_ART_72': '002', 'B1_ART_73': '003', 'B1_ART_74': '004',
            'B1_ART_8': '005', 'B1_ART_9': '006', 'B1_ART_10': '007',
            'B1_ART_13': '008', 'B1_ART_5': '009', 'B1_ART_14': '010'
        };
        var url = 'https://raw.githubusercontent.com/hcaillau/plu-formel/master/registry/IAUIDF-'
            + rulesEncode[ruleName] + '.md';
         
     var options = {uri : url}
     rp(options).then(function(data) {
        var md = data;
                converter = new showdown.Converter();
                html = converter.makeHtml(md);
                return html 
        console.log(data)});


        // fetch(url)
        //     .then(checkStatus)
        //     .then(res => console.log('will not get here...'))
        //     .then(res => res.text())
        //     .then(body => console.log(body))
        //     .catch(err => console.log(err));

        // fetch(url)
        //     .then(function(data) {
        //         var md = data;
        //         converter = new showdown.Converter();
        //         html = converter.makeHtml(md);
        //         return html
        //     })
        //     .then(function(data) {
        //         console.log(data);
        //     })
        
        // return new Promise(function (resolve, reject) {
        //     request(
        //         {
        //             method: 'GET',
        //             uri: url
        //         },
        //         function (error, response, body) {
        //             if (error) {
        //                 reject(error);
        //             }
        //             try {
        //                 var md = body;
        //                 converter = new showdown.Converter();
        //                 html = converter.makeHtml(md);
        //                 resolve(html);
        //             } catch (err) {
        //                 reject("Fail to get template " + number);
        //             }
        //         }
        //     );
        // });
    },

    fillWithRuleValue : function(){

    }


}

module.exports = pluFormel;



 // .then(function(data, ruleValue){
//     self.fillWithRuleValue(data, ruleValue);
// })
// .then(function(data){
//     $("#"+targetDiv).html(data);
// })
// .catch(function(error){
//     console.error(error)
// });
// }

// RulesPLU.prototype.fillWithRuleValue = function(data, ruleValue){
// return new Promise(function (resolve, reject) {
//     try {
//         regexp = "{{"+ruleValue+"}}";
//         str = data.replace(new RegExp(regexp, 'g'), value);
//         resolve(str);
//     }catch(err){
//         reject("Fail to fill value");
//     }
// });
// }