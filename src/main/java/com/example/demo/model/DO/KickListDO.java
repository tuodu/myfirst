package com.example.demo.model.DO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 黑名单
 */
@Setter
@Getter
@ToString(callSuper = true)
public class KickListDO extends BaseDO {

    private String playerId;

    private String playerName;

}
