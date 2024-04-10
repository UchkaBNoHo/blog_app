// withAuthRedirect.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuthRedirect = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Don't do anything while session is loading

      // If user is logged in, redirect to home page
      if (session) {
        router.replace("/");
      }
    }, [session, status, router]);

    // Render the wrapped component if user is not logged in
    if (!session) {
      return <WrappedComponent {...props} />;
    }

    // If user is logged in, render nothing (already redirected)
    return null;
  };

  return Wrapper;
};

export default withAuthRedirect;
