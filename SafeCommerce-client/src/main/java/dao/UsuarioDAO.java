/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import com.github.britooo.looca.api.group.discos.DiscosGroup;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.util.Conversor;
import java.sql.Connection;
import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class UsuarioDAO {

    public static void main(String[] args) {
        Processador cpu = new Processador();
        Memoria ram = new Memoria();
        DiscosGroup rom = new DiscosGroup();
        Conversor conversor = new Conversor();
        Conexao connection = new Conexao();
        JdbcTemplate con = connection.getConnection();

    }
}
