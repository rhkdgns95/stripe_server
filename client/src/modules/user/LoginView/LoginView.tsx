import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { LoginMutation, LoginMutationVariables } from "../../../types/schemaTypes";
import { RouteComponentProps, Link } from "react-router-dom";

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
        // refetchQueries: [
        //     {query: loginQuery}
        // ],
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
        <form style={{ display: "flex", flexFlow: "column", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <div>
                <input type={"text"} { ...email }/>
            </div>
            <div>
                <input type={"password"} { ...password }/>
            </div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <input type={"submit"} onClick={e => {
                    e.preventDefault();
                    loginMutation({ 
                        variables: {
                            email: email.value,
                            password: password.value
                        }
                    })
                }} value={"Login"}/>
                <Link to={"/register"}>Register</Link>
            </div>
        </form>
    );
};