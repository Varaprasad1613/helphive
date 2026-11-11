package com.helphive.api.chat;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatReportRepository extends JpaRepository<ChatReport, Long> {
    List<ChatReport> findAllByOrderByCreatedAtDesc();
}
