package teambuilder.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemoryOfChaosRepository extends MongoRepository<teambuilder.model.MemoryOfChaos, String> {
}
