package com.inside.realty_inside_1002.common.payload;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileDto {

    private String originalFileName;
    private String storedFilePath;
    private String imageSourcePath;
    private Long fileSize;

}
