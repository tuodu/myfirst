package com.example.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * ams 异常码
 *
 * @author 扶苏
 * @version 1.0.0 createTime: 2017/5/3 下午1:44
 */
@Getter
@AllArgsConstructor
public enum  AmsExceptionCode {

    SC_INTERNAL_SERVER_ERROR("SC_INTERNAL_SERVER_ERROR", "系统内部错误"),

    SC_BAD_REQUEST("SC_BAD_REQUEST", "请求无法处理"),

    DB_DATA_NOT_FOUND("DB_DATA_NOT_FOUND", "数据未找到"),

    DB_DATA_DUPLICATE("DB_DATA_DUPLICATE", "数据重复"),

    DB_DATA_MODIFY_ERROR("DB_DATA_MODIFY_ERROR", "数据操作失败");

    private String code;

    private String msg;
}
