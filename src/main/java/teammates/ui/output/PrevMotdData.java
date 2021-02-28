package teammates.ui.output;

/**
 * The API output format of {@link GetPrevMotd}.
 */
public class PrevMotdData extends ApiOutput {
    private final String[] motdList;
    private final String[] dateList;

    public PrevMotdData(String userInfoType) {
        // ideally, we'd be able to store the MotDs somewhere (message + date sent)
        switch(userInfoType) {
        case "admin":
            this.motdList = new String[] { "Admins: Please make a new instructor in /web/admin/home to test things out!",
                    "Admins: New website is up!" };
            this.dateList = new String[] { "Posted on 29/2/2021", "Posted on 28/2/2021" };
            break;
        case "student":
            this.motdList = new String[] { "Students: Please remember to update your TEAMMATES"
                        + "feedback for your project team!", "Students: Please remember to sign up for courses." };
            this.dateList = new String[] { "Posted on 26/2/2021", "Posted on 28/2/2021" };
            break;
        case "instructor":
            this.motdList = new String[] { "Instructors: Please remember to send the email to "
                        + "your students for TEAMMATES feedback!", "Instructors: Please update your courses soon." };
            this.dateList = new String[] { "Posted on 23/2/2021", "Posted on 28/2/2021" };
            break;
        default:
            this.motdList = new String[] {};
            this.dateList = new String[] {};
            break;
        }
    }

    public String[] getPrevMotd() {
        return this.motdList;
    }

    public String[] getPrevMotdDate() {
        return this.dateList;
    }
}
