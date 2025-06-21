package com.inside.realty_inside_1002.admin.service;

import com.inside.realty_inside_1002.common.payload.MemberDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {
    ResponseEntity<List<MemberDto>> fetchManualAuthList();

    ResponseEntity<List<MemberDto>> updateManualAuth(MemberDto memberDto);

    ResponseEntity<List<MemberDto>> fetchTotalMemberList();

    void deleteMember(String memberId);
}
