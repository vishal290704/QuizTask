import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class TestApi {
    private static final String URL = "https://quizz-ml.onrender.com/sum"; // Change this if your Flask app runs on a
                                                                           // different port or host
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void main(String[] args) {
        List<Map<String, Object>> testCases = new ArrayList<>();

        // Define test case 1
        Map<String, Object> testCase1 = new HashMap<>();
        List<Map<String, Object>> userData1 = new ArrayList<>();
        userData1.add(
                Map.of("username", "Alice", "score", 75, "correct_answers", 15, "incorrect_answers", 5, "streak", 4));
        userData1.add(
                Map.of("username", "Bob", "score", 55, "correct_answers", 10, "incorrect_answers", 10, "streak", 2));
        testCase1.put("user_data", userData1);
        testCase1.put("averages", Map.of("average_score", 60, "average_correct_answers", 12,
                "average_incorrect_answers", 8, "average_streak", 3));

        // Define test case 2
        Map<String, Object> testCase2 = new HashMap<>();
        List<Map<String, Object>> userData2 = new ArrayList<>();
        userData2.add(
                Map.of("username", "Charlie", "score", 85, "correct_answers", 18, "incorrect_answers", 2, "streak", 7));
        userData2.add(
                Map.of("username", "David", "score", 45, "correct_answers", 9, "incorrect_answers", 12, "streak", 1));
        testCase2.put("user_data", userData2);
        testCase2.put("averages", Map.of("average_score", 65, "average_correct_answers", 13,
                "average_incorrect_answers", 7, "average_streak", 4));

        // Define test case 3
        Map<String, Object> testCase3 = new HashMap<>();
        List<Map<String, Object>> userData3 = new ArrayList<>();
        userData3.add(
                Map.of("username", "Eve", "score", 95, "correct_answers", 19, "incorrect_answers", 1, "streak", 9));
        userData3.add(
                Map.of("username", "Frank", "score", 35, "correct_answers", 7, "incorrect_answers", 13, "streak", 0));
        testCase3.put("user_data", userData3);
        testCase3.put("averages", Map.of("average_score", 70, "average_correct_answers", 14,
                "average_incorrect_answers", 6, "average_streak", 5));

        // Add test cases to list
        testCases.add(testCase1);
        testCases.add(testCase2);
        testCases.add(testCase3);

        // Send each test case to the API
        HttpClient client = HttpClient.newHttpClient();
        for (int i = 0; i < testCases.size(); i++) {
            try {
                String json = objectMapper.writeValueAsString(testCases.get(i));
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(URL))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(json))
                        .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                System.out.println("Test Case " + (i + 1) + ":");
                if (response.statusCode() == 200) {
                    System.out.println("Success");
                    System.out.println("Response: " + response.body());
                } else {
                    System.out.println("Failed with status code: " + response.statusCode());
                    System.out.println("Error: " + response.body());
                }
                System.out.println("\n========================================\n");

            } catch (Exception e) {
                System.err.println("Error with test case " + (i + 1) + ": " + e.getMessage());
            }
        }
    }
}