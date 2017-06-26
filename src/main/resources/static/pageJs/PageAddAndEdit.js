/**
 * 新增和修改操作
 *
 * @type {{add: AddAndEdit.add, edit: AddAndEdit.edit}}
 */
var AddAndEdit = {

    /**
     * 新增
     *
     * @param params
     */
    add: function (params) {
        // 参数
        var validator = params.validator;
        var formId = params.formId;
        var title = "新增" + params.title;
        var form = $("#" + formId);
        form.find("div[data-display]").each(function () {
            if ($(this).attr("data-display") === "add") {
                $(this).hide();
            } else {
                $(this).show();
            }
        });

        // 清空表单元素值
        PageUtils.clearForm(formId, "add");
        form.find("h4:first").text(title);
        if (validator.numberOfInvalids() > 0) {
            // 重置表单验证
            validator.resetForm();
        }
    },

    /**
     * 修改
     *
     * @param params
     */
    edit: function (params) {
        // 参数
        var validator = params.validator;
        var formId = params.formId;
        var searchUrl = params.searchUrl;
        var title = "修改" + params.title;
        var searchId = params.searchId;
        var searchParam = params.searchParam;

        var data = $("#searchDatatable").DataTable().row(".selected").data();
        var searchParams = searchId.split(",");
        var paramId = data[searchParams[0]];
        var ajaxParam = {};
        if (searchParams.length > 1) {
            for (var i = 1; i < searchParams.length; i++) {
                ajaxParam[searchParams[i]] = data[searchParams[i]];
            }
        }
        if (typeof(searchParam) !== "undefined" && searchParam !== "") {
            searchParams = searchParam.split(",");
            if (searchParams.length > 0) {
                for (var j = 0; j < searchParams.length; j++) {
                    ajaxParam[searchParams[j]] = $("#" + searchParams[j]).val();
                }
            }
        }

        var url = searchUrl + paramId;
        var form = $("#" + formId);
        form.find("div[data-display]").each(function () {
            if ($(this).attr("data-display") === "edit") {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
        form.find("[name='" + searchId + "']").val(paramId);
        PageUtils.ajaxHandle(url, ajaxParam, "POST", function (data) {
            // 填充表单
            PageUtils.fillForm(data["result"], formId, "modify");
        });
        form.find("h4:first").text(title);
        if (validator.numberOfInvalids() > 0) {
            // 重置表单验证
            validator.resetForm();
        }
    }
};

function formValidate(formId) {
    var valids = PageUtils.buildValidateRules(formId);
    var form = $("#" + formId);
    return form.validate({
        rules: valids["rules"],
        messages: valids["messages"],
        submitHandler: function () {
            var postData = PageUtils.buildSubmitData(formId);
            var url = form.attr("action") + form.attr("data-role");
            PageUtils.ajaxHandle(url, postData, "POST", function (data) {
                if (data["code"] === "200") {
                    form.find("button[data-btn=close]").click();
                    $("#searchDatatable").DataTable().draw(false);
                    PagePrompts.success(form.find("h4:first").text() + "成功");
                } else {
                    PagePrompts.fail(data["msg"]);
                }
            })
        }
    });
}

(function () {
    $.fn.extend({
        formAddAndEdit: function (opt) {
            var _opt = {
                "title": "",
                "searchUrl": "",
                "searchId": "",
                "searchFormId": "",
                "searchParam": ""
            };
            $.extend(_opt, opt);
            var formId = $(this).attr("id");
            _opt["formId"] = formId;
            _opt["validator"] = formValidate(formId);
            var searchForm = $("#" + _opt.searchFormId);
            searchForm.find("a[data-btn=add]").click(function () {
                AddAndEdit.add(_opt);
            });
            searchForm.find("a[data-btn=edit]").click(function () {
                AddAndEdit.edit(_opt);
            });
        }
    })
})(jQuery);