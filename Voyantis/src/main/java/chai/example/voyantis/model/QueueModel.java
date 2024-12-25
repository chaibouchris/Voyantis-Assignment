package chai.example.voyantis.model;

import java.util.LinkedList;
import java.util.Queue;

public class QueueModel {
    private String name;
    private Queue<String> messages;

    public QueueModel(String name) {
        this.name = name;
        this.messages = new LinkedList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Queue<String> getMessages() {
        return messages;
    }

    public void addMessage(String message) {
        this.messages.add(message);
    }

    public String getMessage() {
        return this.messages.poll();
    }

    public int getMessageCount() {
        return this.messages.size();
    }
}
