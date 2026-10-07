package com.example.demo;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class StudentBackendApplicationTests {

	@Autowired
	private StudentRepository studentRepository;

	@Test
	void contextLoads() {
	}

	@Test
	@Transactional
	void studentSectionIsPersisted() {
		Student savedStudent = studentRepository.save(
				new Student(null, "Section Test", "CSE", "A"));

		Student loadedStudent = studentRepository.findById(savedStudent.getId()).orElseThrow();

		Assertions.assertEquals("A", loadedStudent.getSection());
	}

}
