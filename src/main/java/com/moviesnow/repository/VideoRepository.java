package com.moviesnow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviesnow.entities.Video;

public interface VideoRepository extends JpaRepository<Video, Integer>{	
	List<Video> findByOwnerId(Integer ownerId);

	List<Video> findByRequestsBorrowerId(Integer borrowerId);
}
