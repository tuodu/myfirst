package com.example.demo.model.DO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * 基本类
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  3:11 PM
 */
@Setter
@Getter
@ToString(callSuper = true)
public class BaseDO implements Serializable {
    /**
     * 序列化ID
     */
    private static final long serialVersionUID = -3784144265909688460L;

    /**
     * 数据库主键
     */
    private String id;
}
