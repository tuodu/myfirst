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
public class KickListDTO extends BasePageDTO {

    private String playerId;

    private String playerName;

}
