# Tabletop Task

## Overview

This is a project integrating with DVLA API to show information about stored cars.
Link is : https://tabletop-task.vercel.app/ .
Some VRNS you can test it with:
AA19DSL
AA19MOT
AA19AMP
AA19 (Not in mock data)
WN67DSO (Not in mock data)

## Installation 📦

1. **Clone the repository**:

```bash
git clone <repository-url>
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure your env file**:

```env
API_URL=
API_KEY=
```

4. **Run the development server**:

```bash
npm run dev
```

**then in another terminal instance:**

```bash
npm run start
```

## Points 🌟

- I tried calling the DVLA api from the src.js directly but met with cors error. (I knew the task wouldnt be that easy)
- I spun up a proxy server using express to query the endpoint.
- I realised a bunch of VRN codes in the API example weren't working 🫤
- I made a mock data file by copying the VRN data from [here](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/mock-responses.html#ves-api-test-environment).
- It first checks the original api, then if it fails, fallbacks on the mock one.
- I then modified the index.html & style.css a bit for styling
- Fixd the bugs in Garage.js. Added two helpful functions
- I decided to host on vercel. Had issues uploading the express server so I just made a vrcel function 'vehicles' that does the eexact same thing.
- I updateed the src on which endpoint to point to during prod vs dev mode
- 👍🏾 Pretty challenging project. I haven't used vanilla js in a while. This project reminded why. (Nextjs 💯)
