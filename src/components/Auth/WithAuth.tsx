import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ElementType, useEffect } from "react";

function WithAuth(NextComponent: ElementType) {
  const Wrapper = (props: any) => {
    const { replace } = useRouter();
    const { data } = useSession();

    useEffect(() => {
      if (!data) {
        replace("/?error=Unauthorized");
        return;
      }
    }, [data, replace]);

    return <NextComponent {...props} session={data} />;
  };

  return Wrapper;
}

export default WithAuth;
