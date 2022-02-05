import React, { useEffect } from "react";
import { required, useValidation } from "../../../validation";
import { RouteComponentProps, withRouter } from "react-router";
import { TLogin } from "../../../apollo-graphql/type_logic/types";
import InputTextWithValidation from "../../../components/withValidation/InputTextWithValidation";
import InputTextPasswordWithValidation from "../../../components/withValidation/InputTextPasswordWithValidation";
import { Button } from "../../../components/Button";
import ApolloAsyncCall from "../../../apollo-graphql/ApolloAsyncCallClass";
import { useApplication } from "../../hooks/useApplication";
import { APP_LAYOUT, APPLICATION_MAIN_SUB_DOMAIN } from "../../constants";
import { get as _get } from "lodash";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { setAccessToken } from "../../../apollo/accessToken";
import { processErrorGraphQL } from "../../../apollo";
import { translate } from "translate/translate";
import { useLoading } from "../../hooks/useLoading";

const LoginNormal = (props: RouteComponentProps) => {
  const validation = useValidation<TLogin>({
    initialData: {
      userName: "",
      password: ""
    }
  });

  const {setLoading,resetLoading} = useLoading()
  const { setLoggedUser, loggedUser, setRedirectLink } = useApplication();

  useEffect(() => {
    if (loggedUser?.id) {
      setRedirectLink(`/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.MAIN}/users`);
    }
  }, [loggedUser, setRedirectLink]);

  const handlerOnSubmit = async () => {
    const { error, data } = await validation.validate();
    if (error) {
      return;
    }
    setLoading()
    try {
      const result = await ApolloAsyncCall.login({
        userName: data.userName as string,
        password: data.password
      });
      setLoggedUser(_get(result, "data.data.user"));
      setAccessToken(_get(result, "data.data.token"));
    } catch (e) {
      processErrorGraphQL(e, validation);
    } finally {
      resetLoading()
    }
  };

  return (
    <div className={"login-root"}>
      <div className={"w-100 d-flex justify-content-center align-items-center"}>
        <div className={"logo-nav-img"} />
      </div>
      <InputTextWithValidation
        required
        focusOnMount
        selectOnFocus
        icon={{
          icon: faUser
        }}
        label={translate.USERNAME_LABEL}
        helperText={translate.USERNAME_HELPER_TEXT}
        validation={{
          useValidation: validation,
          model: "userName",
          rule: {
            required
          }
        }}
      />

      <InputTextPasswordWithValidation
        required
        selectOnFocus
        icon={{
          icon: faKey
        }}
        type={"password"}
        label={translate.PASSWORD_LABEL}
        helperText={translate.PASSWORD_HELPER_TEXT}
        validation={{
          useValidation: validation,
          model: "password",
          rule: {
            required
          }
        }}
      />

      <div className={"login-form-button-container text-upper"}>
        <Button classNames={"text-upper"} color={"secondary"} outline label={translate.LOGIN_FORM_BUTTON_LABEL}
                onClick={handlerOnSubmit} />
      </div>
    </div>

  );

};

export default withRouter(LoginNormal);
