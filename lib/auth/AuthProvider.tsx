import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UserType } from "../updateUserExtends42Data";

export const AuthContext = React.createContext<
  | {
      status: "loading" | "unauthenticated" | "link42accountrequired";
      me: null;
    }
  | {
      status: "authenticated";
      me: UserType;
    }
>({
  me: null,
  status: "loading",
});

export type AuthProviderProps = {};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [auth, setAuth] = useState<
    | {
        status: "loading" | "unauthenticated" | "link42accountrequired";
        me: null;
      }
    | {
        status: "authenticated";
        me: UserType;
      }
  >({
    me: null,
    status: "loading",
  });

  useEffect(() => {
    if (session?.user?.email) {
      try {
        axios.get<UserType>("/api/v2/me").then((res) =>
          setAuth({
            me: res.data,
            status: "authenticated",
          })
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          switch (error?.response.status) {
            case 403:
              setAuth({
                me: null,
                status: "link42accountrequired",
              });
              break;
            case 401:
            default:
              setAuth({
                me: null,
                status: "unauthenticated",
              });
          }
        } else {
          console.error(error);
        }
      }
    }
  }, [session?.user?.email]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const withAuth = (
  Component: React.ComponentType,
  option?: {
    required42account?: boolean;
  }
) => {
  const WrapComponent = () => {
    useSession({ required: true });
    const router = useRouter();
    const { status } = useContext(AuthContext);

    useEffect(() => {
      if (option?.required42account && status === "link42accountrequired") {
        router.push("/me");
      }
    }, [status, router]);

    if (status === "loading") {
      return (
        <div className="flex justify-center items-center min-h-screen min-h-screen-ios">
          <Loading />
        </div>
      );
    }

    return <Component />;
  };

  return WrapComponent;
};
