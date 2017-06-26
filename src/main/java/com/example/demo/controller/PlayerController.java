package com.example.demo.controller;


import com.example.demo.controller.util.ConstantUtils;
import com.example.demo.controller.util.ModelMapUtils;
import com.example.demo.controller.vo.PlayerVO;
import com.example.demo.exception.AmsServiceException;
import com.example.demo.manager.PlayerManager;
import com.example.demo.manager.enums.FLag;
import com.example.demo.manager.enums.PlayerStatus;
import com.example.demo.mapper.dto.PlayerDTO;
import com.example.demo.model.DO.PlayerDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  4:07 PM
 */
@Controller
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    private PlayerManager playerManager;

    /**
     * html
     *
     * @return
     */
    @RequestMapping("/search")
    public String html() {
        return "player/search";
    }

    /**
     * query
     *
     * @param playerDTO
     * @return
     */
    @RequestMapping("/query")
    @ResponseBody
    public ModelMap query(PlayerDTO playerDTO) {
        ModelMap modelMap = new ModelMap();
        modelMap.addAttribute("flagStatus", FLag.toMap());
        modelMap.addAttribute("status", PlayerStatus.toMap());
        Map<String, String> collect = new HashMap<>();
        for (int i = 1; i <= 13; i++) {
            collect.put(String.valueOf(i),String.valueOf(i));
        }
        modelMap.addAttribute("level", collect);
        List<PlayerDO> playerDOs = playerManager.query(playerDTO);
        List<PlayerVO> vos = PlayerVO.buildVO(playerDOs);
        ModelMapUtils.buildQueryByPageJson(modelMap, vos, playerDTO.getDraw(), playerDTO.getTotalSize());
        return modelMap;
    }

    /**
     * add
     *
     * @param playerDO
     * @return
     */
    @RequestMapping("/add")
    @ResponseBody
    public ModelMap add(PlayerDO playerDO) {
        try {
            playerManager.add(playerDO);
            return ModelMapUtils.buildAjaxSuccess();
        } catch (AmsServiceException e) {
            return ModelMapUtils.buildAjaxResponse(e.getCode(), e.getMessage());
        } catch (Exception e) {
            return ModelMapUtils.buildAjaxResponse(e.getMessage());
        }

    }

    /**
     * modify
     *
     * @param playerDO
     * @return
     */
    @RequestMapping("/modify")
    @ResponseBody
    public ModelMap modify(PlayerDO playerDO) {
        try {
            playerManager.modify(playerDO);
            return ModelMapUtils.buildAjaxSuccess();
        } catch (AmsServiceException e) {
            return ModelMapUtils.buildAjaxResponse(e.getCode(), e.getMessage());
        } catch (Exception e) {
            return ModelMapUtils.buildAjaxResponse(e.getMessage());
        }

    }

    /**
     * kick
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/kick/{id}")
    public ModelMap kick(@PathVariable String id) {
        try {
            int result = playerManager.kick(id);
            if (result > 0) {
                return ModelMapUtils.buildAjaxSuccess();
            }
            return ModelMapUtils.buildAjaxResponse("未能踢出此玩家");
        } catch (AmsServiceException e) {
            return ModelMapUtils.buildAjaxResponse(e.getCode(), e.getMessage());
        } catch (Exception e) {
            return ModelMapUtils.buildAjaxResponse(e.getMessage());
        }
    }

    /**
     * to Normal
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/toNormal/{id}")
    public ModelMap toNormal(@PathVariable String id) {
        try {
            int result = playerManager.toNormal(id);
            if (result > 0) {
                return ModelMapUtils.buildAjaxSuccess();
            }
            return ModelMapUtils.buildAjaxResponse("未能洗白此玩家");
        } catch (AmsServiceException e) {
            return ModelMapUtils.buildAjaxResponse(e.getCode(), e.getMessage());
        } catch (Exception e) {
            return ModelMapUtils.buildAjaxResponse(e.getMessage());
        }
    }


    /**
     * blackList
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/blackList/{id}")
    public ModelMap blacklist(@PathVariable String id) {
        try {
            int result = playerManager.blackList(id);
            if (result > 0) {
                return ModelMapUtils.buildAjaxSuccess();
            }
            return ModelMapUtils.buildAjaxResponse("未能拉黑此玩家");
        } catch (AmsServiceException e) {
            return ModelMapUtils.buildAjaxResponse(e.getCode(), e.getMessage());
        } catch (Exception e) {
            return ModelMapUtils.buildAjaxResponse(e.getMessage());
        }
    }

    /**
     * queryById
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/{id}")
    public ModelMap queryById(@PathVariable("id") String id) {
        ModelMap model = new ModelMap();
        try {
            model.addAttribute(ConstantUtils.JSON_RESULT, playerManager.queryById(id));
            return model;
        } catch (AmsServiceException e) {
            return ModelMapUtils.buildAjaxResponse(e.getCode(), e.getMessage());
        } catch (Exception e) {
            return ModelMapUtils.buildAjaxResponse(e.getMessage());
        }
    }

}
