package teammates.ui.webapi;

import teammates.common.exception.UnauthorizedAccessException;
import teammates.ui.output.PrevMotdData;

/**
 * Gets the previous Message of the Days, depending on the userInfo (Daniel).
 */
class GetPrevMotdAction extends Action {

    @Override
    AuthType getMinAuthLevel() {
        return AuthType.LOGGED_IN;
    }

    @Override
    void checkSpecificAccessControl() {
        // check if atleast student / instructor / admin
        if (userInfo.isAdmin || userInfo.isStudent || userInfo.isInstructor) {
            return;
        } else {
            throw new UnauthorizedAccessException("Not authorized");
        }
    }

    // sends a request to server to get MotD, depending on the userInfo type
    @Override
    JsonResult execute() {
        // get the userInfo type as a string
        String userInfoType = null;
        if (userInfo.isAdmin) {
            userInfoType = "admin";
        } else if (userInfo.isStudent) {
            userInfoType = "student";
        } else if (userInfo.isInstructor) {
            userInfoType = "instructor";
        }

        if (userInfoType == null) {
            return new JsonResult("Please Login to see Message of the Day");
        } else {
            // use MotdData
            PrevMotdData data = new PrevMotdData(userInfoType);
            return new JsonResult(data);
        }
    }

}
