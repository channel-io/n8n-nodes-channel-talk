# n8n-nodes-channel-talk

This is an n8n community node. It lets you work with Channel Talk in your n8n workflows: send messages and retrieve channel info.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Bot
  - List (GET /open/v5/bots)
  - Create or Update (POST /open/v5/bots)
  - Delete (DELETE /open/v5/bots/{botId})
- Channel
  - Get: Retrieve the channel connected with your API credentials (GET /open/v5/channel)
- Manager
  - List (GET /open/v5/managers)
  - Get (GET /open/v5/managers/{managerId})
- Team Chat
  - List (GET /open/v5/groups)
  - Get (GET /open/v5/groups/{groupId})
  - Get by Name (GET /open/v5/groups/@{groupName})
  - Update (PATCH /open/v5/groups/{groupId})
  - Get Sessions (GET /open/v5/groups/{groupId}/sessions)
  - Get Messages (GET /open/v5/groups/{groupId}/messages)
  - Get Messages by Name (GET /open/v5/groups/@{groupName}/messages)
  - Get Messages File (GET /open/v5/groups/{groupId}/messages/file)
  - Get Messages File by Name (GET /open/v5/groups/@{groupName}/messages/file)
  - Create Message - Plain Text (POST /open/v5/groups/{groupId}/messages)
  - Create Message - Plain Text by Name (POST /open/v5/groups/@{groupName}/messages)
  - Create Message - Blocks (POST /open/v5/groups/{groupId}/messages)
  - Create Message - Blocks by Name (POST /open/v5/groups/@{groupName}/messages)
- User
  - Get by User ID (GET /open/v5/users/{userId})
  - Get by Member ID (GET /open/v5/users/@{memberId})
  - Create (POST /open/v5/users)
  - Create or Update (PUT /open/v5/users/@{memberId})
  - Update (PATCH /open/v5/users/{userId})
  - Delete by User ID (DELETE /open/v5/users/{userId})
  - Delete by Member ID (DELETE /open/v5/users/@{memberId})
  - Block (POST /open/v5/users/{userId}/block)
  - Unblock (DELETE /open/v5/users/{userId}/block)
  - Issue User Token by User ID (PUT /open/v5/users/{userId}/user-token/issue)
  - Issue User Token by Member ID (PUT /open/v5/users/@{memberId}/user-token/issue)
  - Issue Session JWT (PUT /open/v5/users/@{memberId}/session-jwt/issue)
  - Touch (POST /open/v5/users/{userId}/touch)
- User Chat
  - List (GET /open/v5/user-chats)
  - Get (GET /open/v5/user-chats/{userChatId})
  - Update (PATCH /open/v5/user-chats/{userChatId})
  - Delete (DELETE /open/v5/user-chats/{userChatId})
  - Open (PUT /open/v5/user-chats/{userChatId}/open)
  - Close (PATCH /open/v5/user-chats/{userChatId}/close)
  - Snooze (PUT /open/v5/user-chats/{userChatId}/snooze)
  - Remove (DELETE /open/v5/user-chats/{userChatId}/remove)
  - Assign to Manager (PATCH /open/v5/user-chats/{userChatId}/assign-to/managers/{managerId})
  - Invite (PATCH /open/v5/user-chats/{userChatId}/invite)
  - Get Cases (GET /open/v5/user-chats/cases)
  - Get Sessions (GET /open/v5/user-chats/{userChatId}/sessions)
  - Get Messages (GET /open/v5/user-chats/{userChatId}/messages)
  - Get Messages File (GET /open/v5/user-chats/{userChatId}/messages/file)
  - Create Message (POST /open/v5/user-chats/{userChatId}/messages)
  - Get Meets Messages (GET /open/v5/user-chats/{userChatId}/meets/{messageId}/messages)
  - Get Meets Recording (GET /open/v5/user-chats/{userChatId}/meets/{messageId}/recording)
- Webhook
  - List (GET /open/v5/webhooks)
  - Get (GET /open/v5/webhooks/{webhookId})
  - Create (POST /open/v5/webhooks)
  - Update (PATCH /open/v5/webhooks/{webhookId})
  - Delete (DELETE /open/v5/webhooks/{webhookId})

## Credentials

Create Open API credentials in Channel Talk and set the following fields:

- Access Key
- Access Secret

These are sent as `x-access-key` and `x-access-secret` headers in each request.

Refer to the Channel developers documentation for details:
https://developers.channel.io/docs/authentication-2

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Channel Open API docs](https://developers.channel.io/docs)
