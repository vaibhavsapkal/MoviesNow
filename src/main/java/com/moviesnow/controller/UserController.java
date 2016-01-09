package com.moviesnow.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.moviesnow.entities.User;
import com.moviesnow.repository.UserRepository;

@RestController
public class UserController {
	
	UserRepository userRepository;
	
	@Autowired
	public UserController(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	@RequestMapping(value="/signIn", method = RequestMethod.POST)
	public User getUser(@RequestBody User user, HttpServletResponse response) 
	{
		user =  this.userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if(user == null)
		{
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return null;
		}
		else
			return user;
	}
	
	@RequestMapping(value="/signUp", method = RequestMethod.POST)
	public User createUser(@RequestBody User user, HttpServletResponse response) 
	{
		return this.userRepository.save(user);	
	}
	
}
