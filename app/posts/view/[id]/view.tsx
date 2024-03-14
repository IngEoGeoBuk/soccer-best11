'use client';

import CommentBox from '@components/posts/commentBox';
import ContentBox from '@components/posts/contentBox';
import VoteBox from '@components/posts/voteBox';

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
