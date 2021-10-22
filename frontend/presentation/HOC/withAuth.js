import { useRouter } from "next/router";
import cookie from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const seekerToken =
        cookie.get("seekerUser") ||
        localStorage.getItem("seekerUser") ||
        sessionStorage.getItem("seekerUser");
      const generatorToken =
        cookie.get("generatorUser") ||
        localStorage.getItem("generatorUser") ||
        sessionStorage.getItem("generatorUser");
      const adminToken =
        cookie.get("adminUser") ||
        localStorage.getItem("adminUser") ||
        sessionStorage.getItem("adminUser");
      // If there is no access token we redirect to "/" page.
      if (!seekerToken && !generatorToken && !adminToken) {
        Router.replace("/");
        return null;
      }
      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};

export default withAuth;
