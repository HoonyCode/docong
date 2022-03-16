package com.b5f1.docong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DocongApplication {

	public static void main(String[] args) {
//		SpringApplication.run(DocongApplication.class, args);
		SpringApplication app = new SpringApplication(DocongApplication.class);
		app.addListeners(new ApplicationPidFileWriter());
		app.run(args);
	}

}
