import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <main className="maincontent">
                <div className="container">
                    <div className="row">
                        <div className="homepagediv">
                            <Link to="/assessment">
                                <div className="linktoassessmentorcontactpage">
                                    <span>
                                        Take an Assessment
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
            </main>
        </>
    );
}