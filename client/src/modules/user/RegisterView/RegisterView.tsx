import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";
import { registerMutation, registerMutationVariables } from "../../../types/schemaTypes";
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
const registerQuery = gql`
    mutation registerMutation($email: String!, $password: String!) {
        register(email: $email, password: $password)
    }
`;
interface IProps extends RouteComponentProps<any>{

}
export default (props: IProps)  => {
    const { history } = props;
    const { email, password } = useFetch();

    const [ registerMutation ] = useMutation<registerMutation, registerMutationVariables>(registerQuery, {
        onCompleted: data => {
            const { register } = data;
            console.log("registerMutation success: ", data);
            if(register) {
                history.push("/login");
            }
        },
        onError: data => {
            console.log("registerMutation error: ", data);
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
            <div>
                <button onClick={e =>
                    registerMutation({ 
                        variables: {
                            email: email.value,
                            password: password.value
                        }
                    })
                }>register</button>
            </div>
        </div>
    );
};