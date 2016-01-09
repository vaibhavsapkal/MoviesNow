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
import com.moviesnow.repository.MovieRepository;

@RestController
public class MovieController {

	MovieRepository movieRepository;
	
	@Autowired
	public MovieController(MovieRepository movieRepository) {
		super();
		this.movieRepository = movieRepository;
	}
	
	@RequestMapping(value="/movies", method = RequestMethod.GET)
	public List<Movie> getMovies()
	{
		return this.movieRepository.findAll();
	}
	
	@RequestMapping(value="/movies/{name}", method = RequestMethod.GET)
	public Movie getMovie(@PathVariable String name)
	{
		return this.movieRepository.findByName(name);
	}
	
	@RequestMapping(value="movies/add", method = RequestMethod.POST)
	public Movie addMovie(@RequestBody Movie movie, HttpServletResponse response){
				
		return this.movieRepository.save(movie);
	}
}
