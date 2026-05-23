package teambuilder.service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import java.io.IOException;
import java.util.Arrays;
import org.springframework.stereotype.Service;

@Service
public class UtilService {

    public String[] getProfileIcons() throws IOException {
        Resource[] resources = new PathMatchingResourcePatternResolver()
                .getResources("classpath:/static/images/profileicon/*");

        return Arrays.stream(resources)
                .map(Resource::getFilename)
                .toArray(String[]::new);
    }

}
