/**
 * 页面按钮事件
 *
 * @author wangyao
 * @author 扶苏
 */
var PageButton = {

    /**
     * 单个id删除
     *
     * @param dataTableId 数据来源 dataTable id
     * @param url 删除方法路径
     */
    delete: function (dataTableId, url) {
        doBtnFunc(dataTableId, url);
    },

    /**
     * 审核
     *
     * @param dataTableId 数据来源 dataTable id
     * @param url 审核 url
     */
    review: function (dataTableId, url) {
        doBtnFunc(dataTableId, url);
    },

    /**
     * 绑定权限
     *
     * @param dataTableId 数据来源 dataTable id
     * @param getUrl 查询绑定 url
     * @param bindUrl 绑定 url
     */
    bindRes: function (dataTableId, getUrl, bindUrl) {
        getBindRes(dataTableId, getUrl);
        $("#bindResSubmitBtn").click(function () {
            var treeObj = $.fn.zTree.getZTreeObj("treeUl");
            var nodes = treeObj.getCheckedNodes(true);
            var resIds = [];
            for (var i = 0; i < nodes.length; i++) {
                resIds.push(nodes[i].id);
            }
            $("#resIds").val(resIds);
            var param = PageUtils.buildSubmitData("bindResForm");
            PageUtils.ajaxHandle(crCtx + bindUrl, param, "POST", function (result) {
                if (result["code"] === "200") {
                    $("#bindResCloseBtn").click();
                    PagePrompts.success(result["msg"]);
                } else {
                    PagePrompts.fail(result["msg"]);
                }
            });
        });
    },

    /**
     * 绑定角色
     *
     * @param dataTableId 数据来源 dataTable id
     * @param getUrl 查询绑定 url
     * @param bindUrl 绑定 url
     */
    bindRole: function (dataTableId, getUrl, bindUrl) {
        
    }
};

function getBindRole(dataTableId, url) {
    var table = $("#" + dataTableId).DataTable();
    var id = table.row(".selected").data()["id"];
    $("#userId").val(id);

}

function getBindRes(dataTableId, url) {
    var table = $("#" + dataTableId).DataTable();
    var id = table.row(".selected").data()["id"];
    $("#userId").val(id);
    $("#bindRoleId").val(id);
    $("#orgId").val(id);
    PageUtils.ajaxHandle(crCtx + url + id, "", "GET", function (data) {
        var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            view: {
                nameIsHTML: true,
                showIcon: false
            }
        };
        var result = data["treeRes"];
        var checkeds = data["checkResIds"];
        var zNodes = [];
        for (var i = 0; i < result.length; i++) {
            var img = result[i]["rsrcImg"];
            var rsrcImg = "";
            var checked = false;
            if (img && img !== "") {
                rsrcImg = "<i class='" + img + "'></i>&nbsp;";
            }
            if (checkeds.indexOf(result[i]["id"]) !== -1) {
                checked = true;
            }
            var node = {
                id: result[i]["id"],
                pId: result[i]["parentId"],
                name: rsrcImg + result[i]["resName"],
                checked: checked
            };
            zNodes.push(node);
        }
        $.fn.zTree.init($("#treeUl"), setting, zNodes);
    });
}

function doBtnFunc(dataTableId, url) {
    var table = $("#" + dataTableId).DataTable();
    var selectData = table.row(".selected").data();
    //选择的行数据
    var id = selectData["id"];
    PageUtils.ajaxHandle(crCtx + url + id, "", "POST", function (data) {
        if (data["code"] === "200") {
            PagePrompts.success(data["msg"]);
            //刷新当前页
            table.draw(false);
        } else {
            PagePrompts.fail(data["msg"]);
        }
    });
}
