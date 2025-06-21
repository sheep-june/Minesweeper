package com.inside.realty_inside_1002.admin.controller;

import com.inside.realty_inside_1002.admin.service.impl.AdminServiceImpl;
import com.inside.realty_inside_1002.common.payload.MemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminServiceImpl adminService;

    @GetMapping("/fetchManualAuthList")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DEVELOPER')")
    public ResponseEntity<List<MemberDto>> fetchManualAuthList() {
        log.debug("fetchManualAuthList");

        return adminService.fetchManualAuthList();
    }

    @PostMapping("/updateManualAuth")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DEVELOPER')")
    public ResponseEntity<List<MemberDto>> updateManualAuth(@RequestBody MemberDto memberDto) {
        log.debug("updateManualAuth memberDto: {}", memberDto);

        return adminService.updateManualAuth(memberDto);
    }

    @GetMapping("/fetchTotalMemberList")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DEVELOPER')")
    public ResponseEntity<List<MemberDto>> fetchTotalMemberList() {
        log.debug("fetchTotalMemberList");
        return adminService.fetchTotalMemberList();
    }

    @DeleteMapping("/deleteMember")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DEVELOPER')")
    public void deleteMember(@RequestParam(name = "memberId") String memberId) {
        log.debug("deleteMember memberId: {}", memberId);
        adminService.deleteMember(memberId);
    }
}
