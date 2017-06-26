/**
 * 数据格式化
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 28/10/2016 3:25 PM
 */
var PageFormat = {

    /**
     * 日期格式化
     *
     * @param date
     * @param format
     * @returns {void|*|XML|string|{by}}
     */
    formatDate: function (date, format) {
        var paddNum = function (num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        };
        //指定格式字符
        var cfg = {
            yyyy: date.getFullYear() //年 : 4位
            , yy: date.getFullYear().toString().substring(2)//年 : 2位
            , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
            , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
            , d: date.getDate()   //日 : 如果1位的时候不补0
            , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
            , HH: paddNum(date.getHours())  //时 : 如果1位的时候补0
            , mm: paddNum(date.getMinutes()) //分 : 如果1位的时候补0
            , ss: paddNum(date.getSeconds()) //秒 : 如果1位的时候补0
        };
        format || (format = "yyyy-MM-dd HH:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            return cfg[m];
        });
    },

    /**
     * 货币格式化
     *
     * @param d 金额数字
     * @param s 货币符合 [默认为人民币符号]
     * @param n 小数位数 [默认为 2]
     * @returns {string}
     */
    formatCurrency: function (d, s, n) {
        var expr = d,
            roundToDecimalPlace = 2,
            groupDigits = true,
            digitGroupSymbol = ',',
            symbol = '¥',
            minimumDecimalPlaces = 9,
            removeTrailingZerosOnDecimal = false,
            positiveFormat = '%s %n',
            negativeFormat = '%s -%n',
            decimalSymbol = '.';

       expr = expr / 100;


        if (n && n > 0) {
            roundToDecimalPlace = n;
        }
        if (s) {
            symbol = s;
        } else if (s == "") {
            symbol = ""
        }
        var isPositive = (expr == Math.abs(expr));
        // evalutate number input
        var numParts = String(expr).split('.');
        var hasDecimals = (numParts.length > 1 && roundToDecimalPlace > -2);
        var decimals = (hasDecimals ? numParts[1].toString() : '0');

        // format number
        expr = Math.abs(numParts[0]);
        expr = isNaN(expr) ? 0 : expr;
        if (roundToDecimalPlace >= 0) {
            // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
            decimals = parseFloat('1.' + decimals);
            decimals = decimals.toFixed(roundToDecimalPlace); // round
            if (decimals.substring(0, 1) == '2') {
                expr = Number(expr) + 1;
            }
            decimals = decimals.substring(2); // remove "0."
        }
        expr = String(expr);

        if (groupDigits) {
            for (var i = 0; i < Math.floor((expr.length - (1 + i)) / 3); i++) {
                expr = expr.substring(0, expr.length - (4 * i + 3)) + digitGroupSymbol
                    + expr.substring(expr.length - (4 * i + 3));
            }
        }

        if ((hasDecimals && roundToDecimalPlace == -1) || roundToDecimalPlace > 0) {
            if (removeTrailingZerosOnDecimal) {
                decimals = decimals.replace(/0+$/, '');
                if (decimals.length < minimumDecimalPlaces) decimals = String(decimals
                    + new Array(minimumDecimalPlaces + 1).join('0')).slice(0, minimumDecimalPlaces);
            }
            expr += (decimals.length > 0 ? decimalSymbol + decimals : "");
        }

        // format symbol/negative
        var money = isPositive ? positiveFormat : negativeFormat;
        money = money.replace(/%s/g, symbol);

        return money.replace(/%n/g, expr);
    }
};