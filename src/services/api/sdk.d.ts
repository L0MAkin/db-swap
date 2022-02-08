export namespace SDK {
    // export namespace OnChain {}

    interface Topic {
        id: number;
        title: string;
        reward: string;
        description: string;
    }

    interface Task {
        hash: string;

        /**
         * JSON containing tasks details
         */
        content: string;

        /**
         * Task topic
         */
        topic?: Topic;

        createdAt: Date;
    }

    interface Solution extends SubmitSolution {
        hash: string;
        taskHash: string;
        content: string;
    }
}
