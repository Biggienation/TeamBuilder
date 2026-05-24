package teambuilder.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralRepository extends MongoRepository<teambuilder.model.General, String> {
}
