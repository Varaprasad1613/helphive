package com.helphive.api.config;

import com.helphive.api.post.Category;
import com.helphive.api.post.HelpPost;
import com.helphive.api.post.HelpPostRepository;
import com.helphive.api.post.PostStatus;
import com.helphive.api.post.PostType;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class DemoDataConfig {
    @Bean
    @Profile("!test")
    CommandLineRunner seedDemoPosts(HelpPostRepository repository) {
        return args -> {
            if (repository.count() > 0) return;
            repository.saveAll(List.of(
                    post("Math tutor for Saturday study group", "Looking for someone comfortable with algebra to help three high-school students prepare for next week's exam.", "Maya Chen", "maya@example.com", "Riverside Library", Category.EDUCATION, PostType.REQUEST, PostStatus.OPEN),
                    post("I can repair slow laptops", "Happy to help neighbors clean up storage, remove unwanted software, and make older Windows laptops run smoothly again.", "Noah Williams", "noah@example.com", "Downtown", Category.TECHNOLOGY, PostType.OFFER, PostStatus.OPEN),
                    post("Ride needed for a medical appointment", "I need a ride to the community clinic on Friday morning. The round trip should take about ninety minutes.", "Elena Garcia", "elena@example.com", "Eastwood", Category.TRANSPORTATION, PostType.REQUEST, PostStatus.IN_PROGRESS),
                    post("Free beginner yoga session", "Certified instructor offering a relaxed outdoor yoga class. Bring a mat or towel; every experience level is welcome.", "Priya Shah", "priya@example.com", "Maple Park", Category.WELLNESS, PostType.OFFER, PostStatus.OPEN),
                    post("Help building two raised garden beds", "I have the timber and tools, but an extra pair of hands would make assembling the garden beds much easier.", "Theo Martin", "theo@example.com", "North Hills", Category.HOME_AND_GARDEN, PostType.REQUEST, PostStatus.OPEN),
                    post("Conversational Spanish practice", "Native Spanish speaker offering friendly thirty-minute conversation exchanges for anyone wanting regular practice.", "Sofia Reyes", "sofia@example.com", "Online", Category.EDUCATION, PostType.OFFER, PostStatus.COMPLETED)
            ));
        };
    }

    private HelpPost post(String title, String description, String author, String contact, String location,
                          Category category, PostType type, PostStatus status) {
        HelpPost post = new HelpPost();
        post.setTitle(title);
        post.setDescription(description);
        post.setAuthorName(author);
        post.setContact(contact);
        post.setLocation(location);
        post.setCategory(category);
        post.setType(type);
        post.setStatus(status);
        return post;
    }
}
