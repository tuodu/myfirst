/**
 * 页面提示信息处理
 *
 * 提示信息固定显示在页面的 footer 上, 通过定时任务自动消除提示信息
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 25/10/2016 10:35 AM.
 */
var PagePrompts = {

    sucMsg: "操作成功!",
    failMsg: "操作失败!",
    infoMsg: "操作通知: ",
    warnMsg: "操作警告: ",
    promptMsg: "请至少选中一条信息!",

    sucClass: "alert-success",
    failClass: "alert-danger",
    infoClass: "alert-info",
    warnClass: "alert-warning",

    sucFa: "fa-check-circle",
    failFa: "fa-times-circle",
    infoFa: "fa-info-circle",
    warnFa: "fa-exclamation-circle",

    // 清除状态
    cleanStatus: true,

    /**
     * 显示成功提示信息
     *
     * @param i 提示信息
     */
    success: function (i) {
        show(PagePrompts.sucClass, PagePrompts.sucFa, PagePrompts.sucMsg, i);
    },

    /**
     * 显示失败提示信息
     *
     * @param i
     */
    fail: function (i) {
        show(PagePrompts.failClass, PagePrompts.failFa, PagePrompts.failMsg, i);
    },

    /**
     * 显示通知提示信息
     *
     * @param i
     */
    info: function (i) {
        show(PagePrompts.infoClass, PagePrompts.infoFa, PagePrompts.infoMsg, i);
    },

    /**
     * 显示警告提示信息
     *
     * @param i
     */
    warn: function (i) {
        show(PagePrompts.warnClass, PagePrompts.warnFa, PagePrompts.warnMsg, i);
    }
};

function show(c, f, m, i) {
    var $tip = $('#tip');
    if ($tip.length === 0) {
        $tip = $('<span id="tip" style="position:absolute;top:50px;left: 50%;z-index:9999"></span>');
        $('body').append($tip);
    }
    var offsetTop = $(window).scrollTop() + 10;
    $tip.animate({
        top : offsetTop + "px"
    }, {
        duration : 0,
        queue : false
    });
    $tip.stop(true).attr('class', 'alert ' + c).html("<i class='fa " + f + "'></i>&nbsp;<strong>"
        + m + "</strong>&nbsp;&nbsp;" + i).css('margin-left', -$tip.outerWidth() / 2)
        .fadeIn(500).delay(3000).fadeOut(500, function () {
        $tip.remove();
    });
}