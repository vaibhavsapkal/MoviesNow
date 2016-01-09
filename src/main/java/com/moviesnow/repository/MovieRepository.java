package com.moviesnow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviesnow.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer>{

	Movie findByName(String name);
}
