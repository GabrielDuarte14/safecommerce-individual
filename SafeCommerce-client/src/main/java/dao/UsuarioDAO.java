/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class UsuarioDAO {
	Conexao conexao = new Conexao();
	JdbcTemplate jdbcTemplate = conexao.getConnection();

	public Usuario login(String email, String senha) {
		try {
			Usuario registro = jdbcTemplate.queryForObject("select * from Usuario where email = ? AND senha = ?",
					new BeanPropertyRowMapper<Usuario>(Usuario.class), email, senha);
			return registro;
		} catch (Exception e) {
			System.out.println("Tivemos um Problema ao realizar login");
			return null;
		}

	}

}
