/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "User";
  id: string;
  email: string;
  type: string | null;
  stripeId: string | null;
}

export interface Me {
  me: Me_me | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscription
// ====================================================

export interface CreateSubscription_createSubscription {
  __typename: "User";
  id: string;
  email: string;
  stripeId: string | null;
  type: string | null;
}

export interface CreateSubscription {
  createSubscription: CreateSubscription_createSubscription | null;
}

export interface CreateSubscriptionVariables {
  source: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "User";
  id: string;
  email: string;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: string;
  email: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerMutation
// ====================================================

export interface registerMutation {
  register: boolean;
}

export interface registerMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
