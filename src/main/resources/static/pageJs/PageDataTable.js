/**
 * Datatable 插件
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 28/09/2016 7:43 PM
 */
var dtPageInit = function (params) {
    // 参数
    var searchFormId = params.searchFormId;
    var dataTableId = params.dataTableId;
    var selectStyle = $("#" + dataTableId).attr("data-select");
    if (!nonNull(selectStyle)) {
        selectStyle = "single";
    }
    var form = $("#" + searchFormId);
    var url = form.attr("action");

    var settings = {
        "ajax": {
            "url": url,
            "dataType": "json",
            "type": "POST",
            "data": function (table) {
                return PageUtils.buildSearchData(table, searchFormId);
            }
        },
        "scrollY": params.scrollY || "",
        "columns": params.detailTable ? buildDetailTableData(dataTableId) : buildTableData(dataTableId),
        "selectStyle": selectStyle,
        "drawCallback": function () {
            if ($.isFunction(params.drawCallback)) {
                params.drawCallback(this);
            }
        },
        "callback": function(){
            if ($.isFunction(params.callback)){
                params.callback();
            }
        },
        "initComplete": function (s, d) {
            if (!params.pageInit) {
                return;
            }
            var dt = $("#" + dataTableId);
            dt.find("tbody").on("click", "td.details-control", function () {
                var tr = $(this).closest('tr');
                var row = dt.DataTable().row(tr);
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    row.child(dtFormat(row.data())).show();
                    tr.addClass('shown');
                }
            });
            // 构建下拉框
            buildSearchSelect(d);
            setDisabled(form, true);
            // 查询按钮
            form.find("button[data-btn=search]").click(function () {
                dt.DataTable().page(0).draw("page");
                setDisabled(form, true);
            });
            // 重置按钮
            form.find("button[data-btn=reset]").click(function () {
                $("#" + searchFormId).find("input,select").each(function (i, e) {
                    var reset = e.dataset["reset"];
                    if (typeof(reset) === "undefined" || reset !== "false") {
                        $(this).val("");
                    }
                });
            });
            dt.find("tbody").on('click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    setDisabled(form, true);
                } else {
                    setDisabled(form, false);
                }
            });
        }
    };
    return setDatatable(settings);
};

/**
 * Datatable 插件 无分页
 *
 * @param params
 */
var dtWithoutPagingInit = function (params) {
    // 参数
    var dataTableId = params.dataTableId;
    var selectStyle = $("#" + dataTableId).attr("data-select");
    if (!nonNull(selectStyle)) {
        selectStyle = "single";
    }
    return {
        "ajax": params.url,
        "paging": false,
        "ordering": false,
        "scrollY": "270px",
        "scrollCollapse": true,
        "columns": buildTableData(dataTableId),
        "selectStyle": selectStyle,
        "drawCallback": function () {
            if ($.isFunction(params.drawCallback)) {
                params.drawCallback(this);
            }
        },
        "callback": function () {
            if ($.isFunction(params.callback)) {
                params.callback();
            }
        },
        "dom": "t<'row'<'col-md-12'i>>",
        "language": {
            "lengthMenu": "每页显示条数 _MENU_",
            "search": "快速筛选",
            "zeroRecords": "未找到数据",
            "info": "从 _START_ 到 _END_ 条, 总计 _TOTAL_ 条",
            "infoEmpty": "无页码",
            "infoFiltered": "(从 _MAX_ 条数据中筛选)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页"
            },
            "select": {
                "rows": " 已选中 %d 列"
            }
        },
        "select": {
            "style": selectStyle
        }
    };
};

function setDisabled(f, t) {
    f.find("a[data-disabled],button[data-disabled]").each(function (i, ele) {
        if (t) {
            $(ele).attr("disabled", "disabled");
        } else {
            $(ele).removeAttr("disabled");
        }
    })
}

function dtFormat(d) {
    var dtDiv = $("#dtDetail");
    dtDiv.find("table").find("td").each(function (i, e) {
        var field = $(e).attr("data-field");
        if (nonNull(field)) {
            var strs = field.split(".");
            var v = d;
            for (var j = 0; j < strs.length; j++) {
                v = v[strs[j]];
            }
            $(e).html(v);
        }
    });
    return dtDiv.html();
}

/**
 * 处理查询 form 中的下拉框
 */
