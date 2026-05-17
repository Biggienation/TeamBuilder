package teambuilder.util;

import java.util.*;

public class ItemRecommender {

    /**
     * Recommends the best missing item to add to your list.
     *
     * @param ownedItems  items you already have
     * @param objects     list of objects, each containing exactly 4 items
     * @return            missing items ranked by weighted score (highest first)
     */
    public static List<Map.Entry<String, Double>> recommend(Set<String> ownedItems, List<Set<String>> objects) {
        Map<String, Double> scores = new HashMap<>();

        for (Set<String> obj : objects) {
            // Weight = how many items in this object you already own
            long weight = obj.stream().filter(ownedItems::contains).count();

            for (String item : obj) {
                if (!ownedItems.contains(item)) {
                    scores.merge(item, (double) weight, Double::sum);
                }
            }
        }

        List<Map.Entry<String, Double>> ranked = new ArrayList<>(scores.entrySet());
        ranked.sort((a, b) -> Double.compare(b.getValue(), a.getValue()));
        return ranked;
    }

    public static void main(String[] args) {
        // Example: items you own
        Set<String> ownedItems = new HashSet<>(Arrays.asList("A", "B", "C"));

        // Example: objects (each with 4 items)
        List<Set<String>> objects = Arrays.asList(
            new HashSet<>(Arrays.asList("A", "B", "D", "E")),   // weight 2 (A,B owned)
            new HashSet<>(Arrays.asList("A", "C", "D", "F")),   // weight 2 (A,C owned)
            new HashSet<>(Arrays.asList("X", "Y", "Z", "D")),   // weight 0 (none owned)
            new HashSet<>(Arrays.asList("B", "C", "D", "G"))    // weight 2 (B,C owned)
        );

        List<Map.Entry<String, Double>> results = recommend(ownedItems, objects);

        System.out.println("Missing items ranked by weighted score:");
        for (Map.Entry<String, Double> entry : results) {
            System.out.println("  " + entry.getKey() + " -> score: " + entry.getValue());
        }
    }
}
