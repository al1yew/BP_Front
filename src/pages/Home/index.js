import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <main className="maincontent">
                <div className="container">
                    <div className="row">
                        <div className="homepagediv">
                            <Link to="/manage/assessments">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Assessments</span>
                                </div>
                            </Link>
                            <Link to="/manage/frequencies">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Frequencies</span>
                                </div>
                            </Link>
                            <Link to="/manage/weights">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Weights</span>
                                </div>
                            </Link>
                            <Link to="/manage/distances">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Distances</span>
                                </div>
                            </Link>
                            <Link to="/manage/users">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Users</span>
                                </div>
                            </Link>
                            <Link to="/manage/users">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Assessments of Users</span>
                                </div>
                            </Link>
                            <Link to="/manage/contactus">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Contact Us</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}