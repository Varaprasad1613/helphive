package com.helphive.api.post;

import com.helphive.api.user.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "post_progress_updates")
public class PostProgressUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private HelpPost post;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private AppUser author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private PostProgressUpdate parent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 12)
    private PostProgressUpdateType type;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public HelpPost getPost() { return post; }
    public void setPost(HelpPost post) { this.post = post; }
    public AppUser getAuthor() { return author; }
    public void setAuthor(AppUser author) { this.author = author; }
    public PostProgressUpdate getParent() { return parent; }
    public void setParent(PostProgressUpdate parent) { this.parent = parent; }
    public PostProgressUpdateType getType() { return type; }
    public void setType(PostProgressUpdateType type) { this.type = type; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Instant getCreatedAt() { return createdAt; }
}
