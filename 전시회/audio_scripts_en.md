# English Audio Scripts for Exhibition Website

각 페이지의 영어 음성 스크립트입니다. TTS(Text-to-Speech)로 MP3 파일을 생성하세요.

---

## 1. home_en.mp3 (약 2분)

Welcome to HKME's Smart Shredder Monitoring System.

Our AI-based real-time monitoring prevents overload, extends equipment life, and minimizes downtime.

With our solution, you can achieve 70% reduction in unplanned downtime, 30% savings in maintenance costs, and 20% improvement in energy efficiency.

Traditional shredder operations face several challenges. Manual overload response requires operators to manually shut down equipment during overload conditions. Unpredictable failures occur because bearing wear and blade damage cannot be detected in advance. Lack of operational data makes it difficult to set optimal operating conditions. And without remote management, equipment status can only be checked on-site.

Our smart monitoring solutions address these challenges. Auto overload protection monitors current and torque in real-time, automatically slowing down or reversing when overload is detected. AI predictive maintenance analyzes vibration and temperature patterns to predict bearing and blade wear in advance. Data-driven optimization automatically learns optimal conditions for each material type. And remote monitoring allows you to check real-time status anywhere via smartphone or PC with instant alerts on anomalies.

Experience our live monitoring demo to see the power of smart shredder monitoring firsthand.

---

## 2. system_en.mp3 (약 1분)

This is the system configuration of our smart shredder monitoring system.

Our system uses 12 sensors to comprehensively monitor all critical areas of shredders and crushers. These include 4 vibration sensors, 3 temperature sensors, 2 current sensors, 1 speed sensor, 1 proximity sensor, and 1 dust sensor.

Each sensor is industrial-grade with high precision and IP67 protection rating for dust and water resistance.

The vibration sensors measure from 0 to 50 millimeters per second with a frequency range of 10 hertz to 10 kilohertz. Temperature sensors use PT100 RTD with accuracy of plus or minus 0.5 degrees Celsius. Current sensors can measure up to 200 amps with 1% accuracy.

All sensor data is processed by our Edge AI Gateway. This edge computing device features an ARM Cortex-M4 processor, performs real-time FFT and envelope analysis, runs AI inference for anomaly detection and RUL prediction, and supports Modbus, Ethernet, and 4G LTE communication.

---

## 3. diagram_en.mp3 (약 50초)

This is our system architecture diagram showing the three-layer structure: Field Sensors, Edge AI Gateway, and Cloud Platform.

At the field sensor layer, 12 industrial high-precision sensors monitor all critical components of the shredder. Data is transmitted via RS485 Modbus protocol.

The Edge AI Gateway is the brain of our system. It collects data from all sensors, performs real-time signal processing including FFT analysis, runs AI inference for anomaly detection, executes overload protection logic, and controls the inverter directly. Even when network connectivity is lost, the gateway operates independently with response times under 100 milliseconds.

Data is then transmitted to the cloud platform via 4G LTE or MQTT protocol. The cloud provides a comprehensive analytics dashboard, mobile app notifications, automatic report generation, and multi-site unified management.

---

## 4. monitor_en.mp3 (약 1분)

Welcome to the real-time monitoring dashboard. Here you can see live sensor data, equipment status, and AI predictions.

On the left side, you can see the 3D visualization of your shredder equipment. The equipment list shows the status of each machine with color-coded indicators: green for normal, yellow for warning, and red for critical.

The sensor data panel displays real-time readings from all 12 sensors including vibration, temperature, motor current, speed, and dust levels. Each sensor card shows the current value and a progress bar indicating the operating range.

Below that, you can see the trend chart showing sensor data over the last 5 minutes. This helps identify gradual changes that might indicate developing problems.

The AI predictive maintenance panel shows the bearing remaining useful life prediction. Our AI analyzes sensor patterns to predict when maintenance will be needed, showing health score, anomaly probability, daily wear rate, and days until next maintenance.

You can test different scenarios using the demo scenario selector. Try "Normal Operation" for steady-state conditions, "Gradual Degradation" to simulate bearing wear, "Sudden Anomaly" for overload situations, or "Predictive Alert" to see maintenance notifications.

---

## 5. about_en.mp3 (약 1분)

HKME Co., Ltd. is a specialized manufacturer of industrial crushing and mixing equipment with over 40 years of experience.

We are specialists in crushing, classifying, mixing, screening, and conveying systems. With over 500 equipment installations and 98% customer satisfaction, we have helped our clients achieve 70% reduction in unplanned downtime.

Our core values are accuracy, real-time performance, predictability, and safety. We use high-precision sensors and verified algorithms for accurate equipment diagnosis. Our Edge AI technology detects anomalies in real-time without delay. Machine learning accurately predicts wear timing and replacement cycles. And our overload protection prevents equipment damage and accidents.

Our key technologies include the Edge AI Gateway for on-site real-time analysis, advanced load analysis algorithms specific to crushing equipment, AI-based predictive maintenance, and a comprehensive cloud platform for multi-site management.

For inquiries, please contact us at topcrusher@naver.com or call 031-427-7783. We look forward to partnering with you on your smart factory journey.

---

## TTS 생성 방법

1. **Google Cloud Text-to-Speech** 또는 **Amazon Polly** 사용 권장
2. 음성: en-US-Standard-D (남성) 또는 en-US-Standard-C (여성)
3. 속도: 0.9~1.0 (약간 느리게)
4. 파일명: home_en.mp3, system_en.mp3, diagram_en.mp3, monitor_en.mp3, about_en.mp3
5. 저장 위치:
   - `webserver_toggle/audio/`
   - `webserver_separate/audio/`
