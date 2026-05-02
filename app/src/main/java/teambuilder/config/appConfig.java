package teambuilder.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Configuration
public class appConfig {

    private static final Logger logger = LoggerFactory.getLogger(appConfig.class);

    @EventListener(ApplicationReadyEvent.class)
    public void printBanner () {
        logger.info("==============================================");
        logger.info("     TeamBuilder Application Started");
        logger.info("     API running on: http://localhost:8080");
        logger.info("     API Docs: http://localhost:8080/api/characters");
        logger.info("==============================================");
    }
}
