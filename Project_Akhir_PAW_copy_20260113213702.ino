#include <WiFi.h>
#include <HTTPClient.h>

#define LDR_PIN     34  
#define LED_PIN     26
#define BUZZER_PIN  27

int ambangGelap = 2000;   

// GANTI SESUAI WIFI KAMU
const char* ssid = "nazs";
const char* password = "krokkrokkrakkrokkrok";

// GANTI IP LAPTOP + PORT BACKEND
const char* serverURL = "http://172.20.10.3:3000/api/sensor";

void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // 🔌 KONEK WIFI
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected");
  Serial.println(WiFi.localIP());
}

void loop() {
  int nilaiCahaya = analogRead(LDR_PIN);  
  Serial.print("Nilai Cahaya: ");
  Serial.println(nilaiCahaya);

  // LOGIKA LAMPU & BUZZER (SUDAH BENAR)
if (nilaiCahaya < ambangGelap) {
  // GELAP
  digitalWrite(LED_PIN, HIGH);
  digitalWrite(BUZZER_PIN, HIGH);
} else {
  // TERANG
  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);
}


  // 📡 KIRIM DATA KE BACKEND
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    // PAYLOAD SESUAI BACKEND
    String payload = "{";
    payload += "\"cahaya\":" + String(nilaiCahaya);
    payload += "}";

    int httpResponseCode = http.POST(payload);

    Serial.print("HTTP Response Code: ");
    Serial.println(httpResponseCode);

    http.end();
  } else {
    Serial.println("WiFi not connected");
  }

  delay(5000); // kirim data tiap 5 detik
}
