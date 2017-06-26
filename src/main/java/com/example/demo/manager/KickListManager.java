package com.example.demo.manager;

import com.example.demo.mapper.KickListMapper;
import com.example.demo.model.DO.KickListDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  3:37 PM
 */
@Component
public class KickListManager {

    @Autowired(required = false)
    private KickListMapper kickListMapper;

    /**
     * add
     *
     * @param kickListDO
     * @return
     */
    public Boolean add(KickListDO kickListDO) {
        return kickListMapper.insert(kickListDO) >= 1;
    }

    /**
     * 查询所有
     *
     * @param kickListDO
     * @return
     */
    public List<KickListDO> queryAll(KickListDO kickListDO) {
        return kickListMapper.select(kickListDO);
    }

}
