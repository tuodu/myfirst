package com.example.demo.controller.util;

import com.example.demo.exception.AmsExceptionCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;

/**
 * 页面返回参数组装
 */
public class ModelMapUtils {

    /**
     * 构建页面分页查询结果参数
     *
     * @param modelMap 响应参数
     * @param list 分页查询结果
     * @param draw 插件参数
     * @param totalSize 总条数
     * @return 查询结果
     */
    public static ModelMap buildQueryByPageJson(ModelMap modelMap, List<?> list, int draw, int totalSize) {
        modelMap.addAttribute("data", list == null ? Collections.EMPTY_LIST : list);
        // 页面展示插件需要的参数
        modelMap.addAttribute("draw", draw);
        modelMap.addAttribute("recordsTotal", totalSize);
        modelMap.addAttribute("recordsFiltered", totalSize);
        return modelMap;
    }

    /**
     * 构建页面查询结果参数
     *
     * @param list 查询结果
     * @return 查询结果
     */
    public static ModelMap buildQuery(List<?> list) {
        ModelMap modelMap = new ModelMap();
        modelMap.addAttribute("data", list == null ? Collections.EMPTY_LIST : list);
        return modelMap;
    }

    /**
     * 构建 ajax 请求响应结果
     *
     * @param code 响应码
     * @param msg 响应描述
     * @return 响应结果
     */
    public static ModelMap buildAjaxResponse(String code, String msg) {
        ModelMap modelMap = new ModelMap();
        modelMap.addAttribute("code", code);
        modelMap.addAttribute("msg", msg);
        return modelMap;
    }

    public static ModelMap buildAjaxResponse(int code, String msg) {
        return buildAjaxResponse(code + "", msg);
    }

    public static ModelMap buildAjaxResponse(String msg) {
        return buildAjaxResponse(AmsExceptionCode.SC_INTERNAL_SERVER_ERROR.getCode(), msg);
    }

    public static ModelMap buildAjaxSuccess() {
        return buildAjaxResponse(HttpServletResponse.SC_OK, "OK");
    }

    /**
     * 构建查询错误返回结果
     *
     * @param draw 插件参数
     * @param code 响应码
     * @param msg 响应描述
     * @return 查询结果
     */
    public static ModelMap buildQueryByPageJsonForError(int draw, String code, String msg) {
        ModelMap modelMap = new ModelMap();
        modelMap.addAttribute("data", Collections.EMPTY_LIST);
        // 页面展示插件需要的参数
        modelMap.addAttribute("draw", draw);
        modelMap.addAttribute("code", code);
        modelMap.addAttribute("msg", msg);
        modelMap.addAttribute("recordsTotal", 0);
        modelMap.addAttribute("recordsFiltered", 0);
        return modelMap;
    }

    public static ModelMap buildQueryByPageJsonForError(int draw, String msg) {
        ModelMap modelMap = new ModelMap();
        modelMap.addAttribute("data", Collections.EMPTY_LIST);
        // 页面展示插件需要的参数
        modelMap.addAttribute("draw", draw);
        modelMap.addAttribute("code", AmsExceptionCode.SC_INTERNAL_SERVER_ERROR.getCode());
        modelMap.addAttribute("msg", msg);
        modelMap.addAttribute("recordsTotal", 0);
        modelMap.addAttribute("recordsFiltered", 0);
        return modelMap;
    }

    /**
     * 构建页面分页查询结果参数
     *
     * @param model 结果对象
     * @param list 分页查询结果
     * @param draw 插件参数
     * @param totalSize 总条数
     * @return 查询结果
     */
    public static ModelAndView buildQueryByPageJson(ModelAndView model, List<?> list, int draw, int totalSize) {
        String jsonData;
        try {
            jsonData = JacksonUtils.objectMapper().writeValueAsString(list);
        } catch (JsonProcessingException e) {
            jsonData = "[]";
        }
        model.addObject("dtData", jsonData);
        // 页面展示插件需要的参数
        model.addObject("draw", draw);
        model.addObject("recordsTotal", totalSize);
        model.addObject("recordsFiltered", totalSize);
        return model;
    }

    /**
     * 程序错误处理
     *
     * @param msg 消息
     * @return ModelAndView
     */
    public static ModelAndView buildForError(String msg) {
        return buildForError(msg, "error");
    }

    /**
     * 程序错误处理
     *
     * @param msg 消息
     * @return ModelAndView
     */
    public static ModelAndView buildForError(String msg, String view) {
        ModelAndView model = new ModelAndView();
        model.addObject("title", "处理失败");
        model.addObject("desc", msg);
        model.addObject("try", "请刷新后重试。");
        model.addObject("url", "/");
        model.addObject("urlName", "刷新");
        model.setViewName(view);
        return model;
    }

    /**
     * 程序错误处理
     *
     * @param e 异常
     * @return ModelAndView
     */
    public static ModelAndView buildForError(Throwable e) {
        return buildForError(e.fillInStackTrace().toString());
    }

    /**
     * 程序未授权错误处理
     *
     * @return ModelAndView
     */
    public static ModelAndView buildForPermit() {
        ModelAndView model = new ModelAndView();
        model.addObject("title", "未授权");
        model.addObject("desc", "无权限访问");
        model.addObject("try", "请尝试重新登录以获取最新权限。");
        model.addObject("url", "/sys/logout");
        model.addObject("urlName", "退出系统");
        model.setViewName("error");
        return model;
    }
}
