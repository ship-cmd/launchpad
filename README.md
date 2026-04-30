# launchpad
Scenario 1: The Secure Receiver Application (Cloud Run)

### Build & Containerize:

Develop a simple API application (e.g., Flask/Python, Express/Node.js) that acts as a receiver, capable of accepting POST requests and logging the received data.
Write a Dockerfile to containerize the application.
Manually build the Docker image using Cloud Build (gcloud builds submit --tag ...) and push it to Artifact Registry.
Deploy the image to Cloud Run.

**TASK :** Private Access from a Different VPC:

Create two separate VPC networks: vpc-a and vpc-b.
Configure the Cloud Run service with Ingress settings to "Internal". Deploy/associate this service with vpc-a (e.g., by means of a Serverless VPC Access connector in vpc-a if needed, although for ingress control, the association is more about network origin).
Deploy a Compute Engine VM within vpc-b.
Networking Task: Set up VPC Network Peering between vpc-a and vpc-b. Ensure routes are exchanged.
IAM Task: Ensure the VM's service account has the run.invoker role on the Cloud Run service.
From the VM in vpc-b, use curl or a script to send requests to the Cloud Run service's invocation endpoint. This demonstrates secure, private cross-VPC access.


### Scenario 2: Serverless API Gateway

Folder structure : 

scenario2/
├── python-service/
│   ├── main.py
│   └── requirements.txt
├── node-service/
│   ├── index.js
│   └── package.json
└── openapi.yaml

Phase A: Deploy the Backend Functions
* Note down the exact URLs outputted by both deployments. You will need them for the API Gateway configuration.

Phase B: Set up IAM Permissions
* API Gateway needs a dedicated Service Account to securely invoke the backend functions.

Phase C: Configure and Deploy API Gateway

Phase D: Enforce and Test API Keys
* Because the openapi.yaml requires an API key, hitting the Gateway URL directly will fail with a 401 Unauthorized error. You might have to create a key to proceed.
* Go to the Google Cloud Console: APIs & Services > Credentials.
* Click + CREATE CREDENTIALS and select API Key.
* Copy the generated API Key.
* Test the Python routing by appending the path and the key to your Gateway URL. example : curl -s "https://YOUR_GATEWAY_URL/python?key=YOUR_API_KEY"

**TASK :** Configure API Gateway permissions and ensure the API Gateway service account has the functions.invoke and/or run.invoke permissions on the backend functions, while restricting direct user invocation of the functions.
