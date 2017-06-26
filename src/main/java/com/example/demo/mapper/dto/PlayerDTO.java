package com.example.demo.mapper.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 16/06/2017  9:39 AM
 */
@Getter
@Setter
@ToString(callSuper = false)
public class PlayerDTO extends BasePageDTO {

    private String playerId;

    private String playerName;

    private String description;

    private String playerLevel;

    private String status;

    private String count;

    private String flag;
}
