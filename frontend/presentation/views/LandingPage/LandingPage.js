import Body1 from "./Body1";
import Body2 from "./Body2";
import Body3 from "./Body3";
import Body4 from "./Body4";
import ClientFeedback from "./ClientFeedback";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import LandingPageHeader from "./LandingPageHeader";

const LandingPage = () => {
  return (
    <div>
      <LandingPageHeader />
      <Body1 />
      <Body2 />
      <Body3 />
      <Body4 />
      <ContactUs />
      <ClientFeedback />
      <Footer/>
    </div>
  );
};

export default LandingPage;
