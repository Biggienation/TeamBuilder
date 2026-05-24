package teambuilder.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PureFictionRepository extends MongoRepository<teambuilder.model.PureFiction, String> {
}
