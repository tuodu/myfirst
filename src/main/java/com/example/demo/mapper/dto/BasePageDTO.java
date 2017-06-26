package com.example.demo.mapper.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * 分页字段
 */
@Getter
@Setter
@ToString
public class BasePageDTO implements Serializable {

    private static final long serialVersionUID = 1427042842056877950L;

    /**
     * datatable 插件参数
     */
    private int draw;

    /**
     * 开始条数
     */
    private int start;

    /**
     * 总条数
     */
    private int totalSize;

    /**
     * 每页显示条数
     */
    private int pageSize;

    /**
     * 当前页
     */
    private int currentPage;

    public int getStart() {
        return (this.getCurrentPage() - 1) * this.getPageSize();
    }

    public int getCurrentPage() {
        if (this.currentPage <= 0) {
            return 1;
        }
        int totalPage = (this.totalSize + this.pageSize - 1) / this.pageSize;
        return this.currentPage > totalPage ? totalPage : this.currentPage;
    }

    public int getPageSize() {
        return this.pageSize > this.totalSize ? this.totalSize : this.pageSize;
    }

}
