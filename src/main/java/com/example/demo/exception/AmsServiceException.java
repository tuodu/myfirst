package com.example.demo.exception;

import com.example.demo.controller.util.ConstantUtils;
import lombok.Getter;

/**
 * ams 异常封装
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 2017/5/3 下午1:33
 */
public class AmsServiceException extends RuntimeException {

    private static final long serialVersionUID = 350738011397265602L;

    @Getter
    private String code;

    public AmsServiceException(String code) {
        this.code = code;
    }

    public AmsServiceException(String code, Throwable throwable) {
        super(throwable);
        this.code = code;
    }

    public AmsServiceException(String code, String message) {
        super(message);
        this.code = code;
    }

    public AmsServiceException(String code, String message, Throwable throwable) {
        super(message, throwable);
        this.code = code;
    }

    public AmsServiceException(String code, String message, String... arg) {
        super(replaceString(message, arg));
        this.code = code;
    }

    private static String replaceString(String raw, String... arg) {
        for (String replaceStr : arg) {
            raw = raw.replaceFirst(ConstantUtils.PLACEHOLDER, replaceStr);
        }
        return raw;
    }
}
