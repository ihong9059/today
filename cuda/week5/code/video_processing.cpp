/**
 * video_processing.cpp - OpenCV CUDA 실시간 영상 처리
 *
 * 컴파일: g++ video_processing.cpp -o video_processing \
 *         `pkg-config --cflags --libs opencv4`
 * 실행: ./video_processing [video.mp4 또는 카메라번호]
 *
 * 실시간 영상에 CUDA 가속 필터 적용
 */

#include <opencv2/opencv.hpp>
#include <opencv2/cudaimgproc.hpp>
#include <opencv2/cudafilters.hpp>
#include <iostream>

using namespace cv;
using namespace std;

int main(int argc, char* argv[]) {
    cout << "==========================================" << endl;
    cout << "  Real-time Video Processing with CUDA" << endl;
    cout << "==========================================" << endl;
    cout << "Press:" << endl;
    cout << "  1 - Original" << endl;
    cout << "  2 - Grayscale" << endl;
    cout << "  3 - Gaussian Blur" << endl;
    cout << "  4 - Edge Detection" << endl;
    cout << "  q - Quit" << endl;
    cout << "==========================================" << endl << endl;

    // CUDA 확인
    if (cuda::getCudaEnabledDeviceCount() == 0) {
        cout << "No CUDA device found!" << endl;
        return -1;
    }

    // 비디오 소스 열기
    VideoCapture cap;
    if (argc >= 2) {
        // 파일 또는 카메라 번호
        if (isdigit(argv[1][0])) {
            cap.open(atoi(argv[1]));
        } else {
            cap.open(argv[1]);
        }
    } else {
        // 기본 카메라
        cap.open(0);
    }

    if (!cap.isOpened()) {
        cout << "Cannot open video source!" << endl;
        return -1;
    }

    int width = (int)cap.get(CAP_PROP_FRAME_WIDTH);
    int height = (int)cap.get(CAP_PROP_FRAME_HEIGHT);
    double fps = cap.get(CAP_PROP_FPS);
    cout << "Video: " << width << "x" << height << " @ " << fps << " fps" << endl;

    // CUDA 필터 생성
    Ptr<cuda::Filter> gaussianFilter =
        cuda::createGaussianFilter(CV_8UC3, -1, Size(15, 15), 0);
    Ptr<cuda::Filter> sobelFilter =
        cuda::createSobelFilter(CV_8UC1, CV_8UC1, 1, 1);

    Mat frame, display;
    cuda::GpuMat d_frame, d_result, d_gray;
    int mode = 1;  // 1: original, 2: gray, 3: blur, 4: edge

    double total_time = 0;
    int frame_count = 0;

    while (true) {
        cap >> frame;
        if (frame.empty()) break;

        auto start = chrono::high_resolution_clock::now();

        // GPU로 업로드
        d_frame.upload(frame);

        switch (mode) {
            case 1:  // Original
                d_result = d_frame;
                break;

            case 2:  // Grayscale
                cuda::cvtColor(d_frame, d_result, COLOR_BGR2GRAY);
                break;

            case 3:  // Gaussian Blur
                gaussianFilter->apply(d_frame, d_result);
                break;

            case 4:  // Edge Detection
                cuda::cvtColor(d_frame, d_gray, COLOR_BGR2GRAY);
                sobelFilter->apply(d_gray, d_result);
                break;
        }

        // GPU에서 다운로드
        d_result.download(display);

        auto end = chrono::high_resolution_clock::now();
        double proc_time = chrono::duration<double, milli>(end - start).count();
        total_time += proc_time;
        frame_count++;

        // FPS 표시
        double avg_fps = frame_count / (total_time / 1000.0);
        string info = "Mode: " + to_string(mode) +
                      " | GPU: " + to_string(proc_time).substr(0, 5) + "ms" +
                      " | FPS: " + to_string(avg_fps).substr(0, 5);
        putText(display, info, Point(10, 30), FONT_HERSHEY_SIMPLEX,
                0.7, Scalar(0, 255, 0), 2);

        imshow("CUDA Video Processing", display);

        // 키 입력
        int key = waitKey(1) & 0xFF;
        if (key == 'q' || key == 27) break;
        if (key >= '1' && key <= '4') mode = key - '0';
    }

    cout << endl << "Average processing time: "
         << total_time / frame_count << " ms" << endl;
    cout << "Average FPS: " << frame_count / (total_time / 1000.0) << endl;

    cap.release();
    destroyAllWindows();

    return 0;
}
