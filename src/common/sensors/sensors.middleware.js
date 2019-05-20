import io from 'socket.io-client';

const socket = io.connect('https://garden-app-server8080.herokuapp.com');

export const fetchSensors = () => dispatch => {
  socket.on('clientEvent', data => {
    dispatch({ type: 'GET_MAIN', payload: data });
  });

  socket.on('southPackage', south => {
    dispatch({ type: 'GET_SOUTH', payload: south });
  });

  socket.on('westPackage', west => {
    dispatch({ type: 'GET_WEST', payload: west });
  });
  socket.on('eastPackage', east => {
    dispatch({ type: 'GET_EAST', payload: east });
  });
  socket.on('connect_error', data => {
    dispatch({ type: 'SOCKET_ERR', payload: { socketErr: true } });
  });
};
