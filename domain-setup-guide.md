# Firebase Custom Domain Configuration for deepolclean.com

## Domain Setup Instructions

### 1. Firebase Console Steps:
- Go to: https://console.firebase.google.com/project/deep-ol-clean/hosting/sites
- Click "Add custom domain"
- Enter: deepolclean.com
- Follow verification steps

### 2. DNS Records to Add:
You'll need to add these records to your domain registrar (where you bought deepolclean.com):

#### Domain Verification (TXT Record):
Type: TXT
Name: @
Value: [Firebase will provide this - copy from console]

#### Domain Routing (A Records):
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

#### WWW Subdomain (CNAME):
Type: CNAME
Name: www
Value: deep-ol-clean.web.app

### 3. SSL Certificate:
Firebase will automatically provision an SSL certificate for your domain once DNS is configured.

### 4. Timeline:
- DNS propagation: 24-48 hours
- SSL certificate: 24 hours after DNS verification
- Full setup completion: Up to 72 hours

## Current Status:
- Firebase Project: deep-ol-clean
- Current URL: https://deep-ol-clean.web.app
- Target Domain: deepolclean.com
- Setup Status: In Progress

## Next Steps:
1. Complete domain verification in Firebase Console
2. Add DNS records with your domain registrar
3. Wait for DNS propagation
4. Verify SSL certificate issuance
5. Test website access at deepolclean.com