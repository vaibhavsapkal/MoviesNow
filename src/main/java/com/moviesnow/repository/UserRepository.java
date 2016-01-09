package com.moviesnow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviesnow.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	User findByEmailAndPassword(String email, String password);

}
