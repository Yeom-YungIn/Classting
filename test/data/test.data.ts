import {UserRoleType} from "../../src/common/types";

export const TEST_SCHOOL_NAME: string = "TEST_SCHOOL_NAME";
export const TEST_LOCATION: string = "TEST_LOCATION";
export const TEST_ADMIN_USER_ID: string = "admin";

export const TEST_ADMIN_USER = { id: TEST_ADMIN_USER_ID, role: UserRoleType.ADMIN };

export const TEST_STUDENT_USER_ID: string = "student";

export const TEST_STUDENT_USER = {id: TEST_STUDENT_USER_ID, role: UserRoleType.STUDENT};

export const TEST_PAGE_ID: number = 1;
export const TEST_NEWS_ID: number = 1;
export const TEST_CONTENT = "TEST_CONTENt";

export const TEST_PAGE = {pageId: TEST_PAGE_ID, schoolName: TEST_SCHOOL_NAME, location: TEST_LOCATION}
export const TEST_NEWS = {pageId: TEST_PAGE_ID, newsId: TEST_NEWS_ID, content: TEST_CONTENT}

export const TEST_SUBSCRIBE = {pageId: TEST_PAGE_ID, userId: TEST_STUDENT_USER_ID, isDeleted: false}
export const TEST_DEL_SUBSCRIBE = {pageId: TEST_PAGE_ID, userId: TEST_STUDENT_USER_ID, isDeleted: true}