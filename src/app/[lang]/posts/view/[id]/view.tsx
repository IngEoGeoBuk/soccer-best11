'use client';

import CommentBox from '@components/posts/commentBox';
import ContentBox from '@components/posts/contentBox';
import VoteBox from '@components/posts/voteBox';

function Index({ session }: { session: any }) {
  return (
    <div>
      <div className="p-5">
        <ContentBox email={session?.user?.email} />
        <VoteBox />
        <CommentBox email={session?.user?.email} />
      </div>
    </div>
  );
}

export default Index;
