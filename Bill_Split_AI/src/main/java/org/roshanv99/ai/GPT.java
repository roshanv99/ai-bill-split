package org.roshanv99.ai;

import com.theokanning.openai.service.OpenAiService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.roshanv99.utils.ConfigLoader;
import org.roshanv99.utils.StringToJSON;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class GPT {
    static ConfigLoader configLoader = new ConfigLoader(".properties");
    private static final String API_KEY = configLoader.getProperty("openai-key");
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String MODEL = "gpt-3.5-turbo";


    public JsonObject convertToJSON(String text) throws IOException {
        OpenAiService service = new OpenAiService(API_KEY);
        String prompt = "Convert the following into a JSON structured with the below format \n {" +
                "{" +
                "items : [" +
                "  item_name: <name>" +
                "  item_quantity: <quantity>" +
                "  item_price: <price>" +
                "]" +
                "tax_component: <total_tax_amount>" +
                "service_charge: <tip or service charge if any>" +
                "}" +
                "The content to interpret it from is as follows: \n" +
                text;

        URL url = new URL("https://api.openai.com/v1/chat/completions");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Authorization", "Bearer "+ API_KEY);
        System.out.println("AUthL " + "Bearer " + API_KEY );
        connection.setDoOutput(true);
        String model = "gpt-3.5-turbo";
        JSONArray messages = new JSONArray();
        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);
        messages.put(userMessage);

        int maxTokens = 4000;

        connection.setDoOutput(true);

        System.out.println(connection);

        JSONObject requestBody = new JSONObject();
        requestBody.put("model", model);
        requestBody.put("messages", messages);
        requestBody.put("max_tokens", maxTokens);

        OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
        writer.write(requestBody.toString());
        writer.flush();

        // Leggi la risposta
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }

        in.close();
        StringToJSON stringToJSON = new StringToJSON();
        JsonNode jsonFile = StringToJSON.convertStringToJSON(response.toString());
        JsonNode choiceNode = jsonFile.get("choices");
        System.out.println("1 ==> " + choiceNode);
        if(choiceNode.isArray() && choiceNode.size() > 0) {
            JsonNode firstNode = StringToJSON.convertStringToJSON(choiceNode.get(0).get("message").toString());
            System.out.println("2 ==> " + firstNode.get("content"));
            String content = firstNode.get("content").toString().replace("\\\"", "\"").replace("\\n", "").replace("\"{", "{").replace("}\"", "}");
            JsonObject jsonObject = JsonParser.parseString(content).getAsJsonObject();
            System.out.println(jsonObject);
            return jsonObject;
        } else
            return null;
    }
}