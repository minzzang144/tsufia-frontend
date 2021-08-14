const UPDATE = 'auth/UPDATE' as const;

export const authUpdate = (token: string) => ({
  type: UPDATE,
  payload: token,
});

type AuthAction = ReturnType<typeof authUpdate>;

type AuthState = {
  token: string | undefined;
};

const initialState = {
  token: undefined,
};

function authentication(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case UPDATE:
      return {
        token: action.payload,
      };
    default:
      return state;
  }
}

export default authentication;
