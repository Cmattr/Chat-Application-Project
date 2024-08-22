from web_socket_server import WebSocketServer, socketio

app = WebSocketServer().create_app()

@socketio.on('connect')
def handle_connect():
    print('Client Connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')

@socketio.on('message')
def handle_message(message):
    print(f"Received message: {message}")
    socketio.emit('message', message)

if __name__ == '__main__':
    socketio.run(app)
