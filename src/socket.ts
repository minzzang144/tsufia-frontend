import io from 'socket.io-client';

const socket = io('wss://tsufia-backend.herokuapp.com/', {
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
