var serutityMap = {};
//安全控件
function initEditPlus(serverRandom) {
    $(document.body).append("<input type='hidden' name='serverRandom' id='serverRandom' value='" + serverRandom + "'>");

    //获取密码控件初始化内容
    var html = securityHtml(serverRandom);
    //循环初始化
    $(".password-security").each(function () {
        var id = $(this).attr("passwordId");
        $("#" + id).attr("autocomplete", "off");
        $("#" + id).val("");
        $("#" + id).show();
        $("#" + id).live("cut copy paste", function (e) {
            e.preventDefault();
        });
        //非IE、MAC电脑
        if (html == "PC") {
            $("#" + id).show();
            //说明是chrome浏览器
            var securityInput = new CFCASIPInput(id, 0);   //0-系统物理键盘
            securityInput.setServerRandom(id, serverRandom);
            securityInput.setCipherType(id, "0");   //0-rsa加密算法  1-sm2加密算法
            securityInput.setOutputType(id, 2);     //2-原文加密 1-哈希加密
            securityInput.setMaxLength(id, 50);
            securityInput.setMinLength(id, 1);
            serutityMap[id] = securityInput;
            return true;
        }

        //手机客户端
        /*if (html == "Mobile") {
            $("#" + id).show();
            var divId = id + "_DIV";
            $("#" + id).attr("readonly", true);
            $(document.body).append("<div id='" + divId + "'></div>");
            //说明是chrome浏览器
             var cfcaKeyBoard = new CFCAKeyboard(divId, 0);
            cfcaKeyBoard.bindInputBox(id);
            cfcaKeyBoard.hideKeyboard();
            cfcaKeyBoard.setServerRandom(serverRandom, id);
            cfcaKeyBoard.setCipherType(0, id);
            cfcaKeyBoard.setOutputType(2, id);
            cfcaKeyBoard.setMaxLength(50, id);
            cfcaKeyBoard.setMinLength(1, id);
            serutityMap[id] = cfcaKeyBoard;
            $("#" + id).focus(function () {
                serutityMap[id].showKeyboard();
            });
            $("#" + id).blur(function () {
                serutityMap[id].hideKeyboard();
            });
            return true;
        }*/

        //IE 或MAC电脑
        if (html) {
            $("#" + id).hide();
            $(this).append(html.replace("id=\"SecEditBox\"", "id=\"" + id + "EditBox\""));
            return true;
        }

    });
    window.setTimeout("checkInstall()", 1000);
}

/**
 * 获取密码控件初始化html初始化内容
 * @returns {string}
 */
function securityHtml(serverRandom) {
    var html = "";
    if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
       if (window.navigator.cpuClass == "x86") {
            html = ("<object id=\"SecEditBox\" codebase=\"SecEditCtl.Baofoo.x86.cab\" classid=\"clsid:618E30EF-2EA1-4BFB-BB46-0673CCD62885\" width=\"281\" height=\"37\"><param name=\"MinLength\" value=\"4\"/><param name=\"MaxLength\" value=\"50\"/><param name=\"CapsLockTip\" value=\"0\"><param name=\"BorderWidth\" value=\"1\"><param name=\"BorderColor\" value=\"#CCEEFF|#FF0\"><param name=\"IntensityRegExp\" value=\"(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)\"/><param name=\"RestrictRegExp\" value=\"([!-~]+)\"><param name=\"ServerRandom\" value=\"" + serverRandom + "\"/></object>");
       }
        else {
            html = ("<object id=\"SecEditBox\" codebase=\"SecEditCtl.Baofoo.x64.cab\" classid=\"clsid:6215B29D-8FE7-4C01-802F-202078F51CEB\" width=\"281\" height=\"37\"><param name=\"MinLength\" value=\"4\"/><param name=\"MaxLength\" value=\"50\"/><param name=\"CapsLockTip\" value=\"0\"><param name=\"BorderWidth\" value=\"1\"><param name=\"BorderColor\" value=\"#CCEEFF|#FF0\"><param name=\"IntensityRegExp\" value=\"(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)\"/><param name=\"RestrictRegExp\" value=\"([!-~]+)\"><param name=\"ServerRandom\" value=\"" + serverRandom + "\"/></object>");
       }
    } else if (navigator.userAgent.indexOf("Macintosh") >= 0 && navigator.userAgent.indexOf("Version/") >= 1) {
        html = ("<object id=\"SecEditBox\" type=\"application/npSecEditCtl.MAC.SHBFPay\" width=\"281\" height=\"37\"><param name=\"OutputValueType\" value=\"1\"/><param name=\"CipherType\" value=\"0\"><param name=\"MaxLength\" value=\"50\"/><param name=\"IntensityRegExp\" value=\"(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)\"/><param name=\"ServerRandom\" value=\"" + serverRandom + "\"/></object>");
    }
   /* else if (navigator.appVersion.indexOf("Mobile") >= 0) {
     html = "Mobile";
     } */
    else {
        html = "PC";
    }
    return html;
}

