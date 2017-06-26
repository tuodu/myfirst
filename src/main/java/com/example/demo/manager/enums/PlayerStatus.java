package com.example.demo.manager.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 用户等级
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 2017/5/22 上午9:56
 */
@Getter
@AllArgsConstructor
public enum PlayerStatus {

    NORMAL("0", "正常"),

    BLACK("1", "拉黑"),

    KICK("2", "踢出");

    private String code;

    private String msg;

    /**
     * 转换成 map
     *
     * @return map
     */
    public static Map<String, String> toMap() {
        return Arrays.stream(PlayerStatus.values()).collect(Collectors
                .toMap(PlayerStatus::getCode, PlayerStatus::getMsg));
    }

    /**
     * 通过 code 获取 msg
     *
     * @param code 编码
     * @return msg
     */
    public static String getMsgFromCode(String code) {
        for (PlayerStatus level : PlayerStatus.values()) {
            if (level.getCode().equals(code)) {
                return level.getMsg();
            }
        }
        return code;
    }
}
