'use client';
import { CommentForm } from '@/components/design-system/molecules/CommentForm';
import { CommentItem } from '@/components/design-system/molecules/CommentItem';
import * as React from 'react';

export function CommentsSection() {
  const [comments, setComments] = React.useState([
    {
      username: 'Alex',
      text: 'This is a great resource! Really helped me stay focused.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      avatar: 'https://i.pravatar.cc/150?u=alex',
    },
    {
      username: 'Sam',
      text: 'Love the simplicity of this platform.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      avatar: 'https://i.pravatar.cc/150?u=sam',
    },
  ]);

  const handleSubmit = (text: string) => {
    setComments((prev) => [
      ...prev,
      {
        username: 'You',
        text,
        timestamp: new Date(),
        avatar: 'https://i.pravatar.cc/150?u=you',
      },
    ]);
  };

  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>Comments</h2>
      <p className='text-muted-foreground'>
        A sleek system for displaying and submitting comments with a premium
        glassmorphic design. Used in the Community section.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        {/* Comment List */}
        <div className='space-y-3'>
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              username={comment.username}
              text={comment.text}
              timestamp={comment.timestamp}
              avatar={comment.avatar}
            />
          ))}
        </div>
        {/* Comment Form */}
        <CommentForm onSubmitAction={handleSubmit} />
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>CommentItem Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>username</code>: Comment author’s name
          </li>
          <li>
            <code>text</code>: Comment content
          </li>
          <li>
            <code>timestamp</code>: Date or string of when posted
          </li>
          <li>
            <code>avatar</code>: Optional avatar URL
          </li>
        </ul>
        <p>
          <strong>CommentForm Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>onSubmit</code>: Function to handle comment submission
          </li>
        </ul>
        <p>
          <strong>States:</strong> CommentItem (normal), CommentForm (normal,
          submitting)
        </p>
      </div>
    </section>
  );
}