function buildSearchSelect(d) {
    $("select[data-enum]").each(function (i, e) {
        var eName = $(e).attr("data-enum");
        var role = e.dataset["role"];
        // 先清空下拉框选项
        $(e).empty();
        if (!role) {
            $(e).append("<option value=''>全部</option>");
        }
        for (var k in d[eName]) {
            $(e).append("<option value='" + k + "'>" + d[eName][k] + "</option>");
        }
    });
}

/**
 * 构建table结果数据
 *
 * @param tableId
 */
function buildTableData(tableId) {
    var columns = [];
    $("#" + tableId).find("thead tr th").each(function (i, e) {
        columns.push(resolveVal(e));
    });
    return columns;
}

function buildDetailTableData(tableId) {
    var columns = [];
    columns.push({
        "className": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
    });
    $("#" + tableId).find("thead tr th").each(function (i, e) {
        if (i > 0) {
            columns.push(resolveVal(e));
        }
    });
    return columns;
}

var resolveVal = function (e) {
    var value = {};
    /**
     * data-field
     *
     * @type {*|jQuery}
     */
    var field = $(e).attr("data-field");
    if (nonNull(field)) {
        value.data = field;
        value.name = field;
    }
    var width = $(e).attr("width");
    if (nonNull(width)) {
        value.width = width + "px";
    }

    /**
     * data-label
     *
     * 标签样式：default/primary/success/info/warning/danger
     * @type {*|jQuery}
     */
    var label = $(e).attr("data-label");
    if (nonNull(label)) {
        var labels = label.split(";");
        var l = {};
        $.each(labels, function (n, val) {
            var key = val.substring(0, val.indexOf(":"));
            var val = val.substring(val.indexOf(":") + 1, val.length);
            l[key] = val;
        });
        var f = field.replace("Desc", "");
        value.render = function (data, type, row) {
            var d = data || "";
            var ll = "";
            if (nonNull(l[row[f]])) {
                ll = "label label-" + l[row[f]];
            } else {
                ll = "label label-warning";
            }
            return "<span class='" + ll + "'>" + d + "</span>"
        }
    }

    /**
     * data-format
     *
     * data:时间格式
     * currency:货币
     * @type {*|jQuery}
     */
    var format = $(e).attr("data-format");
    if (nonNull(format)) {
        var key = format.substring(0, format.indexOf(":"));
        var val = format.substring(format.indexOf(":") + 1, format.length);
        if (key === "date") {
            value.render = function (d) {
                if (nonNull(d)) {
                    return PageFormat.formatDate(new Date(d), val);
                } else {
                    return "";
                }
            }
        }
        if (key === "currency") {
            value.render = function (d) {
                return PageFormat.formatCurrency(d, "", 2);
            }
        }
    }

    var d_href = $(e).attr("data-href");
    if (nonNull(d_href)) {
        var key = d_href.substring(0, d_href.indexOf(":"));
        var val = d_href.substring(d_href.indexOf(":") + 1);
        var d_param = $(e).attr("data-href-param");
        value.render = function (d, a, b) {
            var param = d_param;
            var paramKey = [];
            if (nonNull(param)) {
                paramKey = param.split("&");
            } else {
                param = "";
            }
            if (paramKey.length > 1) {
                for (var i = 0; i < paramKey.length; i++) {
                    if(paramKey[i]!=null && paramKey[i]!=""){
                        param = param.replace(paramKey[i], paramKey[i] + "=" + b[paramKey[i]]);
                    }
                }
                param = "?" + param;
            }
            return "<a href='" + val + b[key] + param +"'>" + d + "</a>"
        }
    }
    return value;
};

var setDatatable = function (s) {
    var settings = {
        "processing": true,
        // "scrollX": true,
        "serverSide": true,
        "ordering": false,
        "pageLength": 10,
        "lengthMenu": [5, 10],
        // "dom": "t<'row'<'col-lg-6'l>r><'row'<'col-lg-6'i><'col-lg-6'p>>",
        "dom": "t<'row'<'col-md-4'l><'col-md-8'i>r><'row'<'col-lg-12'p>>",
        "language": {
            "lengthMenu": "每页显示条数 _MENU_",
            "search": "快速筛选",
            "zeroRecords": "未找到数据",
            "info": "从 _START_ 到 _END_ 条, 总计 _TOTAL_ 条",
            "infoEmpty": "无页码",
            "infoFiltered": "(从 _MAX_ 条数据中筛选)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页"
            },
            "select": {
                "rows": " 已选中 %d 列"
            }
        },
        "select": {
            "style": s.selectStyle
        }
    };
    $.extend(settings, s);
    return settings;
};