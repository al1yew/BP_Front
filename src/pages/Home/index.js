import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="homepagediv">
                        <Link to="/assessment">
                            <div className="linktoassessmentorcontactpage">
                                <span>
                                    Go to Assessment
                                </span>
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
        </>
    );
}