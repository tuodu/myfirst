package com.example.demo.manager.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 是和否
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 2017/5/15 下午1:16
 */
@Getter
@AllArgsConstructor
public enum  TrueOrFalse {

    TRUE("1","是"),

    FALSE("0","否");

    private String code;

    private String msg;

    /**
     * 通过 code 获取 msg
     *
     * @param code 编码
     * @return msg
     */
    public static String getMsgFromCode(String code) {
        for (TrueOrFalse trueOrFalse : TrueOrFalse.values()) {
            if (trueOrFalse.getCode().equals(code)) {
                return trueOrFalse.getMsg();
            }
        }
        return code;
    }

    /**
     * 转换成 map
     *
     * @return map
     */
    public static Map<String, String> toMap() {
        return Arrays.stream(TrueOrFalse.values()).collect(Collectors
                .toMap(TrueOrFalse::getCode, TrueOrFalse::getMsg));
    }
}