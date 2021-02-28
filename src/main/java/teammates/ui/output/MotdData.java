package teammates.ui.output;

import javax.annotation.Nullable;

import teammates.common.datatransfer.attributes.FeedbackResponseAttributes;
import teammates.common.datatransfer.questions.FeedbackResponseDetails;
import teammates.common.util.StringHelper;

/**
 * The API output format of {@link GetMotd}.
 */
public class MotdData extends ApiOutput {
    private final String motd;
    private final String date;

    public MotdData(String userInfoType) {
        System.out.println("userinfo type");
        System.out.println(userInfoType);
        // ideally, we'd be able to store the MotDs somewhere (message + date sent)
        switch(userInfoType) {
            case "admin": 
                this.motd = "Admins: Please make a new instructor in /web/admin/home to test things out!";
                this.date = "Posted on 29/2/2021";
                break;
            case "student": 
                this.motd = "Students: Please remember to update your TEAMMATES feedback for your project team!";
                this.date = "Posted on 26/2/2021";
                break;
            case "instructor": 
                this.motd = "Instructors: Please remember to send the email to your students for TEAMMATES feedback!";
                this.date = "Posted on 23/2/2021";
                break;
            default: 
                this.motd = "";
                this.date = "";
                break;
        };
    }

    public String getMotd() {
        return this.motd;
    }
}
