# EventHub Frontend

Standalone mock-data frontend based on the supplied EventHub prototype.

## Run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

No backend is required. API files are placeholders for future Spring Boot microservice integration.

### Demo roles
The prototype login UI includes mock role access for Attendee, Organizer, and an existing Admin account. Public registration is intended only for Attendee and Organizer.


### Mock login roles
Use an email containing `admin` for the Admin UI, `organizer` for Organizer UI, or any other email for Attendee UI. No backend authentication is performed. Public registration offers only Attendee and Organizer.
