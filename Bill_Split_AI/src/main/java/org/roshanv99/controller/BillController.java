package org.roshanv99.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.JsonObject;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.roshanv99.dto.Item;
import org.roshanv99.service.ai.GPT;
import org.roshanv99.service.ai.VisionToText;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/BillSplit/billImage")
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@Tag(name="BillController",description = "")
public class BillController {

    private static final Logger logger = LoggerFactory.getLogger(BillController.class);
    private final VisionToText vision;
    private final GPT gpt;
//    String desc = vision.detectText("src/main/resources/test_image1.jpeg");
//    if(!Objects.equals(desc, "")) {
//        gpt.convertToJSON(desc);
//    }

    @Autowired
    public BillController(VisionToText vision, GPT gpt) {
        this.vision = vision;
        this.gpt = gpt;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("file")MultipartFile file) {
        try {
            String result = vision.detectText(file);
            logger.info("Result Text from Vision: {}", result);
            JsonObject jsonObject = null;
            Map<String, Object> responseMap = new HashMap<>();
            if(!Objects.equals(result, "")) {
                jsonObject = gpt.convertToJSON(result);
                logger.info("JSONObject: {}", jsonObject);
                responseMap = new ObjectMapper().readValue(jsonObject.toString(), new TypeReference<Map<String, Object>>() {});
            }
            return ResponseEntity.ok(responseMap);
        } catch (IOException e) {
            return (ResponseEntity<Map<String, Object>>) ResponseEntity.status(500);
        }
    }
}
