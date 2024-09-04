package org.roshanv99;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.roshanv99.ai.GPT;
import org.roshanv99.ai.VisionToText;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Objects;
import java.util.Properties;
import java.util.Scanner;
import org.json.JSONArray;
import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Start Application!");
            VisionToText vision = new VisionToText();
            String desc = vision.detectText("src/main/resources/test_image1.jpeg");
            if(!Objects.equals(desc, "")) {
                GPT gpt = new GPT();
                gpt.convertToJSON(desc);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

//    } catch (ProtocolException e) {
//            throw new RuntimeException(e);
//        } catch (MalformedURLException e) {
//            throw new RuntimeException(e);
//        } catch (UnsupportedEncodingException e) {
//            throw new RuntimeException(e);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }


    }

    private final Properties properties = new Properties();

    public Main(String filePath) {
        try (FileInputStream input = new FileInputStream(filePath)) {
            properties.load(input);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getProperty(String key) {
        return properties.getProperty(key);
    }
}
