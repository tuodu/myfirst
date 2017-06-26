package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 首页描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 15/06/2017  1:52 PM
 */
@Controller
@RequestMapping("/index")
public class indexController {

    @RequestMapping("/index")
    public String html() {
        return "index/index";
    }

}
