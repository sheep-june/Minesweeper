package com.inside.realty_inside_1002.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SPAController {

    // 루트 경로 포워딩
    @RequestMapping({"/"})
    public String index() {
        return "forward:/index.html";
    }

    // 도트(.)가 포함되지 않은 모든 경로 포워딩 (다중 세그먼트 지원)
    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }
}
