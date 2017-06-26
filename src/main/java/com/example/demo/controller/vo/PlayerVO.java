package com.example.demo.controller.vo;

import com.example.demo.manager.enums.PlayerStatus;
import com.example.demo.model.DO.PlayerDO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 机构模块
 *
 * @author wangyao
 * @version 1.0.0 createTime: 2017/5/9 下午3:27
 */
@Getter
@Setter
@ToString(callSuper = true)
public class PlayerVO extends PlayerDO {

    private static final long serialVersionUID = -6268693797109920475L;

    private int draw;

    private int pageSize = 10;

    private int currentPage;

    private String statusDesc;

    /**
     * 构建页面显示对象
     *
     * @param dos 查询结果
     * @return 页面显示对象
     */
    public static List<PlayerVO> buildVO(List<PlayerDO> dos) {
        List<PlayerVO> vos = new ArrayList<>();
        dos.forEach(playerDO -> {
            PlayerVO vo = new PlayerVO();
            vo.setStatusDesc(PlayerStatus.getMsgFromCode(playerDO.getStatus()));
            BeanUtils.copyProperties(playerDO, vo);
            vos.add(vo);
        });
        return vos;
    }
}
