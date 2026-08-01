package com.cabbooking.exception;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cabbooking.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Path ERROR_LOG_FILE =
            Paths.get(System.getProperty("user.home"), "Desktop", "cab-booking-errors.log");

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        logException(ex);

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(
                        HttpStatus.NOT_FOUND.value(),
                        false,
                        ex.getMessage(),
                        null));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequest(BadRequestException ex) {
        logException(ex);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(
                        HttpStatus.BAD_REQUEST.value(),
                        false,
                        ex.getMessage(),
                        null));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Object>> handleUnauthorized(UnauthorizedException ex) {
        logException(ex);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(
                        HttpStatus.UNAUTHORIZED.value(),
                        false,
                        ex.getMessage(),
                        null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {
        logException(ex);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        false,
                        "Something went wrong. Please try again later.",
                        null));
    }

    private void logException(Exception ex) {
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        ex.printStackTrace(printWriter);

        String logEntry = String.format(
                "========================================\n" +
                        "Timestamp: %s\n" +
                        "Exception: %s\n" +
                        "Message: %s\n" +
                        "%s\n\n",
                LocalDateTime.now().format(FORMATTER),
                ex.getClass().getName(),
                ex.getMessage(),
                stringWriter.toString().trim());

        try {
            if (ERROR_LOG_FILE.getParent() != null) {
                Files.createDirectories(ERROR_LOG_FILE.getParent());
            }

            Files.writeString(
                    ERROR_LOG_FILE,
                    logEntry,
                    StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND);
        } catch (IOException ioException) {
            System.err.println("Unable to write exception log to desktop file: " + ioException.getMessage());
        }
    }
}