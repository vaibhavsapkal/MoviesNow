package com.moviesnow.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class Video {
	
	@Id
	@GeneratedValue
	private Integer videoId;	
	
	private Integer movieId;
	private Integer ownerId;
	
    @OneToMany(cascade={CascadeType.ALL})
	@JoinColumn(name="videoId")
	private List<Request> requests; 
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "movieId", insertable=false, updatable=false)
	private Movie movie;
	
	public List<Request> getRequests() {
		return requests;
	}

	public void setRequests(List<Request> requests) {
		this.requests = requests;
	}

	@ManyToOne
	@JoinColumn(name = "ownerId", insertable=false, updatable=false)
	private User user; 
	
	public Integer getId() {
		return videoId;
	}
	
	public void setId(Integer videoId) {
		this.videoId = videoId;
	}
	
	public Movie getMovie() {
		return movie;
	}
	
	public Integer getVideoId() {
		return videoId;
	}
	
	public void setVideoId(Integer videoId) {
		this.videoId = videoId;
	}
	public void setMovie(Movie movie) {
		this.movie = movie;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public Integer getMovieId() {
		return movieId;
	}
	
	public void setMovieId(Integer movieId) {
		this.movieId = movieId;
	}
	
	public Integer getOwnerId() {
		return ownerId;
	}
	
	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}
}
