package com.example.demo.manager.scheduled;

import com.example.demo.manager.mail.MailManager;
import com.example.demo.mapper.KickListMapper;
import com.example.demo.model.DO.KickListDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 21/06/2017  2:03 PM
 */
@Component
public class ScheJob {

    @Autowired
    private KickListMapper kickListMapper;

    @Autowired
    private MailManager mailManager;
    /**
     * 每周日14点00发邮件
     */
    @Scheduled(cron="0 00 14 ? * 1")
    public void cronJob(){
        KickListDO kickListDO1 = new KickListDO();
        List<KickListDO> kickList = kickListMapper.select(kickListDO1);
        if(kickList.size()>0){
            String kickString = "";
            for (int i = 0; i < kickList.size(); i++) {
                kickString += kickList.get(i).getPlayerName()+"和";
            }
            kickString = kickString.substring(0,kickString.length()-1);
            mailManager.sendSimpleMail("908627223@qq.com", "CLASH_ROYAL", "踢出名单为:" + kickString);
        }else{
            mailManager.sendSimpleMail("908627223@qq.com", "CLASH_ROYAL", "本周全部达标");
        }
    }

    @Scheduled(cron="0 00 20 ? * 1")
    public void cronJobCLear(){
       kickListMapper.delete();
    }
}
