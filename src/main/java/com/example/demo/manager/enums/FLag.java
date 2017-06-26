package com.example.demo.manager.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 性别
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 2017/5/10 下午8:02
 */
@Getter
@AllArgsConstructor
public enum FLag {

    Y("0", "达标"),

    N1("1","首次未达标"),

    N2("2","两次未达标");


    private String code;

    private String msg;

    /**
     * 通过 code 获取 msg
     *
     * @param code 编码
     * @return msg
     */
    public static String getMsgFromCode(String code) {
        for (FLag fLag : FLag.values()) {
            if (fLag.getCode().equals(code)) {
                return fLag.getMsg();
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
        return Arrays.stream(FLag.values()).collect(Collectors
                .toMap(FLag::getCode, FLag::getMsg));
    }
}
