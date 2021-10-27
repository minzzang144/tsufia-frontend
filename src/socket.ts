import io from 'socket.io-client';

const URI =
  process.env.NODE_ENV === 'production'
    ? 'wss://tsufia-backend.herokuapp.com/'
    : 'ws://localhost:4000/';

const socket = io(URI, {
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
