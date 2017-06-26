package com.example.demo.mapper;

import com.example.demo.mapper.dto.PlayerDTO;
import com.example.demo.model.DO.PlayerDO;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 描述
 *
 * @author wangyao
 * @version 1.0.0 createTime: 14/06/2017  3:23 PM
 */
public interface PlayerMapper {

    /**
     * selectbyPage
     *
     * @param playerDTO
     * @return
     */
    @Select("<script>SELECT ID,PLAYER_ID,COUNT,FLAG,PLAYER_NAME,PLAYER_LEVEL,DESCRIPTION,STATUS FROM PLAYER <trim prefix=\"WHERE\" prefixOverrides=\"AND|OR\"> " +
            "<if test =\"flag != null and flag != ''\">AND FLAG = #{flag}</if>" +
            "<if test =\"count != null and count != ''\">AND COUNT = #{count}</if>" +
            "<if test =\"playerId != null and playerId != ''\">AND PLAYER_ID = #{playerId}</if>" +
            "<if test =\"playerName != null and playerName != ''\">AND PLAYER_NAME LIKE CONCAT(CONCAT('%',#{playerName}),'%')</if>" +
            "<if test =\"playerLevel != null and playerLevel != ''\">AND PLAYER_LEVEL = #{playerLevel}</if>" +
            "<if test =\"status != null and status != ''\">AND STATUS = #{status}</if>" +
            "<if test =\"description != null and description != ''\">AND DESCRIPTION LIKE CONCAT(CONCAT('%',#{description}),'%')</if>" +
            "</trim> LIMIT #{start},#{pageSize}</script>")
    @ResultMap("com.example.demo.mapper.PlayerMapper.playerMap")
    List<PlayerDO> selectbyPage(PlayerDTO playerDTO);

    /**
     * select
     *
     * @param playerDO
     * @return
     */
    @Select("<script>SELECT ID,PLAYER_ID,COUNT,FLAG,PLAYER_NAME,PLAYER_LEVEL,DESCRIPTION,STATUS FROM PLAYER <trim prefix=\"WHERE\" prefixOverrides=\"AND|OR\"> " +
            "<if test =\"flag != null and flag != ''\">AND FLAG = #{flag}</if>" +
            "<if test =\"count != null and count != ''\">AND COUNT = #{count}</if>" +
            "<if test =\"id != null and id != ''\">AND ID = #{id}</if>" +
            "<if test =\"playerId != null and playerId != ''\">AND PLAYER_ID = #{playerId}</if>" +
            "<if test =\"playerName != null and playerName != ''\">AND PLAYER_NAME LIKE CONCAT(CONCAT('%',#{playerName}),'%')</if>" +
            "<if test =\"status != null and status != ''\">AND STATUS = #{status}</if>" +
            "<if test =\"playerLevel != null and playerLevel != ''\">AND PLAYER_LEVEL = #{playerLevel}</if>" +
            "<if test =\"description != null and description != ''\">AND DESCRIPTION LIKE CONCAT(CONCAT('%',#{description}),'%')</if>" +
            "</trim></script>")
    @ResultMap("com.example.demo.mapper.PlayerMapper.playerMap")
    List<PlayerDO> select(PlayerDO playerDO);

    /**
     * count
     *
     * @param playerDTO
     * @return
     */
    @Select("<script>SELECT COUNT(1) FROM PLAYER <trim prefix=\"WHERE\" prefixOverrides=\"AND|OR\"> " +
            "<if test =\"flag != null and flag != ''\">AND FLAG = #{flag}</if>" +
            "<if test =\"count != null and count != ''\">AND COUNT = #{count}</if>" +
            "<if test =\"playerId != null and playerId != ''\">AND PLAYER_ID = #{playerId}</if>" +
            "<if test =\"playerName != null and playerName != ''\">AND PLAYER_NAME LIKE CONCAT(CONCAT('%',#{playerName}),'%')</if>" +
            "<if test =\"playerLevel != null and playerLevel != ''\">AND PLAYER_LEVEL = #{playerLevel}</if>" +
            "<if test =\"status != null and status != ''\">AND STATUS = #{status}</if>" +
            "<if test =\"description != null and description != ''\">AND DESCRIPTION LIKE CONCAT(CONCAT('%',#{description}),'%')</if>" +
            "</trim></script>")
    int selectCount(PlayerDTO playerDTO);

    /**
     * add
     *
     * @param playerDO
     * @return
     */
    @Insert("<script>INSERT INTO PLAYER( PLAYER_ID, PLAYER_NAME, PLAYER_LEVEL, STATUS,DESCRIPTION,COUNT,FLAG) " +
            "VALUES ( #{playerId}, #{playerName},#{playerLevel,jdbcType=BIGINT}, #{status},#{description},#{count},#{flag})</script>")
    int insert(PlayerDO playerDO);

    /**
     * edit
     *
     * @param playerDO
     * @return
     */
    @Update("<script>UPDATE PLAYER  SET PLAYER_ID =#{playerId},PLAYER_NAME =#{playerName},COUNT =#{count},FLAG =#{flag}" +
            ",PLAYER_LEVEL = #{playerLevel},DESCRIPTION =#{description},STATUS =#{status} WHERE ID =#{id}</script>")
    int update(PlayerDO playerDO);

    /**
     * change status
     *
     * @param id
     * @return
     */
    @Delete("UPDATE PLAYER SET STATUS =#{status} WHERE ID =#{id}")
    int changeStatus(@Param("status")String status,@Param("id") String id);
}