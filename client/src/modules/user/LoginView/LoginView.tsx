import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "../../../types/schemaTypes";
import { RouteComponentProps } from "react-router-dom";

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
            id
            email
        }
    }
`;
interface IProps extends RouteComponentProps<any>{

}
export default (props: IProps)  => {
    const { history } = props;
    const { email, password } = useFetch();

    const [ loginMutation ] = useMutation<LoginMutation, LoginMutationVariables>(loginQuery, {
        onCompleted: data => {
            const { login } = data;
            console.log("loginMutation success: ", data);
            if(login) {
                alert("성공");
                history.push("/me");
            } else {
                alert("실패");
            }
        },
        onError: data => {
            console.log("loginMutation error: ", data);
        }
    });

    return (
        <form style={{ display: "flex", flexFlow: "column", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <div>
                <input type={"text"} { ...email }/>
            </div>
            <div>
                <input type={"password"} { ...password }/>
            </div>
            <div>
                <button onClick={e => {
                    e.preventDefault();
                    loginMutation({ 
                        variables: {
                            email: email.value,
                            password: password.value
                        }
                    })
                }}>register</button>
            </div>
        </form>
    );
};