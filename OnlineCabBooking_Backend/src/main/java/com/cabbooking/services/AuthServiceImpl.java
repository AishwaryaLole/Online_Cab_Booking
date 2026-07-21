package com.cabbooking.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.entities.User;
import com.cabbooking.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthServices {
	
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	
	public AuthServiceImpl(UserRepository userRepository , ModelMapper modelMapper) {
	    this.userRepository = userRepository;
	    this.modelMapper = modelMapper;
	    
	}

	@Override
	public String register(RegisterRequest request) {
         
		 User user = modelMapper.map(request, User.class);

	        userRepository.save(user);

		return "User Register Successfully";
	}

}
