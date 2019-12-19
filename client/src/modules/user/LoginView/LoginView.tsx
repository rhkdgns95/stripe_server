import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "../../../types/schemaTypes";
import { RouteComponentProps, Link } from "react-router-dom";
import { meQuery } from "../../../graphql/queries/me";
import { userFragment } from "../../../graphql/fragments/userFragment";

const useInput = (placeholder: string) => {
    const [value, setValue] = useState<string>("");

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    }

    return {
        value,
        onChange,
        placeholder
    };
}
const useFetch = () => {
    const email = useInput("Email");
    const password = useInput("Password");

    return {
        email,
        password
    }
};
const loginQuery = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ...UserInfo
        }
    }
    ${userFragment}
`;
interface IProps extends RouteComponentProps<any>{

}
export default (props: IProps)  => {
    const { history } = props;
    const { email, password } = useFetch();

    const [ loginMutation, { client } ] = useMutation<LoginMutation, LoginMutationVariables>(loginQuery, {
        // refetchQueries: [
        //     {query: loginQuery}
        // ],
        update: (cache, { data }) => {
             console.log("UPDATE: ", data);
             if(!data || !data.login) {
                 return;
             }
             cache.writeQuery({
                 query: meQuery,
                data: { me: data.login }
             })
        },
        onCompleted: data => {
            const { login } = data;
            console.log("loginMutation success: ", data);
            if(login) {
                alert("성공");
                history.push("/account");
            } else {
                alert("실패");
            }
        },
        onError: data => {
            console.log("loginMutation error: ", data);
        }
    });

    return (
        <div style={{ display: "flex", flexFlow: "column", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <div>
                <input type={"text"} { ...email }/>
            </div>
            <div>
                <input type={"password"} { ...password }/>
            </div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <button onClick={async e => {
                    // optional cache reset.
                    await client?.resetStore();
                    loginMutation({ 
                        variables: {
                            email: email.value,
                            password: password.value
                        }
                    });
                }}>login</button>
                <Link to={"/register"}>Register</Link>
            </div>
        </div>
    );
};
