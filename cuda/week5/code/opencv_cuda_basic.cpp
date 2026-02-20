/**
 * opencv_cuda_basic.cpp - OpenCV CUDA 기본 예제
 *
 * 컴파일: g++ opencv_cuda_basic.cpp -o opencv_cuda_basic \
 *         `pkg-config --cflags --libs opencv4`
 * 실행: ./opencv_cuda_basic [input.jpg]
 *
 * OpenCV의 CUDA 가속 기능을 사용하여 이미지 처리
 */

#include <opencv2/opencv.hpp>
#include <opencv2/cudaimgproc.hpp>
#include <opencv2/cudafilters.hpp>
#include <opencv2/cudaarithm.hpp>
#include <iostream>
#include <chrono>

using namespace cv;
using namespace std;

int main(int argc, char* argv[]) {
    cout << "==========================================" << endl;
    cout << "  OpenCV CUDA Basic Example" << endl;
    cout << "==========================================" << endl << endl;

    // CUDA 디바이스 정보 출력
    int deviceCount = cuda::getCudaEnabledDeviceCount();
    cout << "CUDA Devices: " << deviceCount << endl;

    if (deviceCount == 0) {
        cout << "No CUDA device found! Using CPU only." << endl;
        return -1;
    }

    cuda::DeviceInfo deviceInfo;
    cout << "Device: " << deviceInfo.name() << endl;
    cout << "Memory: " << deviceInfo.totalMemory() / (1024*1024) << " MB" << endl;
    cout << endl;

    // 이미지 로드
    Mat img;
    if (argc >= 2) {
        img = imread(argv[1]);
        if (img.empty()) {
            cout << "Cannot load: " << argv[1] << endl;
            return -1;
        }
        cout << "Loaded: " << argv[1] << " (" << img.cols << "x" << img.rows << ")" << endl;
    } else {
        // 테스트 이미지 생성
        img = Mat(1080, 1920, CV_8UC3);
        for (int y = 0; y < img.rows; y++) {
            for (int x = 0; x < img.cols; x++) {
                img.at<Vec3b>(y, x) = Vec3b(
                    x % 256,
                    y % 256,
                    (x + y) % 256
                );
            }
        }
        cout << "Generated test image (1920x1080)" << endl;
    }
    cout << endl;

    // ========== 테스트 1: 그레이스케일 변환 ==========
    cout << "--- Test 1: Grayscale Conversion ---" << endl;

    Mat gray_cpu;
    cuda::GpuMat d_img, d_gray;

    // CPU 버전
    auto start = chrono::high_resolution_clock::now();
    cvtColor(img, gray_cpu, COLOR_BGR2GRAY);
    auto end = chrono::high_resolution_clock::now();
    double cpu_time = chrono::duration<double, milli>(end - start).count();

    // GPU 버전
    d_img.upload(img);
    start = chrono::high_resolution_clock::now();
    cuda::cvtColor(d_img, d_gray, COLOR_BGR2GRAY);
    end = chrono::high_resolution_clock::now();
    double gpu_time = chrono::duration<double, milli>(end - start).count();

    cout << "CPU: " << cpu_time << " ms" << endl;
    cout << "GPU: " << gpu_time << " ms" << endl;
    cout << "Speedup: " << cpu_time / gpu_time << "x" << endl << endl;

    // ========== 테스트 2: 가우시안 블러 ==========
    cout << "--- Test 2: Gaussian Blur ---" << endl;

    Mat blur_cpu;
    cuda::GpuMat d_blur;

    // CPU 버전
    start = chrono::high_resolution_clock::now();
    GaussianBlur(img, blur_cpu, Size(15, 15), 0);
    end = chrono::high_resolution_clock::now();
    cpu_time = chrono::duration<double, milli>(end - start).count();

    // GPU 버전
    Ptr<cuda::Filter> gaussianFilter =
        cuda::createGaussianFilter(d_img.type(), -1, Size(15, 15), 0);
    start = chrono::high_resolution_clock::now();
    gaussianFilter->apply(d_img, d_blur);
    end = chrono::high_resolution_clock::now();
    gpu_time = chrono::duration<double, milli>(end - start).count();

    cout << "CPU: " << cpu_time << " ms" << endl;
    cout << "GPU: " << gpu_time << " ms" << endl;
    cout << "Speedup: " << cpu_time / gpu_time << "x" << endl << endl;

    // ========== 테스트 3: 리사이즈 ==========
    cout << "--- Test 3: Resize (50%) ---" << endl;

    Mat resize_cpu;
    cuda::GpuMat d_resize;

    // CPU 버전
    start = chrono::high_resolution_clock::now();
    resize(img, resize_cpu, Size(), 0.5, 0.5);
    end = chrono::high_resolution_clock::now();
    cpu_time = chrono::duration<double, milli>(end - start).count();

    // GPU 버전
    start = chrono::high_resolution_clock::now();
    cuda::resize(d_img, d_resize, Size(), 0.5, 0.5);
    end = chrono::high_resolution_clock::now();
    gpu_time = chrono::duration<double, milli>(end - start).count();

    cout << "CPU: " << cpu_time << " ms" << endl;
    cout << "GPU: " << gpu_time << " ms" << endl;
    cout << "Speedup: " << cpu_time / gpu_time << "x" << endl << endl;

    // ========== 테스트 4: 소벨 엣지 ==========
    cout << "--- Test 4: Sobel Edge Detection ---" << endl;

    Mat sobel_cpu, gray_for_sobel;
    cuda::GpuMat d_sobel;

    cvtColor(img, gray_for_sobel, COLOR_BGR2GRAY);

    // CPU 버전
    start = chrono::high_resolution_clock::now();
    Sobel(gray_for_sobel, sobel_cpu, CV_8U, 1, 1);
    end = chrono::high_resolution_clock::now();
    cpu_time = chrono::duration<double, milli>(end - start).count();

    // GPU 버전
    Ptr<cuda::Filter> sobelFilter =
        cuda::createSobelFilter(CV_8UC1, CV_8UC1, 1, 1);
    start = chrono::high_resolution_clock::now();
    sobelFilter->apply(d_gray, d_sobel);
    end = chrono::high_resolution_clock::now();
    gpu_time = chrono::duration<double, milli>(end - start).count();

    cout << "CPU: " << cpu_time << " ms" << endl;
    cout << "GPU: " << gpu_time << " ms" << endl;
    cout << "Speedup: " << cpu_time / gpu_time << "x" << endl << endl;

    // 결과 저장
    Mat result;
    d_blur.download(result);
    imwrite("opencv_blur_output.jpg", result);

    d_sobel.download(result);
    imwrite("opencv_edge_output.jpg", result);

    cout << "Results saved:" << endl;
    cout << "  - opencv_blur_output.jpg" << endl;
    cout << "  - opencv_edge_output.jpg" << endl;

    return 0;
}
