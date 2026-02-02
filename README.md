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

- Channel
  - Get: Retrieve the channel connected with your API credentials (GET /open/v5/channel)
- Messages
    - Create a new message (POST /open/v5/groups/{groupId}/messages)
- User Chat
  - List user chats (GET /open/v5/user-chats)

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

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Channel Open API docs](https://developers.channel.io/docs)
