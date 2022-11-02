import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <main className="maincontent">
                <div className="container">
                    <div className="row">
                        <div className="homepagediv">
                            <Link to="/assessments">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Assessments</span>
                                </div>
                            </Link>
                            <Link to="/frequencies">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Frequencies</span>
                                </div>
                            </Link>
                            <Link to="/weights">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Weights</span>
                                </div>
                            </Link>
                            <Link to="/distances">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Distances</span>
                                </div>
                            </Link>
                            <Link to="/users">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Users</span>
                                </div>
                            </Link>
                            <Link to="/users">
                                <div className="linktoassessmentorcontactpage">
                                    <span>Assessments of Users</span>
                                </div>
                            </Link>
                            <Link to="/contactus">
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