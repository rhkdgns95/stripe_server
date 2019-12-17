import React, { useState } from "react";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo";
import { MeQuery } from "../../../types/schemaTypes";

const loginQuery = gql`
    query MeQuery {
        me {
            id
            email
        }
    }
`;
interface IProps extends RouteComponentProps<any> {

}
export default (props: IProps)  => {
    const { history } = props;

    const { data } = useQuery<MeQuery, any>(loginQuery, {
        onCompleted: data => {
            const { me } = data;
            console.log("loginMutation success: ", data);
            if(me) {
                alert("성공");
            } else {
                alert("실패");
                history.push("/login");
            }
        },
        onError: data => {
            console.log("loginMutation error: ", data);
        }
    });
    return (
        <div>
            { data && data.me && <p>{data.me.id}</p> }
            { data && data.me && <p>{data.me.email}</p> }
        </div>    
    );
};