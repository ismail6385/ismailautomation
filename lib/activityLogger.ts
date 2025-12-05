// Activity Logger Utility
// Use this to log admin actions automatically

export type ActivityType = 'create' | 'update' | 'delete' | 'approve' | 'reject';

interface LogActivityParams {
    action: string;
    user?: string;
    type: ActivityType;
    target: string;
    details?: string;
}

export function logActivity({
    action,
    user = 'Admin',
    type,
    target,
    details,
}: LogActivityParams) {
    try {
        const activityLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');

        const newLog = {
            id: Date.now().toString() + Math.random(),
            action,
            user,
            type,
            target,
            timestamp: new Date().toISOString(),
            details: details || '',
        };

        activityLogs.push(newLog);
        localStorage.setItem('activityLogs', JSON.stringify(activityLogs));

        return true;
    } catch (error) {
        console.error('Error logging activity:', error);
        return false;
    }
}

// Usage examples:
/*

// When creating a blog:
logActivity({
  action: 'New blog post created',
  type: 'create',
  target: `Blog: ${blogTitle}`,
  details: `Published blog post with ${wordCount} words`
});

// When approving a tool:
logActivity({
  action: 'Tool submission approved',
  type: 'approve',
  target: `Tool: ${toolName}`,
  details: `Submitted by ${submitterName}`
});

// When deleting a comment:
logActivity({
  action: 'Comment deleted',
  type: 'delete',
  target: `Comment on: ${postTitle}`,
  details: `By ${commentAuthor}`
});

// When updating settings:
logActivity({
  action: 'Site settings updated',
  type: 'update',
  target: 'Site Settings',
  details: 'Changed site name and description'
});

*/
