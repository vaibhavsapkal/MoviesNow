package com.moviesnow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviesnow.entities.Request;

public interface RequestRepository extends JpaRepository<Request, Integer>{
	
}
