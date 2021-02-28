package teammates.ui.webapi;

import java.util.List;
import java.util.stream.Collectors;

import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.InstructorAttributes;
import teammates.common.datatransfer.attributes.StudentAttributes;
import teammates.common.exception.UnauthorizedAccessException;
import teammates.common.util.Const;
import teammates.common.util.StringHelper;
import teammates.ui.output.InstructorData;
import teammates.ui.output.InstructorsData;
import teammates.ui.output.MotdData;
import teammates.ui.request.Intent;

/**
 * Gets the Message of the Day, depending on the userInfo (Daniel)
 */
class GetMotdAction extends Action {

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
        
        // debug print statements to show that this userInfo may not be working as intended when testing
        System.out.println("admin / student / instructor");
        System.out.println(userInfo.isAdmin);
        System.out.println(userInfo.isStudent);
        System.out.println(userInfo.isInstructor);

        if (userInfoType != null) {
            // use MotdData
            MotdData data = new MotdData(userInfoType);
            return new JsonResult(data);
        } else {
            return new JsonResult("Please Login to see Message of the Day");
        }
    }

}
