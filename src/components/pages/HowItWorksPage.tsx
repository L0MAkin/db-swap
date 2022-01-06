export default function HowItWorksPage() {
    return (
        <div>
            {`Welcome to NEAR Crowd. NEAR Crowd is a service that allows people earn Ⓝ by completing small tasks.

            While tasks are provided and funded by a centralized entity, called the Requestor, NEAR Crowd significantly limits the power that the Requestor has, and moves the power to the community instead. In particular, while the Requestor provides the specification of what needs to be done in each task, it's the community that decides whether each task is completed correctly according to this specification. This is achieved by creating a set of rules, checks and balances that are enforced by a smart contract deployed on NEAR.`}

            <h1>How it works</h1>

            <section>
                <h2>Basics</h2>
                <p>
                    {
                        "We will explore how NEAR Crowd works with a simple example. The Requestor wants to transcribe short audio clips, and submits 100 of them to the contract, along with the sufficient funds to cover the work. Five participants: Alice, Bob, Carol, Daryl and Eve, apply to perform the transcriptions. Alice applies for a task first, and receives one of the audio clips. She then transcribes it, and submits the transcription. Bob applies for the task following Alice's submission. Since there are some tasks that were completed, but were not yet reviewed, Bob has a chance to either receive a new clip to be transcribed, or one of the already transcribed clips for a review. Bob indeed receives Alice's clip for review. He listens to the clip, confirms that the transcription is correct, and accepts it. Once it is accepted, both Alice and Bob receive credit for it."
                    }
                </p>
            </section>

            <section>
                <h2>Challenges</h2>
                <p>
                    {
                        "Alice applies for another task, gets another audio clip, and submits a transcription of it. So does Bob, but as he performs his transcription he makes some mistake. At this point there are two transcriptions pending review: Alice's, performed correctly, and Bob's, performed incorrectly.  Eve applies for a task, and receives Alice's transcription for review. Daryl applies for a task as well, and receives Bob's transcription for review. Daryl confirms that Bob's transcription is incorrect, and rejects it. Eve, not interested in complying with the protocol, chooses not to check Alice's transcription at all, and also rejects it. Since both transcriptions were rejected, both of them are automatically challenged. When a task is challenged, it is assigned for review to three more participants, and the majority of them decide the ultimate verdics: if at least two of them accept the task, it is accepted, and if at least two of them reject it, it is rejected. In our example the task performed by Alice and rejected by Eve gets assigned to Bob, Carol and Daryl. They all accept it. Alice, Bob, Carol and Daryl receive their corresponding reward for the task, and Eve gets a negative credit. For the task performed by Bob and rejected by Deryl, it is assigned to Alice, Carol and Eve for the further review. Alice and Carol confirm that Bob made a mistake, and reject the transcription. Eve, deciding not to follow the protocol again, accepts it. Since more participants rejected the transcription than accepted, Daryl, the original reviewer, as well as Alice and Carol receive their corresponding rewards, and Bob and Eve receive a negative credit."
                    }
                </p>
            </section>

            <section>
                <h2>Honeypots</h2>
                <p>
                    {
                        "We expect that under normal operation most of the tasks are completed correclty. Thus, when after an hour of work Bob receives yet another review, he is tempted to immediately accept it, without paying close attention: the chances that the task is not performed correctly are rather slim. To keep Bob vigilant, the Requester made several of his 100 tasks so-called Honeypots. When Alice applies for a new task, she receives a honeypot task: she is asked to intentionally make her transcription wrong. She listens to the clip, and as she transcribes it, she swaps two words in the middle, before submitting her work. Later Bob receives Alice's transcription for review, and accepts it right away, expecting that it is likely performed correctly. For honeypot tasks the challenge condition is reversed: the acceptance of the transcription results in the immediate challenge. Since Bob accepted the transcription, the task is challenged, and is assigned to Carol, Daryl and Eve. All of them spot the intentional mistake made by Alice, and reject it. As a result Alice receives her reward for creating a good honeypot that was ultimately rejected, so do Carol, Daryl and Eve for staying vigilant and rejecting the honeypot. Bob receives a negative credit."
                    }
                </p>
            </section>

            <section>
                <h2>Withdrawing the rewards</h2>
                <p>
                    {`Once a participant has performed at least 20 tasks, they can withdraw their rewards to their NEAR wallet, for as long as they showed at least 85% success rate.

                    More specifically, the system maintains the number of successful and failed tasks for each participant. To withdraw the funds, the number of successful tasks needs to be at least 8.5 times higher than the number of failed.

                    The rules of updating the stats are the following:
                    If a regular task is submitted, and is then accepted, both the submitter and the reviewer have their number of successful tasks increased by one;
                    If a regular task is submitted, and is then rejected, it is challenged.
                    If at least two of the new reviewers accept it, then the original submitter and all the reviewers who accepted it have their number of successful tasks increased by one, and all the reviewers who have rejected it have their number of failed tasks increased by one;
                    Otherwise, the original reviewer and all the reviewers who rejected it have their number of failed tasks increased by one, and all the reviewers who have accepted it have their number of successful tasks increased by one;
                    If a honeypot task is submitted, and is then rejected, both the submitter and the reviewer have their number of successful tasks increased by one;
                    If a honeypot task is submitted, and is then accepted, it is challenged.
                    If at least two of the new reviewers accept it, then the original submitter and all the reviewers who rejected it have their number of failed tasks increased by one, and all the reviewers who have accepted it have their number of successful tasks increased by one;
                    Otherwise, the original reviewer and all the reviewers who accepted it have their number of failed tasks increased by four (yes, failing a honeypot is pricey!), and all the reviewers who have accepted it have their number of successful tasks increased by one;
                    As an extra chance to prevent the large penalty, when a participants reviews a honeypot, and accepts it, they are immediately offered to change their verdict for a partial credit: they will receive half of the associated reward, and their number of failed tasks will be increased by two.`}
                </p>
            </section>

            <section>
                <h2>Afterword</h2>
                <p>
                    {`In conclusion it is worth reiterating that once the Requestor funded the task, all the rest of the above rules are enforced by a smart contract. Thus, the participant can be certain that for as long as they perform the work correctly, and the community accepts it, they will ultimately get their payment.

                    It is in stark contrast with centralized systems in which the requestor generally has the last say in accepting the work, and situations in which the requestors walk away with the results of the work without paying the rewards are rather common.`}
                </p>
            </section>
        </div>
    );
}
