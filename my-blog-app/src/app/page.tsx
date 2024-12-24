import React, { useState } from 'react';
import WelcomeDialog from '../../components/WelcomeDialog';
import PostList from '../../components/PostList';
import CreatePost from '../../components/CreatePost';
import UpdatePost from '../../components/UpdatePost';
import DeletePost from '../../components/DeletePost';

export default function Home() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  const handleWelcomeDialogClose = (name: string, token: string) => {
    if (name && token) {
      setName(name);
      setToken(token);
      setShowWelcomeDialog(false);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center">My Blog</h1>
      </header>
      <WelcomeDialog visible={showWelcomeDialog} onClose={handleWelcomeDialogClose} />
      {!showWelcomeDialog && (
        <>
          <PostList />
          <CreatePost token={token} userId={0} />
        </>
      )}
      <footer className="mt-12 text-center">
        <p className="text-gray-600">© 2024 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}