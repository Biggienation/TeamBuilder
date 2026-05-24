package teambuilder.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnomalyArbitrationRepository extends MongoRepository<teambuilder.model.AnomalyArbitration, String> {
}
