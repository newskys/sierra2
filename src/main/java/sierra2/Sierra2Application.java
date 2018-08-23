package sierra2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"sierra2"})
public class Sierra2Application {

	public static void main(String[] args) {
		SpringApplication.run(Sierra2Application.class, args);
	}
}
