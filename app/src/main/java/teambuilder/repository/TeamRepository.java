package teambuilder.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import teambuilder.model.Team;

@Repository
public interface TeamRepository extends MongoRepository<Team, String> {
}
