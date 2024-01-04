'use client';

import React from 'react';
import ContentBox from './components/contentBox';
import VoteBox from './components/voteBox';
import CommentBox from './components/commentBox';

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
