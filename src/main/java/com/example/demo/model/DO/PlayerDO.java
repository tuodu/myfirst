package com.example.demo.model.DO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 玩家描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  3:09 PM
 */
@Setter
@Getter
@ToString(callSuper = true)
public class PlayerDO extends BaseDO {

    private String playerId;

    private String playerName;

    private String description;

    private String playerLevel;

    private String status;

    private String count;

    private String flag;
}
