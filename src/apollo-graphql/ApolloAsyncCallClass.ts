import { AuthLoginDocument, AuthUserLogin, UserDocument } from "./graphql";
import { client } from "../apollo";

class ApolloAsyncCallClass {

  private logOutCallBack: any;
  private logInCallBack: any;

  setLogOutFun = (f: any) => {

    this.logOutCallBack = f;
  };
  setLogInFun = (f: any) => {
    this.logInCallBack = f;
  };

  logOut = () => {
    this.logOutCallBack();
  };

  logIn = (userId: number) => {
    this.logInCallBack(userId);
  };

  user = (id: number) => {
    return new Promise((resolve, reject) => {
      client.query({
        query: UserDocument,
        fetchPolicy: "network-only",
        variables: {
          id
        }
      }).then((result: any) => resolve(result))
        .catch((e: any) => reject(e));
    });
  };

  login = (data: Partial<AuthUserLogin>) => {
    return new Promise((resolve, reject) => {
      client.query({
        query: AuthLoginDocument,
        fetchPolicy: "network-only",
        variables: { data }
      }).then((result: any) => resolve(result))
        .catch((e: any) => reject(e));
    });
  };

}

const ApolloAsyncCall = new ApolloAsyncCallClass();

export default ApolloAsyncCall;
