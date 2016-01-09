package com.moviesnow.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.moviesnow.entities.Movie;
import com.moviesnow.entities.Video;
import com.moviesnow.repository.VideoRepository;

@RestController
public class VideoController {
	
	VideoRepository videoRepository;

	@Autowired
	public VideoController(VideoRepository videoRepository) {
		super();
		this.videoRepository = videoRepository;
	}
	
	@RequestMapping(value="/videos", method = RequestMethod.GET)
	public List<Video> getAllVideos(){
		return videoRepository.findAll(); 
	}
	
	@RequestMapping(value="videos/add", method = RequestMethod.POST)
	public Video addMovie(@RequestBody Video video, HttpServletResponse response){
				
		return this.videoRepository.save(video);
	}
	
	@RequestMapping(value ="videos/user/{id}", method = RequestMethod.GET)
	public List<Video> getVideosForUser(@PathVariable Integer id){
		return this.videoRepository.findByOwnerId(id);		
	}
	
	@RequestMapping(value ="videos/requests/{userId}", method = RequestMethod.GET)
	public List<Video> getRequestsForUser(@PathVariable Integer userId){
		return this.videoRepository.findByRequestsBorrowerId(userId);		
	}
}
