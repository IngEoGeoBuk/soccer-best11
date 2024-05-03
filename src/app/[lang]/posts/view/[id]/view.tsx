'use client';

import CommentBox from '@components/posts/view/commentBox';
import ContentBox from '@components/posts/view/contentBox';
import VoteBox from '@components/posts/view/voteBox';

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
