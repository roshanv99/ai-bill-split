package org.roshanv99;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try {
//            System.out.println("Start Application!");
//            VisionToText vision = new VisionToText();
//            String desc = vision.detectText("src/main/resources/test_image1.jpeg");
//            if(!Objects.equals(desc, "")) {
//                GPT gpt = new GPT();
//                gpt.convertToJSON(desc);
//            }
            SpringApplication.run(Main.class, args);
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

//    private final Properties properties = new Properties();

//    public Main(String filePath) {
//        try (FileInputStream input = new FileInputStream(filePath)) {
//            properties.load(input);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

//    public String getProperty(String key) {
//        return properties.getProperty(key);
//    }
}
