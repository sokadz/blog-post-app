"use client";

import React, { useState } from 'react';
import WelcomeDialog from '../components/WelcomeDialog';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
import UpdatePost from '../components/UpdatePost';
import DeletePost from '../components/DeletePost';
import { Switch } from 'antd';
import { useThemeSwitcher, ThemeSwitcherProvider } from 'react-css-theme-switcher';

const Home: React.FC = () => {
  const [, setName] = useState('');
  const [token, setToken] = useState('');
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  const handleWelcomeDialogClose = (name: string, token: string) => {
    if (name && token) {
      setName(name);
      setToken(token);
      setShowWelcomeDialog(false);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    switcher({ theme: checked ? themes.dark : themes.light });
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-center">My Blog</h1>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </header>
      <WelcomeDialog visible={showWelcomeDialog} onClose={handleWelcomeDialogClose} />
      {!showWelcomeDialog && (
        <>
          <PostList />
          <br/>
          <CreatePost token={token} userId={0} />
          <br/>
          <UpdatePost token={token} postId={0} />
          <br/>
          <DeletePost token={token} postId={0} onDelete={() => console.log('Post deleted')} />
        </>
      )}
      <footer className="mt-12 text-center">
        <p className="text-gray-600">© 2024 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeSwitcherProvider themeMap={{ dark: 'dark-theme', light: 'light-theme' }} defaultTheme="light">
      <Home />
    </ThemeSwitcherProvider>
  );
};

export default App;