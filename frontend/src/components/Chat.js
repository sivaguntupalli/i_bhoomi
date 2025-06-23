import React, { useState, useEffect } from 'react';
import chatWebSocket from '../utils/websocket';

export default function Chat() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    chatWebSocket.connect();
    const rm1 = chatWebSocket.addMessageHandler(msg => setMsgs(m => [...m, msg]));
    const rm2 = chatWebSocket.addConnectionHandler(setConnected);
    return () => { rm1(); rm2(); chatWebSocket.disconnect(); };
  }, []);

  const send = () => {
    if (text.trim()) {
      chatWebSocket.send({ message: text, type: 'text', timestamp: new Date().toISOString() });
      setText('');
    }
  };

  const upload = e => {
    const file = e.target.files[0];
    if (file) {
      chatWebSocket.send({
        message: file.name,
        file_url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'file',
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.chatBox}>
        <div style={styles.status(connected)}>WS: {connected ? '✔️' : '❌'}</div>
        <div style={styles.chat}>
          {msgs.map((m, i) => (
            <div key={i} style={styles.msg}>
              {m.type === 'image' ? (
                <img src={m.file_url} alt="" style={styles.img} />
              ) : m.type === 'file' ? (
                <a href={m.file_url} target="_blank" rel="noreferrer">{m.message}</a>
              ) : (
                <div>{m.message}</div>
              )}
              <small style={styles.time}>
                {m.timestamp ? new Date(m.timestamp).toLocaleTimeString() : ''}
              </small>
            </div>
          ))}
        </div>
        <div style={styles.row}>
          <input style={styles.in} value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type..." />
          <button style={styles.btn} onClick={send}>➤</button>
          <input type="file" onChange={upload} style={styles.file} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'flex-end', padding: 20 },
  chatBox: { width: 320, fontFamily: 'sans-serif' },
  status: c => ({ marginBottom: 6, fontWeight: 'bold', color: c ? 'green' : 'red' }),
  chat: { background: '#f0f0f0', padding: 8, borderRadius: 8, height: 300, overflowY: 'auto', marginBottom: 8 },
  msg: { background: '#d0ebff', marginBottom: 6, padding: 6, borderRadius: 10, textAlign: 'right' },
  time: { fontSize: 10, color: '#666' },
  img: { maxWidth: '100%', borderRadius: 6 },
  row: { display: 'flex', gap: 6 },
  in: { flex: 1, padding: 6, borderRadius: 16, border: '1px solid #ccc' },
  btn: { padding: '6px 12px', borderRadius: 16, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' },
  file: { cursor: 'pointer' }
};
