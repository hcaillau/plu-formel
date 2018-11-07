const request = require('request');
const showdown = require('showdown');

var getHtmlRuleAbstract = function (ruleName) {
    const rulesEncode = {
        'B1_T_BANDE': '000', 'B1_BANDE': '000',
        'B1_ART_71': '002', 'B1_ART_6': '001',
        'B1_ART_72': '002', 'B1_ART_73': '003', 'B1_ART_74': '004',
        'B1_ART_8': '005', 'B1_ART_9': '006', 'B1_ART_10': '007',
        'B1_ART_13': '008', 'B1_ART_5': '009', 'B1_ART_14': '010'
    };
    var url = 'https://raw.githubusercontent.com/hcaillau/plu-formel/master/registry/IAUIDF-'
        + rulesEncode[ruleName] + '.md';
    return new Promise(function (resolve, reject) {
        request(
            {
                method: 'GET',
                uri: url
            },
            function (error, response, body) {
                if (error) {
                    reject(error);
                }
                try {
                    var md = body;
                    converter = new showdown.Converter();
                    html = converter.makeHtml(md);
                    resolve(html);
                } catch (err) {
                    reject("Fail to get template " + number);
                }
            }
        );
    });
}

module.exports = getHtmlRuleAbstract;