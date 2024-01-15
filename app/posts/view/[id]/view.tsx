'use client';

import React from 'react';

import CommentBox from './components/commentBox';
import ContentBox from './components/contentBox';
import VoteBox from './components/voteBox';

function Index() {
  return (
    <div>
      <div className="p-5">
        <ContentBox />
        <VoteBox />
        <CommentBox />
      </div>
    </div>
  );
}

export default Index;
