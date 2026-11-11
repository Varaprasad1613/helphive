package com.helphive.api.chat;

import jakarta.validation.constraints.NotNull;

public record ChatReportStatusRequest(@NotNull ChatReportStatus status) {}
