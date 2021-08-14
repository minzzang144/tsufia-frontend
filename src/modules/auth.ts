const LOADING_UPDATE = 'auth/loading/UPDATE' as const;
const ERROR_UPDATE = 'auth/error/UPDATE' as const;
const TOKEN_UPDATE = 'auth/token/UPDATE' as const;

export const loadingUpdate = () => ({
  type: LOADING_UPDATE,
});

export const errorUpdate = (error: string) => ({
  type: ERROR_UPDATE,
  payload: error,
});

export const tokenUpdate = (token: string) => ({
  type: TOKEN_UPDATE,
  payload: token,
});

type AuthAction =
  | ReturnType<typeof loadingUpdate>
  | ReturnType<typeof errorUpdate>
  | ReturnType<typeof tokenUpdate>;

type AuthState = {
  loading: boolean;
  error: string | undefined;
  token: string | undefined;
};

const initialState = {
  loading: false,
  error: undefined,
  token: undefined,
};

function authentication(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case LOADING_UPDATE:
      return {
        ...state,
        loading: !state.loading,
      };
    case ERROR_UPDATE:
      return {
        ...state,
        error: action.payload,
      };
    case TOKEN_UPDATE:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}

export default authentication;
