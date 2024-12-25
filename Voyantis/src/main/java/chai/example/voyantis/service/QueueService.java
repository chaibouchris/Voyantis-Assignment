package chai.example.voyantis.service;

import chai.example.voyantis.model.QueueModel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class QueueService {

    private final Map<String, QueueModel> queues = new HashMap<>();

    public void createQueue(String queueName) {
        if (queues.containsKey(queueName)) {
            throw new IllegalArgumentException("Queue already exists");
        }
        queues.put(queueName, new QueueModel(queueName));
    }

    public void addMessage(String queueName, String message) {
        queues.putIfAbsent(queueName, new QueueModel(queueName));
        queues.get(queueName).addMessage(message);
    }

    public String getMessage(String queueName, int timeout) throws InterruptedException {
        QueueModel queue = queues.get(queueName);
        if (queue == null) {
            throw new IllegalArgumentException("Queue does not exist");
        }

        synchronized (queue) {
            if (queue.getMessages().isEmpty()) {
                queue.wait(timeout);
            }
            return queue.getMessage();
        }
    }

    public Map<String, Integer> getQueuesInfo() {
        Map<String, Integer> queueInfo = new HashMap<>();
        for (Map.Entry<String, QueueModel> entry : queues.entrySet()) {
            queueInfo.put(entry.getKey(), entry.getValue().getMessageCount());
        }
        return queueInfo;
    }
}
