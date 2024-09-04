package org.roshanv99.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StringToJSON {
    public static JsonNode convertStringToJSON(String jsonString) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        // Convert string to JSON object
        JsonNode jsonNode = objectMapper.readTree(jsonString);

        return jsonNode;
    }
}
