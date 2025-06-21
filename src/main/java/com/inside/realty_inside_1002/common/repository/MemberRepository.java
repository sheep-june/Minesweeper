package com.inside.realty_inside_1002.common.repository;

import com.inside.realty_inside_1002.common.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(String id);

    List<Member> findByAddressAuthTrueAndRegionIsNull();

    Optional<Member> findByRegion(String region);
}
