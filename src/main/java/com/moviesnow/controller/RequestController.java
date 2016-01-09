package com.moviesnow.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.http.HttpServletResponse;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.moviesnow.entities.Request;
import com.moviesnow.repository.RequestRepository;

@RestController
public class RequestController {
	
	RequestRepository requestRepository;

	@Autowired
	public RequestController(RequestRepository requestRepository) {
		super();
		this.requestRepository = requestRepository;
	}
	
	@RequestMapping(method = RequestMethod.POST, value= "/videos/rent")
	public Request addRequest(@RequestBody Request request, HttpServletResponse response){
		
		return this.requestRepository.save(request);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/request/accept")
	public Request acceptRequest(@RequestBody Request request, HttpServletResponse response){		
		Calendar cal = Calendar.getInstance();		
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");	
		LocalDate ld = new LocalDate(format1.format(cal.getTime()));		
		request.setCheckOutDate(ld);		
		return this.requestRepository.save(request);		
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/request/deny")
	public void declineRequest(@RequestBody Request request, HttpServletResponse response){					
		this.requestRepository.delete(request.getRequestId());	
	}
	

}
