package com.example.demo.mapper;

import com.example.demo.mapper.dto.KickListDTO;
import com.example.demo.model.DO.KickListDO;
import com.example.demo.model.DO.PlayerDO;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  3:23 PM
 */
public interface KickListMapper {

    @Select("<script>SELECT ID,PLAYER_ID,PLAYER_NAME FROM KICK_LIST <trim prefix=\"WHERE\" prefixOverrides=\"AND|OR\"> " +
            "<if test =\"playerId != null and playerId != ''\">AND PLAYER_ID = #{playerId}</if>" +
            "<if test =\"playerName != null and playerName != ''\">AND PLAYER_NAME LIKE CONCAT(CONCAT('%',#{playerName}),'%')</if>" +
            "</trim> LIMIT #{start},#{pageSize}</script>")
    @ResultMap("com.example.demo.mapper.KickListMapper.kickMap")
    List<PlayerDO> selectbyPage(KickListDTO kickListDTO);


    @Select("<script>SELECT ID,PLAYER_ID,PLAYER_NAME FROM KICK_LIST <trim prefix=\"WHERE\" prefixOverrides=\"AND|OR\"> " +
            "<if test =\"id != null and id != ''\">AND ID = #{id}</if>" +
            "<if test =\"playerId != null and playerId != ''\">AND PLAYER_ID = #{playerId}</if>" +
            "<if test =\"playerName != null and playerName != ''\">AND PLAYER_NAME LIKE CONCAT(CONCAT('%',#{playerName}),'%')</if>" +
            "</trim></script>")
    @ResultMap("com.example.demo.mapper.KickListMapper.kickMap")
    List<KickListDO> select(KickListDO kickListDO);


    @Select("<script>SELECT COUNT(1) FROM KICK_LIST <trim prefix=\"WHERE\" prefixOverrides=\"AND|OR\"> " +
            "<if test =\"playerId != null and playerId != ''\">AND PLAYER_ID = #{playerId}</if>" +
            "<if test =\"playerName != null and playerName != ''\">AND PLAYER_NAME LIKE CONCAT(CONCAT('%',#{playerName}),'%')</if>" +
            "</trim></script>")
    int selectCount(KickListDTO kickListDTO);


    @Insert("<script>INSERT INTO KICK_LIST(PLAYER_ID, PLAYER_NAME) " +
            "VALUES (#{playerId}, #{playerName})</script>")
    int insert(KickListDO kickListDO);

    @Update("<script>UPDATE KICK_LIST  SET PLAYER_NAME =#{playerName} WHERE ID =#{id}</script>")
    int update(KickListDO kickListDO);


    @Delete("<script>DELETE FROM KICK_LIST</script>")
    void delete();

    @Delete("<script>DELETE FROM KICK_LIST WHERE PLAYER_ID =#{playerId}</script>")
    int deleteByPlayerId(@Param("playerId") String playerId);
}