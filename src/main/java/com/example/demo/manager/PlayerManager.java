package com.example.demo.manager;

import com.example.demo.exception.AmsExceptionCode;
import com.example.demo.exception.AmsServiceException;
import com.example.demo.manager.enums.PlayerStatus;
import com.example.demo.manager.mail.MailManager;
import com.example.demo.mapper.KickListMapper;
import com.example.demo.mapper.PlayerMapper;
import com.example.demo.mapper.dto.PlayerDTO;
import com.example.demo.model.DO.KickListDO;
import com.example.demo.model.DO.PlayerDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  3:37 PM
 */
@Component
public class PlayerManager {

    @Autowired(required = false)
    private PlayerMapper playerMapper;

    @Autowired
    private KickListMapper kickListMapper;

    @Autowired
    private MailManager mailManager;


    public List<PlayerDO> query(PlayerDTO playerDTO) {
        List<PlayerDO> doList = new ArrayList<>();
        int count = playerMapper.selectCount(playerDTO);
        if (count == 0) {
            return doList;
        }
        playerDTO.setTotalSize(count);
        return playerMapper.selectbyPage(playerDTO);
    }


    public Boolean add(PlayerDO playerDO) {
        playerDO.setStatus("0");
        playerDO.setCount("0");
        return playerMapper.insert(playerDO) >= 1;
    }


    public Boolean modify(PlayerDO playerDO) {
        //first time can not reach goal
        if (playerDO.getFlag().equals("1")) {
            playerDO.setCount("1");
            playerDO.setStatus("1");
        }
        //second time can not reach goal
        if (playerDO.getFlag().equals("2")) {
            playerDO.setCount("2");
            playerDO.setStatus("2");
            KickListDO kickListDO = new KickListDO();
            kickListDO.setPlayerId(playerDO.getPlayerId());
            kickListDO.setPlayerName(playerDO.getPlayerName());
            //insert
            List<KickListDO> kick2 = kickListMapper.select(kickListDO);
            if(kick2.size()>0){
                throw new AmsServiceException(AmsExceptionCode.DB_DATA_MODIFY_ERROR.getCode(),
                        "玩家已经二次不达标.无需继续设置");
            }
            kickListMapper.insert(kickListDO);
        }
        //reach goal reset count
        if (playerDO.getFlag().equals("0")) {
            playerDO.setCount("0");
            playerDO.setStatus("0");
            KickListDO kickListDO = new KickListDO();
            kickListDO.setPlayerId(playerDO.getPlayerId());
            kickListDO.setPlayerName(playerDO.getPlayerName());
            //insert
            List<KickListDO> kick0 = kickListMapper.select(kickListDO);
            if(kick0.size()>0){
                kickListMapper.deleteByPlayerId(kick0.get(0).getPlayerId());
            }
        }
        return playerMapper.update(playerDO) >= 1;
    }


    public int kick(String id) {
        int result = playerMapper.changeStatus(PlayerStatus.KICK.getCode(), id);
        if (result < 1) {
            throw new AmsServiceException(AmsExceptionCode.DB_DATA_MODIFY_ERROR.getCode(),
                    "踢出玩家 #id:", id);
        }
        return result;
    }


    public int blackList(String id) {
        int result = playerMapper.changeStatus(PlayerStatus.BLACK.getCode(), id);
        if (result < 1) {
            throw new AmsServiceException(AmsExceptionCode.DB_DATA_MODIFY_ERROR.getCode(),
                    "拉黑玩家 #id:", id);
        }
        return result;
    }


    public int toNormal(String id) {
        int result = playerMapper.changeStatus(PlayerStatus.NORMAL.getCode(), id);
        if (result < 1) {
            throw new AmsServiceException(AmsExceptionCode.DB_DATA_MODIFY_ERROR.getCode(),
                    "正常玩家 #id:", id);
        }
        return result;
    }


    public PlayerDO queryById(String id) {
        PlayerDO playerDO = new PlayerDO();
        playerDO.setId(id);
        List<PlayerDO> list = playerMapper.select(playerDO);
        if (list == null || list.isEmpty()) {
            throw new AmsServiceException(AmsExceptionCode.DB_DATA_NOT_FOUND.getCode(), "玩家 id # 不存在", id);
        }
        return list.get(0);
    }
}
