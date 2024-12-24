import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';

interface WelcomeDialogProps {
  visible: boolean;
  onClose: (name: string, token: string) => void;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const handleOk = () => {
    if (name && token) {
      onClose(name, token);
    } else {
      message.error('Please enter both name and token');
    }
  };

  return (
    <Modal
      title="Welcome"
      visible={visible}
      onOk={handleOk}
      onCancel={() => onClose('', '')}
      okText="Submit"
    >
      <Input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Enter GoRest Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
    </Modal>
  );
};

export default WelcomeDialog;