/**
 * 验证是否已经安装了密码控件
 */
function checkInstall() {
    $(".password-security").each(function () {
        try {
            var id = $(this).attr("passwordId");
            var version = getBaofooEditVersion(id);
            clearEdit(id);
        } catch (e) {
            if (navigator.userAgent.indexOf("Macintosh") >= 1 && navigator.userAgent.indexOf("Version/") >= 1) {
                $(this).html('<a href="/security/npSecEditCtl.MAC.SHBFPay.pkg" target="_blank" style="color: #555555;font-size:17px; margin-left: 9px;margin-top: 5px;position: inherit;" title="为确保帐号安全，请立即安装">安装安全控件</a>');
            }else if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
                $(this).html('<a href="/security/SecEditCtlBaofooAllSetup.exe" target="_blank" style="color: #555555;font-size:17px; margin-left: 9px;margin-top: 5px;position: inherit;" title="为确保帐号安全，请立即安装">安装安全控件</a>');
            }
            //throw e;
        }
    });
}


/**
 * 获取密码控件版本号
 * @param id
 * @returns {*}
 */
function getBaofooEditVersion(id) {
   if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0 ||
        (navigator.userAgent.indexOf("Macintosh") >= 0 && navigator.userAgent.indexOf("Version/") >= 1)) {
        return document.getElementById(id + "EditBox").GetVersion();
    }
   /*else if (navigator.appVersion.indexOf("Mobile") >= 0) {
        return getCFCAKeyboardVersion();
    }*/
   else {
        return getCFCASIPInputVersion();
    }
}

/**
 * 获取密码控件内容
 * @param id
 */
function getBaofooEditContent(id) {

    //服务器产生的随机数
    var serverRandom = $("#serverRandom").val();
    //获得安全控件输入密码加密结果
    var encryptedPassword = "";
    //获得客户端随机数值
    var clientRandom = "";
    try {
        if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0 ||
            (navigator.userAgent.indexOf("Macintosh") >= 0 && navigator.userAgent.indexOf("Version/") >= 1)) {
            var obj = document.getElementById(id + "EditBox");
            //获得安全控件输入密码加密结果
            encryptedPassword = obj.GetValue();
            //获得客户端随机数值
            clientRandom = obj.GetClientRandom();
        } else {
            //获得安全控件输入密码加密结果
            encryptedPassword = serutityMap[id].getEncryptedInputValue(id);
            //获得客户端随机数值
            clientRandom = serutityMap[id].getEncryptedClientRandom(id);
        }
    } catch (e) {
        return "";
    }
    return encryptedPassword + "_BAOFOO_" + clientRandom + "_BAOFOO_" + serverRandom;
}

/**
 *清除密码控件内容
 * @param id
 */
function clearEdit(id) {
    if (navigator.appVersion.indexOf("Chrome") >= 0) {
        $("#" + id).val("");
        return false;
    }
   document.getElementById(id + "EditBox").Clear();
}

/**
 * 获取密码控件内容并设置到实体控件中
 * @param securityId
 * @param passwordId
 */
function setPassword(securityId, passwordId) {
    $("#" + passwordId).val(getBaofooEditContent(securityId));
}