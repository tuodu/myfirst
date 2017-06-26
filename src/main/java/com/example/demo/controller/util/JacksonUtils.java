package com.example.demo.controller.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * jackson
 */
public class JacksonUtils {

    public static ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // 支持非 json 标准，无双引号名称
        objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        // 支持单引号名字和值
        objectMapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
        return objectMapper;
    }
}
