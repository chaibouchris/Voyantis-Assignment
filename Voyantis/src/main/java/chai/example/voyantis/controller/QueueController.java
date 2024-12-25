package chai.example.voyantis.controller;

import chai.example.voyantis.service.QueueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @PostMapping("/queues/{queueName}")
    public ResponseEntity<Void> createQueue(@PathVariable String queueName) {
        try {
            queueService.createQueue(queueName);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{queueName}")
    public ResponseEntity<Void> addMessage(@PathVariable String queueName, @RequestBody String message) {
        queueService.addMessage(queueName, message);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{queueName}")
    public ResponseEntity<String> getMessage(
            @PathVariable String queueName,
            @RequestParam(defaultValue = "10000") int timeout) {
        try {
            String message = queueService.getMessage(queueName, timeout);
            if (message == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (InterruptedException e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @GetMapping("/queues")
    public ResponseEntity<Map<String, Integer>> getQueues() {
        return ResponseEntity.ok(queueService.getQueuesInfo());
    }
}
