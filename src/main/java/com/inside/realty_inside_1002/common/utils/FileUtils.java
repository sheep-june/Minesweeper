package com.inside.realty_inside_1002.common.utils;

import com.inside.realty_inside_1002.common.payload.FileDto;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component // 스프링 컴포넌트로 등록되어 의존성 주입이 가능하도록 함
public class FileUtils {

    /**
     * 업로드된 파일 목록을 처리하여 FileDto 객체 리스트로 변환하는 메서드.
     * 각 파일을 지정된 경로에 저장하고, 저장된 파일의 정보를 FileDto로 반환.
     *
     * @param files 업로드된 MultipartFile 리스트
     * @return 저장된 파일의 정보를 담은 FileDto 리스트
     * @throws Exception 파일 저장 중 예외 발생 시
     */
    public List<FileDto> parseFileInfo(List<MultipartFile> files) throws Exception {

        List<FileDto> fileDtos = new ArrayList<>(); // 저장된 파일 정보를 담을 리스트

        // 현재 날짜를 "yyyyMMdd" 형식으로 포맷
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
        ZonedDateTime current = ZonedDateTime.now();

        String sourcePath = current.format(format);
        // 파일을 저장할 기본 경로 설정 (서버 환경 시 주석 해제)
         String path = "/app/data/realtyInside" + "/localImages/" + sourcePath;

        File file = new File(path);
        if (!file.exists()) { // 디렉토리가 존재하지 않으면 생성
            file.mkdirs();
        }

        String newFileName, originalFileExtension, contentType;

        // 업로드된 각 파일을 처리
        for (MultipartFile multipartFile : files) {
            contentType = multipartFile.getContentType(); // 파일의 MIME 타입 가져오기

            if (ObjectUtils.isEmpty(contentType)) { // MIME 타입이 비어있으면 다음 파일로
                break;
            } else {
                // 지원되는 이미지 형식에 따라 파일 확장자 설정
                if (contentType.contains("image/jpeg")) {
                    originalFileExtension = ".jpg";
                } else if (contentType.contains("image/png")) {
                    originalFileExtension = ".png";
                } else if (contentType.contains("image/gif")) {
                    originalFileExtension = ".gif";
                } else {
                    break; // 지원되지 않는 형식이면 다음 파일로
                }
            }

            newFileName = System.nanoTime() + originalFileExtension; // 고유한 파일명 생성

            String filePath = path + "/" + newFileName; // 저장할 파일의 전체 경로
            String imageSourcePath = "/images/" + sourcePath + "/" + newFileName; // 웹에서 접근할 수 있는 이미지 경로

            // FileDto 객체 생성 및 파일 정보 설정
            FileDto fileDto = FileDto.builder()
                    .originalFileName(multipartFile.getOriginalFilename()) // 원본 파일명
                    .storedFilePath(filePath) // 서버에 저장된 파일 경로
                    .fileSize(multipartFile.getSize()) // 파일 크기
                    .imageSourcePath(imageSourcePath) // 이미지 접근 경로
                    .build();

            fileDtos.add(fileDto); // FileDto 리스트에 추가

            file = new File(filePath); // 저장할 파일 객체 생성

            multipartFile.transferTo(file); // 실제 파일을 지정된 경로에 저장
        }

        return fileDtos; // 저장된 파일 정보 리스트 반환
    }

    /**
     * 지정된 경로에 있는 파일을 삭제하는 메서드.
     *
     * @param storedFilePath 삭제할 파일의 전체 경로
     * @return 파일 삭제 성공 여부 (true: 성공, false: 실패)
     */
    public boolean deleteFile(String storedFilePath) {
        File file = new File(storedFilePath); // 삭제할 파일 객체 생성
        if (file.exists()) { // 파일이 존재하면 삭제 시도
            return file.delete();
        } else { // 파일이 존재하지 않으면 로그 출력 후 false 반환
            System.out.println("File not found: " + storedFilePath);
            return false;
        }
    }
}