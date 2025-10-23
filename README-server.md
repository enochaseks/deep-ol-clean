# Deep Ol Clean - Gmail Backend

This is the backend service for the Deep Ol Clean website that handles quote requests via Gmail SMTP.

## Environment Variables

When deploying, make sure to set these environment variables:
- `GMAIL_USER`: Deepolclean@gmail.com
- `GMAIL_PASS`: itbu hfkd ssod iyjn
- `PORT`: 3001 (or whatever Render assigns)

## Local Development

```bash
npm install
npm run server
```

## Production

The server will run on the PORT provided by the hosting service.