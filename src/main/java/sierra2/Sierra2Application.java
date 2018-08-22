package sierra2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"sierra2"})
@EntityScan(basePackages = {"sierra2"})
public class Sierra2Application {

	public static void main(String[] args) {
		SpringApplication.run(Sierra2Application.class, args);
	}
}
