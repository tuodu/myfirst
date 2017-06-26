/**
 * 页面核心函数
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 28/09/2016 7:43 PM
 */
var PageUtils = {

    /**
     * 获取数据字典后构建页面下拉框
     *
     * 参数样例格式: data, formid1, formid2, ...
     *
     * 下拉框需设置属性
     * data-dict: 标记对应的数据字典项
     * data-role: 取值 edit, 如果是 edit 则排除下拉框[全部]选项, 如果不存在该属性(搜索查询功能)则添加全部选项。
     */
    buildSelect: function () {
        var args = Array.prototype.slice.call(arguments);
        var data = {};
        var fArrays = [];
        for (var i = 0; i < args.length; i++) {
            if (typeof(args[i]) == "object") {
                data = args[i];
                continue;
            }
            fArrays.push(args[i]);
        }
        for (var j = 0; j < fArrays.length; j++) {
            var f = $("#" + fArrays[j]);
            f.find("select").each(function (i, e) {
                var dict = e.dataset["dict"];
                if (typeof(dict) != "undefined") {
                    var role = e.dataset["role"];
                    var d = data[dict];
                    // 先清空下拉框选项
                    $(e).empty();
                    if (!role) {
                        $(e).append("<option value=''>全部</option>");
                    }
                    for (var k = 0; k < d.length; k++) {
                        $(e).append("<option value='" + d[k]["itemValue"] + "'> " + d[k]["itemDesc"] + "</option>");
                    }
                }
            });
        }
    },

    /**
     * 表单元素重置
     *
     * @param formId
     */
    formReset: function (formId) {
        $("#" + formId).find("input,select").each(function () {
            var reset = $(this).attr("data-reset");
            if (typeof(reset) == "undefined" || reset != "false") {
                $(this).val("");
            }
        });
    },

    /**
     * 表单元素填充
     *
     * @param data
     * @param formId
     * @param role
     */
    fillForm: function (data, formId, role) {
        var form = $("#" + formId);
        form.find("input,select").each(function (i, e) {
            var name = $(e).attr("name");
            var strs = name.split(".");
            var v = data;
            for (var j = 0; j < strs.length; j++) {
                v = v[strs[j]];
            }
            $(e).val(v);
            var d = e.dataset["disabled"];
            if (d) {
                $(e).attr("disabled", d);
            } else {
                $(e).removeAttr("disabled");
            }
        });
        form.attr("data-role", role);
    },

    /**
     * 新增时表单元素值清空
     *
     * @param formId
     * @param role
     */
    clearForm: function (formId, role) {
        var form = $("#" + formId);
        form.find("input,select").each(function (i, e) {
            var defaultVal = $(e).attr("data-default");
            if (typeof(defaultVal) !== "undefined" && defaultVal !== "") {
                $(e).val(defaultVal);
            } else {
                $(e).val("");
            }
            $(e).removeAttr(e.dataset["disabled"]);
            $(e).removeClass("error");
            $(e).removeAttr("disabled");
        });
        form.attr("data-role", role);
        form.find("label[class=error]").css("display", "none");
    },

    /**
     * ajax 请求处理
     *
     * @param url
     * @param data
     * @param method
     * @param sFunc
     */
    ajaxHandle: function (url, data, method, sFunc) {
        var ajaxSet = {
            url: url,
            dataType: "json",
            data: data,
            type: method,
            success: function (result) {
                sFunc(result);
            },
            error: function (jqXHR) {
                console.error(jqXHR);
                PagePrompts.fail(jqXHR.status);
            }
        };
        $.ajax(ajaxSet);
    },

    /**
     * ajax 同步表单提交
     *
     * @param url
     * @param data
     * @param method
     * @param sFunc
     */
    ajaxSyncHandle: function (url, data, method, sFunc) {
        var ajaxSet = {
            url: url,
            dataType: "json",
            type: method,
            async: false,
            data: data,
            success: function (result) {
                sFunc(result);
            },
            error: function (jqXHR) {
                PagePrompts.fail(jqXHR.status);
            }
        };
        $.ajax(ajaxSet);
    },

    /**
     * 构建提交参数
     *
     * @param formId
     */
    buildSubmitData: function (formId) {
        var data = {};
        $("#" + formId).find("input,select").each(function () {
            var name = $(this).attr("name");
            if (typeof(name) !== "undefined" && name !== "") {
                data[name] = $(this).val();
            }
        });
        return data;
    },

    /**
     * 构建查询请求参数
     *
     * @param d
     * @param f
     *
     * 其他参数为查询条件所对应的插件列的序号
     */
    buildSearchData: function (d, f) {
        var data = {};
        $("#" + f).find("input,select").each(function () {
            var name = $(this).attr("id");
            if (typeof(name) !== "undefined" && name !== "") {
                data[name] = $(this).val();
            }
        });
        data["draw"] = d["draw"];
        data["currentPage"] = (d["start"] + d["length"]) / d["length"];
        data["pageSize"] = d["length"];
        return data;
    },

    /**
     * 构建查询请求参数 form序列化数组
     *
     * @param d
     * @param f 序列化数组
     *
     * 其他参数为查询条件所对应的插件列的序号
     */
    buildSearchForm: function (d, f) {
        var data = {};
        $.each(f, function (i, field) {
            data[field.name] = field.value;
        });
        data["draw"] = d["draw"];
        data["currentPage"] = (d["start"] + d["length"]) / d["length"];
        data["pageSize"] = d["length"];
        return data;
    },

    /**
     * 构建 validate
     *
     * @param formId 表单 id
     */
    buildValidateRules: function (formId) {
        var valids = {};
        var rules = {};
        var messages = {};
        $("#" + formId).find("input,select").each(function () {
            var name = $(this).attr("name");
            var dataRule = $(this).attr("data-rules");
            var key = [];
            if (typeof(dataRule) !== "undefined") {
                var ruleSplit = dataRule.split(";");
                var obj = [];
                $.each(ruleSplit, function (n, value) {
                    var val = '"' + value.substring(0, value.indexOf(":")) + '":'
                        + value.substring(value.indexOf(":") + 1, value.length);
                    key.push(value.substring(0, value.indexOf(":")));
                    if (val.indexOf("[") !== -1) {
                        val = val.replace("[", '"');
                    }
                    if (val.indexOf("]") !== -1) {
                        val = val.replace("]", '"');
                    }
                    obj.push(val);
                });
                var obj2 = "{" + obj + "}";
                rules[name] = $.parseJSON(obj2);
            }
            var dataMsg = $(this).attr("data-msgs");
            if (typeof(dataMsg) !== "undefined") {
                var msgSplit = dataMsg.split(";");
                $.each(msgSplit, function (n, value) {
                    var obj = [];
                    $.each(msgSplit, function (n, value) {
                        obj.push('"' + key[n] + '":"' + value + '"');
                    });
                    var obj2 = "{" + obj + "}";
                    messages[name] = $.parseJSON(obj2);
                });
            }
        });
        valids["rules"] = rules;
        valids["messages"] = messages;
        return valids;
    },

    /**
     * 滚动到顶部
     */
    scrollToTop: function () {
        $(window.parent.document).find("html,body").animate({scrollTop: 0}, 'slow');
    },

    /**
     * 字符截断
     * @param num 保留字数
     */
    stringCut: function (str, num) {
        if (str.length > num) {
            str = str.substr(0, num) + "...";
        }
        return str;
    },

    /**
     * 生成 UUID
     *
     * @returns {string}
     * @constructor
     */
    generateUUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }
};

function nonNull(val) {
    return !(typeof(val) === "undefined" || val === "" || val === null);
}

$(".main-content").css("min-height", window.innerHeight);

