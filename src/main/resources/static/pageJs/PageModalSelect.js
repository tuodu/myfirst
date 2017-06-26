/**
 * 页面弹出层公共模块引入
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 14/12/2016 2:07 PM
 */
var PageModalSelect = {

    modal: function (opt) {
        var _opt = {
            modalName: "",
            selectBtns: [],
            formAction: "",
            selectMode: "single",
            setVals: {}, // 表单元素 {id:[id:填值字段名]}
            isRebuildSelect: true, // 是否重置枚举下拉框
            confirmAfter: null
        };
        if (typeof opt != 'function' && opt != "") {
            $.extend(_opt, opt);
        }
        if (_opt.modalName == "") {
            return;
        } else {
            _opt.divId = _opt.modalName + "Div";
            _opt.datatableId = _opt.modalName + "Datatable";
            _opt.formId = _opt.modalName + "Form";
            _opt.confirmId = _opt.modalName + "ConfirmBtn";
            _opt.closeId = _opt.modalName + "CloseBtn";
        }

        // 设置 form 的 action
        if (_opt.formAction != "") {
            $("#" + _opt.formId).attr("action", _opt.formAction);
        }
        $("#" + _opt.datatableId).attr("data-select", _opt.selectMode);

        // 加载数据
        var dataTable = null;
        if (_opt.selectBtns.length > 0) {
            for (var i = 0; i < _opt.selectBtns.length; i++) {
                var btnId = _opt.selectBtns[i];
                $("#" + btnId).click(function () {
                    $("#" + _opt.divId).show();
                    $("#" + _opt.confirmId).attr("data-role", $(this).attr("id"));
                    if (dataTable) {
                        dataTable.draw();
                    } else {
                        dataTable = $("#" + _opt.datatableId).DataTable(dtPageInit({
                            searchFormId: _opt.formId,
                            dataTableId: _opt.datatableId,
                            isRebuildSelect: _opt.isRebuildSelect
                        }));
                    }
                    dataTable.columns.adjust();

                    PageUtils.scrollToTop();
                });
            }
        }

        // 确认选择产品
        $("#" + _opt.confirmId).click(function () {
            var closeBtn = $("#" + _opt.closeId);
            var selectMode = $("#" + _opt.datatableId).attr("data-select");
            if (selectMode == "multi") {
                var datas = dataTable.rows(".selected").data();
                if (_opt.confirmAfter != null && $.isFunction(_opt.confirmAfter)) {
                    _opt.confirmAfter(datas);
                }
                closeBtn.click();
                return;
            }
            var data = dataTable.row(".selected").data();
            var role = $(this).attr("data-role");
            if (!data || data.length == 0) {
                // 关闭选择产品弹出窗
                closeBtn.click();
                return;
            }
            var k = "";
            var v = "";
            var vals = _opt.setVals[role];
            for (var i = 0; i < vals.length; i++) {
                k = vals[i];
                v = k.split(":");
                $("#" + v[0]).val(data[v[1]]);
            }
            closeBtn.click();
        });

        // 查询 和 重置 按钮
        var searchBtn = $("button[data-btn='" + _opt.modalName + "Search']");
        var resetBtn = $("button[data-btn='" + _opt.modalName + "Reset']");
        if (typeof (searchBtn) != 'undefined') {
            searchBtn.click(function () {
                dataTable.draw();
            });
        }
        if (typeof (resetBtn) != 'undefined') {
            resetBtn.click(function () {
                PageUtils.formReset(_opt.formId);
            });
        }
    }
};
